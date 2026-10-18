import { useState } from 'react';

const deviconFiles: Record<string, string> = {
  HTML5: 'html5/html5-original.svg',
  CSS3: 'css3/css3-original.svg',
  JavaScript: 'javascript/javascript-original.svg',
  TypeScript: 'typescript/typescript-original.svg',
  React: 'react/react-original.svg',
  'Next.js': 'nextjs/nextjs-original.svg',
  SCSS: 'sass/sass-original.svg',
  'Tailwind CSS': 'tailwindcss/tailwindcss-original.svg',
  Bootstrap: 'bootstrap/bootstrap-original.svg',
  'Node.js': 'nodejs/nodejs-original.svg',
  NestJS: 'nestjs/nestjs-original.svg',
  'Express.js': 'express/express-original.svg',
  MongoDB: 'mongodb/mongodb-original.svg',
  Mongoose: 'mongoose/mongoose-original.svg',
  Figma: 'figma/figma-original.svg',
  Canva: 'canva/canva-original.svg',
  Git: 'git/git-original.svg',
  GitHub: 'github/github-original.svg',
  AWS: 'amazonwebservices/amazonwebservices-original-wordmark.svg',
  'Google Cloud': 'googlecloud/googlecloud-original.svg',
};

const productDomains: Record<string, string> = {
  Codex: 'openai.com',
  'Claude Code': 'claude.ai',
  Antigravity: 'antigravity.google',
};

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
