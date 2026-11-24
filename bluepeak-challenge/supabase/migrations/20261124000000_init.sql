-- BlowUp platform schema: accounts, events, ticketing, masterclass registrations.
-- Apply in Supabase: SQL Editor → paste → Run (or `supabase db push`).
--
-- Security model
--   * Browsers (anon/authenticated keys) can only READ, and only what RLS allows.
--   * All writes happen on the server with the service-role key, after the
--     server has checked who the user is. Money-moving logic lives in the
--     SECURITY DEFINER functions below, which only service_role may execute.
--   * Prices are stored in pesewas (GHS × 100) as integers.

-- ─── Types ──────────────────────────────────────────────────────────────────
create type public.user_role as enum ('user', 'admin');
create type public.order_status as enum ('pending', 'paid', 'expired', 'failed', 'refunded');
-- Masterclass registration lifecycle: pay → enrolled → completed (or cancelled).
create type public.application_status as enum (
  'pending_payment', 'enrolled', 'completed', 'cancelled'
);

-- ─── Profiles ───────────────────────────────────────────────────────────────
create table public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  full_name   text,
  phone       text,
  role        public.user_role not null default 'user',
  created_at  timestamptz not null default now()
);

-- Create a profile automatically for every new auth user (email, Google, phone).
create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.phone
  );
  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─── Events & ticket types ──────────────────────────────────────────────────
create table public.events (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title        text not null,
  summary      text,
  description  text,
  venue        text,
  city         text,
  starts_at    timestamptz not null,
  ends_at      timestamptz,
  cover_url    text,
  published    boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index events_published_starts_idx on public.events (published, starts_at);

create table public.ticket_types (
  id              uuid primary key default gen_random_uuid(),
  event_id        uuid not null references public.events (id) on delete cascade,
  name            text not null,
  description     text,
  price_pesewas   integer not null check (price_pesewas >= 0),
  capacity        integer not null check (capacity > 0),
  sold            integer not null default 0 check (sold >= 0),
  max_per_order   integer not null default 10 check (max_per_order between 1 and 50),
  sales_end       timestamptz,
  sort            integer not null default 0,
  created_at      timestamptz not null default now(),
  constraint ticket_types_not_oversold check (sold <= capacity)
);
create index ticket_types_event_idx on public.ticket_types (event_id);

-- ─── Orders & tickets ───────────────────────────────────────────────────────
create table public.orders (
  id             uuid primary key default gen_random_uuid(),
  reference      text not null unique,
  user_id        uuid not null references public.profiles (id) on delete restrict,
  event_id       uuid not null references public.events (id) on delete restrict,
  email          text not null,
  status         public.order_status not null default 'pending',
  total_pesewas  integer not null check (total_pesewas >= 0),
  expires_at     timestamptz not null,
  paid_at        timestamptz,
  created_at     timestamptz not null default now()
);
create index orders_user_idx on public.orders (user_id, created_at desc);
create index orders_pending_idx on public.orders (expires_at) where status = 'pending';

create table public.order_items (
  id                  uuid primary key default gen_random_uuid(),
  order_id            uuid not null references public.orders (id) on delete cascade,
  ticket_type_id      uuid not null references public.ticket_types (id) on delete restrict,
  quantity            integer not null check (quantity > 0),
  unit_price_pesewas  integer not null check (unit_price_pesewas >= 0)
);
create index order_items_order_idx on public.order_items (order_id);

create table public.tickets (
  id              uuid primary key default gen_random_uuid(),
  code            text not null unique,
  order_id        uuid not null references public.orders (id) on delete cascade,
  ticket_type_id  uuid not null references public.ticket_types (id) on delete restrict,
  event_id        uuid not null references public.events (id) on delete restrict,
  user_id         uuid not null references public.profiles (id) on delete restrict,
  checked_in_at   timestamptz,
  created_at      timestamptz not null default now()
);
create index tickets_user_idx on public.tickets (user_id);
create index tickets_event_idx on public.tickets (event_id);

-- ─── Masterclass registrations ─────────────────────────────────────────────────
create table public.applications (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references public.profiles (id) on delete restrict,
  season             text not null,
  category           text not null check (category in ('film-director', 'musician', 'sound-engineer')),
  full_name          text not null,
  stage_name         text,
  phone              text not null,
  city               text,
  bio                text not null,
  portfolio_url      text,
  status             public.application_status not null default 'pending_payment',
  fee_pesewas        integer not null check (fee_pesewas >= 0),
  payment_reference  text unique,
  -- References from earlier abandoned checkout attempts, so a late payment still matches.
  previous_references text[] not null default '{}',
  paid_at            timestamptz,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  unique (user_id, season)
);

-- ─── Row-level security (read-only for browsers) ────────────────────────────
alter table public.profiles      enable row level security;
alter table public.events        enable row level security;
alter table public.ticket_types  enable row level security;
alter table public.orders        enable row level security;
alter table public.order_items   enable row level security;
alter table public.tickets       enable row level security;
alter table public.applications  enable row level security;

create policy "own profile" on public.profiles
  for select to authenticated using (id = (select auth.uid()));

create policy "published events" on public.events
  for select to anon, authenticated using (published);

create policy "ticket types of published events" on public.ticket_types
  for select to anon, authenticated
  using (exists (select 1 from public.events e where e.id = event_id and e.published));

create policy "own orders" on public.orders
  for select to authenticated using (user_id = (select auth.uid()));

create policy "own order items" on public.order_items
  for select to authenticated
  using (exists (select 1 from public.orders o where o.id = order_id and o.user_id = (select auth.uid())));

create policy "own tickets" on public.tickets
  for select to authenticated using (user_id = (select auth.uid()));

create policy "own applications" on public.applications
  for select to authenticated using (user_id = (select auth.uid()));

-- ─── Ticketing functions (service_role only) ────────────────────────────────

-- Return seats held by unpaid orders whose reservation window has passed.
create function public.release_expired_orders() returns void
language plpgsql security definer set search_path = '' as $$
begin
  with expired as (
    update public.orders set status = 'expired'
    where status = 'pending' and expires_at < now()
    returning id
  ), released as (
    select oi.ticket_type_id, sum(oi.quantity)::int as qty
    from public.order_items oi join expired e on e.id = oi.order_id
    group by oi.ticket_type_id
  )
  update public.ticket_types t set sold = t.sold - r.qty
  from released r where t.id = r.ticket_type_id;
end $$;

-- Issue one ticket per seat on an order. Assumes the order is locked and paid.
create function public.issue_tickets(p_order_id uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare
  v_order public.orders;
  v_item  record;
begin
  select * into v_order from public.orders where id = p_order_id;
  if exists (select 1 from public.tickets where order_id = p_order_id) then
    return; -- idempotent
  end if;
  for v_item in select * from public.order_items where order_id = p_order_id loop
    insert into public.tickets (code, order_id, ticket_type_id, event_id, user_id)
    select upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 10)),
           p_order_id, v_item.ticket_type_id, v_order.event_id, v_order.user_id
    from generate_series(1, v_item.quantity);
  end loop;
