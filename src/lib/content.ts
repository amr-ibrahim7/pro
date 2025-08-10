import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src/content/singletons');

export function getSingletonContent(fileName: string) {
  const fullPath = path.join(contentDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);
  return {
    frontmatter: data,
  };
}