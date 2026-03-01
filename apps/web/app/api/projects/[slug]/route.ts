import {NextResponse} from "next/server";
import {sanityClient} from "@/lib/sanity/client";

const allowedLangs = new Set(["uk", "it", "en"] as const);
type Lang = "uk" | "it" | "en";

export async function GET(
  req: Request,
  {params}: {params: Promise<{slug: string}>}
) {
  const {slug} = await params;
  const {searchParams} = new URL(req.url);

  const langParam = (searchParams.get("lang") ?? "it") as Lang;
  const lang: Lang = allowedLangs.has(langParam) ? langParam : "it";

  const query = `
    *[_type == "project" && slug.current == $slug][0]{
      _id,
      "slug": slug.current,
      "createdAt": _createdAt,
      "title": coalesce(title[$lang], title.it, title.en, title.uk),
      "description": pt::text(coalesce(description[$lang], description.it, description.en, description.uk)),
      "imageUrl": image.asset->url,
      "imageAlt": coalesce(image.alt[$lang], image.alt.it, image.alt.en, image.alt.uk)
    }
  `;

  const project = await sanityClient.fetch(query, {slug, lang});

  if (!project) return NextResponse.json({message: "Not found"}, {status: 404});

  return NextResponse.json(project);
}