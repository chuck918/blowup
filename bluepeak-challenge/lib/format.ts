const TZ = "Africa/Accra";

export function formatMoney(pesewas: number): string {
  if (pesewas === 0) return "Free";
  return `GHS ${(pesewas / 100).toLocaleString("en-GH", {
    minimumFractionDigits: pesewas % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = {}): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    ...opts,
  }).format(new Date(iso));
}

export function formatTime(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(iso));
}

export function formatDateParts(iso: string) {
  const d = new Date(iso);
  const part = (o: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-GB", { timeZone: TZ, ...o }).format(d);
  return {
    day: part({ day: "2-digit" }),
    month: part({ month: "short" }).toUpperCase(),
    weekday: part({ weekday: "short" }),
  };
}

/** <input type="datetime-local"> value (Accra time = UTC, no DST) → ISO string. */
export function localInputToIso(value: string): string | null {
  if (!value) return null;
  const d = new Date(`${value}:00Z`);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

/** ISO string → <input type="datetime-local"> value in Accra time. */
export function isoToLocalInput(iso: string | null): string {
  return iso ? new Date(iso).toISOString().slice(0, 16) : "";
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
