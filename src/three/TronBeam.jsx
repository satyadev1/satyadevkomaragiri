import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const THEME_BEAM_COLORS = {
  'total-dark': ['#38bdf8', '#dff7ff'],
  'confident-collaborator': ['#14b8a6', '#e6fffb'],
  'clean-executive': ['#0f766e', '#ccfbf1'],
  'ai-lab': ['#818cf8', '#eef2ff'],
};

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColor;
  uniform vec3 uCore;
  varying vec2 vUv;

  void main() {
    float centerDistance = abs(vUv.y - 0.5) * 2.0;
    float softEdge = 1.0 - smoothstep(0.08, 1.0, centerDistance);
    float core = 1.0 - smoothstep(0.0, 0.16, centerDistance);
    float trail = smoothstep(0.0, 0.88, vUv.x);
    float head = exp(-pow((vUv.x - 0.97) * 18.0, 2.0));
    float alpha = (softEdge * trail * 0.5) + (core * trail * 0.75) + (head * softEdge);
    vec3 color = mix(uColor, uCore, clamp(core + head, 0.0, 1.0));
    gl_FragColor = vec4(color, alpha);
  }
`;

export function TronBeam({ theme = 'total-dark' }) {
  const groupRef = useRef();
  const [beamColor, coreColor] = THEME_BEAM_COLORS[theme] || THEME_BEAM_COLORS['total-dark'];
  const uniforms = useMemo(() => ({
    uColor: { value: new THREE.Color(beamColor) },
    uCore: { value: new THREE.Color(coreColor) },
  }), [beamColor, coreColor]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    const cycle = (time % 8.5) / 8.5;
    const eased = cycle * cycle * (3 - 2 * cycle);
    groupRef.current.position.x = THREE.MathUtils.lerp(-28, 28, eased);
    groupRef.current.position.y = Math.sin(time * 0.42) * 5.8;
    groupRef.current.rotation.z = -0.2 + Math.sin(time * 0.24) * 0.08;
  });

  return (
    <group ref={groupRef} position={[-28, 0, -1]}>
      <mesh>
        <planeGeometry args={[16, 0.34, 1, 1]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[7.72, 0, 0.02]}>
        <circleGeometry args={[0.12, 32]} />
        <meshBasicMaterial color={coreColor} transparent opacity={0.96} blending={THREE.AdditiveBlending} />
      </mesh>
      <pointLight position={[7.72, 0, 0.5]} color={beamColor} intensity={1.1} distance={4} />
    </group>
  );
}
