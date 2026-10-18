import { ArrowLeft, ArrowRight } from 'lucide-react';
import TechnologyLogo from '../../shared/components/TechnologyLogo';
import type { Technology } from '../../content/technologies.data';
import { useTechnologyCarousel } from '../../hooks/useTechnologyCarousel';
import TechnologyIllustration from './TechnologyIllustration';
import './toolkit.scss';

export default function SkillsSection({ technologies }: { technologies: Technology[] }) {
  const { root, active, setActive, hovered, setHovered, current, wrap, distance } = useTechnologyCarousel(technologies);

  return <section id="skills" ref={root} className="toolkit section" aria-labelledby="toolkit-heading">
    <div className="container">
      <div className="section-heading toolkit-heading">
        <div><div className="eyebrow"><span>02</span> — MY TOOLKIT</div><h2 id="toolkit-heading">The tools behind<br />the craft<span>.</span></h2></div>
        <p>A practical stack for turning good ideas<br />into well-built experiences.</p>
      </div>
      <div className="toolkit-interactive" role="region" aria-roledescription="carousel" aria-label="Technology toolkit">
        <div className="toolkit-arc">
          <div className="toolkit-orbital orbit-one" /><div className="toolkit-orbital orbit-two" /><div className="toolkit-orbital orbit-three" />
          <div className="toolkit-particles" aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <i key={index} style={{ left: `${(index * 37 + 5) % 100}%`, top: `${(index * 29 + 5) % 90}%`, animationDelay: `${index * -.3}s` }} />)}</div>
          <div className="toolkit-center-beacon" aria-hidden="true" />
          {technologies.map((technology, index) => <button key={technology.name} type="button" className={`toolkit-tech${index === active ? ' is-active' : ''}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} aria-label={`Show ${technology.name}`} aria-pressed={index === active} tabIndex={Math.abs(distance(index, active)) <= 2 ? 0 : -1} onClick={() => setActive(index)}><TechnologyLogo name={technology.name} /></button>)}
          <button type="button" className="toolkit-arrow previous" aria-label="Previous technology" onClick={() => setActive(index => wrap(index - 1))}><ArrowLeft size={19} /></button>
          <button type="button" className="toolkit-arrow next" aria-label="Next technology" onClick={() => setActive(index => wrap(index + 1))}><ArrowRight size={19} /></button>
        </div>
        <div className="toolkit-active-copy"><span className="toolkit-category">{current.category}</span><h3>{current.name}</h3><p>{current.description}</p></div>
        <div className="toolkit-info-stage">
          {technologies.map((technology, index) => <article className={`toolkit-info-card${index === active ? ' is-active' : ''}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} key={technology.name} aria-hidden={index !== active}>
            <div className="toolkit-info-text"><div className="toolkit-info-heading"><span className="toolkit-info-logo"><TechnologyLogo name={technology.name} /></span><div><span className="toolkit-info-category">{technology.category} {['Frontend', 'Backend'].includes(technology.category) ? 'Development' : 'Toolkit'}</span><h3>{technology.name}</h3></div></div><p>{technology.description} {technology.details}</p><div className="toolkit-feature-tags">{technology.features.map(feature => <span key={feature}>{feature}</span>)}</div></div>
            <TechnologyIllustration technology={technology} />
          </article>)}
        </div>
        <span className="toolkit-sr-only" aria-live="polite">{hovered ? `Selected technology: ${current.name}` : ''}</span>
      </div>
    </div>
  </section>;
}
