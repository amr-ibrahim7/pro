'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Project } from '@/types';





const PROJECTS_PER_PAGE = 5;

export default function ProjectsList({ projects }: { projects: Project[] }) { 
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE);


  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const visibleProjects = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + PROJECTS_PER_PAGE);
  };

  return (
    <>
      <section>
        <div className="flex flex-col gap-16 md:gap-20">
          {visibleProjects.map((project, index) => (
            <div key={project.id}>
              <div 
                className="group relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-xl mb-6 cursor-pointer"
                onClick={() => setSelectedImage(project.image)}
              >
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:brightness-105"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-2 rounded-full font-medium text-sm shadow-lg flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    View Image
                  </span>
                </div>
              </div>
              <div className="max-w-xl">
                <h3 className="text-xl font-semibold mb-2">
                  <Link 
                    href={`/projects/${project.id}`} 
                    className="hover:text-primary transition-colors duration-300 hover:underline decoration-2 underline-offset-4"
                  >
                    {project.name}
                  </Link>
                </h3>
                <p className="text-muted-foreground">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="mt-16 text-center">
            <Button onClick={loadMore} size="lg" variant="secondary">
              More Projects
            </Button>
          </div>
        )}
      </section>
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full">
            <Image
              src={selectedImage}
              alt="Project preview"
              fill
              className="object-contain rounded-lg"
              quality={100}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2 rounded-full transition-colors duration-200"
              aria-label="Close image"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}