import { site } from "@/lib/site";

// /llms.txt — a plain-language summary for AI assistants and answer engines (llmstxt.org).
export function GET() {
  const body = `# ${site.name}

> ${site.description}

${site.name} — "${site.tagline}"

## About
- What: an independent comics publisher that presents translated comics in Turkish.
- Genres: ${site.genres.join(", ").toLowerCase()}.
- Where: ${site.location.city}, Turkey.
- Status: the full website is under construction.

## Contact
- Email: ${site.email}
- Website: ${site.url}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
