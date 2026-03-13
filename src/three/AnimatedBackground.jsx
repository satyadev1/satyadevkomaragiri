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
    lineOpacityMultiplier: 0.96,
    headOpacity: 0.72,
    headSize: 0.08,
  },
  'total-dark': {
    glowA: new THREE.Color('#e5e7eb'),
    glowB: new THREE.Color('#60a5fa'),
    layers: ['#d1d5db', '#94a3b8', '#475569'],
    lineOpacityMultiplier: 1.1,
    headOpacity: 0.78,
    headSize: 0.085,
  },
  'dark-coder': {
    glowA: new THREE.Color('#38bdf8'),
    glowB: new THREE.Color('#6366f1'),
    layers: ['#4f83c8', '#2f65ad', '#173f77'],
    lineOpacityMultiplier: 1.04,
    headOpacity: 0.72,
    headSize: 0.082,
  },
  'sunshine-tech': {
    glowA: new THREE.Color('#f59e0b'),
    glowB: new THREE.Color('#f97316'),
    layers: ['#e09f3e', '#d97706', '#b45309'],
    lineOpacityMultiplier: 0.94,
    headOpacity: 0.68,
    headSize: 0.078,
  },
  'solar-light': {
    glowA: new THREE.Color('#fb923c'),
    glowB: new THREE.Color('#facc15'),
    layers: ['#f59e0b', '#f97316', '#ea580c'],
    lineOpacityMultiplier: 0.92,
    headOpacity: 0.66,
    headSize: 0.076,
  },
  'clean-executive': {
    glowA: new THREE.Color('#94a3b8'),
    glowB: new THREE.Color('#475569'),
    layers: ['#64748b', '#475569', '#334155'],
    lineOpacityMultiplier: 1.18,
    headOpacity: 0.82,
    headSize: 0.088,
  },
  'ai-lab': {
    glowA: new THREE.Color('#60a5fa'),
    glowB: new THREE.Color('#a78bfa'),
    layers: ['#93c5fd', '#818cf8', '#4f46e5'],
    lineOpacityMultiplier: 1.06,
    headOpacity: 0.76,
    headSize: 0.084,
  },
};

const LAYER_CONFIG = [
  {
    countRatio: 0.52,
    spread: 52,
    opacity: 0.76,
    speedScale: 1,
    streakLength: 1.9,
    turbulence: 1.15,
    cometRatio: 0.18,
    cursorRadiusScale: 0.1,
  },
  {
    countRatio: 0.33,
    spread: 72,
    opacity: 0.58,
    speedScale: 0.72,
    streakLength: 2.35,
    turbulence: 0.8,
    cometRatio: 0.12,
    cursorRadiusScale: 0.12,
  },
  {
    countRatio: 0.15,
    spread: 92,
    opacity: 0.42,
    speedScale: 0.44,
    streakLength: 2.9,
    turbulence: 0.58,
    cometRatio: 0.08,
    cursorRadiusScale: 0.14,
  },
];

