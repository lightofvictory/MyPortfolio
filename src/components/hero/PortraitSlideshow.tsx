import { usePortraitSlideshow } from '../../hooks/usePortraitSlideshow';
import type { Dispatch, SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import './portrait-transfer.scss';

export default function PortraitSlideshow({ portraits, activeIndex, setActiveIndex }: { portraits: string[]; activeIndex: number; setActiveIndex: Dispatch<SetStateAction<number>> }) {
  const { origin, movingPortrait, setLoaded } = usePortraitSlideshow(portraits, activeIndex, setActiveIndex);

  return <>
    <div ref={origin} className="hero-visual hero-scene personal-portrait" aria-hidden="true" />
    {createPortal(<div ref={movingPortrait} className="portrait-transfer" role="img" aria-label="Jayaprakash, Software Engineer">
      {portraits.map((src, index) => <img key={src} src={src} alt="" aria-hidden="true" className={index === activeIndex ? 'is-active' : ''} fetchPriority={index === 0 ? 'high' : 'auto'} onLoad={() => setLoaded(previous => previous.includes(src) ? previous : [...previous, src])} />)}
    </div>, document.body)}
  </>;
}
