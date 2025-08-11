export type Project = {
    id: string;
    name: string;
    image: string;
    description: string;
    tags: string[];
    link_preview: string | null;
    link_github: string | null;
    link: {
      href: string;
    };
  };
  

  export type ProjectFrontmatter = {
    title: string;
    image: string;
    description: string;
    projectType?: string;
    tags?: string[];
    link_github?: string;
    link_preview?: string;
    projectPurposeAndGoal?: string;
    webStackAndExplanation?: WebStack[];
    projectImages?: string[];
    problemAndThoughts?: string;
    problemImage?: string;
    lessonsLearned?: string;
  };
  

  export type ProjectDetails = {
    slug: string;
    frontmatter: ProjectFrontmatter;
    content: string;
  };
  

  export type WebStack = {
    stackName: string;
    explanation: string;
    icon?: string;
  };
  

  export type ExperienceEntry = {
    years: string;
    title: string;
    description: string;
  };

  export type ExperienceData = {
    cv_link: string;
    experiences: ExperienceEntry[];
  };