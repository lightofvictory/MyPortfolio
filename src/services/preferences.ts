import { useSyncExternalStore } from 'react';

type Preferences = { theme: 'light' | 'dark'; sound: boolean; volume: number };
const defaults: Preferences = { theme: 'dark', sound: true, volume: 100 };
function readPreferences(): Preferences {
  try {
    const saved = JSON.parse(localStorage.getItem('portfolio-preferences') ?? '{}');
    return { theme: saved.theme === 'light' ? 'light' : 'dark', sound: typeof saved.sound === 'boolean' ? saved.sound : defaults.sound,
      volume: typeof saved.volume === 'number' && Number.isFinite(saved.volume) ? Math.min(100, Math.max(0, saved.volume)) : defaults.volume };
  } catch { return defaults; }
}
let preferences = readPreferences();
const listeners = new Set<() => void>();
let context: AudioContext | undefined;
let master: GainNode | undefined;
let startupPending = false;
function applyTheme() { document.documentElement.dataset.theme = preferences.theme; }
applyTheme();
export function updatePreferences(update: Partial<Preferences>) {
  preferences = { ...preferences, ...update };
  if (!preferences.sound) startupPending = false;
  applyTheme();
  if (master && context) master.gain.setValueAtTime(preferences.sound ? preferences.volume / 100 : 0, context.currentTime);
  try { localStorage.setItem('portfolio-preferences', JSON.stringify(preferences)); } catch { /* Settings still work when storage is unavailable. */ }
  listeners.forEach(listener => listener());
}
export function usePreferences() {
  return useSyncExternalStore(listener => { listeners.add(listener); return () => { listeners.delete(listener); }; }, () => preferences);
}
export function cancelStartupSound() {
  startupPending = false;
}
export function unlockAudio() {
  if (!preferences.sound) return;
  try {
    context ??= new AudioContext();
    if (!master) { master = context.createGain(); master.connect(context.destination); }
    master.gain.setValueAtTime(preferences.volume / 100, context.currentTime);
    void context.resume().then(() => {
      if (startupPending && context?.state === 'running') {
        startupPending = false;
        playSound('loading');
      }
    }).catch(() => {});
  } catch { /* Audio is optional on unsupported browsers. */ }
}
export function playSound(kind: 'typing' | 'deleting' | 'loading' | 'ready') {
  if (!preferences.sound || !preferences.volume || document.hidden) return;
  if (context?.state !== 'running' || !master) {
    if (kind === 'loading') { startupPending = true; unlockAudio(); return true; }
    return;
  }
  if (kind === 'loading') {
    // A warm rising major arpeggio with a sustained final chord.
    const notes = [261.63, 329.63, 392, 523.25, 659.25, 783.99];
    const start = context.currentTime;
    notes.forEach((frequency, index) => {
      const voice = context!.createOscillator();
      const envelope = context!.createGain();
      const onset = start + index * 0.19;
      const length = index < 3 ? 1.3 : 2;
      voice.type = 'sine';
      voice.frequency.setValueAtTime(frequency, onset);
      envelope.gain.setValueAtTime(0, onset);
      envelope.gain.linearRampToValueAtTime(0.23, onset + 0.035);
      envelope.gain.exponentialRampToValueAtTime(0.001, onset + length);
      voice.connect(envelope);
      envelope.connect(master!);
      voice.start(onset);
      voice.stop(onset + length);
      voice.onended = () => { voice.disconnect(); envelope.disconnect(); };
    });
    return true;
  }
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const now = context.currentTime;
  const duration = kind === 'ready' ? 0.35 : 0.035;
  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(kind === 'ready' ? 660 : kind === 'deleting' ? 420 : 620 + Math.random() * 180, now);
  oscillator.frequency.exponentialRampToValueAtTime(kind === 'ready' ? 990 : 120, now + duration);
  gain.gain.setValueAtTime(kind === 'ready' ? 0.07 : 0.05, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  oscillator.connect(gain); gain.connect(master);
  oscillator.start(now); oscillator.stop(now + duration);
  oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
}
