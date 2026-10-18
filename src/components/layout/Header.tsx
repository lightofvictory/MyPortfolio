import { useNavigationMenu } from '../../hooks/useNavigationMenu';
import { ArrowUpRight, Linkedin, Mail, Menu, X } from 'lucide-react';
import Settings from '../settings/Settings';
import type { Profile } from '../../content/profile';
import type { NavigationItem } from '../../content/navigation';

export default function Header({
  active, profile, navigationItems
}: {
  active: string;
  profile: Profile;
  navigationItems: NavigationItem[];
}) {
  const { menu, setMenu } = useNavigationMenu();
  return <header className="header">
    <div className="container nav">
      <a className="logo" href="#" aria-label="Jayaprakash home">jp<span>.</span>
      </a>
      <nav id="main-navigation" className={menu ? 'navigation open' : 'navigation'} aria-label="Main navigation">
        {navigationItems.map(({ label, id, icon: Icon }) => (
          <a key={id} className={active === id ? 'active' : ''} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setMenu(false)}>
            <Icon size={17} strokeWidth={1.6} aria-hidden="true" />
            <span>{label}</span>
          </a>
        ))}
      </nav>
      <div className="nav-actions">
        <Settings />
        <a className="nav-social" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={21} /></a>
        <a className="nav-social" href={`mailto:${profile.email}`} aria-label="Email Jayaprakash"><Mail size={22} /></a>
      <a className="resume-link" href="/resume.html" target="_blank" rel="noreferrer">Resume <ArrowUpRight size={15} />
      </a>
      </div>
      <button aria-controls="main-navigation" className="menu-toggle" aria-label={menu ? `Close menu` : `Open menu`} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
    </div>
  </header>;
}
