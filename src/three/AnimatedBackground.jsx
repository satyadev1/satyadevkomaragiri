import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const STAR_COUNT = 3500;
const DRIFT_SPEED = 0.008;
const THEME_COLORS = {
  'confident-collaborator': {
    glowA: new THREE.Color('#38bdf8'),
    glowB: new THREE.Color('#14b8a6'),
    layers: ['#cbd5e1', '#38bdf8', '#8b5cf6'],
  },
  'total-dark': {
    glowA: new THREE.Color('#e5e7eb'),
    glowB: new THREE.Color('#60a5fa'),
    layers: ['#d1d5db', '#94a3b8', '#475569'],
  },
  'dark-coder': {
    glowA: new THREE.Color('#38bdf8'),
    glowB: new THREE.Color('#6366f1'),
    layers: ['#4f83c8', '#2f65ad', '#173f77'],
  },
  'sunshine-tech': {
    glowA: new THREE.Color('#f59e0b'),
    glowB: new THREE.Color('#f97316'),
    layers: ['#e09f3e', '#d97706', '#b45309'],
  },
  'solar-light': {
    glowA: new THREE.Color('#fb923c'),
    glowB: new THREE.Color('#facc15'),
    layers: ['#f59e0b', '#f97316', '#ea580c'],
  },
  'clean-executive': {
    glowA: new THREE.Color('#94a3b8'),
    glowB: new THREE.Color('#475569'),
    layers: ['#64748b', '#475569', '#334155'],
  },
  'ai-lab': {
    glowA: new THREE.Color('#60a5fa'),
    glowB: new THREE.Color('#a78bfa'),
    layers: ['#93c5fd', '#818cf8', '#4f46e5'],
  },
};

function StreakLayer({ count, spread, opacity, speed, color, streakLength, mouse }) {
  const linesRef = useRef();
  const mouseRef = useRef(mouse);
  mouseRef.current = mouse;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 6);
    for (let i = 0; i < count; i++) {
      const base = i * 6;
      const x = (Math.random() - 0.5) * spread;
      const y = (Math.random() - 0.5) * spread;
      const z = (Math.random() - 0.5) * (spread * 0.4);
      pos[base] = x;
      pos[base + 1] = y;
      pos[base + 2] = z;
      pos[base + 3] = x + (Math.random() - 0.5) * streakLength;
      pos[base + 4] = y + (Math.random() - 0.5) * streakLength;
      pos[base + 5] = z + (Math.random() - 0.5) * (streakLength * 0.35);
    }
    return pos;
  }, [count, spread, streakLength]);

  const velocities = useMemo(() => {
    const drift = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      drift[i * 3] = (Math.random() - 0.5) * speed * 0.9;
      drift[i * 3 + 1] = (Math.random() - 0.5) * speed * 1.2;
      drift[i * 3 + 2] = (Math.random() - 0.5) * speed * 0.7;
    }
    return drift;
  }, [count, speed]);

  useFrame((state) => {
    if (!linesRef.current) return;
    const pos = linesRef.current.geometry.attributes.position.array;
    const t = state.clock.elapsedTime;
    const m = mouseRef.current;
    const cursorX = m.x * (spread * 0.22);
    const cursorY = m.y * (spread * 0.22);
    for (let i = 0; i < count; i++) {
      const velocityIndex = i * 3;
      const base = i * 6;
      const headX = pos[base];
      const headY = pos[base + 1];
      const orbitAngle = t * 0.35 + i * 0.61;
      const orbitRadius = spread * (0.03 + (i % 7) * 0.008);
      const targetX = cursorX + Math.cos(orbitAngle) * orbitRadius;
      const targetY = cursorY + Math.sin(orbitAngle) * orbitRadius;
      const toCursorX = targetX - headX;
      const toCursorY = targetY - headY;
      const dist = Math.max(2.5, Math.hypot(toCursorX, toCursorY));
      const pullStrength = Math.max(0, 1 - dist / (spread * 0.55)) * speed * 1.3;
      const swirlX = Math.cos(orbitAngle + Math.PI * 0.5) * speed * 0.12;
      const swirlY = Math.sin(orbitAngle + Math.PI * 0.5) * speed * 0.12;
      const dx = velocities[velocityIndex] + Math.sin(t * 0.2 + i * 0.37) * speed * 0.05 + (toCursorX / dist) * pullStrength + swirlX;
      const dy = velocities[velocityIndex + 1] + Math.cos(t * 0.24 + i * 0.29) * speed * 0.06 + (toCursorY / dist) * pullStrength + swirlY;
      const dz = velocities[velocityIndex + 2] + Math.sin(t * 0.18 + i * 0.21) * speed * 0.04;

      pos[base] += dx;
      pos[base + 1] += dy;
      pos[base + 2] += dz;
      pos[base + 3] = pos[base] - dx * (streakLength * 30);
      pos[base + 4] = pos[base + 1] - dy * (streakLength * 30);
      pos[base + 5] += dz;

      for (const offset of [0, 3]) {
        if (pos[base + offset] < -spread * 0.5) pos[base + offset] = spread * 0.5;
        if (pos[base + offset] > spread * 0.5) pos[base + offset] = -spread * 0.5;
        if (pos[base + offset + 1] < -spread * 0.5) pos[base + offset + 1] = spread * 0.5;
        if (pos[base + offset + 1] > spread * 0.5) pos[base + offset + 1] = -spread * 0.5;
        if (pos[base + offset + 2] < -(spread * 0.2)) pos[base + offset + 2] = spread * 0.2;
        if (pos[base + offset + 2] > spread * 0.2) pos[base + offset + 2] = -(spread * 0.2);
      }
    }
    linesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count * 2}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color={color}
      />
    </lineSegments>
  );
}

