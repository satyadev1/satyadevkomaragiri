import { useMemo } from 'react';
import * as THREE from 'three';
import { createCurve } from './BeamCurve';

export function BeamHead({ scrollProgress }) {
  const position = useMemo(() => {
    const curve = createCurve();
    return curve.getPoint(scrollProgress);
  }, [scrollProgress]);

  return (
    <mesh position={position}>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshBasicMaterial
        color="#2563eb"
        transparent
        opacity={0.95}
      />
    </mesh>
  );
}
