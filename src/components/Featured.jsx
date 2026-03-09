import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { featured as data } from '../data/resumeData';
import { Sparkles } from 'lucide-react';

const THRESHOLDS = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
const HYSTERESIS = 0.18;

export function Featured() {
  const sectionRef = useRef(null);
  const ratiosRef = useRef({});
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let unobserve = () => {};
    const timeoutId = setTimeout(() => {
      const cards = section.querySelectorAll('[data-featured-index]');
      if (cards.length === 0) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const idx = entry.target.getAttribute('data-featured-index');
            if (idx != null) ratiosRef.current[idx] = entry.intersectionRatio;
          });

          const ratios = { ...ratiosRef.current };
          let bestIndex = -1;
          let bestRatio = 0.01;
          Object.keys(ratios).forEach((key) => {
            const ratio = ratios[key];
            if (typeof ratio === 'number' && ratio > bestRatio) {
              bestRatio = ratio;
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
  }, []);

  return (
    <section ref={sectionRef} id="featured" className="py-24 md:py-32 px-6 content-overlay">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-semibold text-overlay-heading text-center mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Recognition & Highlights
        </motion.h2>
        <motion.p
          className="text-overlay-muted text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Key achievements and impact
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((item, i) => {
            const isHighlighted = i === activeIndex;
            return (
            <motion.article
              key={item.title}
              data-featured-index={i}
              className={`glass-card p-6 rounded-2xl group transition-all duration-300 ${
                isHighlighted
                  ? 'active-glow-card card-glow'
                  : ''
              }`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              animate={{ scale: isHighlighted ? 1.02 : 1, transition: { type: 'spring', stiffness: 300, damping: 28 } }}
              whileHover={{ y: -2 }}
            >
              <div className="flex items-start gap-4 mb-3">
                {item.logoUrl ? (
                  <img
                    src={item.logoUrl}
                    alt=""
                    className="w-11 h-11 rounded-xl object-contain bg-white border border-slate-200 p-1.5 shrink-0"
                    onError={(e) => {
                      const fallback = item.fallbackLogoUrl;
                      if (fallback && e.currentTarget.src !== fallback) {
                        e.currentTarget.src = fallback;
                        return;
                      }
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    isHighlighted ? 'highlight-icon-shell' : 'bg-accent/10 border border-accent/20 hover-highlight-icon-shell'
                  }`}>
                    <Sparkles size={20} className={isHighlighted ? 'highlight-icon' : 'text-accent hover-highlight-icon'} />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <h3 className={`font-display font-medium ${isHighlighted ? 'highlight-text' : 'text-overlay-heading hover-highlight-text'}`}>{item.title}</h3>
                    <span className={`text-xs px-2.5 py-1 rounded-full shrink-0 ${
                      isHighlighted
                        ? 'highlight-icon-shell highlight-icon'
                        : 'bg-accent/15 text-accent border border-accent/20 hover-highlight-tag'
                    }`}>
                      {item.tag}
                    </span>
                  </div>
                  <p className={`text-sm leading-relaxed mt-1 ${isHighlighted ? 'highlight-muted' : 'text-overlay-muted hover-highlight-muted'}`}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
