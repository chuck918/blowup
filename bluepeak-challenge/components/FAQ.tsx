"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  { q: "Who can apply?", a: "Anyone passionate about innovation, creativity, or impact-based projects. Open to individuals and teams." },
  { q: "Is the registration fee refundable?", a: "Registration fees are non-refundable once payment has been confirmed." },
  { q: "Can I edit my registration after submitting?", a: "Yes. You can update your details before submission closes by revisiting the Google Form link." },
  { q: "When does voting begin?", a: "Voting details will be communicated to shortlisted participants after the audition stage." },
  { q: "How are winners selected?", a: "A panel of judges evaluates entries on creativity, impact, presentation, and originality." },
  { q: "Can teams apply?", a: "Yes — both individuals and teams are welcome. One member should be designated as the primary applicant." },
];

function FAQItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: i * 0.06 }}
      className="border-b border-white/10 last:border-0"
    >
      <button
        className="w-full flex justify-between items-center py-5 text-left gap-4 group"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-white text-sm group-hover:text-brand-yellow transition-colors">{q}</span>
        <span
          className={
            open
              ? "text-brand-yellow transition-transform duration-200 shrink-0 rotate-45"
              : "text-brand-orange group-hover:text-brand-yellow transition-transform duration-200 shrink-0"
          }
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <p className="text-gray-400 text-sm leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-black relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute bottom-0 -right-20 bg-glow-orange opacity-25 pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid md:grid-cols-3 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="eyebrow mb-4">FAQ</p>
            <h2 className="text-4xl font-black text-white leading-tight tracking-tight uppercase">
              Common<br />
              <span className="text-brand-yellow text-glow-yellow">questions.</span>
            </h2>
            <p className="text-gray-400 text-sm mt-4 leading-relaxed">
              Cannot find an answer? Reach out directly.
            </p>
            <a href="#contact" className="inline-flex mt-4 text-brand-yellow font-extrabold text-sm hover:text-brand-orange transition-colors">
              Contact us →
            </a>
          </motion.div>

          <div className="md:col-span-2">
            {faqs.map((f, i) => (
              <FAQItem key={f.q} q={f.q} a={f.a} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
