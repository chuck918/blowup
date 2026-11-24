/** Row shapes for the tables in supabase/migrations. */

export type Role = "user" | "admin";
export type OrderStatus = "pending" | "paid" | "expired" | "failed" | "refunded";
/** Masterclass registration status (table: applications). */
export type ApplicationStatus = "pending_payment" | "enrolled" | "completed" | "cancelled";

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  role: Role;
  created_at: string;
}

export interface EventRow {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  description: string | null;
  venue: string | null;
  city: string | null;
  starts_at: string;
  ends_at: string | null;
  cover_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface TicketType {
  id: string;
  event_id: string;
  name: string;
  description: string | null;
  price_pesewas: number;
  capacity: number;
  sold: number;
  max_per_order: number;
  sales_end: string | null;
  sort: number;
}

export interface EventWithTickets extends EventRow {
  ticket_types: TicketType[];
}

export interface Order {
  id: string;
  reference: string;
  user_id: string;
  event_id: string;
  email: string;
  status: OrderStatus;
  total_pesewas: number;
  expires_at: string;
  paid_at: string | null;
  created_at: string;
}

export interface Ticket {
  id: string;
  code: string;
  order_id: string;
  ticket_type_id: string;
  event_id: string;
  user_id: string;
  checked_in_at: string | null;
  created_at: string;
}

export interface Application {
  id: string;
  user_id: string;
  season: string;
  category: string;
  full_name: string;
  stage_name: string | null;
  phone: string;
  city: string | null;
  bio: string;
  portfolio_url: string | null;
  status: ApplicationStatus;
  fee_pesewas: number;
  payment_reference: string | null;
  previous_references: string[];
  paid_at: string | null;
  created_at: string;
  updated_at: string;
}
