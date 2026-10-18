import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './projects.scss';
import { ArrowUpRight } from 'lucide-react';
import LinkedProjectCards from './LinkedProjectCard';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(min-width: 641px) and (prefers-reduced-motion: no-preference)', () => {
      const section = root.current;
      const track = section?.querySelector<HTMLElement>('.project-grid');
      const viewport = section?.querySelector<HTMLElement>('.projects-viewport');
      if (!section || !track || !viewport) return;
      section.classList.add('is-horizontal');
      const travel = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
      const context = gsap.context(() => {
        gsap.fromTo(track, { x: () => -travel() }, {
          x: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: () => `top ${Math.ceil((document.querySelector('.header')?.getBoundingClientRect().bottom ?? 80) + 12)}px`,
            end: () => `+=${Math.max(travel() * 2, window.innerHeight)}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      }, section);
      return () => { context.revert(); section.classList.remove('is-horizontal'); };
    });
    return () => media.revert();
  }, []);
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
        <article className="project-card">
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
        <LinkedProjectCards />
      </div></div>
    </div>
  </section>;
}
