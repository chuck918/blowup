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
    <section id="contact" className="py-24 bg-black relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/3 -left-32 bg-glow-yellow opacity-25 pointer-events-none" />
      
      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div {...fadeUp(0)}>
            <p className="eyebrow mb-4">Contact</p>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight uppercase">
              Get in<br />
              <span className="text-brand-yellow text-glow-yellow">touch.</span>
            </h2>
            <p className="text-gray-300 text-lg mt-5 leading-relaxed max-w-sm">
              Have a question? We are happy to help before you register.
            </p>

            <div className="mt-10 space-y-5">
              {[
                { label: "WhatsApp", value: "+233 59 267 4427", href: "https://wa.me/233592674427" },
                { label: "Phone", value: "+233 59 267 4427", href: "tel:+233592674427" },
                { label: "Email", value: "info@theblowupgh.com", href: "mailto:info@theblowupgh.com" },
                
              ].map((c) => (
                <div key={c.label} className="border-b border-white/10 pb-5">
                  <p className="text-brand-orange text-xs font-black uppercase tracking-widest mb-1">{c.label}</p>
                  <a href={c.href} target="_blank" rel="noopener" className="link text-white font-semibold text-base hover:text-brand-yellow transition-colors duration-200">
                    {c.value}
                  </a>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div {...fadeUp(0.1)} className="flex flex-col gap-6">
            {/* CTA card */}
            <div className="bg-gradient-to-br from-[#151515] to-[#0A0A0A] border border-brand-yellow/15 rounded-2xl p-10 text-white shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden group">
              {/* Top border indicator */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-yellow via-brand-gold to-brand-orange" />
              
              <p className="text-brand-yellow text-sm font-bold uppercase tracking-wider mb-4 text-glow-yellow">Ready to compete?</p>
              <h3 className="text-2xl font-black mb-6 uppercase tracking-tight">Blowing up the next hits!</h3>
              
              <a
                href={PAYSTACK_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-yellow via-brand-gold to-brand-orange !text-black font-extrabold text-sm px-6 py-3 rounded-full hover:brightness-110 shadow-[0_0_15px_rgba(255,230,0,0.25)] hover:shadow-[0_0_25px_rgba(255,230,0,0.45)] hover:-translate-y-0.5 transition-all duration-200"
              >
                Pay &amp; Register →
              </a>
            </div>

            {/* Social */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-7 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
              <p className="text-brand-orange text-xs font-black uppercase tracking-widest mb-4">Follow us</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "TikTok", href: "https://www.tiktok.com/@skaddy_hackson?is_from_webapp=1&sender_device=pc" }
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link text-sm font-bold text-gray-300 hover:text-brand-yellow bg-white/5 border border-white/5 px-4 py-2 rounded-full transition-all hover:border-brand-yellow/20"
                  >
                    {s.name}
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
