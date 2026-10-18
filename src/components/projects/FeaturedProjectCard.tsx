import { ArrowUpRight } from 'lucide-react';
import type { FeaturedProject } from '../../content/projects';

export default function FeaturedProjectCard({ project }: { project: FeaturedProject }) {
  return (
    <article className="project-card">
          <a className="project-preview" href={project.url} target="_blank" rel="noreferrer" aria-label="Visit real estate website">
            <div className="browser-bar">
              <span>● ● ●</span>
              <span>real estate / web experience</span>
              <ArrowUpRight size={13} />
            </div>
            <div className="estate-preview">
              <div className="estate-nav">
                <b>HOMELY<span>®</span>
                </b>
                <span>Discover &nbsp; Properties &nbsp; About us</span>
              </div>
              <div className="estate-content">
                <small>A PLACE TO CALL YOUR OWN</small>
                <h3>Find your space.<br />Make it home.</h3>
                <p>Discover a place for your next chapter.</p>
                <span className="estate-button">Explore properties ↗</span>
              </div>
              <div className="house">
                <div className="house-roof" />
                <div className="house-body">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="house-wing">
                  <i />
                </div>
                <div className="house-tree" />
              </div>
              <span className="preview-caption">ILLUSTRATIVE PROJECT PREVIEW</span>
            </div>
          </a>
          <div className="project-info">
            <div className="project-title">
              <h3>{project.name}</h3>
              <a href={project.url} target="_blank" rel="noreferrer" aria-label="Open Real Estate Website">
                <ArrowUpRight />
              </a>
            </div>
            <p>{project.description}</p>
            <div className="project-footer">
              <div className="tags">
                <span>Web development</span>
                <span>Responsive UI</span>
              </div>
              <a href={project.url} target="_blank" rel="noreferrer">Live site <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </article>
  );
}
