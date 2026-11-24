import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import RegistrationForm from "@/components/register/RegistrationForm";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { PROGRAMME_SEASON, programmeFeePesewas } from "@/lib/env";
import { DEADLINE_LONG, registrationOpen } from "@/lib/content";
import type { Application } from "@/lib/types";

export const metadata: Metadata = { title: "Register", description: "Register for The BlowUp masterclass for filmmakers, musicians and sound engineers." };

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const user = await requireUser("/register");
  const { category } = await searchParams;
  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("applications")
    .select("*")
    .eq("user_id", user.id)
    .eq("season", PROGRAMME_SEASON)
    .maybeSingle<Application>();

  const fee = programmeFeePesewas();
  const open = registrationOpen();

  return (
    <>
      <SiteHeader />
      <main className="relative overflow-hidden pt-36 pb-24">
        <div className="glow glow-yellow left-[-10%] top-10 size-[30rem]" />
        <div className="container relative max-w-4xl">
          <p className="eyebrow mb-5">Masterclass · Season {PROGRAMME_SEASON}</p>
          <h1 className="display text-6xl sm:text-8xl">
            {existing?.paid_at ? <>You’re <span className="text-gradient">enrolled.</span></> : <>Save your <span className="text-gradient">seat.</span></>}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-muted">
            {existing && <StatusBadge status={existing.status} />}
            <span>Deadline: <strong className="text-white">{DEADLINE_LONG}</strong></span>
          </div>

          <div className="mt-12">
            {!open ? (
              <div className="panel p-8">
                <h2 className="text-xl font-extrabold">Registration is closed</h2>
                <p className="mt-2 text-muted">Thanks for your interest. Follow us for news about next season.</p>
                <Link href="/dashboard" className="btn btn-outline mt-6">Go to dashboard</Link>
              </div>
            ) : fee === null ? (
              <div className="panel p-8">
                <h2 className="text-xl font-extrabold">Registration opens soon</h2>
                <p className="mt-2 text-muted">We’re putting the final touches on registration. Check back shortly.</p>
              </div>
            ) : (
              <RegistrationForm
                existing={existing ?? null}
                defaults={{ full_name: user.profile?.full_name ?? "", phone: user.profile?.phone ?? user.phone ?? "" }}
                feePesewas={existing?.paid_at ? existing.fee_pesewas : fee}
                needsEmail={!user.email}
                initialCategory={category}
              />
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
