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

  const sections = [
    {
      id: 'education',
      title: 'Education',
      copy: 'Academic foundation and business context alongside hands-on engineering work',
      items: data.filter((event) => event.type === 'education'),
    },
    {
      id: 'pre-ai',
      title: 'Pre-AI Projects',
      copy: 'Core product engineering, platform modernization, and delivery before AI-heavy product work',
      items: data.filter((event) => event.type === 'work' && event.era === 'pre-ai'),
    },
    {
      id: 'ai-era',
      title: 'AI Focused Projects',
      copy: 'AI-heavy product work across agentic systems, RAG, tuning, and full-stack delivery',
      items: data.filter((event) => event.type === 'work' && event.era === 'ai-era'),
    },
  ];

  const renderedItems = sections.flatMap((section) => section.items);

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
          {sections.map((section) => (
            <div key={section.id} className="space-y-10">
              <div className="text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center px-5 py-2 rounded-full border border-accent/30 bg-accent/15 text-accent text-sm uppercase tracking-[0.24em] font-semibold mb-4 shadow-[0_0_22px_rgba(59,130,246,0.14)]">
                  {section.title}
                </div>
                <p className="text-overlay-muted text-sm md:text-base">
                  {section.copy}
                </p>
              </div>
              <div className="space-y-20">
                {section.items.map((event) => {
                  const index = renderedItems.findIndex((item) => item.id === event.id);
                  return (
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
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
