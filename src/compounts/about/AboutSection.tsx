import './about.scss';
import { CodeXml, Diamond } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="about section">
      <div className="container about-grid">
        <div className="about-introduction">
          <div data-reveal><div className="eyebrow">01 — ABOUT ME</div>
          <h2>Complex ideas.<br />Intuitive interfaces<span>.</span></h2></div>
          <div className="about-portrait" aria-hidden="true" />
        </div>
        <div className="about-copy" data-reveal>
          <p>I'm Jayaprakash, a Software Engineer who enjoys building intuitive web experiences through clean code and thoughtful design.</p>
          <p>With 1.5 years of professional experience, I develop responsive SaaS applications, create reusable UI components, and turn complex requirements into user-friendly interfaces. I care about the details that make applications feel seamless and intuitive.</p>
          <div className="about-facts">
            <span><CodeXml size={16} aria-hidden="true" /> Frontend Engineering</span>
            <span><Diamond size={16} aria-hidden="true" /> SaaS Application Development</span>
          </div>
        </div>
      </div>
    </section>
  );
}
