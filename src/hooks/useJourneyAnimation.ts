import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useJourneyAnimation() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('.journey-content', root.current).forEach((element, index) => {
          gsap.fromTo(element, {
            x: () => {
              const milestone = element.closest<HTMLElement>('.journey-milestone');
              if (!milestone) return index % 2 === 0 ? -200 : 200;
              const left = milestone.getBoundingClientRect().left + element.offsetLeft;
              return index % 2 === 0
                ? -(left + element.offsetWidth + 32)
                : window.innerWidth - left + 32;
            },
            opacity: 0,
          }, {
            x: 0,
            opacity: 1,
            duration: 1.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element.closest('.journey-milestone'),
              start: 'top 90%',
              toggleActions: 'play none none reverse',
              invalidateOnRefresh: true,
            },
          });
        });
        gsap.fromTo('.timeline-spiral-path', { strokeDashoffset: 2000 }, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: { trigger: '.journey-timeline', start: 'top 85%', end: 'bottom 60%', scrub: .7 },
        });
        gsap.fromTo('.journey-line-fill', { scaleY: 0, transformOrigin: 'top center' }, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.journey-timeline', start: 'top 65%', end: 'bottom 65%', scrub: 1, invalidateOnRefresh: true },
        });
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);
  return root;
}
