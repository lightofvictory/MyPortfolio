import { useProjectsAnimation } from '../../hooks/useProjectsAnimation';
import './projects.scss';
import FeaturedProjectCard from './FeaturedProjectCard';
import LinkedProjectCard from './LinkedProjectCard';
import type { FeaturedProject, LinkedProject } from '../../content/projects';

export default function ProjectsSection({ projects, featuredProject }: { projects: LinkedProject[]; featuredProject: FeaturedProject }) {
  const root = useProjectsAnimation();
  return <section ref={root} id="projects" className="projects section">
    <div className="container">
      <div className="section-heading projects-heading">
        <div>
          <div className="eyebrow">03 — SELECTED WORK</div>
          <h2>Ideas brought to life<span>.</span>
          </h2>
        </div>
        <span className="section-note">Scroll to explore projects →</span>
      </div>
      <div className="projects-viewport" tabIndex={0} role="region" aria-label="Projects — scroll horizontally to explore"><div className="project-grid">
        <FeaturedProjectCard project={featuredProject} />
        {projects.map(project => <LinkedProjectCard key={project.url} project={project} />)}
      </div></div>
    </div>
  </section>;
}
