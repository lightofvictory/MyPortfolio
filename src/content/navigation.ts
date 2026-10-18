import { Braces, Fingerprint, MessagesSquare, PanelsTopLeft } from 'lucide-react';

export const navigationItems = [
  { label: 'About', id: 'about', icon: Fingerprint },
  { label: 'Tech Stack', id: 'skills', icon: Braces },
  { label: 'Projects', id: 'projects', icon: PanelsTopLeft },
  { label: 'Contact', id: 'contact', icon: MessagesSquare },
];


export type NavigationItem = (typeof navigationItems)[number];
