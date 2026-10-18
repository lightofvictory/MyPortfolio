import type { AboutContent } from '../../content/about';
import './about.scss';
import { CodeXml, Diamond } from 'lucide-react';

export default function AboutSection({ content }: { content: AboutContent }) {
  return (
    <section id="about" className="about section">
      <div className="container about-grid">
        <div className="about-introduction">
          <div data-reveal><div className="eyebrow">01 — ABOUT ME</div>
          <h2>Complex ideas.<br />Intuitive interfaces<span>.</span></h2></div>
          <div className="about-portrait" aria-hidden="true" />
        </div>
        <div className="about-copy" data-reveal>
          <p>{content.paragraphs[0]}</p>
          <p>{content.paragraphs[1]}</p>
          <div className="about-facts">
            <span><CodeXml size={16} aria-hidden="true" /> Frontend Engineering</span>
            <span><Diamond size={16} aria-hidden="true" /> SaaS Application Development</span>
          </div>
        </div>
      </div>
    </section>
  );
}
