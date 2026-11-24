import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="relative grid min-h-[80vh] place-items-center overflow-hidden px-5 pt-24 text-center">
        <div className="glow glow-orange left-1/2 top-1/3 size-[30rem] -translate-x-1/2" />
        <div className="relative">
          <p className="display text-[clamp(8rem,30vw,18rem)] leading-none text-gradient">404</p>
          <h1 className="display text-4xl sm:text-5xl">This stage is empty.</h1>
          <p className="mt-4 text-muted">The page you’re looking for moved or never existed.</p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/" className="btn btn-primary">Home</Link>
            <Link href="/events" className="btn btn-outline">Events</Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
