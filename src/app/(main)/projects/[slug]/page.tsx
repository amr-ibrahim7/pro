import { getProjectBySlug, getProjectSlugs } from '@/lib/projects';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs;
}


export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { frontmatter } = getProjectBySlug(params.slug);
  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }
  
  const { frontmatter, content } = project;

  return (
    <div className="container mx-auto py-24 px-4">
    
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-2">{frontmatter.title}</h1>
        <p className="text-lg text-muted-foreground mb-4">{frontmatter.description}</p>
        <div className="flex justify-center gap-4 mb-8">
          {frontmatter.link_preview && <a href={frontmatter.link_preview} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View Live Site</a>}
          {frontmatter.link_github && <a href={frontmatter.link_github} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View on GitHub</a>}
        </div>
        <Image
          src={frontmatter.image}
          alt={frontmatter.title}
          width={1200}
          height={630}
          className="rounded-lg shadow-lg mx-auto"
          priority
        />
      </header>

  
      <section className="mb-12 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2">Project Purpose & Goal</h2>
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>{frontmatter.projectPurposeAndGoal}</ReactMarkdown>
        </div>
      </section>

      <section className="mb-12 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2">Web Stack & Explanation</h2>
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


      {frontmatter.projectImages?.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-center">Project Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {frontmatter.projectImages.map((img: string, index: number) => (
              <Image key={index} src={img} alt={`Project image ${index + 1}`} width={600} height={400} className="rounded-lg object-cover w-full h-auto" />
            ))}
          </div>
        </section>
      )}

   
      <section className="mb-12 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2">Problem & Thoughts</h2>
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>{frontmatter.problemAndThoughts}</ReactMarkdown>
        </div>
        {frontmatter.problemImage && (
          <Image src={frontmatter.problemImage} alt="Problem illustration" width={800} height={450} className="mt-6 rounded-lg mx-auto" />
        )}
      </section>

      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4 border-b pb-2">Lessons Learned</h2>
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>{frontmatter.lessonsLearned}</ReactMarkdown>
        </div>
      </section>

      {content && (
        <section className="mt-12 max-w-4xl mx-auto">
           <h2 className="text-3xl font-semibold mb-4 border-b pb-2">More Details</h2>
           <div className="prose dark:prose-invert max-w-none">
             <ReactMarkdown>{content}</ReactMarkdown>
           </div>
        </section>
      )}
    </div>
  );
}