end $$;

-- Atomically reserve seats and create a pending order.
-- p_items: [{"ticket_type_id": "<uuid>", "quantity": 2}, ...]
-- Free orders (total 0) are marked paid and ticketed immediately.
create function public.create_order(
  p_user_id uuid, p_event_id uuid, p_email text, p_reference text, p_items jsonb
) returns public.orders
language plpgsql security definer set search_path = '' as $$
declare
  v_event  public.events;
  v_type   public.ticket_types;
  v_item   jsonb;
  v_qty    int;
  v_total  int := 0;
  v_count  int := 0;
  v_order  public.orders;
begin
  perform public.release_expired_orders();

  select * into v_event from public.events where id = p_event_id and published;
  if not found then raise exception 'EVENT_NOT_FOUND'; end if;
  if coalesce(v_event.ends_at, v_event.starts_at) < now() then raise exception 'EVENT_ENDED'; end if;
  if jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 then
    raise exception 'NO_ITEMS';
  end if;

  insert into public.orders (reference, user_id, event_id, email, total_pesewas, expires_at)
  values (p_reference, p_user_id, p_event_id, p_email, 0, now() + interval '30 minutes')
  returning * into v_order;

  for v_item in select * from jsonb_array_elements(p_items) loop
    v_qty := (v_item ->> 'quantity')::int;
    if v_qty is null or v_qty <= 0 then continue; end if;

    select * into v_type from public.ticket_types
    where id = (v_item ->> 'ticket_type_id')::uuid and event_id = p_event_id
    for update;
    if not found then raise exception 'TICKET_TYPE_NOT_FOUND'; end if;
    if v_type.sales_end is not null and v_type.sales_end < now() then raise exception 'SALES_ENDED:%', v_type.name; end if;
    if v_qty > v_type.max_per_order then raise exception 'TOO_MANY:%', v_type.name; end if;
    if v_type.sold + v_qty > v_type.capacity then raise exception 'SOLD_OUT:%', v_type.name; end if;

    update public.ticket_types set sold = sold + v_qty where id = v_type.id;
    insert into public.order_items (order_id, ticket_type_id, quantity, unit_price_pesewas)
    values (v_order.id, v_type.id, v_qty, v_type.price_pesewas);
    v_total := v_total + v_qty * v_type.price_pesewas;
    v_count := v_count + v_qty;
  end loop;

  if v_count = 0 then raise exception 'NO_ITEMS'; end if;
  if v_count > 20 then raise exception 'TOO_MANY:order'; end if;

  if v_total = 0 then
    update public.orders set total_pesewas = 0, status = 'paid', paid_at = now()
    where id = v_order.id returning * into v_order;
    perform public.issue_tickets(v_order.id);
  else
    update public.orders set total_pesewas = v_total
    where id = v_order.id returning * into v_order;
  end if;
  return v_order;
