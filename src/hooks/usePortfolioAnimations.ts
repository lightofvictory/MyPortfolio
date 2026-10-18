import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { cancelStartupSound, playSound, unlockAudio } from '../services/preferences';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

export function usePortfolioAnimations() {
  const root = useRef<HTMLDivElement>(null);
  const loader = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState('');
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const media = gsap.matchMedia();
    let lenis: Lenis | undefined;
    const tick = (time: number) => lenis?.raf(time * 1000);
    media.add('(prefers-reduced-motion: no-preference)', () => {
      lenis = new Lenis({ anchors: { offset: -90 }, duration: 1.05 });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);
      const revealElements = gsap.utils.toArray<HTMLElement>('[data-reveal]', root.current)
        .filter(element => !element.closest('.hero, .journey'));
      revealElements.forEach((element, index) => {
        const distance = window.matchMedia('(max-width: 640px)').matches ? 24 : 65;
        gsap.fromTo(element,
          { x: index % 2 === 0 ? -distance : distance, y: 12, opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: element,
              start: 'top 94%',
              end: 'top 72%',
              scrub: 0.7,
            },
          },
        );
      });
      return () => { gsap.ticker.remove(tick); lenis?.destroy(); lenis = undefined; };
    });
    const intro = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) {
        gsap.set(loader.current, { display: 'none' });
        return;
      }
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      lenis?.stop();
      let startupPlayed = playSound('loading') === true;
      const enableLoadingAudio = () => { unlockAudio(); };
      window.addEventListener('pointerdown', enableLoadingAudio);
      window.addEventListener('keydown', enableLoadingAudio);
      unlockAudio();
      cleanups.push(() => {
        cancelStartupSound();
        window.removeEventListener('pointerdown', enableLoadingAudio);
        window.removeEventListener('keydown', enableLoadingAudio);
      });
      const value = { percent: 0 };
      const timeline = gsap.timeline();
      timeline.fromTo('.loader-name', { yPercent: 110 }, { yPercent: 0, duration: 0.7, ease: 'power3.out' })
        .to(value, { percent: 100, duration: 3.2, ease: 'power2.inOut', onUpdate: () => {
          if (!startupPlayed) startupPlayed = playSound('loading') === true;
          if (counter.current) counter.current.textContent = String(Math.round(value.percent)).padStart(2, '0');
          const status = loader.current?.querySelector('[data-loader-status]');
          if (status) status.textContent = value.percent < 30 ? 'Setting the scene' : value.percent < 65 ? 'Connecting the details' : value.percent < 95 ? 'Bringing it all together' : 'Welcome. Let’s explore.';
          if (progress.current) progress.current.style.transform = `scaleX(${value.percent / 100})`;
        } }, 0.2)
        .to('.loader-inner', { y: -35, opacity: 0, duration: 0.45 }, '+=0.15')
        .to(loader.current, { yPercent: -100, duration: 0.85, ease: 'power4.inOut', onComplete: () => {
          cancelStartupSound();
          playSound('ready');
          window.removeEventListener('pointerdown', enableLoadingAudio);
          window.removeEventListener('keydown', enableLoadingAudio);
          gsap.set(loader.current, { display: 'none' });
          document.body.style.overflow = previousOverflow;
          lenis?.start();
          ScrollTrigger.refresh();
        } }, '-=0.1')
        .from('.header .nav > *', { y: -18, opacity: 0, stagger: 0.08, duration: 0.6 }, '-=0.35')
        .from('.hero-copy > *', { y: 45, opacity: 0, stagger: 0.09, duration: 0.85, ease: 'power3.out' }, '-=0.5')
        .from('.hero-visual', { y: 65, opacity: 0, rotate: 3, duration: 1, ease: 'power3.out' }, '<0.2')
        .from('.hero-bottom', { opacity: 0, duration: 0.5 }, '-=0.4');
      gsap.to('.portrait-wrap > img', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.utils.toArray<HTMLElement>('.skill-card, .project-card').forEach((card) => {
        const move = (event: PointerEvent) => {
          if (event.pointerType !== 'mouse') return;
          const bounds = card.getBoundingClientRect();
          gsap.to(card, { rotateY: ((event.clientX - bounds.left) / bounds.width - 0.5) * 5, rotateX: ((event.clientY - bounds.top) / bounds.height - 0.5) * -5, transformPerspective: 1000, duration: 0.4, overwrite: 'auto' });
        };
        const reset = () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, overwrite: 'auto' });
        card.addEventListener('pointermove', move);
        card.addEventListener('pointerleave', reset);
        cleanups.push(() => { card.removeEventListener('pointermove', move); card.removeEventListener('pointerleave', reset); });
      });
      cleanups.push(() => { document.body.style.overflow = previousOverflow; });
    }, root);
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); }), { rootMargin: '-20% 0px -55% 0px' });
    root.current?.querySelectorAll('section[id]').forEach(section => observer.observe(section));
    return () => { intro.revert(); cleanups.forEach(cleanup => cleanup()); media.revert(); observer.disconnect(); };
  }, []);
  return { root, loader, counter, progress, active };
}
