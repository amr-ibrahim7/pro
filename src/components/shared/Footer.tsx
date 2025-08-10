import { Container } from './Container';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';


function SocialLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
    >
      {children}
      <ArrowUpRight className="h-4 w-4 opacity-60 transition-transform group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="mt-32">

      <div className="border-t border-border pt-10 pb-16">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">

            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              &copy; {new Date().getFullYear()} A.T All rights reserved.
            </p>
            <div className="flex gap-6 font-medium">
              <SocialLink href="mailto:amrtolba015@gmail.com">
                Email
              </SocialLink>
              <SocialLink href="https://github.com/amr-ibrahim7">
                GitHub
              </SocialLink>
              <SocialLink href="https://linkedin.com/in/amribrahimwebdev/">
                LinkedIn
              </SocialLink>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}