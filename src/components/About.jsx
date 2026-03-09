import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { about as data } from '../data/resumeData';
import { Zap, Cloud, Users, Award } from 'lucide-react';

const icons = [Zap, Cloud, Users, Award];
const THRESHOLDS = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
const HYSTERESIS = 0.18;

export function About() {
  const sectionRef = useRef(null);
  const ratiosRef = useRef({});
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let unobserve = () => {};
    const timeoutId = setTimeout(() => {
      const cards = section.querySelectorAll('[data-about-index]');
      if (cards.length === 0) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const idx = entry.target.getAttribute('data-about-index');
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
    <section ref={sectionRef} id="about" className="py-24 md:py-32 px-6 content-overlay">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="font-display text-3xl md:text-4xl font-semibold text-overlay-heading text-center mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {data.headline}
        </motion.h2>
        <motion.p
          className="text-overlay-text text-center text-lg leading-relaxed mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {data.subline}
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.bullets.map((item, i) => {
            const Icon = icons[i % icons.length];
            const isHighlighted = i === activeIndex;
            return (
              <motion.div
                key={item.title}
                data-about-index={i}
                className={`glass-card group p-6 rounded-2xl transition-all duration-300 ${
                  isHighlighted
                    ? 'active-glow-card card-glow'
                    : ''
                }`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                animate={{ scale: isHighlighted ? 1.02 : 1, transition: { type: 'spring', stiffness: 300, damping: 28 } }}
                whileHover={{ y: -2 }}
              >
                <div className="flex gap-4">
                  <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                    isHighlighted ? 'highlight-icon-shell' : 'bg-accent/10 border border-accent/20 hover-highlight-icon-shell'
                  }`}>
                    <Icon size={20} className={isHighlighted ? 'highlight-icon' : 'text-accent hover-highlight-icon'} />
                  </div>
                  <div>
                    <h3 className={`font-display font-medium mb-1 ${isHighlighted ? 'highlight-text' : 'text-overlay-heading hover-highlight-text'}`}>{item.title}</h3>
                    <p className={`text-sm leading-relaxed ${isHighlighted ? 'highlight-muted' : 'text-overlay-muted hover-highlight-muted'}`}>{item.desc}</p>
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
