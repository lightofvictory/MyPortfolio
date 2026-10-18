import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import type { Technology } from '../content/technologies.data';
import { wrapIndex, circularDistance } from '../utils/carousel';

export function useTechnologyCarousel(technologies: Technology[]) {
  const count = technologies.length;
  const wrap = (index: number) => wrapIndex(index, count);
  const distance = (index: number, active: number) => circularDistance(index, active, count);
  const root = useRef<HTMLElement>(null);
  const context = useRef<gsap.Context | null>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const previousPositions = useRef(new Map<number, number>());
  const initialized = useRef(false);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [width, setWidth] = useState(1120);
  const current = technologies[active];

  useLayoutEffect(() => {
    context.current = gsap.context(() => {}, root);
    const positions = previousPositions.current;
    const observer = new ResizeObserver(entries => {
      const nextWidth = entries[0]?.contentRect.width;
      if (nextWidth) setWidth(nextWidth);
    });
    const container = root.current?.querySelector('.container');
    if (container) observer.observe(container);
    return () => {
      observer.disconnect();
      timeline.current?.kill();
      context.current?.revert();
      context.current = null;
      initialized.current = false;
      positions.clear();
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReduced(media.matches);
    media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);

  useEffect(() => {
    let timer: gsap.core.Tween | undefined;
    const schedule = () => {
      timer?.kill();
      if (!hovered && !reduced && !document.hidden) {
        timer = gsap.delayedCall(5, () => setActive(index => wrapIndex(index + 1, count)));
      }
    };
    schedule();
    document.addEventListener('visibilitychange', schedule);
    return () => { timer?.kill(); document.removeEventListener('visibilitychange', schedule); };
  }, [active, hovered, reduced, count]);

  useLayoutEffect(() => {
    context.current?.add(() => {
      timeline.current?.kill();
      const duration = initialized.current && !reduced ? 2 : 0;
      const next = gsap.timeline({ defaults: { duration, ease: 'power3.inOut', overwrite: 'auto' } });
      const step = width < 640 ? Math.min(80, width / 4.3) : Math.min(91, width / 12);
      const mainWidth = width < 640 ? width - 32 : Math.min(704, width * .65);
      root.current?.querySelectorAll<HTMLElement>('.toolkit-tech').forEach((element, index) => {
        const delta = circularDistance(index, active, count);
        const absolute = Math.abs(delta);
        const previous = previousPositions.current.get(index);
        const position = {
          x: delta * step,
          y: Math.min(delta * delta * (width < 640 ? 10 : 3.6), 250),
          rotation: delta * 7,
          scale: delta === 0 ? 1.12 : Math.max(.65, 1 - absolute * .04),
          opacity: absolute > 6 ? 0 : Math.max(.12, 1 - absolute * .14),
          filter: `blur(${Math.max(0, absolute - 2) * 1.1}px)`,
        };
        gsap.set(element, { zIndex: count - absolute, pointerEvents: absolute <= 5 ? 'auto' : 'none' });
        if (previous !== undefined && Math.abs(previous - delta) > count / 2) gsap.set(element, position);
        else next.to(element, position, 0);
        previousPositions.current.set(index, delta);
      });
      root.current?.querySelectorAll<HTMLElement>('.toolkit-info-card').forEach((element, index) => {
        const delta = circularDistance(index, active, count);
        const absolute = Math.abs(delta);
        gsap.set(element, { zIndex: count - absolute, pointerEvents: delta === 0 ? 'auto' : 'none' });
        const target = { x: delta * (mainWidth + 22), rotationY: delta === 0 ? 0 : delta < 0 ? 13 : -13, rotationZ: delta === 0 ? 0 : delta < 0 ? 8 : -8, scale: delta === 0 ? 1 : .92, opacity: absolute > 1 ? 0 : delta === 0 ? 1 : .32, filter: `blur(${delta === 0 ? 0 : 2}px)` };
        if (absolute > 2) gsap.set(element, target);
        else next.to(element, target, 0);
      });
      if (duration) next.fromTo('.toolkit-active-copy', { opacity: .2, y: 7 }, { opacity: 1, y: 0, duration: 1.2 }, .4);
      timeline.current = next;
      initialized.current = true;
    });
  }, [active, width, reduced, count]);

  return { root, active, setActive, hovered, setHovered, current, wrap, distance };
}
