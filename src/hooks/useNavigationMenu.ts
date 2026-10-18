import { useEffect, useState } from 'react';

export function useNavigationMenu() {
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const e = (e: KeyboardEvent) => {
      if(e.key === `Escape`) {
        setMenu(false);
      }
    };
    window.addEventListener('keydown', e);
    return () => window.removeEventListener('keydown', e);
  }, []);
  return { menu, setMenu };
}
