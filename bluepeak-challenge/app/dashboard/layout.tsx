import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import DashboardNav from "@/components/dashboard/DashboardNav";
import { requireUser } from "@/lib/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser("/dashboard");
  const first = (user.profile?.full_name ?? "").split(" ")[0];

  return (
    <>
      <SiteHeader />
      <main className="relative overflow-hidden pt-32 pb-24">
        <div className="glow glow-yellow right-[-10%] top-0 size-[28rem]" />
        <div className="container relative">
          <p className="eyebrow mb-4">Dashboard</p>
          <h1 className="display text-5xl sm:text-7xl">
            {first ? <>Hey, <span className="text-gradient">{first}.</span></> : "Your dashboard"}
          </h1>
          <DashboardNav />
          <div className="mt-10">{children}</div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
