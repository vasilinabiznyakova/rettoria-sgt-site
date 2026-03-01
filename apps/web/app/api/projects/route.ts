import {NextResponse} from "next/server";
import {sanityClient} from "@/lib/sanity/client";

const allowedLangs = new Set(["uk", "it", "en"] as const);
type Lang = "uk" | "it" | "en";

export async function GET(req: Request) {
  const {searchParams} = new URL(req.url);

  // lang
  const langParam = (searchParams.get("lang") ?? "it") as Lang;
  const lang: Lang = allowedLangs.has(langParam) ? langParam : "it";

  // pagination
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") ?? 6)));
  const start = (page - 1) * limit;
  const end = start + limit;

const query = `
{
  "items": *[_type == "project"]
    | order(_createdAt desc)
    [$start...$end] {
      _id,
      "slug": slug.current,
      "createdAt": _createdAt,
      "title": coalesce(title[$lang], title.it, title.en, title.uk),
      "description": pt::text(
        coalesce(description[$lang], description.it, description.en, description.uk)
      ),
      "imageUrl": image.asset->url,
      "imageAlt": coalesce(image.alt[$lang], image.alt.it, image.alt.en, image.alt.uk)
    },
  "total": count(*[_type == "project"])
}`;

  const data = await sanityClient.fetch(query, {start, end, lang});

  return NextResponse.json({
    page,
    limit,
    total: data.total,
    items: data.items,
  });
}