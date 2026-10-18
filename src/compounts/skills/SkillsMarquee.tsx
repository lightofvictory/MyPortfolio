import { useState } from 'react';
import { Atom, Cloud, CodeXml, Database, GitBranch, Hexagon, Pause, Play } from 'lucide-react';
import './skills-marquee.scss';

const technologies = [
  { name: 'Git', icon: GitBranch, color: '#f17053' },
  { name: 'React', icon: Atom, color: '#61dafb' },
  { name: 'Next.js', monogram: 'N', color: '#f5f5f5' },
  { name: 'TypeScript', monogram: 'TS', color: '#66a8ed' },
  { name: 'Node.js', icon: Hexagon, color: '#79b866' },
  { name: 'NestJS', icon: CodeXml, color: '#ed2855' },
  { name: 'MongoDB', icon: Database, color: '#68ae65' },
  { name: 'AWS', icon: Cloud, color: '#ffa940' },
];

export default function SkillsMarquee() {
  const [paused, setPaused] = useState(false);

  return (
    <div className="skills-marquee" role="region" aria-label="Technology toolkit">
      <div className="skills-marquee-window">
        <div className={`skills-marquee-track${paused ? ' is-paused' : ''}`}>
          {[0, 1].map(copy => (
            <ul className="skills-marquee-list" key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {technologies.map(({ name, icon: Icon, monogram, color }) => (
                <li className="skills-marquee-item" key={name}>
                  <span className="skills-marquee-dot" aria-hidden="true" />
                  <span className="skills-marquee-icon" style={{ color }} aria-hidden="true">
                    {Icon ? <Icon size={27} strokeWidth={1.5} /> : <span className={monogram === 'TS' ? 'tech-typescript' : 'tech-next'}>{monogram}</span>}
                  </span>
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <button className="skills-marquee-toggle" type="button" aria-label={paused ? 'Play technology animation' : 'Pause technology animation'} aria-pressed={paused} onClick={() => setPaused(!paused)}>
        {paused ? <Play size={15} /> : <Pause size={15} />}
      </button>
    </div>
  );
}
