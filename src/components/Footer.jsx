import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail, PenSquare } from 'lucide-react';
import { hero as data } from '../data/resumeData';

const links = [
  { label: 'Email', detail: data.contact.email, href: 'mailto:' + data.contact.email, Icon: Mail },
  { label: 'LinkedIn', href: data.contact.linkedin, Icon: Linkedin },
  { label: 'GitHub', href: data.contact.github, Icon: Github },
  { label: 'Medium', href: data.contact.medium, Icon: PenSquare },
];

export function Footer() {
  return (
    <footer id="footer" className="portfolio-footer content-overlay">
      <motion.div
        className="portfolio-shell contact-panel"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="contact-copy">
          <span className="section-eyebrow">07 / Contact</span>
          <h2>Let’s build something useful.</h2>
          <p>Looking for a strong individual contributor or want to discuss software architecture, AI systems, or product engineering? I’m happy to connect.</p>
        </div>

        <div className="contact-links">
          {links.map(({ label, detail, href, Icon }) => (
              <a className="contact-link" href={href} key={label} target={label === 'Email' ? undefined : '_blank'} rel="noreferrer">
                <span className="contact-link-copy">
                  <Icon size={19} />
                  <span><strong>{label}</strong>{detail ? <small>{detail}</small> : null}</span>
                </span>
                <ArrowUpRight size={18} />
              </a>
          ))}
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Komaragiri Satyadev</span>
          <span>Senior Software Engineer · Hyderabad, India</span>
        </div>
      </motion.div>
    </footer>
  );
}