const MODE_CONFIGS = {
  'streak-field': {
    layerConfig: LAYER_CONFIG,
    lineOpacityMultiplier: 1,
    headOpacityMultiplier: 1,
    headSizeMultiplier: 1,
    lineLengthMultiplier: 1,
    flowBias: 1,
    swirlBias: 1,
    cursorPullBias: 1.55,
    waveBias: 1,
    curveBias: 1,
    tailShape: 'single',
    tailWidthBias: 0,
    spriteKind: 'circle',
    thrustBias: 0,
    dragBias: 0,
  },
  'comet-dust': {
    layerConfig: [
      { ...LAYER_CONFIG[0], countRatio: 0.44, opacity: 0.54, streakLength: 1.15, cometRatio: 0.34, cursorRadiusScale: 0.14, turbulence: 0.95 },
      { ...LAYER_CONFIG[1], countRatio: 0.34, opacity: 0.42, streakLength: 1.35, cometRatio: 0.22, cursorRadiusScale: 0.16, turbulence: 0.68 },
      { ...LAYER_CONFIG[2], countRatio: 0.18, opacity: 0.28, streakLength: 1.6, cometRatio: 0.14, cursorRadiusScale: 0.18, turbulence: 0.48 },
    ],
    lineOpacityMultiplier: 0.78,
    headOpacityMultiplier: 1.34,
    headSizeMultiplier: 1.28,
    lineLengthMultiplier: 0.66,
    flowBias: 1.18,
    swirlBias: 0.86,
    cursorPullBias: 1.06,
    waveBias: 0.84,
    curveBias: 1,
    tailShape: 'single',
    tailWidthBias: 0,
    spriteKind: 'circle',
    thrustBias: 0,
    dragBias: 0,
    directionAngle: -0.58,
    directionStrength: 0.08,
  },
  'shooting-star': {
    layerConfig: [
      { ...LAYER_CONFIG[0], countRatio: 0.1, opacity: 0.5, streakLength: 4.8, cometRatio: 0.22, cursorRadiusScale: 0.06, turbulence: 0.08 },
      { ...LAYER_CONFIG[1], countRatio: 0.06, opacity: 0.34, streakLength: 5.7, cometRatio: 0.14, cursorRadiusScale: 0.08, turbulence: 0.06 },
      { ...LAYER_CONFIG[2], countRatio: 0.03, opacity: 0.22, streakLength: 6.8, cometRatio: 0.08, cursorRadiusScale: 0.1, turbulence: 0.04 },
    ],
    lineOpacityMultiplier: 0.94,
    headOpacityMultiplier: 1.88,
    headSizeMultiplier: 2.7,
    lineLengthMultiplier: 2.8,
    flowBias: 0.22,
    swirlBias: 0.03,
    cursorPullBias: 0.16,
    waveBias: 0.04,
    curveBias: 0.06,
    tailShape: 'single',
    tailWidthBias: 0,
    spriteKind: 'starburst',
    thrustBias: 1.9,
    dragBias: 0.74,
    directionAngle: -0.56,
    directionStrength: 1.45,
  },
  'flow-ribbons': {
    layerConfig: [
      { ...LAYER_CONFIG[0], countRatio: 0.22, opacity: 0.72, streakLength: 3.8, cometRatio: 0.04, cursorRadiusScale: 0.13, turbulence: 1.46 },
      { ...LAYER_CONFIG[1], countRatio: 0.16, opacity: 0.52, streakLength: 4.8, cometRatio: 0.02, cursorRadiusScale: 0.16, turbulence: 1.12 },
      { ...LAYER_CONFIG[2], countRatio: 0.1, opacity: 0.36, streakLength: 5.7, cometRatio: 0.01, cursorRadiusScale: 0.19, turbulence: 0.92 },
    ],
    lineOpacityMultiplier: 1.08,
    headOpacityMultiplier: 0.44,
    headSizeMultiplier: 0.82,
    lineLengthMultiplier: 1.9,
    flowBias: 1.42,
    swirlBias: 0.72,
    cursorPullBias: 1.24,
    waveBias: 1.38,
    curveBias: 1.4,
    tailShape: 'single',
    tailWidthBias: 0,
    spriteKind: 'circle',
    thrustBias: 0.08,
    dragBias: 0.02,
    directionAngle: -0.5,
    directionStrength: 0.06,
  },
  'rocket-fleet': {
    layerConfig: [
      { ...LAYER_CONFIG[0], countRatio: 0.12, opacity: 0.82, streakLength: 3.4, cometRatio: 0.24, cursorRadiusScale: 0.08, turbulence: 0.16 },
      { ...LAYER_CONFIG[1], countRatio: 0.08, opacity: 0.58, streakLength: 4.05, cometRatio: 0.18, cursorRadiusScale: 0.1, turbulence: 0.12 },
      { ...LAYER_CONFIG[2], countRatio: 0.04, opacity: 0.38, streakLength: 4.7, cometRatio: 0.12, cursorRadiusScale: 0.12, turbulence: 0.08 },
    ],
    lineOpacityMultiplier: 1.16,
    headOpacityMultiplier: 1.4,
    headSizeMultiplier: 2.2,
    lineLengthMultiplier: 1.9,
    flowBias: 0.52,
    swirlBias: 0.06,
    cursorPullBias: 0.72,
    waveBias: 0.06,
    curveBias: 0.02,
    tailShape: 'triangle',
    tailWidthBias: 0.18,
    spriteKind: 'rocket',
    thrustBias: 1.45,
    dragBias: 0.9,
    directionAngle: -0.52,
    directionStrength: 0.88,
  },
  'robot-scouts': {
    layerConfig: [
      { ...LAYER_CONFIG[0], countRatio: 0.34, opacity: 0.48, streakLength: 0.95, cometRatio: 0.42, cursorRadiusScale: 0.11, turbulence: 0.22 },
      { ...LAYER_CONFIG[1], countRatio: 0.22, opacity: 0.32, streakLength: 1.15, cometRatio: 0.26, cursorRadiusScale: 0.14, turbulence: 0.18 },
      { ...LAYER_CONFIG[2], countRatio: 0.12, opacity: 0.22, streakLength: 1.3, cometRatio: 0.14, cursorRadiusScale: 0.16, turbulence: 0.14 },
    ],
    lineOpacityMultiplier: 0.94,
    headOpacityMultiplier: 1.54,
    headSizeMultiplier: 1.86,
    lineLengthMultiplier: 0.55,
    flowBias: 0.82,
    swirlBias: 0.46,
    cursorPullBias: 1.12,
    waveBias: 0.22,
    curveBias: 0.05,
    tailShape: 'single',
    tailWidthBias: 0,
    spriteKind: 'robot',
    thrustBias: 0.12,
    dragBias: 0.12,
    directionAngle: -0.42,
    directionStrength: 0.04,
  },
  'ai-signals': {
    layerConfig: [
      { ...LAYER_CONFIG[0], countRatio: 0.4, opacity: 0.58, streakLength: 1.65, cometRatio: 0.3, cursorRadiusScale: 0.12, turbulence: 0.66 },
      { ...LAYER_CONFIG[1], countRatio: 0.28, opacity: 0.4, streakLength: 2.05, cometRatio: 0.2, cursorRadiusScale: 0.14, turbulence: 0.46 },
      { ...LAYER_CONFIG[2], countRatio: 0.16, opacity: 0.3, streakLength: 2.45, cometRatio: 0.12, cursorRadiusScale: 0.18, turbulence: 0.34 },
    ],
    lineOpacityMultiplier: 1.02,
    headOpacityMultiplier: 1.5,
    headSizeMultiplier: 1.65,
    lineLengthMultiplier: 1.02,
    flowBias: 1.28,
    swirlBias: 0.56,
    cursorPullBias: 1.38,
    waveBias: 0.52,
    curveBias: 0.28,
    tailShape: 'single',
    tailWidthBias: 0,
    spriteKind: 'hex',
    thrustBias: 0.22,
    dragBias: 0.08,
    directionAngle: -0.4,
    directionStrength: 0.14,
  },
};

