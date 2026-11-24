# The BlowUp

Website and platform for The BlowUp masterclass: masterclass registration, event ticketing, and an admin area.

**Stack:** Next.js 16 (App Router) · Supabase (Postgres, Auth, Storage) · Paystack (Mobile Money & cards) · Tailwind CSS 4

## What's in it

| Area | Routes | Notes |
| --- | --- | --- |
| Public site | `/`, `/events`, `/events/[slug]`, `/terms`, `/privacy` | Upcoming events come from the database. |
| Accounts | `/login`, `/signup`, `/forgot-password`, `/reset-password` | Email + password, Google, phone (SMS code). |
| Masterclass | `/register` | Pick a track → short form → Paystack → enrolled. Details editable until the deadline. |
| Tickets | `/events/[slug]` → Paystack → `/dashboard/tickets` | Seats are held for 30 minutes during checkout. Each ticket has a QR code. |
| Dashboard | `/dashboard`, `/dashboard/tickets`, `/dashboard/profile` | Signed-in users only. |
| Admin | `/admin` (overview, registrations, events, orders, check-in) | Users with role `admin` only. Check-in works with a phone camera (Chrome/Android) or typed codes. |

Payments are always confirmed **server-side with Paystack** — on the return page *and* via webhook — before a registration is confirmed or tickets are issued. Amounts are checked against the order, and processing is idempotent.

## Setup (first time)

### 1. Supabase

1. Create a project at [supabase.com](https://supabase.com) (pick the region closest to Ghana, e.g. EU West).
2. **SQL Editor** → paste all of [`supabase/migrations/20261124000000_init.sql`](supabase/migrations/20261124000000_init.sql) → **Run**. This creates the tables, security rules, payment functions and the `event-covers` storage bucket.
3. **Project Settings → API**: copy the URL, `anon` key and `service_role` key into `.env.local`.
4. **Authentication → URL Configuration**:
   - Site URL: your domain (e.g. `https://www.theblowupgh.com`)
   - Redirect URLs: add `https://www.theblowupgh.com/auth/callback` and `http://localhost:3000/auth/callback`

### 2. Sign-in methods (Supabase → Authentication → Sign In / Providers)

- **Email** — on by default. Keep "Confirm email" on. For real volume, set up custom SMTP (Authentication → Emails → SMTP); Supabase's built-in sender is rate-limited.
- **Google** — create an OAuth client in [Google Cloud Console](https://console.cloud.google.com/apis/credentials) (type: Web). Authorised redirect URI: `https://<your-project>.supabase.co/auth/v1/callback`. Paste the client ID/secret into Supabase's Google provider.
- **Phone** — enable the Phone provider and connect an SMS provider (Twilio, MessageBird, Vonage or Textlocal). Each code sent costs money; consider enabling CAPTCHA under Authentication → Attack Protection.

### 3. Paystack

1. Copy your **secret key** into `PAYSTACK_SECRET_KEY` (use `sk_test_…` first).
2. **Settings → API Keys & Webhooks → Webhook URL**: `https://www.theblowupgh.com/api/paystack/webhook`
3. Set `PROGRAMME_FEE_GHS` to the masterclass fee. Registration shows “opening soon” until it is set.

### 4. Make yourself an admin

Sign up on the site, then in Supabase **SQL Editor**:

```sql
update public.profiles set role = 'admin'
where id = (select id from auth.users where email = 'you@example.com');
```

The **Admin** link appears in the header once you refresh.

### 5. Run

```bash
npm install
cp .env.example .env.local   # then fill it in
npm run dev                  # http://localhost:3000
```

Before deploying: `npm run lint && npm run build`.

## Day-to-day

- **Create an event:** Admin → Events → New event → save → add ticket types → tick *Published*.
- **Registrations:** Admin → Registrations. Filter by track or status, open a row to read it, mark people *Completed* after the masterclass or *Cancelled* if needed. *Export CSV* for attendance lists.
- **At the door:** Admin → Check-in on a phone. Tap *Scan with camera*, or type the code under the QR.
- **Refunds:** issue them in the Paystack dashboard. Orders marked *Failed* were paid after seats sold out and need refunding.

## Notes

- Prices are stored in pesewas (GHS × 100). Times are Ghana time (GMT).
- The registration deadline lives in [`lib/content.ts`](lib/content.ts) (`DEADLINE_ISO`), along with tracks, FAQ and contact details.
- Internally, registrations are stored in the `applications` table.
- The browser can only *read* data, and only its own. All writes go through server code that checks who you are first.
