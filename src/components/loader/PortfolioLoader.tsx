import type { RefObject } from 'react';
import { ArrowUpRight, Braces, CodeXml, Layers } from 'lucide-react';
import './loader.scss';

export default function PortfolioLoader({ loader, counter, progress }: {
  loader: RefObject<HTMLDivElement | null>;
  counter: RefObject<HTMLSpanElement | null>;
  progress: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="loader portfolio-loader" ref={loader} aria-label="Loading portfolio">
      <div className="loader-noise" aria-hidden="true" />
      <div className="loader-inner">
        <div className="loader-top"><span className="loader-brand">jp<span>.</span></span><span>JAYAPRAKASH / PORTFOLIO</span><span className="loader-online"><i /> BUILDING CONNECTIONS</span></div>
        <div className="loader-main">
          <div className="loader-orbital-art">
            <div className="loader-ambient" />
            <svg className="loader-orbits-svg" viewBox="0 0 440 440" fill="none">
              <defs><linearGradient id="loader-ring-light" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ff8db8" /><stop offset=".45" stopColor="#ed2855" /><stop offset="1" stopColor="#ed2855" stopOpacity="0" /></linearGradient></defs>
              <circle className="loader-ring-guide" cx="220" cy="220" r="177" />
              <circle className="loader-ring-spin" cx="220" cy="220" r="177" />
              <ellipse className="loader-orbit-ellipse" cx="220" cy="220" rx="210" ry="92" transform="rotate(-32 220 220)" />
              <ellipse className="loader-orbit-ellipse second" cx="220" cy="220" rx="202" ry="105" transform="rotate(37 220 220)" />
              <circle cx="78" cy="105" r="3" fill="#ff8db8" /><circle cx="365" cy="328" r="3" fill="#f04470" />
            </svg>
            <div className="loader-core"><span>jp<span>.</span></span><span className="loader-core-caption">DESIGN / DEVELOP / DELIVER</span></div>
            <span className="loader-code-tile tile-one"><CodeXml size={24} /></span><span className="loader-code-tile tile-two"><Layers size={23} /></span><span className="loader-code-tile tile-three"><Braces size={21} /></span>
          </div>
          <div className="loader-message"><div className="loader-kicker"><span /> A LITTLE CURIOSITY. A LOT OF CODE.</div><div className="loader-title-mask"><h2 className="loader-name">Ideas into<br /><span>experiences.</span></h2></div><p>Thoughtful interfaces. Connected systems.<br />A portfolio built one detail at a time.</p></div>
        </div>
        <div className="loader-bottom"><div className="loader-status"><span className="loader-status-label">PREPARING YOUR EXPERIENCE</span><span data-loader-status>Setting the scene</span></div><div className="loader-percentage"><span className="loader-count" ref={counter}>0</span><span>%</span></div></div>
        <div className="loader-track"><div ref={progress} /></div>
        <div className="loader-footnote"><span>FULL-STACK DEVELOPER</span><span>WELCOME TO MY CORNER OF THE WEB <ArrowUpRight size={12} /></span></div>
      </div>
    </div>
  );
}
