"use client";
import { motion } from "framer-motion";
import { PAYSTACK_URL } from "@/lib/links";

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.5, delay, ease: "easeOut" as const },
  };
}

const included = [
  "Official entry into the competition",
  "Contestant profile submission",
  "Eligibility to compete in your selected category",
  "Certificate of participation",
];

const paymentMethods = ["MTN Mobile Money", "Telecel Cash", "Visa", "Mastercard"];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container">
        <motion.div {...fadeUp(0)} className="mb-14">
          <p className="eyebrow mb-4">Registration</p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight">
            One fee.<br />Everything included.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Main pricing block */}
          <motion.div
            {...fadeUp(0.1)}
            className="lg:col-span-3 bg-[#1e3a8a] rounded-2xl p-10 text-white"
          >
            <div className="flex items-start justify-between mb-8">
              <div>
                <span className="text-blue-300 text-xs font-semibold uppercase tracking-widest">Registration fee</span>
                <p className="text-blue-200 text-sm mt-2">One-time · non-refundable</p>
              </div>
              <a
                href={PAYSTACK_URL}
                target="_blank"
                rel="noopener"
                className="bg-amber-400 text-gray-900 font-bold text-sm px-5 py-2.5 rounded-full hover:bg-amber-300 transition-colors shrink-0"
              >
                Register now
              </a>
            </div>

            <div className="border-t border-white/10 pt-8">
              <p className="text-blue-300 text-xs font-semibold uppercase tracking-widest mb-5">What is included</p>
              <ul className="space-y-3">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-blue-100">
                    <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Side info */}
          <motion.div {...fadeUp(0.15)} className="lg:col-span-2 flex flex-col gap-4">
            {/* Payment methods */}
            <div className="bg-gray-50 rounded-2xl p-7 border border-gray-100 flex-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5">Payment methods</p>
              <div className="grid grid-cols-2 gap-2">
                {paymentMethods.map((method) => (
                  <div key={method} className="bg-white rounded-xl px-4 py-3 text-sm font-medium text-gray-700 border border-gray-100">
                    {method}
                  </div>
                ))}
              </div>
            </div>

            {/* After payment */}
            <div className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">After payment</p>
              <div className="space-y-3">
                {["Payment confirmed", "Access Thank You page", "Complete Google Form", "Registration submitted"].map(
                  (step, i) => (
                    <div key={step} className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="w-5 h-5 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-[10px] font-bold shrink-0">
                        {i + 1}
                      </span>
                      {step}
                    </div>
                  )
                )}
              </div>
            </div>

            <p className="text-xs text-gray-400 text-center">Deadline: <strong className="text-gray-600">15 October 2026</strong></p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