end $$;

-- Record a verified Paystack payment for an order. Idempotent.
-- Returns: 'paid' | 'already_paid' | 'amount_mismatch' | 'not_found' | 'needs_refund'
create function public.mark_order_paid(p_reference text, p_amount_pesewas int) returns text
language plpgsql security definer set search_path = '' as $$
declare
  v_order public.orders;
  v_item  record;
  v_type  public.ticket_types;
begin
  select * into v_order from public.orders where reference = p_reference for update;
  if not found then return 'not_found'; end if;
  if v_order.status = 'paid' then return 'already_paid'; end if;
  if p_amount_pesewas <> v_order.total_pesewas then return 'amount_mismatch'; end if;

  -- Payment arrived after the reservation lapsed: try to take the seats back.
  if v_order.status in ('expired', 'failed') then
    for v_item in select * from public.order_items where order_id = v_order.id loop
      select * into v_type from public.ticket_types where id = v_item.ticket_type_id for update;
      if v_type.sold + v_item.quantity > v_type.capacity then
        update public.orders set status = 'failed' where id = v_order.id;
        return 'needs_refund';
      end if;
    end loop;
    update public.ticket_types t set sold = t.sold + oi.quantity
    from public.order_items oi where oi.order_id = v_order.id and t.id = oi.ticket_type_id;
  elsif v_order.status <> 'pending' then
    return 'needs_refund';
  end if;

  update public.orders set status = 'paid', paid_at = now() where id = v_order.id;
  perform public.issue_tickets(v_order.id);
  return 'paid';
end $$;

-- Record a verified Paystack payment for a masterclass registration. Idempotent.
create function public.mark_application_paid(p_reference text, p_amount_pesewas int) returns text
language plpgsql security definer set search_path = '' as $$
declare
  v_app public.applications;
begin
  select * into v_app from public.applications
  where payment_reference = p_reference or p_reference = any (previous_references)
  for update;
  if not found then return 'not_found'; end if;
  if v_app.paid_at is not null then return 'already_paid'; end if;
  if p_amount_pesewas <> v_app.fee_pesewas then return 'amount_mismatch'; end if;
  update public.applications
  set status = 'enrolled', paid_at = now(), updated_at = now()
  where id = v_app.id;
  return 'paid';
end $$;

-- Check a ticket in at the door. Returns JSON with a status and ticket details.
create function public.check_in_ticket(p_code text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare
  v_ticket public.tickets;
  v_result jsonb;
begin
  select * into v_ticket from public.tickets where code = upper(trim(p_code)) for update;
  if not found then return jsonb_build_object('status', 'not_found'); end if;

  select jsonb_build_object(
    'code', v_ticket.code,
    'event', e.title,
    'ticket_type', tt.name,
    'holder', coalesce(p.full_name, o.email),
    'checked_in_at', v_ticket.checked_in_at
  ) into v_result
  from public.events e, public.ticket_types tt, public.orders o
  left join public.profiles p on p.id = o.user_id
  where e.id = v_ticket.event_id and tt.id = v_ticket.ticket_type_id and o.id = v_ticket.order_id;

  if v_ticket.checked_in_at is not null then
    return v_result || jsonb_build_object('status', 'already_checked_in');
  end if;
  update public.tickets set checked_in_at = now() where id = v_ticket.id;
  return v_result || jsonb_build_object('status', 'ok', 'checked_in_at', now());
end $$;

-- Lock the functions down: only the server (service_role) may call them.
revoke execute on function
  public.release_expired_orders(),
  public.issue_tickets(uuid),
  public.create_order(uuid, uuid, text, text, jsonb),
  public.mark_order_paid(text, int),
  public.mark_application_paid(text, int),
  public.check_in_ticket(text)
from public, anon, authenticated;

grant execute on function
  public.release_expired_orders(),
  public.issue_tickets(uuid),
  public.create_order(uuid, uuid, text, text, jsonb),
  public.mark_order_paid(text, int),
  public.mark_application_paid(text, int),
  public.check_in_ticket(text)
to service_role;

-- ─── Storage: public bucket for event cover images ──────────────────────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('event-covers', 'event-covers', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;