function wrapPosition(value, limit) {
  if (value < -limit) return limit;
  if (value > limit) return -limit;
  return value;
}

function createSpriteTexture(kind = 'circle') {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.clearRect(0, 0, size, size);

  if (kind === 'robot') {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.98)';
    const w = size * 0.62;
    const h = size * 0.48;
    const x = (size - w) / 2;
    const y = size * 0.2;
    const r = size * 0.12;
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(x, y, w, h, r);
    } else {
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }
    ctx.fill();
    ctx.fillRect(size * 0.28, size * 0.64, size * 0.08, size * 0.14);
    ctx.fillRect(size * 0.64, size * 0.64, size * 0.08, size * 0.14);
    ctx.fillStyle = 'rgba(10, 10, 10, 0.9)';
    ctx.beginPath();
    ctx.arc(size * 0.4, size * 0.42, size * 0.05, 0, Math.PI * 2);
    ctx.arc(size * 0.6, size * 0.42, size * 0.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(size * 0.42, size * 0.18, size * 0.16, size * 0.06);
  } else if (kind === 'rocket') {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.98)';
    ctx.beginPath();
    ctx.moveTo(size * 0.5, size * 0.12);
    ctx.lineTo(size * 0.7, size * 0.45);
    ctx.lineTo(size * 0.61, size * 0.45);
    ctx.lineTo(size * 0.61, size * 0.72);
    ctx.lineTo(size * 0.39, size * 0.72);
    ctx.lineTo(size * 0.39, size * 0.45);
    ctx.lineTo(size * 0.3, size * 0.45);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'rgba(10, 10, 10, 0.85)';
    ctx.beginPath();
    ctx.arc(size * 0.5, size * 0.36, size * 0.08, 0, Math.PI * 2);
    ctx.fill();
  } else if (kind === 'hex') {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.98)';
    ctx.beginPath();
    ctx.moveTo(size * 0.5, size * 0.12);
    ctx.lineTo(size * 0.78, size * 0.28);
    ctx.lineTo(size * 0.78, size * 0.6);
    ctx.lineTo(size * 0.5, size * 0.76);
    ctx.lineTo(size * 0.22, size * 0.6);
    ctx.lineTo(size * 0.22, size * 0.28);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'rgba(10, 10, 10, 0.18)';
    ctx.beginPath();
    ctx.arc(size * 0.5, size * 0.44, size * 0.13, 0, Math.PI * 2);
    ctx.fill();
  } else if (kind === 'starburst') {
    const cx = size / 2;
    const cy = size / 2;
    const glow = ctx.createRadialGradient(cx, cy, size * 0.02, cx, cy, size * 0.42);
    glow.addColorStop(0, 'rgba(255,255,255,1)');
    glow.addColorStop(0.25, 'rgba(255,255,255,0.98)');
    glow.addColorStop(0.68, 'rgba(255,255,255,0.42)');
    glow.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.42, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.92)';
    ctx.lineWidth = size * 0.042;
    ctx.beginPath();
    ctx.moveTo(cx, size * 0.12);
    ctx.lineTo(cx, size * 0.88);
    ctx.moveTo(size * 0.12, cy);
    ctx.lineTo(size * 0.88, cy);
    ctx.moveTo(size * 0.22, size * 0.22);
    ctx.lineTo(size * 0.78, size * 0.78);
    ctx.moveTo(size * 0.78, size * 0.22);
    ctx.lineTo(size * 0.22, size * 0.78);
    ctx.stroke();
  } else {
    const gradient = ctx.createRadialGradient(size / 2, size / 2, size * 0.08, size / 2, size / 2, size * 0.48);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.55, 'rgba(255, 255, 255, 0.95)');
    gradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.45)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size * 0.48, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function StreakLayer({
  count,
  spread,
  opacity,
  speed,
  color,
  streakLength,
  mouse,
  turbulence = 1,
  cometRatio = 0.1,
  cursorRadiusScale = 0.18,
  headOpacity = 0.7,
  headSize = 0.08,
  lineLengthMultiplier = 1,
  flowBias = 1,
  swirlBias = 1,
  cursorPullBias = 1,
  waveBias = 1,
  curveBias = 1,
  tailShape = 'single',
  tailWidthBias = 0,
  spriteKind = 'circle',
  thrustBias = 0,
  dragBias = 0,
  directionAngle = -0.5,
  directionStrength = 0,
}) {
  const linesRef = useRef();
  const headsRef = useRef();
  const mouseRef = useRef(mouse);
  mouseRef.current = mouse;
  const headTexture = useMemo(
    () => (typeof document === 'undefined' ? null : createSpriteTexture(spriteKind)),
    [spriteKind],
  );
  const segmentVertexCount = tailShape === 'triangle' ? 4 : 2;
  const linePositionCount = count * segmentVertexCount * 3;
  const headState = useMemo(() => {
    const heads = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const base = i * 3;
      heads[base] = (Math.random() - 0.5) * spread;
      heads[base + 1] = (Math.random() - 0.5) * spread;
      heads[base + 2] = (Math.random() - 0.5) * (spread * 0.4);
    }
    return heads;
  }, [count, spread]);
  const trailCenters = useMemo(() => {
    const trails = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const base = i * 3;
      trails[base] = headState[base] + (Math.random() - 0.5) * streakLength;
      trails[base + 1] = headState[base + 1] + (Math.random() - 0.5) * streakLength;
      trails[base + 2] = headState[base + 2] + (Math.random() - 0.5) * (streakLength * 0.35);
    }
    return trails;
  }, [count, headState, streakLength]);
  const positions = useMemo(() => {
    const pos = new Float32Array(linePositionCount);
    for (let i = 0; i < count; i++) {
      const headBase = i * 3;
      const lineBase = i * segmentVertexCount * 3;
      const headX = headState[headBase];
      const headY = headState[headBase + 1];
      const headZ = headState[headBase + 2];
      const tailX = trailCenters[headBase];
      const tailY = trailCenters[headBase + 1];
      const tailZ = trailCenters[headBase + 2];
      if (tailShape === 'triangle') {
        pos[lineBase] = tailX;
        pos[lineBase + 1] = tailY;
        pos[lineBase + 2] = tailZ;
        pos[lineBase + 3] = headX;
        pos[lineBase + 4] = headY;
        pos[lineBase + 5] = headZ;
        pos[lineBase + 6] = tailX;
        pos[lineBase + 7] = tailY;
        pos[lineBase + 8] = tailZ;
        pos[lineBase + 9] = headX;
        pos[lineBase + 10] = headY;
        pos[lineBase + 11] = headZ;
      } else {
        pos[lineBase] = headX;
        pos[lineBase + 1] = headY;
        pos[lineBase + 2] = headZ;
        pos[lineBase + 3] = tailX;
        pos[lineBase + 4] = tailY;
        pos[lineBase + 5] = tailZ;
      }
    }
    return pos;
  }, [count, headState, linePositionCount, segmentVertexCount, streakLength, tailShape, trailCenters]);

  const velocities = useMemo(() => {
    const drift = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      drift[i * 3] = (Math.random() - 0.5) * speed * 0.9;
      drift[i * 3 + 1] = (Math.random() - 0.5) * speed * 1.2;
      drift[i * 3 + 2] = (Math.random() - 0.5) * speed * 0.7;
    }
    return drift;
  }, [count, speed]);

  const motionSeeds = useMemo(() => {
    const seeds = new Float32Array(count * 4);
    for (let i = 0; i < count; i++) {
      const base = i * 4;
      seeds[base] = Math.random() * Math.PI * 2;
      seeds[base + 1] = 0.75 + Math.random() * 1.4;
      seeds[base + 2] = Math.random() * Math.PI * 2;
      seeds[base + 3] = 0.35 + Math.random() * 0.8;
    }
    return seeds;
  }, [count]);

  const headIndexMap = useMemo(() => {
    const visible = [];
    for (let i = 0; i < count; i++) {
      if (Math.random() < cometRatio) visible.push(i);
    }
    return visible;
  }, [cometRatio, count]);

  const headPositions = useMemo(() => {
    const pos = new Float32Array(headIndexMap.length * 3);
    for (let i = 0; i < headIndexMap.length; i++) {
      const streakIndex = headIndexMap[i];
      const head = i * 3;
      const base = streakIndex * 3;
      pos[head] = headState[base];
      pos[head + 1] = headState[base + 1];
      pos[head + 2] = headState[base + 2];
    }
    return pos;
  }, [headIndexMap, headState]);

  useFrame((state) => {
    if (!linesRef.current || !headsRef.current) return;
    const pos = linesRef.current.geometry.attributes.position.array;
    const heads = headsRef.current.geometry.attributes.position.array;
    const t = state.clock.elapsedTime;
    const m = mouseRef.current;
    const cursorX = m.x * (spread * 0.22);
    const cursorY = m.y * (spread * 0.22);
    const cursorFieldRadius = spread * cursorRadiusScale;
    for (let i = 0; i < count; i++) {
      const velocityIndex = i * 3;
      const base = i * 3;
      const lineBase = i * segmentVertexCount * 3;
      const seedBase = i * 4;
      const headX = headState[base];
      const headY = headState[base + 1];
      const headZ = headState[base + 2];
      const orbitAngle = t * (0.24 + motionSeeds[seedBase + 1] * 0.08) + motionSeeds[seedBase] + i * 0.19;
      const toCursorX = cursorX - headX;
      const toCursorY = cursorY - headY;
      const cursorDx = headX - cursorX;
      const cursorDy = headY - cursorY;
      const distToCursor = Math.max(0.001, Math.hypot(cursorDx, cursorDy));
      const cursorInfluenceRadius = cursorFieldRadius * 2.4;
      const fieldFalloff = Math.max(0, 1 - distToCursor / cursorInfluenceRadius);
      const fieldStrength = fieldFalloff * speed * (1.28 + turbulence * 0.24);
      const tangentX = -cursorDy / distToCursor;
      const tangentY = cursorDx / distToCursor;
      const directPullX = (toCursorX / distToCursor) * fieldStrength * 1.05 * cursorPullBias;
      const directPullY = (toCursorY / distToCursor) * fieldStrength * 1.05 * cursorPullBias;
      const swirlStrength = fieldStrength * (0.12 + Math.sin(t * 0.45 + motionSeeds[seedBase + 2]) * 0.04) * swirlBias;
      const ambientFlowStrength = speed * (0.7 + turbulence * 0.12) * flowBias;
      const cursorFlowStrength = fieldStrength * 0.22 * cursorPullBias;
      const flowAngle = t * 0.2 + motionSeeds[seedBase] * 0.7 + headZ * 0.04;
      const flowX = Math.cos(flowAngle) * (ambientFlowStrength + cursorFlowStrength);
      const flowY = Math.sin(flowAngle * 1.18) * (ambientFlowStrength + cursorFlowStrength);
      const thrustAngle = motionSeeds[seedBase] + Math.sin(t * 0.14 + motionSeeds[seedBase + 2]) * 0.12;
      const thrustX = Math.cos(thrustAngle) * speed * thrustBias;
      const thrustY = Math.sin(thrustAngle) * speed * thrustBias * 0.82;
      const directionX = Math.cos(directionAngle) * speed * directionStrength;
      const directionY = Math.sin(directionAngle) * speed * directionStrength;
      const waveX = Math.sin(headY * 0.09 + t * (0.8 + motionSeeds[seedBase + 1])) * speed * 0.42 * turbulence * waveBias;
      const waveY = Math.cos(headX * 0.08 - t * (0.72 + motionSeeds[seedBase + 3])) * speed * 0.4 * turbulence * waveBias;
      const waveZ = Math.sin((headX + headY) * 0.035 + t * 0.65 + motionSeeds[seedBase + 2]) * speed * 0.18 * turbulence * waveBias;
      const dx =
        velocities[velocityIndex] +
        directPullX +
        tangentX * swirlStrength +
        directionX +
        thrustX -
        flowX +
        waveX;
      const dy =
        velocities[velocityIndex + 1] +
        directPullY +
        tangentY * swirlStrength +
        directionY +
        thrustY -
        flowY +
        waveY;
      const dz =
        velocities[velocityIndex + 2] +
        waveZ +
        Math.sin(t * 0.22 + motionSeeds[seedBase]) * speed * 0.06;

      const dampedDx = dx * (1 - dragBias * 0.18);
      const dampedDy = dy * (1 - dragBias * 0.18);
      const dampedDz = dz * (1 - dragBias * 0.08);
      headState[base] = wrapPosition(headState[base] + dampedDx, spread * 0.5);
      headState[base + 1] = wrapPosition(headState[base + 1] + dampedDy, spread * 0.5);
      headState[base + 2] = wrapPosition(headState[base + 2] + dampedDz, spread * 0.2);

      const streakCurveX = Math.cos(orbitAngle + t * 0.35) * speed * streakLength * 3.5 * curveBias;
      const streakCurveY = Math.sin(orbitAngle * 0.9 - t * 0.28) * speed * streakLength * 3.5 * curveBias;
      const streakCurveZ = Math.sin(orbitAngle + motionSeeds[seedBase + 1]) * speed * streakLength * 1.4 * curveBias;
      const tailScaleXY = streakLength * 26 * lineLengthMultiplier;
      const tailScaleZ = streakLength * 18 * lineLengthMultiplier;
      const tailX = wrapPosition(headState[base] - dampedDx * tailScaleXY + streakCurveX, spread * 0.5);
      const tailY = wrapPosition(headState[base + 1] - dampedDy * tailScaleXY + streakCurveY, spread * 0.5);
      const tailZ = wrapPosition(headState[base + 2] - dampedDz * tailScaleZ + streakCurveZ, spread * 0.2);
      trailCenters[base] = tailX;
      trailCenters[base + 1] = tailY;
      trailCenters[base + 2] = tailZ;

      if (tailShape === 'triangle') {
        const trailDirX = headState[base] - tailX;
        const trailDirY = headState[base + 1] - tailY;
        const trailLen = Math.max(0.001, Math.hypot(trailDirX, trailDirY));
        const perpX = -trailDirY / trailLen;
        const perpY = trailDirX / trailLen;
        const tailWidth = streakLength * (0.55 + headSize * 1.8) * tailWidthBias;
        const leftTailX = wrapPosition(tailX + perpX * tailWidth, spread * 0.5);
        const leftTailY = wrapPosition(tailY + perpY * tailWidth, spread * 0.5);
        const rightTailX = wrapPosition(tailX - perpX * tailWidth, spread * 0.5);
        const rightTailY = wrapPosition(tailY - perpY * tailWidth, spread * 0.5);

        pos[lineBase] = leftTailX;
        pos[lineBase + 1] = leftTailY;
        pos[lineBase + 2] = tailZ;
        pos[lineBase + 3] = headState[base];
        pos[lineBase + 4] = headState[base + 1];
        pos[lineBase + 5] = headState[base + 2];
        pos[lineBase + 6] = rightTailX;
        pos[lineBase + 7] = rightTailY;
        pos[lineBase + 8] = tailZ;
        pos[lineBase + 9] = headState[base];
        pos[lineBase + 10] = headState[base + 1];
        pos[lineBase + 11] = headState[base + 2];
      } else {
        pos[lineBase] = headState[base];
        pos[lineBase + 1] = headState[base + 1];
        pos[lineBase + 2] = headState[base + 2];
        pos[lineBase + 3] = tailX;
        pos[lineBase + 4] = tailY;
        pos[lineBase + 5] = tailZ;
      }
    }

    for (let i = 0; i < headIndexMap.length; i++) {
      const streakIndex = headIndexMap[i];
      const headBase = i * 3;
      const base = streakIndex * 3;
      heads[headBase] = headState[base];
      heads[headBase + 1] = headState[base + 1];
      heads[headBase + 2] = headState[base + 2];
    }
    linesRef.current.geometry.attributes.position.needsUpdate = true;
    headsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count * segmentVertexCount}
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
      <points ref={headsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={headIndexMap.length}
            array={headPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          transparent
          opacity={headOpacity}
          size={headSize}
          sizeAttenuation
          map={headTexture}
          alphaMap={headTexture}
          alphaTest={0.08}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          color={color}
        />
      </points>
    </group>
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

export function AnimatedBackground({
  mouse = { x: 0, y: 0 },
  theme = 'sunshine-tech',
  mode = 'streak-field',
  settings = { speed: 1, gravity: 1, spread: 1, density: 1 },
}) {
  const colors = THEME_COLORS[theme] || THEME_COLORS['sunshine-tech'];
  const modeConfig = MODE_CONFIGS[mode] || MODE_CONFIGS['streak-field'];
  const speedScale = settings.speed ?? 1;
  const gravityScale = settings.gravity ?? 1;
  const spreadScale = settings.spread ?? 1;
  const densityScale = settings.density ?? 1;
  const softenedDensityScale =
    densityScale <= 1
      ? densityScale
      : 1 + (densityScale - 1) * 0.42;
  const densityPresenceBoost =
    densityScale <= 1
      ? 1 - (1 - densityScale) * 0.08
      : 1 + (densityScale - 1) * 0.18;
  return (
    <>
      <CursorGlow mouse={mouse} theme={theme} />
      {modeConfig.layerConfig.map((layer, index) => (
        <StreakLayer
          key={`${theme}-${mode}-${index}`}
          count={Math.max(40, Math.floor(STAR_COUNT * layer.countRatio * softenedDensityScale))}
          spread={layer.spread * spreadScale}
          opacity={layer.opacity * colors.lineOpacityMultiplier * modeConfig.lineOpacityMultiplier * densityPresenceBoost}
          speed={DRIFT_SPEED * layer.speedScale * speedScale}
          color={colors.layers[index]}
          streakLength={layer.streakLength}
          mouse={mouse}
          turbulence={layer.turbulence}
          cometRatio={layer.cometRatio}
          cursorRadiusScale={layer.cursorRadiusScale * spreadScale}
          headOpacity={colors.headOpacity * modeConfig.headOpacityMultiplier * (1 - index * 0.14)}
          headSize={Math.max(0.035, (colors.headSize - index * 0.018) * modeConfig.headSizeMultiplier)}
          lineLengthMultiplier={modeConfig.lineLengthMultiplier}
          flowBias={modeConfig.flowBias}
          swirlBias={modeConfig.swirlBias}
          cursorPullBias={modeConfig.cursorPullBias * gravityScale}
          waveBias={modeConfig.waveBias}
          curveBias={modeConfig.curveBias}
          tailShape={modeConfig.tailShape}
          tailWidthBias={modeConfig.tailWidthBias}
          spriteKind={modeConfig.spriteKind}
          directionAngle={modeConfig.directionAngle}
          directionStrength={modeConfig.directionStrength}
        />
      ))}
    </>
  );
}
