import Toast from '../../shared/components/Toast';
import { ArrowRight, ArrowUpRight, Check, Copy, Download, FileText, Lightbulb, Linkedin, Mail, MapPin, MessageSquare, Send, UserRound, Users } from 'lucide-react';
import type { Profile } from '../../content/profile';
import portrait from '../../assets/jaya04.png';
import { useContactForm } from '../../hooks/useContactForm';
import './contact.scss';

export default function ContactSection({ profile }: { profile: Profile }) {
  const { copied, status, sending, copyEmail, sendMessage, notification, dismissNotification } = useContactForm(profile.email);

  return (
    <>
    <Toast key={notification?.id ?? 'empty'} notification={notification} onDismiss={dismissNotification} />
    <section id="contact" className="contact-page" aria-labelledby="contact-title">
      <div className="contact-banner"><div className="container"><h2 id="contact-title">Contact <span>Me</span></h2><p>Let’s build something amazing together.</p></div></div>
      <div className="contact-paper">
        <div className="container contact-main-grid">
          <div className="contact-intro">
            <div className="eyebrow">GET IN TOUCH</div>
            <h2>Let’s Work <span>Together</span></h2>
            <p>Have a project idea, a question, or just want to say hi?<br />I’m always open to new opportunities and collaborations.</p>
            <div className="contact-detail-grid">
              <div className="contact-detail"><span className="contact-detail-icon"><Mail size={21} /></span><div><h3>Email Address</h3><a href={`mailto:${profile.email}`}>{profile.email}</a><button className="contact-copy" type="button" onClick={copyEmail} aria-label="Copy email address">{copied ? <Check size={13} /> : <Copy size={13} />}</button><span className="contact-copy-status" role="status">{copied ? 'Copied!' : ''}</span></div></div>
              <div className="contact-detail"><span className="contact-detail-icon"><Linkedin size={21} /></span><div><h3>LinkedIn</h3><a href={profile.linkedin} target="_blank" rel="noreferrer">Let’s connect <ArrowUpRight size={12} /></a></div></div>
              <div className="contact-detail"><span className="contact-detail-icon"><Download size={21} /></span><div><h3>Resume</h3><a href="/resume.html" target="_blank" rel="noreferrer">View / Save as PDF <ArrowUpRight size={12} /></a></div></div>
              <div className="contact-detail"><span className="contact-detail-icon"><MapPin size={21} /></span><div><h3>Location</h3><p>Tamil Nadu, India</p></div></div>
            </div>
          </div>
          <form className="contact-form" onSubmit={sendMessage} aria-busy={sending}>
            <input type="checkbox" name="botcheck" className="contact-honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="contact-form-row">
              <label><span className="contact-field-label">Your name</span><UserRound size={17} aria-hidden="true" /><input name="name" autoComplete="name" placeholder="Your Name" required maxLength={100} /></label>
              <label><span className="contact-field-label">Your email</span><Mail size={17} aria-hidden="true" /><input name="email" type="email" autoComplete="email" placeholder="Your Email" required maxLength={254} /></label>
            </div>
            <label><span className="contact-field-label">Subject</span><FileText size={17} aria-hidden="true" /><input name="subject" placeholder="Subject" required maxLength={150} /></label>
            <label className="contact-message-field"><span className="contact-field-label">Your message</span><MessageSquare size={17} aria-hidden="true" /><textarea name="message" placeholder="Your Message" required rows={4} maxLength={4000} /></label>
            <button className="contact-send" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send Message'} <ArrowRight size={18} /></button>
            <p className="contact-form-note" role="status">{status || 'Send a message directly — I’ll reply by email.'}</p>
          </form>
        </div>
      </div>
      <div className="contact-closing"><div className="container contact-closing-grid">
        <div className="contact-portrait"><img src={portrait} alt="Jayaprakash with a laptop, surrounded by rose-pink developer artwork" loading="lazy" /><Send className="contact-paper-plane" size={29} aria-hidden="true" /></div>
        <div className="contact-closing-copy"><h2>Turn Your Ideas<br /><span>Into Reality!</span></h2><p>Whether it’s a new project, a collaboration, or just a friendly chat about tech — I’d love to hear from you.</p><div className="contact-promises"><span><MessageSquare size={17} /> Quick Response</span><span><Users size={17} /> Open for Opportunities</span><span><Lightbulb size={17} /> Project Discussion</span></div></div>
      </div></div>
    </section>
    </>
  );
}
