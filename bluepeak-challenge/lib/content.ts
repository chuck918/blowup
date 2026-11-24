/**
 * Single source of truth for dates and copy that appear in more than one
 * place (UI, JSON-LD structured data, llms.txt).
 */

/** Masterclass registration deadline (end of day, Ghana time — GMT, no DST). */
export const DEADLINE_ISO = "2027-07-23";
export const DEADLINE = new Date(`${DEADLINE_ISO}T23:59:59Z`);

const fmt = (opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", ...opts }).format(DEADLINE);

/** "23 Jul 2027" */
export const DEADLINE_SHORT = fmt({ day: "numeric", month: "short", year: "numeric" });
/** "23 July 2027" */
export const DEADLINE_LONG = fmt({ day: "numeric", month: "long", year: "numeric" });

export const registrationOpen = () => Date.now() <= DEADLINE.getTime();

export const SITE_DESCRIPTION =
  "The BlowUp is a hands-on masterclass for filmmakers, musicians and sound engineers in Ghana — learn from industry professionals, sharpen your craft, and connect with the people who make hits.";

export const CATEGORIES = [
  {
    id: "film-director",
    num: "01",
    title: "Film Director",
    desc: "Learn to shape stories through visual direction, shot design and cinematic storytelling.",
  },
  {
    id: "musician",
    num: "02",
    title: "Musician",
    desc: "Develop your performance, songwriting and original musical expression.",
  },
  {
    id: "sound-engineer",
    num: "03",
    title: "Sound Engineer / Beat Programmer",
    desc: "Build immersive soundscapes, clean mixes and beat-driven production.",
  },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];
export const categoryTitle = (id: string) => CATEGORIES.find((c) => c.id === id)?.title ?? id;

export const STEPS = [
  { num: "01", title: "Create your account", desc: "Sign up with email, Google, or your phone number in under a minute." },
  { num: "02", title: "Pick a track & pay", desc: "Choose your track, tell us a little about yourself, and pay with Mobile Money or card. Your seat is confirmed instantly." },
  { num: "03", title: "Show up & level up", desc: "Session details land in your dashboard. Come ready to learn, create and connect." },
];

export const BENEFITS = [
  { title: "Learn from pros", desc: "Sessions led by working directors, artists and engineers from the industry." },
  { title: "Hands-on practice", desc: "Less theory, more doing — work on real techniques you can use right away." },
  { title: "Networking", desc: "Connect with mentors, collaborators and ambitious creatives in your field." },
  { title: "Exposure", desc: "Get seen across BlowUp’s platforms and events." },
];

export const FAQS = [
  { q: "Who is the masterclass for?", a: "Filmmakers, musicians, sound engineers and beat programmers who want to level up — whether you’re starting out or already creating." },
  { q: "How do I register?", a: "Create a free account, choose your track, and pay the fee online with Mobile Money or card. Your place is confirmed as soon as payment goes through." },
  { q: "Can I join more than one track?", a: "Each person registers for one track per season, so you can focus and get the most out of it." },
  { q: "Is the registration fee refundable?", a: "Registration fees are non-refundable once payment has been confirmed, except where the masterclass is cancelled (see our Terms & Conditions)." },
  { q: "Can I change my details after registering?", a: "Yes. You can update your details from your dashboard until the registration deadline." },
  { q: "Where do I find my event tickets?", a: "Every ticket you buy appears in your dashboard with a QR code. Show it at the door — no printing needed." },
];

export const CONTACT = {
  phoneDisplay: "+233 59 267 4427",
  phone: "+233592674427",
  whatsapp: "https://wa.me/233592674427",
  email: "info@theblowupgh.com",
  tiktok: "https://www.tiktok.com/@skaddy_hackson",
};
