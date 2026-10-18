import { useCallback, useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { submitContactMessage } from '../services/contact';
import { ContactLimitError, withContactLimit } from '../services/contactLimit';
import type { ToastMessage } from '../shared/components/Toast';

export function useContactForm(email: string) {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const [notification, setNotification] = useState<ToastMessage | null>(null);
  const dismissNotification = useCallback(() => setNotification(null), []);
  const requestRef = useRef<AbortController | null>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => { clearTimeout(resetTimerRef.current); requestRef.current?.abort(); }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = setTimeout(() => setCopied(false), 2500);
    } catch { window.location.href = `mailto:${email}`; }
  }

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (requestRef.current) return;
    const element = event.currentTarget;
    const form = new FormData(element);
    if (form.get('botcheck')) return;
    const controller = new AbortController();
    requestRef.current = controller;
    setSending(true);
    setStatus('Sending your message…');
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      await withContactLimit(String(form.get('email') ?? ''), async () => {
        if (controller.signal.aborted) throw new Error('The request timed out.');
        await submitContactMessage(form, import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? '', controller.signal);
      });
      setNotification(null);
      setStatus('Thank you! Your message has been sent. I’ll get back to you soon.');
      element.reset();
    } catch (error) {
      if (error instanceof ContactLimitError) {
        setNotification({ id: Date.now(), message: error.message, resetAt: error.resetAt });
      }
      setStatus(error instanceof ContactLimitError
        ? 'You’ve reached your email limit. See the notification for the live reset countdown.'
        : controller.signal.aborted
        ? 'The request timed out. Please try again or use the email link.'
        : error instanceof Error ? error.message : 'Unable to send your message. Please try again.');
    } finally {
      clearTimeout(timeout);
      requestRef.current = null;
      setSending(false);
    }
  }

  return { copied, status, sending, copyEmail, sendMessage, notification, dismissNotification };
}
