import TechnologyLogo from '../../shared/components/TechnologyLogo';
import type { SkillGroup } from '../../content/skills.data';

export default function HeroSkills({ skills }: { skills: SkillGroup[] }) {
  return (
    <div className="hero-stack-window">
      <div className="hero-stack-track">
        {[0, 1].map(copy => (
          <ul className="hero-stack" key={copy} aria-label={copy === 0 ? 'All skills and technologies' : undefined} aria-hidden={copy === 1 ? true : undefined}>
            {skills.flatMap(({ items }) => items.map(skill => (
              <li key={skill}>
                <TechnologyLogo name={skill} />
                {skill}
              </li>
            )))}
          </ul>
        ))}
      </div>
    </div>
  );
}
