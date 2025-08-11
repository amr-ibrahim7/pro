import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Project, ProjectDetails } from '@/types';

const projectsDirectory = path.join(process.cwd(), 'src/content/projects');


export function getProjectSlugs() {
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.mdx?$/, ''),
  }));
}


export function getProjectBySlug(slug: string): ProjectDetails | null {
  const mdxPath = path.join(projectsDirectory, `${slug}.mdx`);
  const mdPath = path.join(projectsDirectory, `${slug}.md`);

  let fullPath = '';


  if (fs.existsSync(mdxPath)) {
    fullPath = mdxPath;
  } else if (fs.existsSync(mdPath)) {
    fullPath = mdPath;
  } else {
    return null; 
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data as ProjectDetails['frontmatter'], 
    content,
  };
}


export function getAllProjects(): Project[] {
  const slugs = getProjectSlugs();

  const allProjects = slugs
    .map(({ slug }) => {
      const project = getProjectBySlug(slug);
      if (!project) {
        return null;
      }
      return {
        id: project.slug,
        name: project.frontmatter.title,
        image: project.frontmatter.image,
        description: project.frontmatter.description,
        tags: project.frontmatter.tags || [],
        link_preview: project.frontmatter.link_preview || null,
        link_github: project.frontmatter.link_github || null,
        link: {
          href: `/projects/${project.slug}`,
        },
      };
    })
    .filter((project) => project !== null);

  
  return allProjects.sort((a, b) => (a.id > b.id ? -1 : 1));
}


export function getOtherProjects(currentSlug: string) {
  const allProjects = getAllProjects();
  
  const otherProjects = allProjects.filter(p => p.id !== currentSlug);

  for (let i = otherProjects.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [otherProjects[i], otherProjects[j]] = [otherProjects[j], otherProjects[i]];
  }

  return otherProjects.slice(0, 3);
}