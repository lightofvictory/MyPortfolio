import { Atom, Cloud, CodeXml, Database, GitBranch, Hexagon } from 'lucide-react';

export const marqueeTechnologies = [
  { name: 'Git', icon: GitBranch, color: '#f17053' },
  { name: 'React', icon: Atom, color: '#61dafb' },
  { name: 'Next.js', monogram: 'N', color: '#f5f5f5' },
  { name: 'TypeScript', monogram: 'TS', color: '#66a8ed' },
  { name: 'Node.js', icon: Hexagon, color: '#79b866' },
  { name: 'NestJS', icon: CodeXml, color: '#ed2855' },
  { name: 'MongoDB', icon: Database, color: '#68ae65' },
  { name: 'AWS', icon: Cloud, color: '#ffa940' },
];

export type MarqueeTechnology = (typeof marqueeTechnologies)[number];
