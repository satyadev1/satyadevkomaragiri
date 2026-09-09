import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, MapPin, Trophy } from 'lucide-react';
import { achievements, companies, hero as data } from '../data/resumeData';

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export function Hero() {
  const award = achievements.find((item) => item.type === 'award');

  return (
    <section id="hero" className="portfolio-hero content-overlay">
      <div className="portfolio-shell hero-layout">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-kicker">
            <span className="status-pulse" aria-hidden="true" />
            {data.availability}
          </div>
          <h1 className="hero-name">
            <span>{data.name}</span>
            <strong>{data.title}</strong>
          </h1>
          <p className="hero-statement">{data.tagline}</p>
          <p className="hero-summary">{data.summary}</p>

          <div className="hero-actions">
            <button className="action-primary" type="button" onClick={() => scrollToSection('achievements')}>
              View selected impact
              <ArrowDownRight size={18} />
            </button>
            <a className="action-secondary" href={'mailto:' + data.contact.email}>
              Start a conversation
              <ArrowUpRight size={18} />
            </a>
          </div>

          <div className="hero-meta">
            <span><MapPin size={16} />{data.location}</span>
            <a href={data.contact.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} />LinkedIn</a>
            <a href={data.contact.github} target="_blank" rel="noreferrer"><Github size={16} />GitHub</a>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.94, x: 24 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.18, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="portrait-panel">
            <div className="portrait-orbit portrait-orbit-one" aria-hidden="true" />
            <div className="portrait-orbit portrait-orbit-two" aria-hidden="true" />
            <img
              src={import.meta.env.BASE_URL + 'profile-photo.jpg'}
              alt="Komaragiri Satyadev"
              className="portrait-image"
            />
            <span className="portrait-index">01 / ENGINEER</span>
          </div>

          {award ? (
            <button className="award-float" type="button" onClick={() => scrollToSection('achievements')}>
              <span className="award-icon"><Trophy size={20} /></span>
              <span>
                <small>{award.year} recognition</small>
                <strong>{award.title}</strong>
              </span>
              <ArrowDownRight size={18} />
            </button>
          ) : null}
        </motion.div>
      </div>

      <motion.div
        className="portfolio-shell company-marquee"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.6 }}
      >
        <span className="company-marquee-label">Experience across</span>
        <div className="company-marquee-list">
          {companies.map((company) => (
            <div className="company-mark" key={company.name}>
              <img
                src={company.logoUrl}
                alt=""
                onError={(event) => {
                  if (company.fallbackLogoUrl && event.currentTarget.src !== company.fallbackLogoUrl) {
                    event.currentTarget.src = company.fallbackLogoUrl;
                  } else {
                    event.currentTarget.style.display = 'none';
                  }
                }}
              />
              <span>{company.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
