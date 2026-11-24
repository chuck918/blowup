"use client";

import { useActionState, useState } from "react";
import { saveEvent } from "@/app/admin/actions";
import { Field, FormMessage, SubmitButton, type FormState } from "@/components/ui/forms";
import { isoToLocalInput, slugify } from "@/lib/format";
import type { EventRow } from "@/lib/types";

export default function EventForm({ event }: { event?: EventRow }) {
  const [state, action] = useActionState<FormState, FormData>(saveEvent, {});
  const [title, setTitle] = useState(event?.title ?? "");
  const [slug, setSlug] = useState(event?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(event));
  const fe = state.fieldErrors ?? {};

  return (
    <form action={action} className="grid gap-6">
      {event && <input type="hidden" name="id" value={event.id} />}
      {event?.cover_url && <input type="hidden" name="cover_url" value={event.cover_url} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field label="Title" name="title" error={fe.title}>
            <input
              id="title"
              name="title"
              className="input"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!slugTouched) setSlug(slugify(e.target.value));
              }}
              required
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="URL" name="slug" error={fe.slug} hint={`theblowupgh.com/events/${slug || "…"}`}>
            <input id="slug" name="slug" className="input font-mono text-sm" value={slug} onChange={(e) => { setSlugTouched(true); setSlug(e.target.value); }} />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Short summary" name="summary" hint="One or two sentences for cards and link previews.">
            <input id="summary" name="summary" className="input" maxLength={300} defaultValue={event?.summary ?? ""} />
          </Field>
        </div>
        <Field label="Starts (Ghana time)" name="starts_at" error={fe.starts_at}>
          <input id="starts_at" name="starts_at" type="datetime-local" className="input" defaultValue={isoToLocalInput(event?.starts_at ?? null)} required />
        </Field>
        <Field label="Ends (optional)" name="ends_at" error={fe.ends_at}>
          <input id="ends_at" name="ends_at" type="datetime-local" className="input" defaultValue={isoToLocalInput(event?.ends_at ?? null)} />
        </Field>
        <Field label="Venue" name="venue">
          <input id="venue" name="venue" className="input" defaultValue={event?.venue ?? ""} placeholder="National Theatre" />
        </Field>
        <Field label="City" name="city">
          <input id="city" name="city" className="input" defaultValue={event?.city ?? ""} placeholder="Accra" />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Description" name="description" hint="Line breaks are kept.">
            <textarea id="description" name="description" rows={8} className="input" defaultValue={event?.description ?? ""} />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Cover image" name="cover" error={fe.cover} hint="JPG, PNG or WebP up to 5 MB. Landscape 16:9 works best.">
            <input id="cover" name="cover" type="file" accept="image/jpeg,image/png,image/webp" className="input" />
          </Field>
          {event?.cover_url && (
            <label className="mt-3 flex items-center gap-2 text-sm text-muted">
              <input type="checkbox" name="remove_cover" /> Remove current cover
            </label>
          )}
        </div>
      </div>

      <label className="flex items-center justify-between gap-4 rounded-2xl border border-line p-4">
        <span>
          <span className="block font-bold">Published</span>
          <span className="text-sm text-muted">Visible on the site and open for ticket sales.</span>
        </span>
        <input type="checkbox" name="published" defaultChecked={event?.published ?? false} className="size-5" />
      </label>

      <FormMessage state={state} />
      <SubmitButton className="btn btn-primary w-fit" pendingText="Saving…">{event ? "Save event" : "Create event"}</SubmitButton>
    </form>
  );
}
