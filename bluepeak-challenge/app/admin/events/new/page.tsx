import Link from "next/link";
import PageHeader from "@/components/admin/PageHeader";
import EventForm from "@/components/admin/EventForm";

export const metadata = { title: "New event" };

export default function NewEventPage() {
  return (
    <>
      <Link href="/admin/events" className="text-sm font-semibold text-muted hover:text-white">← Events</Link>
      <div className="mt-3" />
      <PageHeader title="New event" subtitle="Save it first, then add ticket types." />
      <div className="card max-w-3xl p-6 sm:p-8">
        <EventForm />
      </div>
    </>
  );
}
