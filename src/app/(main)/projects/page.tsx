import { getAllProjects } from '@/lib/projects';
import { Container } from '@/components/shared/Container';
import ProjectsList from '@/components/projects/ProjectsList';
import BackButton from '@/components/shared/BackButton';

export const metadata = {
  title: "All Projects",
  description: "A collection of my work, from personal experiments to client projects.",
};

export default function ProjectsPage() {
  const allProjects = getAllProjects();

  return (
    <Container className="mt-32 sm:mt-40 pb-24">
         <div className="max-w-4xl mx-auto mb-8">
        <BackButton />
          </div>
      <div className="max-w-4xl mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            What I've been working on 
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A collection of my work, from personal experiments to client projects.
          </p>
        </header>
        <ProjectsList projects={allProjects} />
      </div>
    </Container>
  );
}