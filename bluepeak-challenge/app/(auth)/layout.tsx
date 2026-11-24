import Link from "next/link";
import Image from "next/image";

/** Split-screen shell for login / sign-up / password pages. */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-[1fr_1.05fr]">
      {/* Poster side */}
      <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden border-r border-line p-12">
        <Image src="/images/hero-stage.webp" alt="" fill priority sizes="50vw" className="object-cover object-[70%_center] opacity-70" />
        <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/70 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-transparent to-ink/40" />

        <Link href="/" className="relative z-10 w-fit" aria-label="The BlowUp home">
          <Image src="/images/logo-wordmark.png" alt="The BlowUp" width={916} height={238} className="h-9 w-auto" />
        </Link>

        <div className="relative z-10 max-w-md">
          <p className="eyebrow mb-5">Season 2027</p>
          <h2 className="display text-7xl xl:text-8xl">
            Your stage.<br />
            <span className="text-gradient">Your moment.</span>
          </h2>
          <p className="mt-6 text-muted text-lg leading-relaxed">
            Register for the masterclass, grab tickets to every BlowUp event, and keep it all in one place.
          </p>
        </div>
      </aside>

      {/* Form side */}
      <main className="relative flex flex-col px-5 py-8 sm:px-10">
        <div className="flex items-center justify-between">
          <Link href="/" className="lg:hidden" aria-label="The BlowUp home">
            <Image src="/images/logo-wordmark.png" alt="The BlowUp" width={916} height={238} className="h-7 w-auto" />
          </Link>
          <Link href="/" className="ml-auto text-sm text-muted hover:text-white transition-colors">
            ← Back to site
          </Link>
        </div>
        <div className="flex-1 grid place-items-center py-10">
          <div className="w-full max-w-[26rem]">{children}</div>
        </div>
      </main>
    </div>
  );
}
