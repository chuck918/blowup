"use client";
import { motion } from "framer-motion";

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.5, delay, ease: "easeOut" as const },
  };
}

const benefits = [
  { label: "Cash prizes", desc: "Win meaningful financial rewards for your hard work and creativity." },
  { label: "Recognition", desc: "Media highlights and professional exposure across platforms." },
  { label: "Networking", desc: "Connect with judges, mentors, sponsors, and ambitious peers." },
  { label: "Career exposure", desc: "Open doors with industry leaders and recruiters." },
  { label: "Media publicity", desc: "Get featured on digital channels and news platforms." },
  { label: "Certificate", desc: "All participants receive an official certificate of participation." },
];

export default function WhyJoin() {
  return (
    <section id="why-join" className="py-24 bg-gray-50">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div {...fadeUp(0)}>
            <p className="eyebrow mb-4">Why join</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight">
              What you stand<br />to gain.
            </h2>
            <p className="text-gray-500 mt-6 text-lg leading-relaxed">
              BlowUp is not just a competition - it is a launchpad for your future.
            </p>
            <a
              href="https://paystack.com/pay/blowup-competition"
              target="_blank"
              rel="noopener"
              className="inline-flex mt-8 bg-[#1d4ed8] text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
            >
              Register now →
            </a>
          </motion.div>

          <div className="grid grid-cols-1 gap-0 border border-gray-200 rounded-2xl overflow-hidden">
            {benefits.map((b, i) => (
              <motion.div
                key={b.label}
                {...fadeUp(0.05 * i)}
                className="flex items-start gap-4 px-6 py-5 bg-white hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
              >
                <div className="w-1 h-1 rounded-full bg-[#1d4ed8] mt-2.5 shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{b.label}</h3>
                  <p className="text-gray-500 text-sm mt-0.5 leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
