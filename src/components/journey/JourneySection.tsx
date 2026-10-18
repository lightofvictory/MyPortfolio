import type { JourneyContent } from '../../content/journey';
import { useJourneyAnimation } from '../../hooks/useJourneyAnimation';
import { ArrowUpRight, BriefcaseBusiness, GraduationCap, Layers } from 'lucide-react';
import './journey.scss';

export default function JourneySection({ content }: { content: JourneyContent }) {
  const root = useJourneyAnimation();
  return (
    <section ref={root} className="journey section" aria-labelledby="journey-title">
      <div className="journey-galaxy" aria-hidden="true">
        <div className="galaxy-nebula galaxy-nebula-one" />
        <div className="galaxy-nebula galaxy-nebula-two" />
        <svg className="galaxy-stars" viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 130 }, (_, index) => <circle key={index} cx={(index * 241 + 17) % 1440} cy={(index * 137 + 43) % 1000} r={index % 11 === 0 ? 2.6 : index % 4 === 0 ? 1.6 : 1} fill={index % 3 === 0 ? '#f7a4c6' : '#eee1f6'} style={{ animationDelay: `${(index % 13) * -.8}s` }} />)}
        </svg>
        <div className="galaxy-meteors">{Array.from({ length: 6 }, (_, index) => <span key={index} className="galaxy-meteor" style={{ top: `${8 + index * 14}%`, left: `${25 + (index * 17) % 70}%`, animationDelay: `${index * -3.2}s`, animationDuration: `${10 + index * 1.3}s` }} />)}</div>
      </div>
      <div className="container">
        <div className="journey-heading" data-reveal>
          <div className="eyebrow">EDUCATION & EXPERIENCE</div>
          <h2 id="journey-title">My journey<span>.</span></h2>
          <p>From studying technology to building software people use.</p>
        </div>
        <div className="journey-timeline-wrap"><div className="journey-line-fill" aria-hidden="true" />
          <div className="journey-timeline-orbit" aria-hidden="true"><svg viewBox="0 0 180 800" preserveAspectRatio="none" fill="none"><defs><linearGradient id="timeline-spiral-light" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#ed2855" stopOpacity=".15" /><stop offset=".5" stopColor="#ffbbd5" /><stop offset="1" stopColor="#f04470" stopOpacity=".5" /></linearGradient></defs><path className="timeline-spiral-glow" d="M90 0C190 70 190 90 90 140S-10 210 90 260S190 330 90 380S-10 450 90 500S190 570 90 620S-10 690 90 740S140 780 90 800" /><path className="timeline-spiral-path" d="M90 0C190 70 190 90 90 140S-10 210 90 260S190 330 90 380S-10 450 90 500S190 570 90 620S-10 690 90 740S140 780 90 800" /><path className="timeline-spiral-flow" pathLength="100" d="M90 0C190 70 190 90 90 140S-10 210 90 260S190 330 90 380S-10 450 90 500S190 570 90 620S-10 690 90 740S140 780 90 800" /><circle className="timeline-orbit-particle" r="2.5" fill="#fff0f7"><animateMotion dur="9s" repeatCount="indefinite" path="M90 0C190 70 190 90 90 140S-10 210 90 260S190 330 90 380S-10 450 90 500S190 570 90 620S-10 690 90 740S140 780 90 800" /></circle></svg></div>
          <div className="journey-line-stars" aria-hidden="true"><i /><i /><i /><i /></div><ol className="journey-timeline">
          
          <li className="journey-milestone">
            <span className="journey-node" aria-hidden="true"><GraduationCap size={18} /></span>
            <article className="journey-content">
              <span className="journey-date">{content.educationDates}</span>
              <h3>{content.college}</h3>
              <p>{content.degree}</p>
              <span className="journey-location">{content.location}</span>
              <span className="journey-grade">CGPA <strong>{content.grade}</strong></span>
            </article>
          </li>
          <li className="journey-milestone">
            <span className="journey-node" aria-hidden="true"><BriefcaseBusiness size={18} /></span>
            <article className="journey-content">
              <span className="journey-date">{content.experience}</span>
              <h3><a href={content.companyUrl} target="_blank" rel="noreferrer">{content.company} <ArrowUpRight size={17} aria-hidden="true" /></a></h3>
              <p className="journey-role">{content.role}</p>
              <p>{content.description}</p>
              <div className="journey-product"><span className="journey-product-icon"><Layers size={20} aria-hidden="true" /></span><div><span className="journey-product-label">{content.productLabel}</span><h4>{content.product}</h4><p>{content.productDescription}</p></div></div>
            </article>
          </li>
        </ol></div>
      </div>
    </section>
  );
}
