import { ArrowUpRight, CodeXml } from 'lucide-react';
export default function ProjectsSection() {
  return <section id="projects" className="projects section">
    <div className="container">
      <div className="section-heading" data-reveal={true}>
        <div>
          <div className="eyebrow">03 — SELECTED WORK</div>
          <h2>Ideas brought to life<span>.</span>
          </h2>
        </div>
        <span className="section-note">A selection of personal projects ↙</span>
      </div>
      <div className="project-grid">
        <article className="project-card" data-reveal={true}>
          <a className="project-preview" href="https://chipper-cactus-08f27d.netlify.app/" target="_blank" rel="noreferrer" aria-label="Visit real estate website">
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
              <h3>Real Estate Website</h3>
              <a href="https://chipper-cactus-08f27d.netlify.app/" target="_blank" rel="noreferrer" aria-label="Open Real Estate Website">
                <ArrowUpRight />
              </a>
            </div>
            <p>A responsive real-estate website, bringing property discovery into a clear, approachable web experience.</p>
            <div className="project-footer">
              <div className="tags">
                <span>Web development</span>
                <span>Responsive UI</span>
              </div>
              <a href="https://chipper-cactus-08f27d.netlify.app/" target="_blank" rel="noreferrer">Live site <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </article>
        <article className="project-card" data-reveal={true}>
          <div className="portfolio-preview">
            <div className="browser-bar">
              <span>● ● ●</span>
              <span>jayaprakash / portfolio</span>
              <CodeXml size={14} />
            </div>
            <div className="mini-portfolio">
              <b>jp<span>.</span>
              </b>
              <div className="mini-content">
                <div>
                  <small>FULL-STACK DEVELOPER</small>
                  <h3>Thoughtful code.<br />Meaningful<br />
                    <span>digital experiences.</span>
                  </h3>
                  <span className="mini-button">Explore my work ↗</span>
                </div>
                <img src="/images/jayaprakash.png" alt="Portrait in Jayaprakash’s portfolio preview" loading="lazy" />
              </div>
            </div>
          </div>
          <div className="project-info">
            <div className="project-title">
              <h3>Personal Portfolio</h3>
              <CodeXml size={20} />
            </div>
            <p>A little corner of the internet for my work, built with thoughtful typography and subtle scroll interactions.</p>
            <div className="project-footer">
              <div className="tags">
                <span>React</span>
                <span>TypeScript</span>
                <span>GSAP</span>
              </div>
              <span className="you-are-here">You’re here <span>↗</span>
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>;
}
