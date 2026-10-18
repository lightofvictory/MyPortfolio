import { deviconFiles, productDomains } from '../technologyLogos';
import { useState } from 'react';

export default function TechnologyLogo({ name }: { name: string }) {
  const [failed, setFailed] = useState(false);
  const file = deviconFiles[name];
  const domain = productDomains[name];
  const source = file
    ? `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/${file}`
    : domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64` : undefined;

  return (
    <span className={`technology-logo${['Next.js', 'Express.js', 'GitHub', 'Codex'].includes(name) ? ' technology-logo-light' : ''}`} aria-hidden="true">
      {source && !failed
        ? <img src={source} alt="" width={20} height={20} loading="eager" onError={() => setFailed(true)} />
        : <span className="technology-logo-fallback">{name.slice(0, 2)}</span>}
    </span>
  );
}
