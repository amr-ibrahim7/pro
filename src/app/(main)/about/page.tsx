import Image from 'next/image';
import { Container } from '@/components/shared/Container';
import { GitHubIcon, LinkedInIcon } from '@/components/shared/SocialIcons';
import Link from 'next/link';
import portraitImage from '@/images/about.jpg';
import BackButton from '@/components/shared/BackButton';
import { getSingletonContent } from '@/lib/content';
import ReactMarkdown from 'react-markdown'; 

function SocialLink({ href, icon: Icon, children }: { href: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-sm font-medium text-zinc-800 transition hover:text-primary dark:text-zinc-200">
      <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-primary" />
      <span className="ml-4">{children}</span>
    </Link>
  );
}

export default function AboutPage() {
  const aboutContent = getSingletonContent('about.md');
  return (
    <Container className="mt-32 sm:mt-40">
         <div className="max-w-4xl mx-auto mb-8">
        <BackButton />
          </div>
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-flow-col lg:gap-x-12">
        
        <div className="flex justify-center lg:order-last lg:pl-20">
          <div className="w-64 h-64 sm:w-80 sm:h-80 rotate-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 p-2 shadow-lg">
            <Image
              src={portraitImage}
              alt="amr ibrahim image!"
              width={500}
              height={500}
              className="rounded-lg object-cover w-full h-full"
              priority
            />
          </div>
        </div>

        <div className="space-y-10 lg:order-first">
          <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {aboutContent.frontmatter.title} 
            </h1>
            <ReactMarkdown>
            {aboutContent.frontmatter.body}
          </ReactMarkdown>
          </div>

          <div className="space-y-4">
            <SocialLink href="https://github.com/amr-ibrahim7" icon={GitHubIcon}>
              Follow on GitHub
            </SocialLink>
            <SocialLink href="https://linkedin.com/in/amribrahimwebdev/" icon={LinkedInIcon}>
              Follow on LinkedIn
            </SocialLink>
          </div>
        </div>
      </div>
    </Container>
  );
}