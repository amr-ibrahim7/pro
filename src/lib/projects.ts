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
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data,
    content,
  };
}