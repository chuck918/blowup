import { NextResponse, type NextRequest } from "next/server";
import { getUser, isAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { PROGRAMME_SEASON } from "@/lib/env";
import { categoryTitle } from "@/lib/content";
import type { Application } from "@/lib/types";

/** CSV download of masterclass registrations (admin only). Guards against spreadsheet formula injection. */
export async function GET(request: NextRequest) {
  const user = await getUser();
  if (!user || !(await isAdmin(user.id))) return new NextResponse("Forbidden", { status: 403 });

  const sp = request.nextUrl.searchParams;
  let query = createAdminClient().from("applications").select("*").eq("season", PROGRAMME_SEASON).order("created_at");
  if (sp.get("status")) query = query.eq("status", sp.get("status")!);
  if (sp.get("category")) query = query.eq("category", sp.get("category")!);
  const { data } = await query;

  const cell = (v: unknown) => {
    let s = v == null ? "" : String(v);
    if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
    return `"${s.replace(/"/g, '""')}"`;
  };
  const header = ["Enrolled", "Status", "Track", "Full name", "Stage name", "Phone", "City", "Portfolio", "Bio", "Fee (GHS)", "Reference"];
  const rows = ((data ?? []) as Application[]).map((a) => [
    a.paid_at ?? "", a.status, categoryTitle(a.category), a.full_name, a.stage_name, a.phone, a.city, a.portfolio_url, a.bio, (a.fee_pesewas / 100).toFixed(2), a.payment_reference,
  ]);
  const csv = "﻿" + [header, ...rows].map((r) => r.map(cell).join(",")).join("\r\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="blowup-masterclass-${PROGRAMME_SEASON}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
