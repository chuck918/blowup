const WORDS = ["Film", "Music", "Sound", "Beats", "Masterclass", "Live events", "Ghana", "Blow up"];

/** Infinite scrolling ticker of brand words. */
export default function Marquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <div className="relative overflow-hidden border-y border-line bg-brand-yellow text-black py-4" aria-hidden>
      <div className="flex w-max animate-marquee">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((w, i) => (
              <span key={`${k}-${i}`} className="display flex items-center text-3xl sm:text-4xl px-6">
                {w}
                <svg className="ml-12 size-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
