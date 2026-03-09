varying float vAlpha;
varying vec3 vPosition;

void main() {
  float dist = length(gl_PointCoord - vec2(0.5));
  float glow = 1.0 - smoothstep(0.0, 0.5, dist);
  gl_FragColor = vec4(0.6, 0.9, 1.0, vAlpha * glow);
}
