import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portraits } from './portraits.data';
import './portrait-transfer.scss';

gsap.registerPlugin(ScrollTrigger);

// Layout coordinates exclude the hero's own entrance transforms.
function layoutBox(element: HTMLElement) {
  let x = 0;
  let y = 0;
  let parent: HTMLElement | null = element;
  while (parent) {
    x += parent.offsetLeft;
    y += parent.offsetTop;
    parent = parent.offsetParent as HTMLElement | null;
  }
  return { x, y, width: element.offsetWidth, height: element.offsetHeight };
}

export default function PortraitSlideshow({ activeIndex, setActiveIndex }: { activeIndex: number; setActiveIndex: Dispatch<SetStateAction<number>> }) {
  const origin = useRef<HTMLDivElement>(null);
  const movingPortrait = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState<string[]>([]);
  const ready = loaded.length === portraits.length;

  useLayoutEffect(() => {
    const source = origin.current;
    const image = movingPortrait.current;
    const destination = document.querySelector<HTMLElement>('.about-portrait');
    const hero = source?.closest('.hero');
    const about = destination?.closest('#about');
    if (!source || !image || !destination || !hero || !about) return;

    const media = gsap.matchMedia();
    media.add({ animated: '(prefers-reduced-motion: no-preference)', reduced: '(prefers-reduced-motion: reduce)' }, match => {
      const context = gsap.context(() => {
        gsap.set(image, { ...layoutBox(source), opacity: 1 });
        if (match.conditions?.reduced) return;
        gsap.fromTo(image, {
          x: () => layoutBox(source).x,
          y: () => layoutBox(source).y,
          width: () => layoutBox(source).width,
          height: () => layoutBox(source).height,
        }, {
          x: () => layoutBox(destination).x,
          y: () => layoutBox(destination).y,
          width: () => layoutBox(destination).width,
          height: () => layoutBox(destination).height,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            endTrigger: about,
            end: 'top 15%',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
      return () => context.revert();
    });
    let disposed = false;
    document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh(); });
    return () => { disposed = true; media.revert(); };
  }, []);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let interval: ReturnType<typeof setInterval> | undefined;
    function syncPlayback() {
      clearInterval(interval);
      if (!motion.matches && ready && !document.hidden) {
        interval = setInterval(() => setActiveIndex(index => (index + 1) % portraits.length), 5000);
      }
    }
    syncPlayback();
    motion.addEventListener('change', syncPlayback);
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      clearInterval(interval);
      motion.removeEventListener('change', syncPlayback);
      document.removeEventListener('visibilitychange', syncPlayback);
    };
  }, [ready, activeIndex, setActiveIndex]);

  return <>
    <div ref={origin} className="hero-visual hero-scene personal-portrait" aria-hidden="true" />
    {createPortal(<div ref={movingPortrait} className="portrait-transfer" role="img" aria-label="Jayaprakash, Software Engineer">
      {portraits.map((src, index) => <img key={src} src={src} alt="" aria-hidden="true" className={index === activeIndex ? 'is-active' : ''} fetchPriority={index === 0 ? 'high' : 'auto'} onLoad={() => setLoaded(previous => previous.includes(src) ? previous : [...previous, src])} />)}
    </div>, document.body)}
  </>;
}
