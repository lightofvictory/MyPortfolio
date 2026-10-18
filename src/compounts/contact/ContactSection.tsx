import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy, Download, Linkedin, Mail } from 'lucide-react';
import { profile } from '../../data/profile';
export default function ContactSection() {
  const [copied, setCopied] = useState(false),
    resetTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(resetTimerRef.current), []);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }
  return <section id="contact" className="contact section">
    <div className="container" data-reveal={true}>
      <div className="eyebrow">04 — WHAT’S NEXT?</div>
      <h2>Good things start<br />with a conversation<span>.</span>
      </h2>
      <p>Have an idea, a project, or an opportunity?<br />I’d love to hear about it. Let’s make something meaningful.</p>
      <a className="button primary" href={`mailto:${profile.email}`}>Say hello <ArrowUpRight size={18} />
      </a>
      <div className="contact-email">
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <button onClick={copyEmail} aria-label="Copy email address">{copied ? <Check size={16} /> : <Copy size={16} />}</button>
        <span role="status">{copied ? `Copied!` : ``}</span>
      </div>
      <div className="social-links">
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          <Linkedin size={17} /> LinkedIn <ArrowUpRight size={14} />
        </a>
        <a href={`mailto:${profile.email}`}>
          <Mail size={17} /> Email <ArrowUpRight size={14} />
        </a>
        <a href="/resume.html" target="_blank" rel="noreferrer">
          <Download size={17} /> Resume <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  </section>;
}
