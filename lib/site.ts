// Single source of truth for brand, SEO and structured-data values.
// Edit copy here; metadata, JSON-LD, sitemap, manifest and OG images all read from it.

const fallbackUrl = "https://heyula.co";

function resolveSiteUrl() {
  // Set NEXT_PUBLIC_SITE_URL in Vercel (Production) once the domain is connected.
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  // Vercel preview deployments: use the deployment URL so OG images resolve.
  if (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return fallbackUrl;
}

export const site = {
  name: "HEYULA",
  url: resolveSiteUrl(),
  tagline: "Strange comics. Carefully made.",
  title: "Heyula Comics",
  description:
    "HEYULA is an independent comics publisher from İzmir, Turkey. Heyula presents translated comics in Turkish across science fiction, fantasy, horror and myth.",
  genres: ["Science fiction", "Fantasy", "Horror", "Myth"],
  email: "contact@heyula.co",
  locale: "en_US",
  language: "en",
  location: {
    display: "Smyrne, Aegean",
    city: "İzmir",
    region: "Aegean",
    country: "TR",
  },
  timeZone: "Europe/Istanbul",
  keywords: [
    "HEYULA",
    "Heyula comics",
    "strange comics",
    "independent comics publisher",
    "comics publisher",
    "Turkish comics publisher",
    "translated comics",
    "comics in Turkish",
    "science fiction comics",
    "fantasy comics",
    "horror comics",
    "mythology comics",
    "İzmir comics",
    "Turkish comics",
    "graphic novels",
    // Turkish search terms
    "çizgi roman",
    "Türkçe çizgi roman",
    "çizgi roman yayınevi",
    "bilim kurgu çizgi roman",
    "fantastik çizgi roman",
    "korku çizgi roman",
  ],
  // Add profile URLs (Instagram, X, Bluesky, Behance…) — used for JSON-LD `sameAs`.
  socials: [] as string[],
  colors: {
    background: "#161616",
    accent: "#eff561",
  },
} as const;
