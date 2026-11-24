import type { ApplicationStatus, OrderStatus } from "@/lib/types";

const APP: Record<ApplicationStatus, { label: string; cls: string }> = {
  pending_payment: { label: "Awaiting payment", cls: "badge-orange" },
  enrolled: { label: "Enrolled", cls: "badge-green" },
  completed: { label: "Completed", cls: "badge-yellow" },
  cancelled: { label: "Cancelled", cls: "badge-red" },
};

const ORDER: Record<OrderStatus, { label: string; cls: string }> = {
  pending: { label: "Pending", cls: "badge-orange" },
  paid: { label: "Paid", cls: "badge-green" },
  expired: { label: "Expired", cls: "" },
  failed: { label: "Failed", cls: "badge-red" },
  refunded: { label: "Refunded", cls: "" },
};

export default function StatusBadge({ status }: { status: ApplicationStatus }) {
  const s = APP[status];
  return <span className={`badge ${s.cls}`}>{s.label}</span>;
}

export function OrderBadge({ status }: { status: OrderStatus }) {
  const s = ORDER[status];
  return <span className={`badge ${s.cls}`}>{s.label}</span>;
}

export const APPLICATION_STATUS_LABELS = Object.fromEntries(
  Object.entries(APP).map(([k, v]) => [k, v.label])
) as Record<ApplicationStatus, string>;
