import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Settings2, X } from 'lucide-react';

const sections = [
  { id: 'about', label: 'Approach' },
  { id: 'achievements', label: 'Impact' },
  { id: 'capabilities', label: 'Expertise' },
  { id: 'timeline', label: 'Experience' },
  { id: 'skills', label: 'Toolkit' },
  { id: 'footer', label: 'Contact' },
];

const themes = [
  { id: 'total-dark', label: 'Total Dark' },
  { id: 'confident-collaborator', label: 'Confident Collaborator' },
  { id: 'clean-executive', label: 'Clean Executive' },
  { id: 'ai-lab', label: 'AI Lab' },
];

const backgroundModes = [
  { id: 'tron-beam', label: 'Tron Beam' },
  { id: 'streak-field', label: 'Dot Field' },
  { id: 'comet-dust', label: 'Comet Dust' },
  { id: 'shooting-star', label: 'Shooting Star' },
  { id: 'flow-ribbons', label: 'Flow Ribbons' },
  { id: 'rocket-fleet', label: 'Rocket Fleet' },
  { id: 'robot-scouts', label: 'Robot Scouts' },
  { id: 'ai-signals', label: 'AI Signals' },
];

const controlItems = [
  { id: 'speed', label: 'Speed', min: 0.5, max: 2.2, step: 0.05 },
  { id: 'gravity', label: 'Gravity', min: 0.4, max: 2.6, step: 0.05 },
  { id: 'spread', label: 'Spread', min: 0.6, max: 1.8, step: 0.05 },
  { id: 'density', label: 'Density', min: 0.45, max: 1.8, step: 0.05 },
];

export function Navigation({
  theme,
  onThemeChange,
  backgroundMode,
  onBackgroundModeChange,
  backgroundSettings,
  onBackgroundSettingsChange,
  showBackgroundControls = false,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [devOpen, setDevOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const updateSetting = (id, value) => {
    onBackgroundSettingsChange((current) => ({ ...current, [id]: Number(value) }));
  };

  return (
    <>
      <motion.nav
        className="site-nav content-overlay"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        aria-label="Primary navigation"
      >
        <div className="nav-shell">
          <button type="button" className="nav-brand" onClick={() => scrollTo('hero')} aria-label="Back to top">
            <span>KS</span>
            <strong>Komaragiri Satyadev</strong>
          </button>

          <div className="nav-links">
            {sections.map((section) => (
              <button type="button" key={section.id} onClick={() => scrollTo(section.id)}>{section.label}</button>
            ))}
          </div>

          <div className="nav-actions">
            <label className="theme-control">
              <span className="sr-only">Select theme</span>
              <select value={theme} onChange={(event) => onThemeChange(event.target.value)}>
                {themes.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}
              </select>
            </label>
            <button className="nav-menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="mobile-nav content-overlay"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            {sections.map((section) => (
              <button type="button" key={section.id} onClick={() => scrollTo(section.id)}>{section.label}</button>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>

      {showBackgroundControls ? (
        <div className="dev-controls-wrap content-overlay">
          <button className="dev-controls-toggle" type="button" onClick={() => setDevOpen((open) => !open)}>
            <Settings2 size={18} />
            Background lab
          </button>
          <AnimatePresence>
            {devOpen ? (
              <motion.div
                className="dev-controls"
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.98 }}
              >
                <div className="dev-control-heading">
                  <span>Local development only</span>
                  <button type="button" onClick={() => setDevOpen(false)} aria-label="Close background controls"><X size={17} /></button>
                </div>
                <label className="dev-select">
                  <span>Mode</span>
                  <select value={backgroundMode} onChange={(event) => onBackgroundModeChange(event.target.value)}>
                    {backgroundModes.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
                  </select>
                </label>
                <div className="dev-slider-grid">
                  {controlItems.map((item) => (
                    <label className="dev-slider" key={item.id}>
                      <span><strong>{item.label}</strong><small>{backgroundSettings[item.id].toFixed(2)}x</small></span>
                      <input type="range" min={item.min} max={item.max} step={item.step} value={backgroundSettings[item.id]} onChange={(event) => updateSetting(item.id, event.target.value)} />
                    </label>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      ) : null}
    </>
  );
}
