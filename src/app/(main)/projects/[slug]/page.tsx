import { getOtherProjects, getProjectBySlug, getProjectSlugs } from '@/lib/projects';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ProjectFooterCTA from '@/components/shared/ProjectFooterCTA';
import BackButton from '@/components/shared/BackButton';
import OtherProjects from '@/components/shared/OtherProjects';


export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const project = getProjectBySlug(params.slug);
    if (!project) {
      return {
        title: "Project Not Found", 
      };
    }
  
    return {
      title: project.frontmatter.title,
      description: project.frontmatter.description,
    };
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl font-semibold mb-6 border-b border-border pb-3">{children}</h2>
);

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  const otherProjects = getOtherProjects(params.slug);

  if (!project) {
    notFound();
  }
  
  const { frontmatter, content } = project;

  return (
    <div className="container mx-auto pt-32 sm:pt-48 pb-24 px-4">
    <div className="max-w-4xl mx-auto mb-8">
        <BackButton />
      </div>
      <header className="max-w-4xl mx-auto mb-16">


        <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
          Case Study
        </p>

        <h1 className="text-4xl sm:text-5xl font-bold mb-8 leading-tight tracking-tight text-foreground">
          {frontmatter.title}
        </h1>


        <div className="prose dark:prose-invert max-w-none text-lg text-muted-foreground mb-12">

          <ReactMarkdown>{frontmatter.description}</ReactMarkdown>
        </div>


        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 border-t border-border pt-8">
  <div>
    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Type</h3>
    <p className="text-foreground">{frontmatter.projectType || 'Personal'}</p>
  </div>

  <div>
    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Stack</h3>
    <div className="flex flex-col items-start gap-1">
      {frontmatter.tags?.map((tag: string) => (
        <span key={tag} className="text-foreground">{tag}</span>
      ))}
    </div>
  </div>

  <div>
    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Live</h3>
    {frontmatter.link_preview ? (
      <a href={frontmatter.link_preview} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline underline-offset-4 font-medium">
        View Site
      </a>
    ) : (
      <span className="text-muted-foreground">Not available</span>
    )}
  </div>

  <div>
    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">GitHub</h3>
    {frontmatter.link_github ? (
      <a href={frontmatter.link_github} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline underline-offset-4 font-medium">
        View on GitHub
      </a>
    ) : (
      <span className="text-muted-foreground">Not available</span>
    )}
  </div>

</div>
      </header>
      <div className="max-w-6xl mx-auto mb-20">
        <Image
          src={frontmatter.image}
          alt={frontmatter.title}
          width={1200}
          height={630}
          className="rounded-xl shadow-2xl mx-auto"
          priority
        />
      </div>


      <main>
        {frontmatter.projectPurposeAndGoal && (
          <section className="mb-16 max-w-4xl mx-auto">
            <SectionTitle>Project Purpose & Goal</SectionTitle>
            <div className="prose dark:prose-invert max-w-none text-lg">
              <ReactMarkdown>{frontmatter.projectPurposeAndGoal}</ReactMarkdown>
            </div>
          </section>
        )}

        {frontmatter.webStackAndExplanation && (
          <section className="mb-16 max-w-4xl mx-auto">
            <SectionTitle>Web Stack & Explanation</SectionTitle>
            <div className="space-y-6">
              {frontmatter.webStackAndExplanation?.map((stack: any, index: number) => (
                <div key={index} className="flex items-start gap-6">
                  {stack.icon && <Image src={stack.icon} alt={stack.stackName} width={48} height={48} />}
                  <div>
                    <h3 className="text-xl font-bold">{stack.stackName}</h3>
                    <p className="text-muted-foreground">{stack.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {frontmatter.projectImages?.length > 0 && (
          <section className="mb-16 max-w-5xl mx-auto">
            <SectionTitle>Project Gallery</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {frontmatter.projectImages.map((img: string, index: number) => (
                <Image key={index} src={img} alt={`Project image ${index + 1}`} width={600} height={400} className="rounded-lg object-cover w-full h-auto" />
              ))}
            </div>
          </section>
        )}
    
        {frontmatter.problemAndThoughts && (
          <section className="mb-16 max-w-4xl mx-auto">
            <SectionTitle>Problem & Thoughts</SectionTitle>
            <div className="prose dark:prose-invert max-w-none text-lg">
              <ReactMarkdown>{frontmatter.problemAndThoughts}</ReactMarkdown>
            </div>
            {frontmatter.problemImage && (
              <Image src={frontmatter.problemImage} alt="Problem illustration" width={800} height={450} className="mt-6 rounded-lg mx-auto" />
            )}
          </section>
        )}

        {frontmatter.lessonsLearned && (
          <section className="max-w-4xl mx-auto">
            <SectionTitle>Lessons Learned</SectionTitle>
            <div className="prose dark:prose-invert max-w-none text-lg">
              <ReactMarkdown>{frontmatter.lessonsLearned}</ReactMarkdown>
            </div>
          </section>
        )}

        {content && (
          <section className="mt-16 max-w-4xl mx-auto">
            <SectionTitle>More Details</SectionTitle>
            <div className="prose dark:prose-invert max-w-none text-lg">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </section>
        )}
      <OtherProjects projects={otherProjects} />
            <ProjectFooterCTA />
      </main>
    </div>
  );
}