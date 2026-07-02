import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — BlowUp Innovation Challenge",
  description:
    "How BlowUp Innovation Challenge collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-sm">
            Effective date: <strong>1 July 2026</strong>
          </p>
        </div>

        {/* Content */}
        <article className="prose max-w-3xl" style={{ color: "var(--ink)" }}>
          <p className="text-gray-600 leading-relaxed text-lg">
            BlowUp Innovation Challenge ("<strong>BlowUp</strong>", "
            <strong>we</strong>", "<strong>us</strong>", or "
            <strong>our</strong>") is committed to protecting the privacy of
            everyone who visits our website or registers for the competition. This
            Privacy Policy explains what information we collect, how we use it, and
            your rights in relation to it.
          </p>

          <Section title="1. Information We Collect">
            <p>We may collect the following categories of personal data:</p>
            <ul>
              <li>
                <strong>Registration data</strong> — name, email address, phone
                number, institution or organisation, and any other information you
                provide when completing our registration form or payment.
              </li>
              <li>
                <strong>Project/submission data</strong> — pitch decks,
                descriptions, videos, or any materials you submit as part of the
                competition.
              </li>
              <li>
                <strong>Payment data</strong> — transaction references processed
                through Paystack. We do not store raw card numbers or bank account
                credentials.
              </li>
              <li>
                <strong>Usage data</strong> — pages visited, browser type, device
                type, IP address, and referring URL, collected automatically via
                cookies and similar technologies.
              </li>
              <li>
                <strong>Communications</strong> — any messages you send us via
                email or the contact form on our website.
              </li>
            </ul>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use the data we collect to:</p>
            <ul>
              <li>Process and manage your competition registration and payment.</li>
              <li>
                Communicate with you about the competition schedule, results, and
                prize disbursement.
              </li>
              <li>
                Verify eligibility and ensure compliance with competition rules.
              </li>
              <li>
                Promote the competition and, where you have given consent, feature
                participants and their projects in our marketing materials.
              </li>
              <li>Improve our website and understand how visitors use it.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </Section>

          <Section title="3. Legal Basis for Processing">
            <p>
              We process your personal data on one or more of the following legal
              bases:
            </p>
            <ul>
              <li>
                <strong>Contract</strong> — processing is necessary to fulfil our
                obligations to you as a registered participant.
              </li>
              <li>
                <strong>Legitimate interests</strong> — to operate and promote the
                competition, provided your rights are not overridden.
              </li>
              <li>
                <strong>Consent</strong> — where you have explicitly agreed to
                receive marketing communications or for your image/work to be
                featured.
              </li>
              <li>
                <strong>Legal obligation</strong> — where we are required to retain
                records by law.
              </li>
            </ul>
          </Section>

          <Section title="4. Sharing Your Information">
            <p>
              We do not sell or rent your personal data. We may share it with:
            </p>
            <ul>
              <li>
                <strong>Service providers</strong> — such as Paystack (payment
                processing) and Google (form collection, analytics), who are bound
                by confidentiality obligations.
              </li>
              <li>
                <strong>Sponsors and partners</strong> — only aggregate, anonymised
                data or, with your explicit consent, your name and institution for
                prize announcements.
              </li>
              <li>
                <strong>Authorities</strong> — where required by law or to protect
                our legal rights.
              </li>
            </ul>
          </Section>

          <Section title="5. Data Retention">
            <p>
              We retain personal data for as long as necessary to fulfil the
              purposes described in this policy, or as required by law. Registration
              data is typically retained for 12 months after the conclusion of each
              competition cycle, after which it is securely deleted or anonymised.
            </p>
          </Section>

          <Section title="6. Cookies">
            <p>
              Our website uses cookies and similar tracking technologies to improve
              your browsing experience and gather analytics. You may disable cookies
              through your browser settings; however, some features of the site may
              not function correctly without them.
            </p>
          </Section>

          <Section title="7. Your Rights">
            <p>
              Depending on your jurisdiction, you may have the right to:
            </p>
            <ul>
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>
                Request erasure of your data, where no overriding legal obligation
                prevents this.
              </li>
              <li>Object to or restrict processing in certain circumstances.</li>
              <li>
                Withdraw consent at any time (without affecting the lawfulness of
                prior processing).
              </li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at{" "}
              <a
                href="mailto:blowupofficial0@gmail.com"
                style={{ color: "var(--blue)" }}
              >
                blowupofficial0@gmail.com
              </a>
              .
            </p>
          </Section>

          <Section title="8. Security">
            <p>
              We implement reasonable technical and organisational measures to
              protect your personal data against unauthorised access, loss, or
              disclosure. However, no internet transmission is entirely secure and
              we cannot guarantee absolute security.
            </p>
          </Section>

          <Section title="9. Third-Party Links">
            <p>
              Our website may link to third-party websites. We are not responsible
              for the privacy practices of those sites and encourage you to review
              their respective privacy policies.
            </p>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. The effective
              date at the top of this page will reflect the date of the most recent
              revision. Continued use of the site after changes are posted
              constitutes acceptance of the updated policy.
            </p>
          </Section>

          <Section title="11. Contact Us">
            <p>
              If you have any questions about this Privacy Policy, please reach out:
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
            <Link href="/privacy" className="hover:text-gray-700 transition-colors font-medium" style={{ color: "var(--blue)" }}>
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-700 transition-colors">
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
