import { useState, useEffect } from 'react';
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

const DEFAULT_THEME = 'sunshine-tech';

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_THEME;
    return window.localStorage.getItem('resume-theme') || DEFAULT_THEME;
  });
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
            beamProgress={Math.min(1, scrollProgress / 0.82)}
            mouse={mouse}
            theme={theme}
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

      <Navigation theme={theme} onThemeChange={setTheme} />
    </>
  );
}

export default App;
