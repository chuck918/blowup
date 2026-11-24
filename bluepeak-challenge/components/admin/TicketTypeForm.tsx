"use client";

import { useActionState } from "react";
import { saveTicketType } from "@/app/admin/actions";
import { FormMessage, SubmitButton, type FormState } from "@/components/ui/forms";
import { isoToLocalInput } from "@/lib/format";
import type { TicketType } from "@/lib/types";

/** Add (no `ticket`) or edit one ticket type. */
export default function TicketTypeForm({ eventId, ticket }: { eventId: string; ticket?: TicketType }) {
  const [state, action] = useActionState<FormState, FormData>(saveTicketType, {});
  const fe = state.fieldErrors ?? {};
  const err = (k: string) => fe[k] && <p className="mt-1 text-xs text-danger">{fe[k]}</p>;
  const p = ticket?.id ?? "new";

  return (
    <form action={action} className="grid gap-3">
      <input type="hidden" name="event_id" value={eventId} />
      {ticket && <input type="hidden" name="id" value={ticket.id} />}
      <div className="grid gap-3 sm:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <label className="label" htmlFor={`name-${p}`}>Name</label>
          <input id={`name-${p}`} name="name" className="input" defaultValue={ticket?.name} placeholder="Regular" />
          {err("name")}
        </div>
        <div>
          <label className="label" htmlFor={`price-${p}`}>Price (GHS)</label>
          <input id={`price-${p}`} name="price" type="number" min={0} step="0.01" className="input" defaultValue={ticket ? ticket.price_pesewas / 100 : ""} placeholder="50" />
          {err("price")}
        </div>
        <div>
          <label className="label" htmlFor={`cap-${p}`}>Capacity</label>
          <input id={`cap-${p}`} name="capacity" type="number" min={1} className="input" defaultValue={ticket?.capacity} placeholder="200" />
          {err("capacity")}
        </div>
        <div>
          <label className="label" htmlFor={`max-${p}`}>Max / order</label>
          <input id={`max-${p}`} name="max_per_order" type="number" min={1} max={50} className="input" defaultValue={ticket?.max_per_order ?? 10} />
          {err("max_per_order")}
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-[2fr_1fr_1fr]">
        <div>
          <label className="label" htmlFor={`desc-${p}`}>Description (optional)</label>
          <input id={`desc-${p}`} name="description" className="input" defaultValue={ticket?.description ?? ""} placeholder="Includes front-row seating" />
        </div>
        <div>
          <label className="label" htmlFor={`end-${p}`}>Sales end (optional)</label>
          <input id={`end-${p}`} name="sales_end" type="datetime-local" className="input" defaultValue={isoToLocalInput(ticket?.sales_end ?? null)} />
        </div>
        <div>
          <label className="label" htmlFor={`sort-${p}`}>Order</label>
          <input id={`sort-${p}`} name="sort" type="number" className="input" defaultValue={ticket?.sort ?? 0} />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <SubmitButton className="btn btn-primary btn-sm" pendingText="Saving…">{ticket ? "Save" : "Add ticket type"}</SubmitButton>
        <div className="flex-1"><FormMessage state={state} /></div>
      </div>
    </form>
  );
}
