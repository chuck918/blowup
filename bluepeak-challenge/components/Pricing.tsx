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
  // "Contestant profile submission",
  // "Eligibility to compete in your selected category",
  // "Certificate of participation",
];

const paymentMethods = ["MTN Mobile Money", "Telecel Cash", "Visa", "Mastercard", "Airtel Tigo Money"];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-black relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/2 -right-40 bg-glow-orange opacity-35 pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 bg-glow-yellow opacity-30 pointer-events-none" />

      <div className="container relative z-10">
        <motion.div {...fadeUp(0)} className="mb-14">
          <p className="eyebrow mb-4">Registration</p>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight uppercase">
            One fee.<br/>
            <span className="text-brand-yellow text-glow-yellow">Everything included.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Main pricing block */}
          <motion.div
            {...fadeUp(0.1)}
            className="lg:col-span-3 bg-gradient-to-br from-[#151515] to-[#0A0A0A] border border-brand-yellow/20 rounded-3xl p-10 relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.6)] group"
          >
            {/* Hover top border glow */}
            <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-brand-yellow via-brand-gold to-brand-orange" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
              <div>
                <span className="text-brand-yellow text-xs font-black uppercase tracking-widest text-glow-yellow">Registration Fee</span>
                {/* <div className="text-4xl sm:text-5xl font-black text-white mt-2 tracking-tight">
                  GHS 100
                </div> */}
              </div>
              <a
                href={PAYSTACK_URL}
                target="_blank"
                rel="noopener"
                className="bg-gradient-to-r from-brand-yellow via-brand-gold to-brand-orange text-black font-extrabold text-sm px-7 py-3.5 rounded-full hover:brightness-110 shadow-[0_0_15px_rgba(255,230,0,0.25)] hover:shadow-[0_0_25px_rgba(255,230,0,0.45)] hover:-translate-y-0.5 transition-all duration-200 shrink-0 text-center"
              >
                Register now
              </a>
            </div>

            <div className="border-t border-white/10 pt-8">
              <p className="text-white/80 text-xs font-black uppercase tracking-widest mb-5">What is included</p>
              <ul className="grid sm:grid-cols-2 gap-4">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-300">
                    <svg className="w-5 h-5 text-brand-yellow shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
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
            <div className="bg-white/5 border border-white/10 rounded-2xl p-7 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex-1">
              <p className="text-brand-orange text-xs font-black uppercase tracking-widest mb-5">Payment methods</p>
              <div className="grid grid-cols-2 gap-2">
                {paymentMethods.map((method) => (
                  <div key={method} className="bg-white/5 rounded-xl px-4 py-3 text-xs font-bold text-white border border-white/5 hover:border-white/10 transition-colors">
                    {method}
                  </div>
                ))}
              </div>
            </div>

            {/* After payment */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-7 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              <p className="text-brand-orange text-xs font-black uppercase tracking-widest mb-4">After payment</p>
              <div className="space-y-3">
                {["Payment confirmation & validation", "Receive official challenge brief"].map(
                  (step, i) => (
                    <div key={step} className="flex items-center gap-3 text-sm text-gray-300">
                      <span className="w-6 h-6 rounded-full bg-brand-yellow text-black flex items-center justify-center text-xs font-black shrink-0 shadow-[0_0_8px_rgba(255,230,0,0.3)]">
                        {i + 1}
                      </span>
                      {step}
                    </div>
                  )
                )}
              </div>
            </div>

            <p className="text-xs text-white/40 text-center font-semibold">Deadline: <strong className="text-brand-yellow">23rd August 2026</strong></p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
