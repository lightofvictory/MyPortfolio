import { CodeXml, Layers, Wrench } from 'lucide-react';

export const skills = [{
  icon: CodeXml,
  name: `Frontend development`,
  description: `Interfaces that feel as good as they look.`,
  items: [`HTML5`, `CSS3`, `JavaScript`, `TypeScript`, `React`, `Next.js`, `SCSS`, `Tailwind CSS`, `Bootstrap`]
}, {
  icon: Layers,
  name: `Backend & databases`,
  description: `Connecting the interface to what powers it.`,
  items: [`Node.js`, `NestJS`, `Express.js`, `MongoDB`, `Mongoose`]
}, {
  icon: Wrench,
  name: `Design & workflow`,
  description: `The tools behind a thoughtful build.`,
  items: [`Figma`, `Canva`, `Git`, `GitHub`, `AWS`, `Google Cloud`, `Codex`, `Claude Code`, `Antigravity`]
}];

export type SkillGroup = (typeof skills)[number];
