import { journey } from '../../content/journey';
import { about } from '../../content/about';
import { developerRoles, roleTitles } from '../../content/developer-roles';
import { skills } from '../../content/skills.data';
import { portraits } from '../../content/portraits.data';
import { profile } from '../../content/profile';
import { navigationItems } from '../../content/navigation';
import { featuredProject, projects } from '../../content/projects';
import { technologies } from '../../content/technologies.data';
import { useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import PortfolioLoader from '../../components/loader/PortfolioLoader';
import HeroSection from '../../components/hero/HeroSection';
import AboutSection from '../../components/about/AboutSection';
import JourneySection from '../../components/journey/JourneySection';
import SkillsSection from '../../components/skills/SkillsSection';
import ProjectsSection from '../../components/projects/ProjectsSection';
import ContactSection from '../../components/contact/ContactSection';
import { usePortfolioAnimations } from '../../hooks/usePortfolioAnimations';
import { useAudioUnlock } from '../../hooks/useAudioUnlock';
import '../../styles/styles.scss';

export default function PortfolioPage() {
  useAudioUnlock();
  const [portraitIndex, setPortraitIndex] = useState(0);
  const { root, loader, counter, progress, active } = usePortfolioAnimations();

  return (
    <div ref={root}>
      <PortfolioLoader loader={loader} counter={counter} progress={progress} />
      <a className="skip-link" href="#main">Skip to content</a>
      <Header active={active} profile={profile} navigationItems={navigationItems} />
      <main id="main">
        <HeroSection developerRoles={developerRoles} roleTitles={roleTitles} skills={skills} portraits={portraits} portraitIndex={portraitIndex} setPortraitIndex={setPortraitIndex} />
        <AboutSection content={about} />
        <JourneySection content={journey} />
        <SkillsSection technologies={technologies} />
        <ProjectsSection projects={projects} featuredProject={featuredProject} />
        <ContactSection profile={profile} />
      </main>
      <Footer />
    </div>
  );
}
