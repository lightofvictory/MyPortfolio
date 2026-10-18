import type { LinkedProject } from '../../content/projects';
import { ArrowUpRight } from 'lucide-react';

export default function LinkedProjectCard({ project }: { project: LinkedProject }) {
  const { name, url, domain, className, icon: Icon, description } = project;
  return (
    <article className="project-card" key={url}>
      <a className="project-preview" href={url} target="_blank" rel="noreferrer" aria-label={`Visit ${name}`}>
        <div className="browser-bar"><span>● ● ●</span><span>{domain}</span><ArrowUpRight size={13} /></div>
        <div className={`linked-project-preview ${className}`}>
          <span className="linked-project-domain">SELECTED WEB PROJECT</span>
          <div className="linked-project-art" aria-hidden="true"><Icon size={110} strokeWidth={.65} /><span /><span /></div>
          <h3>{name}</h3>
          <span className="linked-project-visit">Explore the website <ArrowUpRight size={13} /></span>
          <span className="linked-project-caption">ILLUSTRATIVE PROJECT PREVIEW</span>
        </div>
      </a>
      <div className="project-info">
        <div className="project-title"><h3>{name}</h3><a href={url} target="_blank" rel="noreferrer" aria-label={`Open ${name}`}><ArrowUpRight /></a></div>
        <p>{description}</p>
        <div className="project-footer"><div className="tags"><span>Web project</span></div><a href={url} target="_blank" rel="noreferrer">Live site <ArrowUpRight size={14} /></a></div>
      </div>
    </article>
  );
}
