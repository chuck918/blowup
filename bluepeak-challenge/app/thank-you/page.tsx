import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You — BlowUp Innovation Challenge",
  description: "Payment confirmed. Complete your registration now.",
};

export default function ThankYou() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 to-slate-900 flex items-center justify-center px-6 py-24">
      <div className="max-w-lg w-full text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-4xl font-black text-white mb-4">Payment Confirmed!</h1>
        <p className="text-blue-200 text-lg mb-8 leading-relaxed">
          Thank you for registering for the BlowUp Innovation Challenge. Your payment has been received successfully.
        </p>

        <div className="bg-white/10 border border-white/20 rounded-2xl p-6 mb-8 text-left backdrop-blur">
          <h2 className="font-bold text-white mb-4 text-center">Next Steps</h2>
          {[
            "Save your payment reference number",
            "Click the button below to open the Google Form",
            "Complete all fields accurately",
            "Submit and await confirmation",
          ].map((step, i) => (
            <div key={step} className="flex items-center gap-3 text-sm text-blue-100 mb-3">
              <span className="w-6 h-6 bg-[#FBBF24] text-[#1F2937] font-black rounded-full flex items-center justify-center flex-shrink-0 text-xs">
                {i + 1}
              </span>
              {step}
            </div>
          ))}
        </div>

        <a
          href="https://forms.gle/your-google-form-link"
          target="_blank"
          rel="noopener"
          className="inline-block w-full bg-[#FBBF24] text-[#1F2937] font-black py-4 rounded-2xl text-lg shadow-xl hover:bg-amber-300 transition-colors mb-4"
        >
          Complete Registration Form →
        </a>

        <Link href="/" className="inline-block text-blue-300 text-sm hover:text-white transition-colors">
          ← Back to Homepage
        </Link>
      </div>
    </main>
  );
}
