"use client";
import { motion } from "framer-motion";
import { PAYSTACK_URL } from "@/lib/links";

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.45, delay },
  };
}

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div {...fadeUp(0)}>
            <p className="eyebrow mb-4">Contact</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight">
              Get in touch.
            </h2>
            <p className="text-gray-500 text-lg mt-5 leading-relaxed max-w-sm">
              Have a question? We are happy to help before you register.
            </p>

            <div className="mt-10 space-y-5">
              {[
                { label: "WhatsApp", value: "+233 24 000 0000", href: "https://wa.me/233240000000" },
                { label: "Phone", value: "+233 50 111 2222", href: "tel:+233501112222" },
                { label: "Email", value: "support@blowupchallenge.com", href: "mailto:support@blowupchallenge.com" },
              ].map((c) => (
                <div key={c.label} className="border-b border-gray-100 pb-5">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{c.label}</p>
                  <a href={c.href} target="_blank" rel="noopener" className="text-gray-900 font-medium text-sm hover:text-[#1d4ed8] transition-colors">
                    {c.value}
                  </a>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div {...fadeUp(0.1)} className="flex flex-col gap-6">
            {/* CTA card */}
            <div className="bg-[#1e3a8a] rounded-2xl p-10 text-white">
              <p className="text-blue-300 text-sm mb-2">Ready to compete?</p>
              <a
                href={PAYSTACK_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 bg-amber-400 text-gray-900 font-bold text-sm px-6 py-3 rounded-full hover:bg-amber-300 transition-colors"
              >
                Pay &amp; Register →
              </a>
            </div>

            {/* Social */}
            <div className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Follow us</p>
              <div className="flex flex-wrap gap-2">
                {["Twitter / X", "Facebook", "Instagram", "YouTube"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 bg-white border border-gray-200 px-4 py-2 rounded-full transition-colors"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
