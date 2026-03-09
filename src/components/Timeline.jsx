import { useState, useEffect, useRef } from 'react';
import { timeline as data } from '../data/resumeData';
import { TimelineNode } from './TimelineNode';

const THRESHOLDS = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
const HYSTERESIS = 0.18;

export function Timeline({ scrollProgress = 0, scrollY = 0 }) {
  const sectionRef = useRef(null);
  const ratiosRef = useRef({});
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let unobserve = () => {};
    const timeoutId = setTimeout(() => {
      const cards = section.querySelectorAll('[data-timeline-index]');
      if (cards.length === 0) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const idx = entry.target.getAttribute('data-timeline-index');
            if (idx != null) ratiosRef.current[idx] = entry.intersectionRatio;
          });
          const ratios = { ...ratiosRef.current };
          let bestIndex = -1;
          let bestRatio = 0.01;
          Object.keys(ratios).forEach((key) => {
            const r = ratios[key];
            if (typeof r === 'number' && r > bestRatio) {
              bestRatio = r;
              bestIndex = parseInt(key, 10);
            }
          });
          const current = activeIndexRef.current;
          const currentRatio = typeof ratios[current] === 'number' ? ratios[current] : 0;
          if (bestIndex >= 0 && bestIndex !== current && bestRatio < currentRatio + HYSTERESIS) {
            bestIndex = current;
          }
          if (bestIndex >= 0) {
            activeIndexRef.current = bestIndex;
            setActiveIndex(bestIndex);
          }
        },
        { root: null, rootMargin: '0px', threshold: THRESHOLDS }
      );

      cards.forEach((el) => observer.observe(el));
      unobserve = () => cards.forEach((el) => observer.unobserve(el));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      unobserve();
    };
  }, [data.length]);

  return (
    <section ref={sectionRef} id="timeline" className="relative py-28 content-overlay">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-overlay-heading text-center mb-4">
          Roles & experience
        </h2>
        <p className="text-overlay-muted text-center mb-20 max-w-md mx-auto">
          Where I’ve built and shipped systems across product engineering roles
        </p>
        <div className="space-y-20">
          {data.map((event, index) => (
            <div
              key={event.id}
              className="min-h-[260px] flex items-center"
              data-timeline-index={index}
            >
              <TimelineNode
                event={event}
                index={index}
                isLeft={index % 2 === 0}
                isHighlighted={index === activeIndex}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
