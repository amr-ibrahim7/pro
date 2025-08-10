import { Container } from '@/components/shared/Container';
import ProjectCollage from '@/components/projects/ProjectCollage';
import { getAllProjects } from '@/lib/projects';
import FeaturedProjects from '@/components/projects/FeaturedProjects';
import Experience, { ExperienceEntry } from '@/components/shared/Experience';
import ProjectFooterCTA from '@/components/shared/ProjectFooterCTA';
import { getSingletonContent } from '@/lib/content';


type ExperienceData = {
  cv_link: string;
  experiences: ExperienceEntry[];
}


export default function HomePage() {
  const allProjects = getAllProjects(); 
  const homeContent = getSingletonContent('home.md');


  const experienceContent = getSingletonContent('experience.md');

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
          <h1 className="select-none text-4xl font-light tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {homeContent.frontmatter.headline}
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
      <Experience experienceData={experienceContent.frontmatter as ExperienceData} />
      </Container>

      <Container className="mt-24 sm:mt-32 pb-16">
        <ProjectFooterCTA 
          title="Have a project in mind?"
          description="I'm always excited to hear about new ideas. Feel free to reach out and let's discuss how we can build something great together."
        />
      </Container>
    </>
  );
}