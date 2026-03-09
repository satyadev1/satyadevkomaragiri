import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { capabilities as data } from '../data/resumeData';
import { Users, Server, Cloud, Sparkles, Layers } from 'lucide-react';

const iconMap = {
  leadership: Users,
  backend: Server,
  cloud: Cloud,
  ai: Sparkles,
  stack: Layers,
};

const THRESHOLDS = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
const HYSTERESIS = 0.18;

export function Capabilities() {
  const sectionRef = useRef(null);
  const ratiosRef = useRef({});
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let unobserve = () => {};
    const timeoutId = setTimeout(() => {
      const cards = section.querySelectorAll('[data-capability-index]');
      if (cards.length === 0) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const idx = entry.target.getAttribute('data-capability-index');
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
    <section ref={sectionRef} id="capabilities" className="py-24 md:py-32 px-6 content-overlay">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-semibold text-overlay-heading text-center mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          What I do
        </motion.h2>
        <motion.p
          className="text-overlay-muted text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Capabilities across backend, cloud, AI, delivery, and full-stack
        </motion.p>
        <div className="space-y-8">
          {data.map((block, i) => {
            const Icon = iconMap[block.icon] || Server;
            const isHighlighted = i === activeIndex;
            return (
              <motion.div
                key={block.category}
                data-capability-index={i}
                className={`glass-card p-6 md:p-8 rounded-2xl transition-all duration-300 ${
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
                <div className="flex gap-4 mb-4">
                  <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                    isHighlighted ? 'highlight-icon-shell' : 'bg-accent/15 border border-accent/25 hover-highlight-icon-shell'
                  }`}>
                    <Icon size={24} className={isHighlighted ? 'highlight-icon' : 'text-accent hover-highlight-icon'} />
                  </div>
                  <div>
                    <h3 className={`font-display text-xl font-semibold mb-1 ${isHighlighted ? 'highlight-text' : 'text-accent hover-highlight-text'}`}>
                      {block.category}
                    </h3>
                    <ul className="space-y-2">
                      {block.items.map((item, j) => (
                        <li
                          key={j}
                          className={`text-[15px] leading-relaxed flex items-start gap-3 ${isHighlighted ? 'highlight-muted' : 'text-overlay-text hover-highlight-muted'}`}
                        >
                          <span className={`mt-1 shrink-0 ${isHighlighted ? 'highlight-muted' : 'text-accent/80 hover-highlight-muted'}`}>•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
