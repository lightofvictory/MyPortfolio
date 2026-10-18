import { Layers3, Leaf } from 'lucide-react';

export const projects = [
  {
    name: 'Plant Center',
    url: 'https://plantcenter.netlify.app/',
    domain: 'plantcenter.netlify.app',
    className: 'plant-center',
    icon: Leaf,
    description: 'Plant Center — a personal website project. Explore the live site to see the complete experience.',
  },
  {
    name: 'Stonescape',
    url: 'https://stonescape.netlify.app/',
    domain: 'stonescape.netlify.app',
    className: 'stonescape',
    icon: Layers3,
    description: 'Stonescape — a personal website project. Open the live site to explore its design and content.',
  },
];


export type LinkedProject = (typeof projects)[number];

export const featuredProject = {
  name: 'Real Estate Website',
  url: 'https://chipper-cactus-08f27d.netlify.app/',
  description: 'A responsive real-estate website, bringing property discovery into a clear, approachable web experience.',
};

export type FeaturedProject = typeof featuredProject;
