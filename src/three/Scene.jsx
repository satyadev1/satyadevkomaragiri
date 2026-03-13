import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { AnimatedBackground } from './AnimatedBackground';
import { BeamCurve, createCurve } from './BeamCurve';
import { BeamHead } from './BeamHead';

export function Scene({
  scrollProgress,
  beamProgress,
  mouse = { x: 0, y: 0 },
  theme = 'sunshine-tech',
  backgroundMode = 'streak-field',
  backgroundSettings = { speed: 1, gravity: 1, spread: 1, density: 1 },
}) {
  const progress = typeof beamProgress === 'number' ? beamProgress : scrollProgress;
  const groupRef = useRef();
  const mouseRef = useRef(mouse);
  mouseRef.current = mouse;
  const { gl } = useThree();

  useEffect(() => {
    gl.setClearColor(0x000000, 0);
  }, [gl]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime * 0.15;
    const m = mouseRef.current;
    const parallax = 0.08;
    groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.02 + m.y * parallax;
    groupRef.current.rotation.y = Math.cos(t * 0.3) * 0.02 + m.x * parallax;
  });

  return (
    <>
      <group ref={groupRef}>
        <AnimatedBackground
          mouse={mouse}
          theme={theme}
          mode={backgroundMode}
          settings={backgroundSettings}
        />
        <BeamCurve scrollProgress={progress} />
        <BeamHead scrollProgress={progress} />
      </group>
      <EffectComposer>
        <Bloom intensity={0.6} luminanceThreshold={0.25} luminanceSmoothing={0.9} radius={0.6} />
      </EffectComposer>
    </>
  );
}

export { createCurve };
