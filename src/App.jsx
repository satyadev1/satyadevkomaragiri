import { useState, useEffect, useDeferredValue } from 'react';
import { Canvas } from '@react-three/fiber';
import Lenis from 'lenis';
import { Scene } from './three/Scene';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Capabilities } from './components/Capabilities';
import { Timeline } from './components/Timeline';
import { Featured } from './components/Featured';
import { Skills } from './components/Skills';
import { Footer } from './components/Footer';
import { Navigation } from './components/Navigation';

const DEFAULT_THEME = 'total-dark';
const DEFAULT_BACKGROUND_MODE = 'streak-field';
const DEFAULT_BACKGROUND_SETTINGS = {
  speed: 1,
  gravity: 1,
  spread: 1,
  density: 1,
};
const IS_DEVELOPMENT = import.meta.env.DEV;
const PRODUCTION_THEME = DEFAULT_THEME;
const PRODUCTION_BACKGROUND_MODE = DEFAULT_BACKGROUND_MODE;
const PRODUCTION_BACKGROUND_SETTINGS = DEFAULT_BACKGROUND_SETTINGS;

function readNumberEnv(name, fallback) {
  const value = import.meta.env[name];
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

const DEVELOPMENT_THEME = import.meta.env.VITE_DEV_THEME || DEFAULT_THEME;
const DEVELOPMENT_BACKGROUND_MODE = import.meta.env.VITE_DEV_BACKGROUND_MODE || DEFAULT_BACKGROUND_MODE;
const DEVELOPMENT_BACKGROUND_SETTINGS = {
  speed: readNumberEnv('VITE_DEV_BG_SPEED', DEFAULT_BACKGROUND_SETTINGS.speed),
  gravity: readNumberEnv('VITE_DEV_BG_GRAVITY', DEFAULT_BACKGROUND_SETTINGS.gravity),
  spread: readNumberEnv('VITE_DEV_BG_SPREAD', DEFAULT_BACKGROUND_SETTINGS.spread),
  density: readNumberEnv('VITE_DEV_BG_DENSITY', DEFAULT_BACKGROUND_SETTINGS.density),
};

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_THEME;
    const defaultTheme = IS_DEVELOPMENT ? DEVELOPMENT_THEME : PRODUCTION_THEME;
    return window.localStorage.getItem('resume-theme') || defaultTheme;
  });
  // Theme persists per visitor; background behavior should follow the code defaults
  // we choose before a push, rather than carrying over prior local experiments.
  const [backgroundMode, setBackgroundMode] = useState(
    IS_DEVELOPMENT ? DEVELOPMENT_BACKGROUND_MODE : PRODUCTION_BACKGROUND_MODE,
  );
  const [backgroundSettings, setBackgroundSettings] = useState(
    IS_DEVELOPMENT ? DEVELOPMENT_BACKGROUND_SETTINGS : PRODUCTION_BACKGROUND_SETTINGS,
  );
  const deferredBackgroundMode = useDeferredValue(backgroundMode);
  const deferredBackgroundSettings = useDeferredValue(backgroundSettings);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0, clientX: 0, clientY: 0 });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('resume-theme', theme);
  }, [theme]);

  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y, clientX: e.clientX, clientY: e.clientY });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    const onScroll = ({ scroll }) => {
      setScrollY(scroll);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, scroll / max) : 0;
      setScrollProgress(progress);
    };

    lenis.on('scroll', onScroll);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 -z-10 gradient-bg" aria-hidden="true" />
      <div
        className="pointer-halo"
        aria-hidden="true"
        style={{
          left: `${mouse.clientX}px`,
          top: `${mouse.clientY}px`,
        }}
      />
      <div id="canvas-container" aria-hidden="true">
        <Canvas
          camera={{ position: [0, 0, 20], fov: 50 }}
          gl={{ alpha: true, antialias: true, premultipliedAlpha: false }}
          dpr={[1, 2]}
        >
          <Scene
            scrollProgress={scrollProgress}
            beamProgress={scrollProgress}
            mouse={mouse}
            theme={theme}
            backgroundMode={deferredBackgroundMode}
            backgroundSettings={deferredBackgroundSettings}
          />
        </Canvas>
      </div>

      <div className="content-overlay relative">
        <Hero />
        <About />
        <Capabilities />
        <Timeline scrollProgress={scrollProgress} scrollY={scrollY} />
        <Featured />
        <Skills />
        <Footer scrollProgress={scrollProgress} />
      </div>

      <Navigation
        theme={theme}
        onThemeChange={setTheme}
        backgroundMode={backgroundMode}
        onBackgroundModeChange={setBackgroundMode}
        backgroundSettings={backgroundSettings}
        onBackgroundSettingsChange={setBackgroundSettings}
        showBackgroundControls={IS_DEVELOPMENT}
      />
    </>
  );
}

export default App;
