import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { ArrowDown, ArrowRight, Download } from 'lucide-react';
import PortraitSlideshow from './PortraitSlideshow';
import DeveloperTitle from './DeveloperTitle';
import type { DeveloperRole } from '../../content/developer-roles';
import type { SkillGroup } from '../../content/skills.data';
import HeroSkills from './HeroSkills';
import './hero.scss';

export default function HeroSection({ developerRoles, roleTitles, skills, portraits, portraitIndex, setPortraitIndex }: { developerRoles: DeveloperRole[]; roleTitles: string[]; skills: SkillGroup[]; portraits: string[]; portraitIndex: number; setPortraitIndex: Dispatch<SetStateAction<number>> }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const role = developerRoles[roleIndex];
  return (
    <section className="hero hero-editorial container" aria-labelledby="hero-title">
      <div className="hero-copy editorial-heading" data-reveal>
        <p className="intro">Hi, I’m Jayaprakash</p>
        <DeveloperTitle roles={roleTitles} onRoleChange={setRoleIndex} />
      </div>
      <div className="editorial-left">
        <div className="editorial-availability"><span className="status-dot" /> Available for new opportunities</div>
        <div className="editorial-left-actions">
          <a className="button primary" href="#projects">Explore My Work <ArrowRight size={17} /></a>
          <a className="button secondary" href="/resume.html" target="_blank" rel="noreferrer">Download Resume <Download size={17} /></a>
        </div>
      </div>
      <div className="editorial-description"><div className="role-description" key={role.title}><span className="role-description-label">{role.title}</span><p>{role.description}</p></div><a href="#projects">Explore my work <ArrowRight size={16} /></a></div>
      <PortraitSlideshow portraits={portraits} activeIndex={portraitIndex} setActiveIndex={setPortraitIndex} />
      <div className="editorial-foundation"><span className="editorial-caption">FROM IDEA TO EXPERIENCE</span><HeroSkills skills={skills} /></div>
      <a className="button primary editorial-contact" href="#contact">Get in touch <ArrowRight size={17} /></a>
      <div className="hero-bottom"><a href="#about" aria-label="Scroll to About"><span className="scroll-mouse" aria-hidden="true"><ArrowDown size={13} /></span><span>SCROLL TO EXPLORE</span></a></div>
    </section>
  );
}
