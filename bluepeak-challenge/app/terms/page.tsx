import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions — BlowUp Innovation Challenge",
  description:
    "The rules and conditions governing participation in the BlowUp Innovation Challenge.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur z-50">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="text-xl font-black tracking-tight">
            Blow<span style={{ color: "var(--blue)" }}>Up</span>
            <span className="text-amber-400">.</span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            ← Back to site
          </Link>
        </div>
      </header>

      <main className="container py-20">
        {/* Hero */}
        <div className="max-w-3xl mb-16">
          <span className="eyebrow mb-4">Legal</span>
          <h1 className="text-5xl font-black tracking-tight text-gray-900 mt-2 mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-gray-500 text-sm">
            Effective date: <strong>1 July 2026</strong>
          </p>
        </div>

        {/* Content */}
        <article className="max-w-3xl" style={{ color: "var(--ink)" }}>
          <p className="text-gray-600 leading-relaxed text-lg">
            Please read these Terms &amp; Conditions ("<strong>Terms</strong>")
            carefully before registering for or participating in the BlowUp
            Innovation Challenge ("<strong>Competition</strong>"). By registering,
            you agree to be bound by these Terms. If you do not agree, do not
            register.
          </p>

          <Section title="1. Eligibility">
            <ul>
              <li>
                The Competition is open to individuals and teams based in Ghana and
                across Africa.
              </li>
              <li>
                Participants must be at least 15 years of age at the time of
                registration. Participants under 18 must have written parental or
                guardian consent.
              </li>
              <li>
                Employees, directors, or close relatives of BlowUp Innovation
                Challenge and its official sponsors are not eligible to compete.
              </li>
              <li>Each individual may be a member of only one competing team.</li>
            </ul>
          </Section>

          <Section title="2. Registration">
            <ul>
              <li>
                Registration is completed by submitting the official registration
                form and paying the applicable registration fee via Paystack.
              </li>
              <li>
                Registration fees are <strong>non-refundable</strong> except where
                the Competition is cancelled by BlowUp Innovation Challenge.
              </li>
              <li>
                You must provide accurate and complete information during
                registration. Misrepresentation may result in immediate
                disqualification.
              </li>
            </ul>
          </Section>

          <Section title="3. Competition Rules">
            <ul>
              <li>
                All submissions must be original work created by the registered
                team. You may not submit work that infringes the intellectual
                property rights of any third party.
              </li>
              <li>
                Submissions that contain hateful, discriminatory, defamatory,
                obscene, or illegal content will be immediately disqualified.
              </li>
              <li>
                Plagiarism, fabrication of data, or any other form of academic or
                commercial dishonesty is grounds for immediate disqualification and
                may be reported to relevant authorities.
              </li>
              <li>
                Teams must meet all deadlines specified in the official Competition
                Timeline. Late submissions will not be accepted.
              </li>
              <li>
                BlowUp Innovation Challenge reserves the right to modify the
                Competition format, judging criteria, or timeline with reasonable
                notice to participants.
              </li>
            </ul>
          </Section>

          <Section title="4. Intellectual Property">
            <ul>
              <li>
                Participants retain full ownership of their intellectual property
                submitted to the Competition.
              </li>
              <li>
                By submitting, you grant BlowUp Innovation Challenge a
                non-exclusive, royalty-free, worldwide licence to display, share,
                and reproduce your submission for the purposes of promoting the
                Competition and announcing results.
              </li>
              <li>
                You warrant that your submission does not infringe any third-party
                intellectual property rights, and you agree to indemnify BlowUp
                Innovation Challenge against any claims arising from such
                infringement.
              </li>
            </ul>
          </Section>

          <Section title="5. Judging">
            <ul>
              <li>
                Submissions will be evaluated by a panel of judges selected by
                BlowUp Innovation Challenge. Judging criteria may include
                innovation, feasibility, impact, presentation, and market
                potential.
              </li>
              <li>
                The judges' decisions are final and binding. No correspondence
                will be entered into regarding judging outcomes.
              </li>
              <li>
                BlowUp Innovation Challenge reserves the right to withhold prizes
                if, in the judges' opinion, no submission meets the required
                standard.
              </li>
            </ul>
          </Section>

          <Section title="6. Prizes">
            <ul>
              <li>
                Prize details are as published on the official Competition website.
                BlowUp Innovation Challenge reserves the right to substitute prizes
                of equal or greater value.
              </li>
              <li>
                Prize winners are responsible for all taxes, duties, and fees
                arising from the receipt of prizes in their jurisdiction.
              </li>
              <li>
                Winners must provide valid identification and banking details within
                14 days of being notified. Failure to do so may result in
                forfeiture of the prize.
              </li>
            </ul>
          </Section>

          <Section title="7. Media &amp; Publicity">
            <p>
              By registering, you grant BlowUp Innovation Challenge permission to
              use your name, image, voice, and likeness in connection with the
              promotion and documentation of the Competition without additional
              compensation, unless you explicitly opt out in writing before your
              registration is confirmed.
            </p>
          </Section>

          <Section title="8. Disqualification">
            <p>
              BlowUp Innovation Challenge reserves the right to disqualify any
              participant or team who:
            </p>
            <ul>
              <li>
                Violates these Terms or the spirit of fair competition.
              </li>
              <li>
                Engages in conduct detrimental to the Competition, other
                participants, or sponsors.
              </li>
              <li>
                Provides false or misleading information at any stage of the
                Competition.
              </li>
            </ul>
          </Section>

          <Section title="9. Limitation of Liability">
            <p>
              To the maximum extent permitted by law, BlowUp Innovation Challenge
              shall not be liable for:
            </p>
            <ul>
              <li>Any indirect, incidental, or consequential loss arising from participation.</li>
              <li>Technical failures that prevent submission or registration.</li>
              <li>
                Loss or damage to submitted materials, including intellectual
                property.
              </li>
            </ul>
            <p>
              Our total liability to you shall not exceed the registration fee you
              paid.
            </p>
          </Section>

          <Section title="10. Governing Law">
            <p>
              These Terms are governed by the laws of the Republic of Ghana. Any
              disputes arising shall be subject to the exclusive jurisdiction of the
              courts of Ghana.
            </p>
          </Section>

          <Section title="11. Changes to These Terms">
            <p>
              We may update these Terms at any time. Material changes will be
              communicated via the email address you registered with. Continued
              participation after changes are posted constitutes acceptance of the
              updated Terms.
            </p>
          </Section>

          <Section title="12. Contact">
            <p>
              For any questions regarding these Terms, please contact us:
            </p>
            <ul>
              <li>
                Email:{" "}
                <a
                  href="mailto:blowupofficial0@gmail.com"
                  style={{ color: "var(--blue)" }}
                >
                  blowupofficial0@gmail.com
                </a>
              </li>
              <li>Phone: +233 531 494 754</li>
            </ul>
          </Section>
        </article>
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-gray-100 mt-20">
        <div className="container py-8 flex flex-col sm:flex-row justify-between gap-3 text-xs text-gray-400">
          <span>© {new Date().getFullYear()} BlowUp Innovation Challenge.</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gray-700 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-700 transition-colors font-medium" style={{ color: "var(--blue)" }}>
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2
        className="text-xl font-black mb-4"
        style={{ color: "var(--ink)", letterSpacing: "-0.02em" }}
      >
        {title}
      </h2>
      <div className="text-gray-600 leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_strong]:text-gray-900">
        {children}
      </div>
    </section>
  );
}
