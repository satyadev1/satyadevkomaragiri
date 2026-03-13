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

const backgroundModes = [
  { id: 'streak-field', label: 'Streak Field' },
  { id: 'comet-dust', label: 'Comet Dust' },
  { id: 'shooting-star', label: 'Shooting Star' },
  { id: 'flow-ribbons', label: 'Flow Ribbons' },
  { id: 'rocket-fleet', label: 'Rocket Fleet' },
  { id: 'robot-scouts', label: 'Robot Fleet' },
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
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const updateSetting = (id, value) => {
    onBackgroundSettingsChange((current) => ({
      ...current,
      [id]: Number(value),
    }));
  };

  return (
    <>
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
        {showBackgroundControls ? (
          <>
            <div className="theme-switcher-label theme-switcher-label-secondary">Background</div>
            <div className="theme-switcher-list">
              {backgroundModes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onBackgroundModeChange(item.id)}
                  className={`theme-switcher-chip ${backgroundMode === item.id ? 'theme-switcher-chip-active' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </>
        ) : null}
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
    {showBackgroundControls ? (
      <motion.div
        className="background-controls content-overlay"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.52, duration: 0.45 }}
      >
        <div className="theme-switcher-label">Background Controls</div>
        <div className="background-controls-grid">
          {controlItems.map((item) => (
            <label key={item.id} className="background-control">
              <span className="background-control-row">
                <span className="background-control-label">{item.label}</span>
                <span className="background-control-value">{backgroundSettings[item.id].toFixed(2)}x</span>
              </span>
              <input
                className="background-control-input"
                type="range"
                min={item.min}
                max={item.max}
                step={item.step}
                value={backgroundSettings[item.id]}
                onChange={(e) => updateSetting(item.id, e.target.value)}
              />
            </label>
          ))}
        </div>
      </motion.div>
    ) : null}
    </>
  );
}
