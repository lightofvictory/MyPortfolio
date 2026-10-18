import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { Moon, Settings2, Sun, Volume2, VolumeX, X } from 'lucide-react';
import { playSound, unlockAudio, updatePreferences, usePreferences } from '../../services/preferences';
import './settings.scss';

export default function Settings() {
  const dialog = useRef<HTMLDialogElement>(null);
  const settings = usePreferences();
  function toggleSound() {
    updatePreferences({ sound: !settings.sound });
    unlockAudio();
    playSound('ready');
  }
  return <>
    <button type="button" className="settings-trigger" aria-label="Open settings" aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}><Settings2 size={20} /></button>
    {createPortal(<dialog ref={dialog} className="settings-dialog" aria-labelledby="settings-title" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="settings-panel">
        <div className="settings-heading"><div><span className="settings-eyebrow">MAKE IT YOURS</span><h2 id="settings-title">Settings</h2></div><button type="button" aria-label="Close settings" onClick={() => dialog.current?.close()}><X size={21} /></button></div>
        <fieldset><legend>Appearance</legend><p>Choose your preferred theme.</p><div className="settings-themes">{(['light', 'dark'] as const).map(theme => <button key={theme} type="button" aria-pressed={settings.theme === theme} onClick={() => updatePreferences({ theme })}>{theme === 'light' ? <Sun size={20} /> : <Moon size={20} />}{theme === 'light' ? 'Light' : 'Dark'}</button>)}</div></fieldset>
        <div className="settings-sound"><div><h3>Sound effects</h3><p>Typing and loading sounds</p></div><button type="button" role="switch" aria-checked={settings.sound} aria-label="Sound effects" onClick={toggleSound}>{settings.sound ? <Volume2 size={18} /> : <VolumeX size={18} />}{settings.sound ? 'On' : 'Off'}</button></div>
        <label className="settings-volume" htmlFor="sound-volume"><span>Volume <output>{settings.volume}%</output></span><input id="sound-volume" type="range" min="0" max="100" step="1" value={settings.volume} onChange={event => { updatePreferences({ volume: Number(event.target.value) }); unlockAudio(); playSound('typing'); }} /></label>
        <button className="settings-preview" type="button" disabled={!settings.sound || settings.volume === 0} onClick={() => { unlockAudio(); playSound('ready'); }}>Preview sound</button>
        <p className="settings-note">Preferences are saved on this device. Loading audio starts after a click or keypress.</p>
      </div>
    </dialog>, document.body)}
  </>;
}
