/** Central place to read configuration. Server-only values never reach the browser. */

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** True once the Supabase project keys are set. Pages degrade gracefully until then. */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

/** Masterclass registration fee in pesewas (GHS × 100), or null if not set. */
export function programmeFeePesewas(): number | null {
  const ghs = Number(process.env.PROGRAMME_FEE_GHS);
  return Number.isFinite(ghs) && ghs >= 0 && process.env.PROGRAMME_FEE_GHS !== undefined && process.env.PROGRAMME_FEE_GHS !== ""
    ? Math.round(ghs * 100)
    : null;
}

/** Season label registrations are filed under, e.g. "2027". */
export const PROGRAMME_SEASON = process.env.PROGRAMME_SEASON || "2027";
