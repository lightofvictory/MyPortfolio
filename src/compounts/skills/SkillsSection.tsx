import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, CodeXml, Layers, Settings2 } from 'lucide-react';
import gsap from 'gsap';
import TechnologyLogo from './TechnologyLogo';
import { technologies, type Technology } from './technologies.data';
import './toolkit.scss';

const count = technologies.length;
const wrap = (index: number) => (index + count) % count;
const distance = (index: number, active: number) => ((index - active + count + Math.floor(count / 2)) % count) - Math.floor(count / 2);

function TechnologyIllustration({ technology }: { technology: Technology }) {
  return <div className="toolkit-illustration" aria-hidden="true">
    <div className="toolkit-art-orbit" /><div className="toolkit-art-orbit second" />
    <div className="toolkit-art-window back" /><div className="toolkit-art-window middle" />
    <div className="toolkit-art-window front"><div className="toolkit-art-dots"><i /><i /><i /></div><TechnologyLogo name={technology.name} /></div>
    <span className="toolkit-art-tile code"><CodeXml /></span><span className="toolkit-art-tile layers"><Layers /></span><span className="toolkit-art-tile settings"><Settings2 /></span>
  </div>;
}

export default function SkillsSection() {
  const root = useRef<HTMLElement>(null);
  const context = useRef<gsap.Context | null>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const previousPositions = useRef(new Map<number, number>());
  const initialized = useRef(false);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [width, setWidth] = useState(1120);
  const current = technologies[active];

  useLayoutEffect(() => {
    context.current = gsap.context(() => {}, root);
    const positions = previousPositions.current;
    const observer = new ResizeObserver(entries => {
      const nextWidth = entries[0]?.contentRect.width;
      if (nextWidth) setWidth(nextWidth);
    });
    const container = root.current?.querySelector('.container');
    if (container) observer.observe(container);
    return () => {
      observer.disconnect();
      timeline.current?.kill();
      context.current?.revert();
      context.current = null;
      initialized.current = false;
      positions.clear();
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReduced(media.matches);
    media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);

  useEffect(() => {
    let timer: gsap.core.Tween | undefined;
    const schedule = () => {
      timer?.kill();
      if (!hovered && !reduced && !document.hidden) {
        timer = gsap.delayedCall(5, () => setActive(index => wrap(index + 1)));
      }
    };
    schedule();
    document.addEventListener('visibilitychange', schedule);
    return () => { timer?.kill(); document.removeEventListener('visibilitychange', schedule); };
  }, [active, hovered, reduced]);

  useLayoutEffect(() => {
    context.current?.add(() => {
      timeline.current?.kill();
      const duration = initialized.current && !reduced ? 2 : 0;
      const next = gsap.timeline({ defaults: { duration, ease: 'power3.inOut', overwrite: 'auto' } });
      const step = width < 640 ? Math.min(80, width / 4.3) : Math.min(91, width / 12);
      const mainWidth = width < 640 ? width - 32 : Math.min(704, width * .65);
      root.current?.querySelectorAll<HTMLElement>('.toolkit-tech').forEach((element, index) => {
        const delta = distance(index, active);
        const absolute = Math.abs(delta);
        const previous = previousPositions.current.get(index);
        const position = {
          x: delta * step,
          y: Math.min(delta * delta * (width < 640 ? 10 : 3.6), 250),
          rotation: delta * 7,
          scale: delta === 0 ? 1.12 : Math.max(.65, 1 - absolute * .04),
          opacity: absolute > 6 ? 0 : Math.max(.12, 1 - absolute * .14),
          filter: `blur(${Math.max(0, absolute - 2) * 1.1}px)`,
        };
        gsap.set(element, { zIndex: count - absolute, pointerEvents: absolute <= 5 ? 'auto' : 'none' });
        if (previous !== undefined && Math.abs(previous - delta) > count / 2) gsap.set(element, position);
        else next.to(element, position, 0);
        previousPositions.current.set(index, delta);
      });
      root.current?.querySelectorAll<HTMLElement>('.toolkit-info-card').forEach((element, index) => {
        const delta = distance(index, active);
        const absolute = Math.abs(delta);
        gsap.set(element, { zIndex: count - absolute, pointerEvents: delta === 0 ? 'auto' : 'none' });
        const target = { x: delta * (mainWidth + 22), rotationY: delta === 0 ? 0 : delta < 0 ? 13 : -13, rotationZ: delta === 0 ? 0 : delta < 0 ? 8 : -8, scale: delta === 0 ? 1 : .92, opacity: absolute > 1 ? 0 : delta === 0 ? 1 : .32, filter: `blur(${delta === 0 ? 0 : 2}px)` };
        if (absolute > 2) gsap.set(element, target);
        else next.to(element, target, 0);
      });
      if (duration) next.fromTo('.toolkit-active-copy', { opacity: .2, y: 7 }, { opacity: 1, y: 0, duration: 1.2 }, .4);
      timeline.current = next;
      initialized.current = true;
    });
  }, [active, width, reduced]);

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
