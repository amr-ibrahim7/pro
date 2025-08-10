import { Container } from '@/components/shared/Container';
import ProjectCollage from '@/components/projects/ProjectCollage';
import { getAllProjects } from '@/lib/projects';
import FeaturedProjects from '@/components/projects/FeaturedProjects';
import Experience from '@/components/shared/Experience';


export default function HomePage() {
  const allProjects = getAllProjects(); 
   const featured = allProjects.slice(0, 2).map(p => ({
    id: p.id,
    name: p.name,
    image: p.image,
    link: p.link,
    description: p.description,
    tags: p.tags,
    link_preview: p.link_preview,
    link_github: p.link_github,
  }));

  return (
    <>
      <Container className="mt-36 sm:mt-48">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-light tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          I'm Amr — a Web Developer learning to craft digital experiences by solving problems. Passionate about web development, design enthusiast, always eager to explore and grow.
          </h1>
        </div>
      </Container>
      <Container className="mt-20 sm:mt-24">
        <div className="mx-auto max-w-full lg:max-w-7xl">
        <ProjectCollage projects={allProjects} />
        </div>
      </Container>

      <Container className="mt-24 sm:mt-32">
        <FeaturedProjects projects={featured} />
      </Container>


      <Container className="mt-24 sm:mt-32">
        <Experience />
      </Container>


      {/* <Container className="mt-24 sm:mt-32 pb-16">
      </Container> */}
    </>
  );
}