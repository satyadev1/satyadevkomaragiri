import { motion } from 'framer-motion';
import { Building2, GraduationCap } from 'lucide-react';

export function TimelineNode({ event, index }) {
  const isEducation = event.type === 'education';
  const yearLabel = event.yearEnd ? event.yearStart + ' — ' + event.yearEnd : event.yearStart + ' — Present';

  return (
    <motion.article
      className="career-card"
      initial={{ opacity: 0, x: 18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.06 }}
    >
      <span className="career-dot" aria-hidden="true" />
      <div className="career-card-header">
        <div className="career-logo">
          {event.logoUrl ? (
            <img
              src={event.logoUrl}
              alt=""
              onError={(imageEvent) => {
                if (event.fallbackLogoUrl && imageEvent.currentTarget.src !== event.fallbackLogoUrl) {
                  imageEvent.currentTarget.src = event.fallbackLogoUrl;
                } else {
                  imageEvent.currentTarget.style.display = 'none';
                }
              }}
            />
          ) : isEducation ? <GraduationCap size={22} /> : <Building2 size={22} />}
        </div>
        <div>
          <span className="career-period">{yearLabel}</span>
          <h3>{event.label}</h3>
          <p className="career-company">
            {event.institution || event.company}
            {event.location ? ' · ' + event.location : ''}
          </p>
        </div>
      </div>
      <p className="career-description">{event.description}</p>
      {event.tech?.length ? (
        <div className="tech-list" aria-label="Technologies used">
          {event.tech.map((technology) => <span key={technology}>{technology}</span>)}
        </div>
      ) : null}
    </motion.article>
  );
}
