import { useEffect, useState } from 'react';

/** Derive time from the deadline so background tabs cannot cause clock drift. */
export function useCountdown(resetAt?: number) {
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    if (resetAt === undefined) return;
    const update = () => setNow(Date.now());
    const timer = setInterval(update, 1000);
    document.addEventListener('visibilitychange', update);
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', update);
    };
  }, [resetAt]);

  const remainingSeconds = resetAt === undefined ? 0 : Math.max(0, Math.ceil((resetAt - now) / 1000));
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  return { remainingSeconds, formatted: `${minutes}m ${String(seconds).padStart(2, '0')}s` };
}
