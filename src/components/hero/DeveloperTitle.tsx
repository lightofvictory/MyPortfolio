import { useTypewriter } from '../../hooks/useTypewriter';

type DeveloperTitleProps = { roles: string[]; onRoleChange?: (index: number) => void };

export default function DeveloperTitle({ roles, onRoleChange }: DeveloperTitleProps) {
  const textRef = useTypewriter(roles, onRoleChange);

  return (
    <>
    <h1 id="hero-title" className="hero-name developer-title">
      <span className="role-accessible">Full-stack developer specializing in frontend, Next.js, React, backend, and Node.js development.</span>
      <span className="role-gradient" aria-hidden="true" ref={textRef}>Full-Stack Developer</span><span className="typing-caret" aria-hidden="true" />
    </h1>
    </>
  );
}
