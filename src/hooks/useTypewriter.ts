import { useEffect, useRef } from 'react';
import { playSound } from '../shared/services/preferences';

export function useTypewriter(roles: string[], onRoleChange?: (index: number) => void) {
  const textRef = useRef<HTMLSpanElement>(null);
  const visibleRef = useRef(true);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
    });
    if (textRef.current) observer.observe(textRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let roleIndex = 0;
    let position = roles[0].length;
    let deleting = true;

    function type() {
      const role = roles[roleIndex];
      position += deleting ? -1 : 1;
      if (textRef.current) textRef.current.textContent = role.slice(0, position);
      if (visibleRef.current) playSound(deleting ? 'deleting' : 'typing');
      let delay = deleting ? 40 : 85;
      if (position === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        onRoleChange?.(roleIndex);
        delay = 350;
      } else if (!deleting && position === role.length) {
        deleting = true;
        delay = 2200;
      }
      timeout = setTimeout(type, delay);
    }

    function start() {
      clearTimeout(timeout);
      roleIndex = 0;
      position = roles[0].length;
      deleting = true;
      if (textRef.current) textRef.current.textContent = roles[0];
      if (!motion.matches) timeout = setTimeout(type, 2200);
    }
    start();
    const restart = () => { start(); onRoleChange?.(0); };
    motion.addEventListener('change', restart);
    return () => { clearTimeout(timeout); motion.removeEventListener('change', restart); };
  }, [onRoleChange, roles]);

  return textRef;
}
