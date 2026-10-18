import type { RefObject } from 'react';
export default function PortfolioLoader({
  loader,
  counter,
  progress
}: {
  loader: RefObject<HTMLDivElement | null>;
  counter: RefObject<HTMLSpanElement | null>;
  progress: RefObject<HTMLDivElement | null>;
}) {
  return <div className="loader" ref={loader} aria-hidden="true">
    <div className="loader-inner">
      <div className="loader-top">
        <span>JAYAPRAKASH PORTFOLIO</span>
        <span>LOADING</span>
      </div>
      <div className="loader-art loader-name">
        <svg className="loader-globe" viewBox="0 0 1000 440" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="globe-fade" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="white" stopOpacity=".35" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <g id="globe-lines">
              <circle cx="500" cy="210" r="146" />
              <ellipse cx="500" cy="210" rx="105" ry="146" />
              <ellipse cx="500" cy="210" rx="48" ry="146" />
              <ellipse cx="500" cy="210" rx="146" ry="49" />
              <ellipse cx="500" cy="210" rx="146" ry="104" />
              <path d="M354 210h292M500 64v292" />
            </g>
          </defs>
          <g className="globe-grid" stroke="currentColor" strokeWidth=".9">
            <use href="#globe-lines" />
          </g>
          <g className="globe-orbits" stroke="currentColor" strokeWidth=".8">
            <ellipse cx="500" cy="210" rx="280" ry="67" transform="rotate(-24 500 210)" />
            <ellipse cx="500" cy="210" rx="240" ry="80" transform="rotate(28 500 210)" />
          </g>
          <g className="globe-stars" fill="currentColor">
            <circle cx="263" cy="316" r="3" />
            <circle cx="704" cy="319" r="3" />
            <circle cx="731" cy="104" r="2" />
            <circle cx="310" cy="107" r="2" />
            <circle cx="171" cy="217" r="1.5" />
            <circle cx="818" cy="198" r="1.5" />
          </g>
          <path className="globe-horizon" d="M110 360h780" stroke="currentColor" strokeOpacity=".3" />
          <g transform="translate(0 728) scale(1 -.99)" stroke="url(#globe-fade)" strokeWidth=".6" opacity=".35">
            <use href="#globe-lines" />
          </g>
          <text x="500" y="420" textAnchor="middle" fill="currentColor" className="globe-caption">IDEAS WITHOUT BOUNDARIES</text>
        </svg>
      </div>
      <div className="loader-bottom">
        <span>
          <i /> LOADING PORTFOLIO</span>
        <span className="loader-count" ref={counter}>0</span>
      </div>
      <div className="loader-track">
        <div ref={progress} />
      </div>
    </div>
  </div>;
}
