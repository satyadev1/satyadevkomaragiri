import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, PenSquare } from 'lucide-react';
import { hero as data } from '../data/resumeData';

export function Footer({ scrollProgress = 0 }) {
  const isHighlighted = scrollProgress >= 0.92;
  return (
    <footer id="footer" className="py-28 px-6 content-overlay">
      <motion.div
        className={`footer-oval max-w-2xl mx-auto ${isHighlighted ? 'footer-oval-highlighted' : ''}`}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="footer-oval-inner">
          <h3
            className={`font-display text-2xl md:text-3xl font-semibold mb-4 ${isHighlighted ? 'text-white' : ''}`}
            style={isHighlighted ? undefined : { color: 'var(--footer-text-strong)' }}
          >
            Let's build something together
          </h3>
          <p
            className={`text-sm md:text-base mb-10 max-w-md mx-auto leading-relaxed ${isHighlighted ? 'text-white/85' : ''}`}
            style={isHighlighted ? undefined : { color: 'var(--footer-text-body)' }}
          >
            Whether you're looking for a strong individual contributor or want to discuss software architecture — I'm happy to connect.
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-8">
            <a
              href={`mailto:${data.contact.email}`}
              className={`inline-flex items-center gap-2.5 transition-colors text-sm font-medium ${isHighlighted ? 'text-white hover:text-white/80' : 'hover:text-accent'}`}
              style={isHighlighted ? undefined : { color: 'var(--footer-text-link)' }}
            >
              <Mail size={18} className="shrink-0" />
              <span>{data.contact.email}</span>
            </a>
            <a
              href={data.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2.5 transition-colors text-sm font-medium ${isHighlighted ? 'text-white hover:text-white/80' : 'hover:text-accent'}`}
              style={isHighlighted ? undefined : { color: 'var(--footer-text-link)' }}
            >
              <Linkedin size={18} className="shrink-0" />
              <span>LinkedIn</span>
            </a>
            <a
              href={data.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2.5 transition-colors text-sm font-medium ${isHighlighted ? 'text-white hover:text-white/80' : 'hover:text-accent'}`}
              style={isHighlighted ? undefined : { color: 'var(--footer-text-link)' }}
            >
              <Github size={18} className="shrink-0" />
              <span>GitHub</span>
            </a>
            <a
              href={data.contact.medium}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2.5 transition-colors text-sm font-medium ${isHighlighted ? 'text-white hover:text-white/80' : 'hover:text-accent'}`}
              style={isHighlighted ? undefined : { color: 'var(--footer-text-link)' }}
            >
              <PenSquare size={18} className="shrink-0" />
              <span>Medium</span>
            </a>
          </div>
          <p
            className={`text-xs ${isHighlighted ? 'text-white/70' : ''}`}
            style={isHighlighted ? undefined : { color: 'var(--footer-text-subtle)' }}
          >
            © {new Date().getFullYear()} Komaragiri Satyadev · React & Three.js
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
