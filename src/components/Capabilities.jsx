import { motion } from 'framer-motion';
import { BrainCircuit, Cloud, Layers3, Server, Workflow } from 'lucide-react';
import { capabilities as data } from '../data/resumeData';

const iconMap = {
  leadership: Workflow,
  backend: Server,
  cloud: Cloud,
  ai: BrainCircuit,
  stack: Layers3,
};

export function Capabilities() {
  return (
    <section id="capabilities" className="portfolio-section content-overlay">
      <div className="portfolio-shell">
        <motion.div
          className="section-intro-row"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="section-intro compact">
            <span className="section-eyebrow">04 / Engineering range</span>
            <h2>From architecture to production.</h2>
          </div>
          <p>I’m most effective when the work crosses boundaries: product thinking, backend depth, frontend clarity, AI quality, and operational ownership.</p>
        </motion.div>

        <div className="capability-grid">
          {data.map((block, index) => {
            const Icon = iconMap[block.icon] || Server;
            return (
              <motion.article
                className="capability-card"
                key={block.category}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="capability-title">
                  <span className="capability-icon"><Icon size={22} /></span>
                  <h3>{block.category}</h3>
                </div>
                <ul className="capability-list">
                  {block.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
