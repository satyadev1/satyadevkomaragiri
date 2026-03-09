import { motion } from 'framer-motion';
import { Mail, Linkedin, MapPin, FileText, ChevronDown } from 'lucide-react';
import { hero as data, companies } from '../data/resumeData';

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center px-6 content-overlay relative">
      <motion.div
        className="text-center max-w-4xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="mb-10 flex justify-center"
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <div className="relative hero-photo-frame">
            <img
              src={`${import.meta.env.BASE_URL}profile-photo.jpg`}
              alt="Komaragiri Satyadev"
              className="hero-photo md:w-64 md:h-64"
            />
          </div>
        </motion.div>

        <motion.p
          className="hero-role-badge font-medium text-sm uppercase tracking-[0.18em] mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className="hero-status-dot" aria-hidden="true" />
          <span>{data.title} @ {data.titleAt}</span>
        </motion.p>
        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="gradient-text">{data.name.split(' ')[0]}</span>
          {data.name.split(' ').length > 1 && (
            <>
              <br />
              <span className="text-overlay-heading">{data.name.split(' ').slice(1).join(' ')}</span>
            </>
          )}
        </motion.h1>
        <motion.p
          className="text-overlay-text text-lg md:text-xl font-normal mb-2 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          {data.tagline}
        </motion.p>
        <motion.div
          className="flex items-center justify-center gap-2 text-overlay-muted text-sm mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          <MapPin size={16} className="shrink-0" />
          <span>{data.location}</span>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {data.stats.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-2xl md:text-3xl font-semibold text-overlay-heading tabular-nums">
                {stat.value}
              </div>
              <div className="text-overlay-muted text-xs uppercase tracking-wider mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <a
            href={data.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="connect-btn primary-cta inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-semibold transition-all duration-200 text-sm"
          >
            <Linkedin size={18} />
            <span>Connect</span>
          </a>
          <button
            onClick={() => scrollToSection('timeline')}
            className="secondary-cta inline-flex items-center gap-2.5 px-6 py-3 rounded-full transition-all duration-200 text-sm font-medium"
          >
            <FileText size={18} />
            Explore
          </button>
        </motion.div>

        <motion.div
          className="terminal-card mx-auto max-w-5xl mb-10"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className="terminal-bar">
            <div className="terminal-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <span className="terminal-path">~/portfolio/software-profile.ts</span>
          </div>
          <div className="terminal-body">
            <div className="terminal-line">
              <span className="terminal-prompt">$</span>
              <span>stack.current()</span>
            </div>
            <div className="logo-grid">
              {data.stack.map((item) => (
                <div key={item.label} className="logo-chip">
                  <img src={item.logoUrl} alt="" className="logo-chip-icon" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="terminal-line terminal-line-secondary">
              <span className="terminal-prompt">$</span>
              <span>companies.experience()</span>
            </div>
            <div className="company-strip">
              {companies.map((company) => (
                <div key={company.name} className="company-chip">
                  <img
                    src={company.logoUrl}
                    alt=""
                    className="company-chip-icon"
                    onError={(e) => {
                      const fallback = company.fallbackLogoUrl;
                      if (fallback && e.currentTarget.src !== fallback) {
                        e.currentTarget.src = fallback;
                        return;
                      }
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div>
                    <div className="company-chip-name">{company.name}</div>
                    <div className="company-chip-role">{company.tenure}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.a
          href="#about"
          onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
          className="inline-flex flex-col items-center gap-1 text-overlay-muted hover:text-overlay-text transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          aria-label="Scroll to about"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown size={20} className="animate-bounce" />
        </motion.a>
      </motion.div>
    </section>
  );
}
