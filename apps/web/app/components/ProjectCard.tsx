import Link from 'next/link';
import Image from 'next/image';

export type Project = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  imageAlt?: string | null;
};

type Props = {
  project: Project;
  lang: string;
  truncate?: number;
};

export default function ProjectCard({ project, lang, truncate = 150 }: Props) {
  return (
    <li className="w-full rounded-3xl bg-white cursor-pointer shadow-xl">
      <Link href={`/${lang}/projects/${project.slug}`}>
        {project.imageUrl && (
          <Image
            src={project.imageUrl}
            alt={project.imageAlt ?? project.title}
            width={500}
            height={500}
            className="object-cover w-full rounded-t-3xl"
          />
        )}
        <h2 className="text-xl px-2 font-semibold my-4 text-center hover:text-amber-600">
          {project.title}
        </h2>
      </Link>
      <p className="p-4">{project.description.slice(0, truncate)}...</p>
    </li>
  );
}
