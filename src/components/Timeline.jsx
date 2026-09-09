import { motion } from 'framer-motion';
import { timeline as data } from '../data/resumeData';
import { TimelineNode } from './TimelineNode';

function newestFirst(items) {
  return [...items].sort((a, b) => b.yearStart - a.yearStart);
}

export function Timeline() {
  const sections = [
    {
      id: 'ai-focused',
      title: 'AI-focused projects',
      copy: 'Recent product work where AI, retrieval, orchestration, and complete full-stack delivery converge.',
      items: newestFirst(data.filter((event) => event.type === 'work' && event.era === 'ai-era')),
      featured: true,
    },
    {
      id: 'engineering-foundation',
      title: 'Engineering foundation',
      copy: 'Enterprise platforms, modernization, complex workflows, and dependable product delivery.',
      items: newestFirst(data.filter((event) => event.type === 'work' && event.era === 'pre-ai')),
    },
    {
      id: 'education',
      title: 'Education',
      copy: 'Computer science foundations strengthened by business and organizational context.',
      items: newestFirst(data.filter((event) => event.type === 'education')),
    },
  ];

  return (
    <section id="timeline" className="portfolio-section content-overlay">
      <div className="portfolio-shell career-layout">
        <motion.div
          className="section-intro section-intro-sticky"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
        >
          <span className="section-eyebrow">05 / Career journey</span>
          <h2>Built across the stack. Evolved with the field.</h2>
          <p>Eight years of hands-on engineering, moving from large enterprise platforms into AI-focused product development.</p>
        </motion.div>

        <div className="career-sections">
          {sections.map((section) => (
            <div className={section.featured ? 'era-block era-block-featured' : 'era-block'} key={section.id}>
              <div className="era-header">
                <span>{section.title}</span>
                <p>{section.copy}</p>
              </div>
              <div className="career-track">
                {section.items.map((event, index) => (
                  <TimelineNode event={event} index={index} key={event.id} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
