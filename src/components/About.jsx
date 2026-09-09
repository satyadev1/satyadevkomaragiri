import { motion } from 'framer-motion';
import { BrainCircuit, CloudCog, Code2, Gauge } from 'lucide-react';
import { about as data } from '../data/resumeData';

const icons = [BrainCircuit, CloudCog, Code2, Gauge];

export function About() {
  return (
    <section id="about" className="portfolio-section content-overlay">
      <div className="portfolio-shell about-layout">
        <motion.div
          className="section-intro section-intro-sticky"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
        >
          <span className="section-eyebrow">02 / {data.eyebrow}</span>
          <h2>{data.headline}</h2>
          <p>{data.subline}</p>
        </motion.div>

        <div className="principle-grid">
          {data.bullets.map((item, index) => {
            const Icon = icons[index];
            return (
              <motion.article
                className="principle-card"
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: index * 0.07 }}
                whileHover={{ y: -6 }}
              >
                <div className="principle-card-top">
                  <span className="principle-icon"><Icon size={22} /></span>
                  <span className="principle-number">0{index + 1}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