function CursorGlow({ mouse, theme = 'sunshine-tech' }) {
  const meshRef = useRef();
  const mouseRef = useRef(mouse);
  mouseRef.current = mouse;
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;
  const fragmentShader = `
    uniform float uTime;
    uniform vec2 uCursor;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    varying vec2 vUv;
    void main() {
      vec2 center = uCursor;
      float d = length(vUv - center);
      float pulse = 0.6 + 0.4 * sin(uTime * 0.4);
      float glow = exp(-d * 1.8) * 0.28 * pulse;
      vec3 color = mix(uColorA, uColorB, 0.5 + 0.5 * sin(uTime * 0.2));
      gl_FragColor = vec4(color, glow);
    }
  `;

  const uniforms = useRef({
    uTime: { value: 0 },
    uCursor: { value: new THREE.Vector2(0.5, 0.5) },
    uColorA: { value: new THREE.Color('#f59e0b') },
    uColorB: { value: new THREE.Color('#f97316') },
  }).current;

  useFrame((state) => {
    if (!meshRef.current?.material) return;
    const m = mouseRef.current;
    const themeColors = THEME_COLORS[theme] || THEME_COLORS['sunshine-tech'];
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uColorA.value.copy(themeColors.glowA);
    uniforms.uColorB.value.copy(themeColors.glowB);
    const smooth = 0.1;
    const targetX = (m.x + 1) * 0.5;
    const targetY = (m.y + 1) * 0.5;
    uniforms.uCursor.value.x += (targetX - uniforms.uCursor.value.x) * smooth;
    uniforms.uCursor.value.y += (targetY - uniforms.uCursor.value.y) * smooth;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -20]} scale={[50, 50, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export function AnimatedBackground({ mouse = { x: 0, y: 0 }, theme = 'sunshine-tech' }) {
  const colors = THEME_COLORS[theme] || THEME_COLORS['sunshine-tech'];
  return (
    <>
      <CursorGlow mouse={mouse} theme={theme} />
      <StreakLayer count={Math.floor(STAR_COUNT * 0.5)} spread={55} opacity={0.74} speed={DRIFT_SPEED} color={colors.layers[0]} streakLength={1.5} mouse={mouse} />
      <StreakLayer count={Math.floor(STAR_COUNT * 0.35)} spread={70} opacity={0.62} speed={DRIFT_SPEED * 0.7} color={colors.layers[1]} streakLength={1.9} mouse={mouse} />
      <StreakLayer count={Math.floor(STAR_COUNT * 0.15)} spread={85} opacity={0.48} speed={DRIFT_SPEED * 0.4} color={colors.layers[2]} streakLength={2.35} mouse={mouse} />
    </>
  );
}
