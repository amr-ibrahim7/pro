import { Container } from '@/components/shared/Container';
import ProjectCollage from '@/components/projects/ProjectCollage';

export default function HomePage() {
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
            <ProjectCollage />
        </div>
      </Container>
    </>
  );
}