import { useEffect } from 'react';
import { unlockAudio } from '../shared/services/preferences';

export function useAudioUnlock() {
  useEffect(() => {
    window.addEventListener('pointerdown', unlockAudio);
    window.addEventListener('keydown', unlockAudio);
    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, []);
}
