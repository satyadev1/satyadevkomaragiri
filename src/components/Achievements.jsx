import { motion } from 'framer-motion';
import { Boxes, Gauge, Orbit, Trophy } from 'lucide-react';
import { achievements as data } from '../data/resumeData';

const icons = {
  award: Trophy,
  scale: Gauge,
  impact: Orbit,
  platform: Boxes,
};

export function Achievements() {
  return (
    <section id="achievements" className="portfolio-section content-overlay">
      <div className="portfolio-shell">
        <motion.div
          className="section-intro-row"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="section-intro compact">
            <span className="section-eyebrow">03 / Selected impact</span>
            <h2>Proof in shipped outcomes.</h2>
          </div>
          <p>A focused view of recognition, scale, performance, and platform breadth from recent Senior Software Engineer work.</p>
        </motion.div>

        <div className="achievement-grid">
          {data.map((item, index) => {
            const Icon = icons[item.type] || Trophy;
            return (
              <motion.article
                className={index === 0 ? 'achievement-card achievement-card-featured' : 'achievement-card'}
                key={item.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -7 }}
              >
                <div className="achievement-topline">
                  <span>{item.year}</span>
                  <Icon size={22} />
                </div>
                <strong className="achievement-value">{item.highlight}</strong>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
