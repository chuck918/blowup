import type { Metadata } from "next";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms that apply to BlowUp accounts, masterclass registration and event tickets.",
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-36 pb-24">
        <div className="container max-w-3xl">
          <p className="eyebrow mb-5">Legal</p>
          <h1 className="display text-6xl sm:text-7xl">Terms &amp; Conditions</h1>
          <p className="mt-4 text-sm text-subtle">Effective date: 24 November 2026</p>
          <article className="prose-dark mt-12">
            <p>
              Please read these Terms &amp; Conditions (“<strong>Terms</strong>”) carefully. They apply when you
              create an account on this website, register for The BlowUp masterclass (the
              “<strong>Masterclass</strong>”), or buy tickets to a BlowUp event. “<strong>BlowUp</strong>”,
              “<strong>we</strong>” and “<strong>us</strong>” refer to the organisers of The BlowUp. By creating
              an account, registering or buying a ticket, you agree to these Terms. If you do not agree, please
              do not use these services.
            </p>

            <h2>1. Eligibility</h2>
            <ul>
              <li>The Masterclass is open to individuals in Ghana and beyond.</li>
              <li>
                Participants must be at least 15 years of age at the time of registration. Participants under 18
                must have written parental or guardian consent.
              </li>
            </ul>

            <h2>2. Your account</h2>
            <ul>
              <li>
                You can sign in with an email and password, a Google account, or a phone number. You are
                responsible for keeping your sign-in details secure and for activity on your account.
              </li>
              <li>You must provide accurate information and keep it up to date.</li>
              <li>Tell us promptly if you believe someone else has accessed your account.</li>
            </ul>

            <h2>3. Masterclass registration</h2>
            <ul>
              <li>
                Registration is completed by choosing a track, submitting the registration form and paying the
                applicable fee online via Paystack. Your place is confirmed once your payment is confirmed.
              </li>
              <li>Each person may register for one track per season.</li>
              <li>
                Registration fees are <strong>non-refundable</strong> except where the Masterclass is cancelled by
                BlowUp.
              </li>
              <li>
                You may update your registration details from your dashboard until the registration deadline.
              </li>
              <li>
                Places may be limited. Session dates, times and venues will be communicated to enrolled
                participants.
              </li>
            </ul>

            <h2>4. Event tickets</h2>
            <ul>
              <li>
                Tickets are sold for specific BlowUp events and are only valid for the event, date and ticket
                type shown on them.
              </li>
              <li>
                When you start checkout, tickets are held for you for 30 minutes. If payment is not completed in
                that time, the tickets are released.
              </li>
              <li>
                Each ticket has a unique QR code that can be scanned <strong>once</strong>. Keep it private —
                anyone presenting your code first may be admitted in your place.
              </li>
              <li>
                Ticket purchases are non-refundable except where the event is cancelled, or where we are unable
                to honour a ticket you have paid for, in which case we will refund the ticket price.
              </li>
              <li>
                Event details may change. We will notify ticket holders of material changes using the contact
                details on their account.
              </li>
            </ul>

            <h2>5. Conduct</h2>
            <ul>
              <li>
                Treat facilitators, staff and other participants with respect. Harassment, discrimination or
                disruptive behaviour will not be tolerated at sessions or events.
              </li>
              <li>
                Do not share content during or after sessions that is hateful, defamatory, obscene, or that
                infringes the rights of others.
              </li>
              <li>Follow the reasonable instructions of BlowUp staff and venue staff.</li>
            </ul>

            <h2>6. Intellectual property</h2>
            <ul>
              <li>
                You keep full ownership of any work you create or share with us, including links in your
                registration.
              </li>
              <li>
                Masterclass materials provided by BlowUp and its facilitators are for your personal learning and
                may not be recorded, redistributed or sold without permission.
              </li>
              <li>
                If you choose to share your work with us for promotion, you grant BlowUp a non-exclusive,
                royalty-free licence to display and share it for the purpose of promoting the Masterclass and
                BlowUp events.
              </li>
            </ul>

            <h2>7. Media &amp; publicity</h2>
            <p>
              Sessions and events may be photographed or filmed. By attending, you grant BlowUp permission to use
              your name, image, voice and likeness in connection with the promotion and documentation of the
              Masterclass and BlowUp events without additional compensation, unless you opt out in writing before
              the session or event.
            </p>

            <h2>8. Changes and cancellations</h2>
            <p>
              BlowUp may change the Masterclass format, facilitators, schedule or venue, or an event’s details,
              with reasonable notice. If we cancel the Masterclass or an event, you will receive a refund of the
              fee or ticket price you paid.
            </p>

            <h2>9. Removal</h2>
            <p>BlowUp may cancel a registration, cancel tickets or close an account where a person:</p>
            <ul>
              <li>Breaches these Terms.</li>
              <li>Engages in conduct that is harmful to other participants, staff, partners or BlowUp.</li>
              <li>Provides false or misleading information.</li>
            </ul>
            <p>Fees and ticket prices are not refunded where removal is due to a breach of these Terms.</p>

            <h2>10. Limitation of liability</h2>
            <p>To the maximum extent permitted by law, BlowUp shall not be liable for:</p>
            <ul>
              <li>Any indirect, incidental, or consequential loss arising from participation or attendance.</li>
              <li>Technical failures that temporarily prevent registration, payment or access to the website.</li>
              <li>Loss of or damage to personal belongings at sessions or events.</li>
            </ul>
            <p>Our total liability to you shall not exceed the fee or ticket price you paid.</p>

            <h2>11. Governing law</h2>
            <p>
              These Terms are governed by the laws of the Republic of Ghana. Any disputes arising shall be
              subject to the exclusive jurisdiction of the courts of Ghana.
            </p>

            <h2>12. Changes to these Terms</h2>
            <p>
              We may update these Terms at any time. Material changes will be communicated using the contact
              details on your account. Continued use of the website or participation after changes are posted
              constitutes acceptance of the updated Terms.
            </p>

            <h2>13. Contact</h2>
            <p>For any questions regarding these Terms, please contact us:</p>
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
