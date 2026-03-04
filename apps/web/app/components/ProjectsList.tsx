import ProjectCard, { Project } from './ProjectCard';

type Props = {
  projects: Project[];
  lang: string;
  truncate?: number;
};

export default function ProjectList({ projects, lang, truncate }: Props) {
  return (
    <ul className="grid lg:grid-cols-2 gap-6 pt-10 pb-10 grid-cols-1 mt-32">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} lang={lang} truncate={truncate} />
      ))}
    </ul>
  );
}
