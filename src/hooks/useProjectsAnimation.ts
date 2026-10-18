import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useProjectsAnimation() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(min-width: 641px) and (prefers-reduced-motion: no-preference)', () => {
      const section = root.current;
      const track = section?.querySelector<HTMLElement>('.project-grid');
      const viewport = section?.querySelector<HTMLElement>('.projects-viewport');
      if (!section || !track || !viewport) return;
      section.classList.add('is-horizontal');
      const travel = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
      const context = gsap.context(() => {
        gsap.fromTo(track, { x: () => -travel() }, {
          x: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: () => `top ${Math.ceil((document.querySelector('.header')?.getBoundingClientRect().bottom ?? 80) + 12)}px`,
            end: () => `+=${Math.max(travel() * 2, window.innerHeight)}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      }, section);
      return () => { context.revert(); section.classList.remove('is-horizontal'); };
    });
    return () => media.revert();
  }, []);
  return root;
}
