import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const tubeVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const tubeFragmentShader = `
  uniform float uProgress;
  varying vec2 vUv;
  void main() {
    if (vUv.x > uProgress) discard;
    float glow = 0.85 + 0.15 * (1.0 - vUv.x);
    gl_FragColor = vec4(0.145, 0.388, 0.922, glow * 0.85);
  }
`;

function createCurve() {
  const points = [
    new THREE.Vector3(0, 12, 0),
    new THREE.Vector3(-2, 8, 0.5),
    new THREE.Vector3(2, 4, -0.3),
    new THREE.Vector3(-1.5, 0, 0.2),
    new THREE.Vector3(1.5, -4, -0.5),
    new THREE.Vector3(-2.4, -7.5, 0.3),
    new THREE.Vector3(1.4, -9.8, -0.25),
    new THREE.Vector3(0, -12.8, 0),
  ];
  return new THREE.CatmullRomCurve3(points);
}

export function BeamCurve({ scrollProgress }) {
  const tubeGeometry = useMemo(() => {
    const curve = createCurve();
    return new THREE.TubeGeometry(curve, 128, 0.12, 12, false);
  }, []);

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
    }),
    []
  );

  const meshRef = useRef();
  useFrame(() => {
    if (meshRef.current?.material?.uniforms?.uProgress) {
      meshRef.current.material.uniforms.uProgress.value = scrollProgress;
    }
  });

  return (
    <mesh ref={meshRef} geometry={tubeGeometry}>
      <shaderMaterial
        vertexShader={tubeVertexShader}
        fragmentShader={tubeFragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={true}
      />
    </mesh>
  );
}

export function getBeamHeadPosition(scrollProgress) {
  const curve = createCurve();
  const point = curve.getPoint(scrollProgress);
  return point;
}

export { createCurve };
