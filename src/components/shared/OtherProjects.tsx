import Link from 'next/link';
import Image from 'next/image';
import { getAllProjects } from '@/lib/projects';
import AnimatedLink from './AnimatedLink';

type Project = ReturnType<typeof getAllProjects>[0];

export default function OtherProjects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="mt-24 max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold mb-8 text-center sm:text-left border-b border-border pb-4">
        Explore More Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Link 
            key={project.id} 
            href={project.link.href}
            className="group block rounded-xl border border-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/50"
          >
            <div className="relative h-48 w-full">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-4 bg-background">
              <h3 className="font-semibold text-lg text-foreground transition-colors group-hover:text-primary">
                {project.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {project.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-16 flex justify-center">
        <AnimatedLink href="/projects" title="View All Projects" />
      </div>
    </section>
  );
}