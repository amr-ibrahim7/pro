import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const projectsDirectory = path.join(process.cwd(), 'src/content/projects');


export function getProjectSlugs() {
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.mdx?$/, ''),
  }));
}


export function getProjectBySlug(slug: string) {
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
    frontmatter: data,
    content,
  };
}


export function getAllProjects() {
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
        link: {
          
          href: `/projects/${project.slug}`,
        },
      };
    })
    .filter((project) => project !== null);

  
  return allProjects.sort((a, b) => (a.id > b.id ? -1 : 1));
}