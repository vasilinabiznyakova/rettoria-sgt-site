import Image from 'next/image';

type Project = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  imageAlt?: string | null;
  createdAt: string;
};

export const revalidate = 60;

export default async function SingleArticle({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams?: Promise<{ lang?: string }>;
}) {
  const resolvedParams = await params;

  const lang = resolvedParams.locale ?? 'it';
  const slug = resolvedParams.slug;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/projects/${slug}?lang=${lang}`,
    { next: { revalidate: 60 } },
  );

  if (!response.ok) {
    return <p>Progetto non trovato</p>;
  }

  const project: Project = await response.json();

  return (
    <div className="bg-background">
      <div className="container mx-auto min-h-screen p-6 pt-40 pb-10">
        <h1 className="text-3xl font-bold my-5 text-center article-text">{project.title}</h1>
        {project.imageUrl && (
          <Image
            src={project.imageUrl}
            alt={project.imageAlt ?? project.title}
            width={300}
            height={300}
            className="w-lg mx-auto mb-5 rounded-2xl"
          />
        )}

        <p className="text-lg">{project.description}</p>
      </div>
    </div>
  );
}
