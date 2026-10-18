import { useEffect, useState } from 'react';
import Header from './compounts/layout/Header';
import Footer from './compounts/layout/Footer';
import PortfolioLoader from './compounts/loader/PortfolioLoader';
import HeroSection from './compounts/hero/HeroSection';
import AboutSection from './compounts/about/AboutSection';
import JourneySection from './compounts/journey/JourneySection';
import SkillsSection from './compounts/skills/SkillsSection';
import ProjectsSection from './compounts/projects/ProjectsSection';
import ContactSection from './compounts/contact/ContactSection';
import { usePortfolioAnimations } from './hooks/usePortfolioAnimations';
import { unlockAudio } from './services/preferences';
import './styles.scss';

export default function App() {
  useEffect(() => {
    window.addEventListener('pointerdown', unlockAudio);
    window.addEventListener('keydown', unlockAudio);
    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, []);
  const [portraitIndex, setPortraitIndex] = useState(0);
  const { root, loader, counter, progress, active } = usePortfolioAnimations();

  return (
    <div ref={root}>
      <PortfolioLoader loader={loader} counter={counter} progress={progress} />
      <a className="skip-link" href="#main">Skip to content</a>
      <Header active={active} />
      <main id="main">
        <HeroSection portraitIndex={portraitIndex} setPortraitIndex={setPortraitIndex} />
        <AboutSection />
        <JourneySection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
