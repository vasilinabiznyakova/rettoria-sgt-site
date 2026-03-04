import ProjectList from 'app/components/ProjectsList';

export const revalidate = 60;

export default async function Projects({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ page?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};

  const lang = resolvedParams.locale ?? 'it';
  const page = Number(resolvedSearchParams?.page ?? 1);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/projects?page=${page}&limit=4&lang=${lang}`,
    { next: { revalidate: 60 } },
  );

  if (!response.ok) {
    return <p className="">Errore nel caricamento dei progetti</p>;
  }

  const projectsData = await response.json();
  return (
    <div className="bg-background">
      <div className="container mx-auto min-h-screen p-6">
        <ProjectList projects={projectsData.items} lang={lang} />
      </div>
    </div>
  );
}
