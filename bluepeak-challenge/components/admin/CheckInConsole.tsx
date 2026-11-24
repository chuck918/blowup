"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, useTransition } from "react";
import { checkInTicket, type CheckInResult } from "@/app/admin/actions";

// Minimal typing for the browser BarcodeDetector API (Chrome / Android).
type Detector = { detect: (src: CanvasImageSource) => Promise<{ rawValue: string }[]> };
declare global {
  interface Window {
    BarcodeDetector?: new (opts: { formats: string[] }) => Detector;
  }
}

const TONE: Record<CheckInResult["status"], { cls: string; title: string }> = {
  ok: { cls: "border-success bg-success/10 text-success", title: "Admitted ✓" },
  already_checked_in: { cls: "border-brand-orange bg-brand-orange/10 text-brand-orange", title: "Already used" },
  not_found: { cls: "border-danger bg-danger/10 text-danger", title: "Invalid ticket" },
  error: { cls: "border-danger bg-danger/10 text-danger", title: "Something went wrong" },
};

export default function CheckInConsole() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<CheckInResult | null>(null);
  const [log, setLog] = useState<CheckInResult[]>([]);
  const [pending, start] = useTransition();
  const [scanning, setScanning] = useState(false);
  // false during SSR, real value in the browser — no hydration mismatch.
  const scanSupported = useSyncExternalStore(
    () => () => {},
    () => "BarcodeDetector" in window,
    () => false
  );
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastScan = useRef<{ code: string; at: number }>({ code: "", at: 0 });

  const submit = useCallback((raw: string) => {
    const c = raw.trim();
    if (!c) return;
    start(async () => {
      const r = await checkInTicket(c);
      setResult(r);
      setLog((l) => [r, ...l].slice(0, 15));
      setCode("");
      if (navigator.vibrate) navigator.vibrate(r.status === "ok" ? 80 : [60, 60, 60]);
    });
  }, []);

  useEffect(() => {
    if (!scanning || !window.BarcodeDetector) return;
    let stream: MediaStream | null = null;
    let raf = 0;
    let stopped = false;
    const detector = new window.BarcodeDetector({ formats: ["qr_code"] });

    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        if (stopped || !videoRef.current) return;
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        const loop = async () => {
          if (stopped || !videoRef.current) return;
          try {
            const codes = await detector.detect(videoRef.current);
            const value = codes[0]?.rawValue;
            const now = Date.now();
            // Ignore the same code for 3s so one ticket isn't submitted repeatedly.
            if (value && (value !== lastScan.current.code || now - lastScan.current.at > 3000)) {
              lastScan.current = { code: value, at: now };
              submit(value);
            }
          } catch {}
          raf = requestAnimationFrame(loop);
        };
        loop();
      } catch {
        setScanning(false);
        alert("Camera access was blocked. Allow it in your browser settings, or type codes instead.");
      }
    })();

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [scanning, submit]);

  const tone = result ? TONE[result.status] : null;

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_22rem]">
      <div className="grid content-start gap-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(code);
          }}
          className="flex gap-2"
        >
          <label htmlFor="code" className="sr-only">Ticket code</label>
          <input
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="input h-14 flex-1 font-mono text-xl tracking-[0.25em]"
            placeholder="TICKET CODE"
            autoComplete="off"
            autoCapitalize="characters"
            autoFocus
          />
          <button className="btn btn-primary h-14 px-8" disabled={pending || !code}>Check in</button>
        </form>

        {scanSupported && (
          <div className="card overflow-hidden">
            {scanning ? (
              <div className="relative">
                <video ref={videoRef} className="aspect-video w-full bg-black object-cover" muted playsInline />
                <div className="pointer-events-none absolute inset-0 grid place-items-center">
                  <div className="size-48 rounded-3xl border-4 border-brand-yellow/80" />
                </div>
                <button onClick={() => setScanning(false)} className="btn btn-outline btn-sm absolute right-3 top-3 bg-ink/80">Stop camera</button>
              </div>
            ) : (
              <button onClick={() => setScanning(true)} className="flex w-full items-center justify-center gap-3 p-8 font-bold hover:text-brand-yellow">
                <svg className="size-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                  <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M7 12h10" />
                </svg>
                Scan with camera
              </button>
            )}
          </div>
        )}

        {result && tone && (
          <div className={`rounded-3xl border-2 p-8 ${tone.cls}`} role="status" aria-live="assertive">
            <p className="display text-5xl">{tone.title}</p>
            {result.event && (
              <div className="mt-4 text-white">
                <p className="text-xl font-bold">{result.holder}</p>
                <p className="text-muted">{result.ticket_type} · {result.event}</p>
                <p className="mt-2 font-mono text-sm text-subtle">{result.code}</p>
                {result.status === "already_checked_in" && result.checked_in_at && (
                  <p className="mt-2 text-sm text-brand-orange">First used {new Date(result.checked_in_at).toLocaleString("en-GB", { timeZone: "Africa/Accra" })}</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <aside className="card p-5 h-fit" aria-label="Recent scans">
        <h2 className="mb-4 text-xs font-extrabold uppercase tracking-[0.18em] text-subtle">Recent</h2>
        {log.length === 0 ? (
          <p className="text-sm text-muted">Nothing scanned yet.</p>
        ) : (
          <ul className="grid gap-2 text-sm">
            {log.map((r, i) => (
              <li key={i} className="flex items-center justify-between gap-3">
                <span className="truncate">{r.holder ?? r.code ?? "Unknown"}</span>
                <span className={`badge ${r.status === "ok" ? "badge-green" : r.status === "already_checked_in" ? "badge-orange" : "badge-red"}`}>
                  {r.status === "ok" ? "In" : r.status === "already_checked_in" ? "Used" : "Bad"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  );
}
