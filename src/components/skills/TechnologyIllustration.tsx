import { CodeXml, Layers, Settings2 } from 'lucide-react';
import TechnologyLogo from '../../shared/components/TechnologyLogo';
import type { Technology } from '../../content/technologies.data';

export default function TechnologyIllustration({ technology }: { technology: Technology }) {
  return <div className="toolkit-illustration" aria-hidden="true">
    <div className="toolkit-art-orbit" /><div className="toolkit-art-orbit second" />
    <div className="toolkit-art-window back" /><div className="toolkit-art-window middle" />
    <div className="toolkit-art-window front"><div className="toolkit-art-dots"><i /><i /><i /></div><TechnologyLogo name={technology.name} /></div>
    <span className="toolkit-art-tile code"><CodeXml /></span><span className="toolkit-art-tile layers"><Layers /></span><span className="toolkit-art-tile settings"><Settings2 /></span>
  </div>;
}

