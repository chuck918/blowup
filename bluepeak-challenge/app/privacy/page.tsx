import type { Metadata } from "next";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How The BlowUp collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-36 pb-24">
        <div className="container max-w-3xl">
          <p className="eyebrow mb-5">Legal</p>
          <h1 className="display text-6xl sm:text-7xl">Privacy Policy</h1>
          <p className="mt-4 text-sm text-subtle">Effective date: 24 November 2026</p>
          <article className="prose-dark mt-12">
            <p>
              The BlowUp (“<strong>BlowUp</strong>”, “<strong>we</strong>”, “<strong>us</strong>”, or
              “<strong>our</strong>”) is committed to protecting the privacy of everyone who visits our website,
              creates an account, registers for our masterclass or buys event tickets. This Privacy Policy
              explains what information we collect, how we use it, and your rights in relation to it.
            </p>

            <h2>1. Information we collect</h2>
            <ul>
              <li>
                <strong>Account data</strong> — your name, email address and/or phone number, and a password if
                you sign up with email. If you sign in with Google, we receive your name and email address from
                Google. If you sign in with your phone, we send a one-time code by SMS.
              </li>
              <li>
                <strong>Registration data</strong> — the track you choose, your full name, stage or brand name,
                phone number, city, a short description of yourself and your work, and any portfolio link you
                provide.
              </li>
              <li>
                <strong>Ticket data</strong> — the events and tickets you buy, your order history, and when each
                ticket is checked in at the door.
              </li>
              <li>
                <strong>Payment data</strong> — payment references and amounts processed through Paystack. We do
                not see or store card numbers or Mobile Money PINs.
              </li>
              <li>
                <strong>Technical data</strong> — information your browser sends when you visit (such as IP
                address and browser type), used to keep the service secure and working.
              </li>
              <li>
                <strong>Communications</strong> — any messages you send us by email, phone or WhatsApp.
              </li>
            </ul>

            <h2>2. How we use your information</h2>
            <ul>
              <li>Create and secure your account, and let you sign in.</li>
              <li>Process your masterclass registration and payment, and confirm your place.</li>
              <li>Issue event tickets, show them in your dashboard, and check them in at the door.</li>
              <li>Contact you about sessions, schedules, venues and changes to events you are part of.</li>
              <li>Plan and tailor masterclass sessions to participants’ experience and interests.</li>
              <li>
                Where you have given consent, feature participants and their work in our promotional
                materials.
              </li>
              <li>Keep the website secure, prevent fraud, and comply with legal obligations.</li>
            </ul>

            <h2>3. Legal basis for processing</h2>
            <ul>
              <li>
                <strong>Contract</strong> — processing is necessary to provide your account, masterclass place or
                tickets.
              </li>
              <li>
                <strong>Legitimate interests</strong> — to operate, secure and improve our services, provided your
                rights are not overridden.
              </li>
              <li>
                <strong>Consent</strong> — where you have agreed to receive marketing or for your image or work to
                be featured.
              </li>
              <li>
                <strong>Legal obligation</strong> — where we are required to keep records by law.
              </li>
            </ul>

            <h2>4. Sharing your information</h2>
            <p>We do not sell or rent your personal data. We share it only with:</p>
            <ul>
              <li>
                <strong>Service providers</strong> who help us run the website, bound by confidentiality
                obligations: Paystack (payments), Supabase (database, sign-in and file storage), our website
                hosting provider, Google (only if you choose to sign in with Google), and our SMS provider (only
                if you sign in with your phone number).
              </li>
              <li>
                <strong>Facilitators and partners</strong> — only the information needed to run sessions (such
                as your name and track), or aggregate, anonymised data.
              </li>
              <li>
                <strong>Authorities</strong> — where required by law or to protect our legal rights.
              </li>
            </ul>

            <h2>5. Data retention</h2>
            <p>
              We keep your account data for as long as your account is open. Registration and ticket data is
              typically retained for 12 months after the end of each masterclass season or event, after which it
              is securely deleted or anonymised, unless we must keep it longer by law (for example, payment
              records).
            </p>

            <h2>6. Cookies</h2>
            <p>
              We use essential cookies to keep you signed in and to protect your account. These are required for
              the website to work. We do not use advertising cookies. If we add analytics in future, we will
              update this policy.
            </p>

            <h2>7. Your rights</h2>
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul>
              <li>Access the personal data we hold about you.</li>
              <li>Correct inaccurate data — you can update most details from your dashboard.</li>
              <li>Request deletion of your data, where no legal obligation prevents this.</li>
              <li>Object to or restrict processing in certain circumstances.</li>
              <li>Withdraw consent at any time (without affecting the lawfulness of prior processing).</li>
            </ul>
            <p>
              To exercise any of these rights, contact us at{" "}
              <a href="mailto:info@theblowupgh.com">info@theblowupgh.com</a>.
            </p>

            <h2>8. Security</h2>
            <p>
              We use reasonable technical and organisational measures to protect your personal data, including
              encrypted connections and access controls that limit each user to their own data. However, no
              internet transmission is entirely secure and we cannot guarantee absolute security.
            </p>

            <h2>9. Third-party links</h2>
            <p>
              Our website may link to third-party websites. We are not responsible for the privacy practices of
              those sites and encourage you to review their privacy policies.
            </p>

            <h2>10. Changes to this policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The effective date at the top of this page
              will reflect the most recent revision. Continued use of the site after changes are posted
              constitutes acceptance of the updated policy.
            </p>

            <h2>11. Contact us</h2>
            <p>If you have any questions about this Privacy Policy, please reach out:</p>
            <ul>
              <li>
                Email: <a href="mailto:info@theblowupgh.com">info@theblowupgh.com</a>
              </li>
              <li>Phone: +233 59 267 4427</li>
            </ul>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
