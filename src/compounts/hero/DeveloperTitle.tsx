import { useEffect, useRef } from 'react';

import { developerRoles } from './developer-roles';

const roles = developerRoles.map(role => role.title);

type DeveloperTitleProps = { onRoleChange?: (index: number) => void };

export default function DeveloperTitle({ onRoleChange }: DeveloperTitleProps = {}) {
  const textRef = useRef<HTMLSpanElement>(null);

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
  }, [onRoleChange]);

  return (
    <h1 id="hero-title" className="hero-name developer-title">
      <span className="role-accessible">Full-stack developer specializing in frontend, Next.js, React, backend, and Node.js development.</span>
      <span className="role-gradient" aria-hidden="true" ref={textRef}>Full-Stack Developer</span><span className="typing-caret" aria-hidden="true" />
    </h1>
  );
}
