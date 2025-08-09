import React from 'react';

const experiences = [
    {
        years: '2023 - Present',
        title: 'Front-End Developer (Freelance)',
        description: 'Building and maintaining responsive web applications for various clients using modern technologies like React, Next.js, and TypeScript.'
    },
    {
        years: '2022 - 2023',
        title: 'Web Development Intern at Tech Solutions',
        description: 'Assisted the senior development team in creating new features, fixing bugs, and improving the overall user experience of their flagship product.'
    },
    {
        years: '2021',
        title: 'Computer Science Student',
        description: 'Graduated with a focus on web technologies, algorithms, and software engineering principles.'
    }
];

export default function Experience() {
    return (
        <section>
            <div className="mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-center" id="experience">
                    Experience
                </h2>
            </div>

            <div className="flex flex-col gap-10 max-w-3xl mx-auto">
                {experiences.map((exp, index) => (
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
        </section>
    );
};