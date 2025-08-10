'use client';

import { UserCircle } from 'lucide-react';
import Link from 'next/link';
import AnimatedLink from './AnimatedLink';



export type ExperienceEntry = {
  years: string;
  title: string;
  description: string;
};

type ExperienceProps = {
  experienceData: {
    cv_link: string;
    experiences: ExperienceEntry[];
  };
};

export default function Experience({ experienceData }: ExperienceProps) {
  return (
    <section>
      <div className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-center" id="experience">
          My Journey So Far
        </h2>
      </div>
      <div className="flex flex-col gap-10 max-w-3xl mx-auto">
        {experienceData.experiences.map((exp, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
            <div className="md:col-span-1">
              <h3 className="text-lg text-muted-foreground font-light">
                {exp.years}
              </h3>
            </div>
            <div className="md:col-span-3">
              <h3 className="text-xl font-semibold mb-1">
                {exp.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
        <Link 
          href="/about"
          className="group inline-flex items-center gap-2 text-lg font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <UserCircle className="h-5 w-5 transition-transform group-hover:scale-110" />
          More Info
        </Link>
        <AnimatedLink 
          href={experienceData.cv_link}
          title="Download CV"
        />
      </div>
    </section>
  );
};