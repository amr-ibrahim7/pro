import { Container } from '@/components/shared/Container';
import { GitHubIcon, LinkedInIcon, MailIcon } from '@/components/shared/SocialIcons';
import Link from 'next/link';

function SocialLink({ icon: Icon, ...props }: any) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  );
}

export default function HomePage() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Amr Ibrahim - Web Developer & Designer
        </h1>
        <p className="mt-6 text-base text-muted-foreground">
          Hello! I'm a developer passionate about coding and eager to learn. I'm on a journey to explore the vast world of programming, turning ideas into reality.
        </p>
        <div className="mt-6 flex gap-6">
          <SocialLink
            href="https://github.com/amr-ibrahim7"
            aria-label="Follow on GitHub"
            icon={GitHubIcon}
          />
          <SocialLink
            href="https://www.linkedin.com/in/amribrahimwebdev/"
            aria-label="Follow on LinkedIn"
            icon={LinkedInIcon}
          />
          <SocialLink
            href="mailto:amrtolba015@gmail.com"
            target="_blank"
            icon={MailIcon}
          />
        </div>
      </div>
    </Container>
  );
}