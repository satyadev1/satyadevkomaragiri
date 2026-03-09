import { motion } from 'framer-motion';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'capabilities', label: 'What I do' },
  { id: 'timeline', label: 'Experience' },
  { id: 'featured', label: 'Featured' },
  { id: 'skills', label: 'Skills' },
  { id: 'footer', label: 'Contact' },
];

const themes = [
  { id: 'total-dark', label: 'Total Dark' },
  { id: 'confident-collaborator', label: 'Confident Collaborator' },
  { id: 'clean-executive', label: 'Clean Executive' },
  { id: 'ai-lab', label: 'AI Lab' },
];

export function Navigation({ theme, onThemeChange }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 content-overlay" aria-label="Page sections">
      <motion.div
        className="theme-switcher"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="theme-switcher-label">Themes</div>
        <div className="theme-switcher-list">
          {themes.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onThemeChange(item.id)}
              className={`theme-switcher-chip ${theme === item.id ? 'theme-switcher-chip-active' : ''}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </motion.div>
      <ul className="hidden md:flex flex-col gap-5">
        {sections.map((s) => (
          <li key={s.id}>
            <motion.button
              onClick={() => scrollTo(s.id)}
              className="nav-dot"
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to ${s.label}`}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
