import { motion } from 'framer-motion';
import { Building2, GraduationCap } from 'lucide-react';

export function TimelineNode({ event, index, isLeft, isHighlighted = false }) {
  const isEducation = event.type === 'education';
  const yearLabel = event.yearEnd
    ? `${event.yearStart} – ${event.yearEnd}`
    : `${event.yearStart} – Present`;

  return (
    <motion.div
      className={`flex w-full justify-center items-center px-4 md:px-8 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}
      initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="w-full max-w-xl">
        <motion.article
          className={`glass-card group p-6 md:p-8 rounded-2xl border-l-4 border-l-accent transition-shadow duration-300 ${
            isHighlighted
              ? 'active-glow-card card-glow'
              : ''
          }`}
          initial={false}
          animate={{
            scale: isHighlighted ? 1.02 : 1,
            transition: { type: 'spring', stiffness: 300, damping: 25 },
          }}
          whileHover={{ y: -2 }}
        >
          <div className="flex flex-wrap items-start gap-4 mb-4">
            {event.logoUrl ? (
              <img
                src={event.logoUrl}
                alt=""
                className="w-12 h-12 rounded-xl object-contain bg-white border border-slate-200 p-1.5 shrink-0"
                onError={(e) => {
                  const fallback = event.fallbackLogoUrl;
                  if (fallback && e.currentTarget.src !== fallback) {
                    e.currentTarget.src = fallback;
                    return;
                  }
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                {isEducation ? <GraduationCap size={24} className="text-overlay-muted" /> : <Building2 size={24} className="text-overlay-muted" />}
              </div>
            )}
            <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="text-overlay-muted text-xs uppercase tracking-wider font-medium">
                {isEducation ? 'Education' : 'Role'}
              </span>
              <span className="text-accent font-medium text-sm tabular-nums">
                {yearLabel}
              </span>
              {isEducation ? (
                <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-accent-soft/15 text-accent-soft border border-accent-soft/20">
                  <GraduationCap size={12} />
                  Education
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-accent/15 text-accent border border-accent/20">
                  <Building2 size={12} />
                  Experience
                </span>
              )}
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-accent mb-2 tracking-tight">
              {event.label}
            </h3>
            <p className="text-overlay-muted text-sm font-medium mb-4">
              {event.institution || event.company}
              {event.location && ` · ${event.location}`}
            </p>
            <p className="text-overlay-text text-[15px] leading-relaxed">
              {event.description}
            </p>
            {event.tech && event.tech.length > 0 && (
              <div className={`flex flex-wrap gap-2 mt-5 pt-5 ${isHighlighted ? 'border-t border-white/10' : 'border-t border-white/10 group-hover:border-white/10'}`}>
                <span className={`text-xs uppercase tracking-wider w-full mb-1 ${isHighlighted ? 'highlight-muted' : 'text-overlay-muted hover-highlight-muted'}`}>
                  Tech
                </span>
                {event.tech.map((t) => (
                  <span
                    key={t}
                    className={`text-xs px-2.5 py-1 rounded-md border ${
                      isHighlighted
                        ? 'timeline-tech-chip timeline-tech-chip-highlighted'
                        : 'timeline-tech-chip hover-highlight-chip'
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
            </div>
          </div>
        </motion.article>
      </div>
    </motion.div>
  );
}
