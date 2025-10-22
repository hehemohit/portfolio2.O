import React, { useEffect, useRef } from 'react';
import './ProjectsSection.css';

interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
}

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const projects: Project[] = [
    {
      id: 1,
      title: "GRAVITY WELL SIMULATION",
      description: "A WebGL-powered interactive black hole experience",
      link: "#"
    },
    {
      id: 2,
      title: "SPACE-TIME PORTFOLIO",
      description: "A dynamic portfolio transcending dimensions",
      link: "#"
    },
    {
      id: 3,
      title: "COSMIC WEB APPLICATION",
      description: "A modern application navigating the digital universe",
      link: "#"
    },
    {
      id: 4,
      title: "INTERSTELLAR EXPERIENCE",
      description: "An immersive journey through space and time",
      link: "#"
    }
  ];

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="projects-container">
        <h2 className="projects-title">PROJECTS</h2>
        
        <div className="projects-list">
          {projects.map((project, index) => (
            <div key={project.id} className="project-item">
              {index > 0 && <div className="project-divider"></div>}
              <a href={project.link} className="project-link">
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
