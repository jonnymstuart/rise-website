/**
 * GLSL sources for the topographic contour field (WebGL1).
 * Single full-screen triangle; all drawing happens in the fragment shader.
 */

export const TOPO_VERT = /* glsl */ `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

/**
 * Elevation = 4-octave value-noise fbm over a slowly drifting domain.
 * The cursor pushes the sampling domain away from itself (Gaussian falloff),
 * so contour lines bulge around the pointer like terrain being pressed.
 * Iso-lines are extracted from fract(elevation * BANDS) with fwidth AA;
 * every 5th line is heavier, echoing index contours on real topo maps.
 */
export const TOPO_FRAG = /* glsl */ `
#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif
precision highp float;

uniform vec2  u_resolution;
uniform float u_time;
uniform vec2  u_cursor;   // buffer px, GL orientation (y up)
uniform float u_warp;     // 0..1 cursor influence
uniform float u_reveal;   // 0..1.15 intro flood-in
uniform float u_seed;

const float BANDS = 26.0;
const vec3  CREAM = vec3(0.9216, 0.8980, 0.8824); // #ebe5e1
const vec3  INK   = vec3(0.1333, 0.0431, 0.2235); // #220b39
const vec3  MAGENTA = vec3(0.9804, 0.1961, 0.6275); // #fa32a0

float hash21(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    v += amp * vnoise(p);
    p = p * 2.0 + vec2(17.7, 9.2);
    amp *= 0.5;
  }
  return v;
}

void main() {
  float aspect = u_resolution.x / u_resolution.y;
  vec2 p = gl_FragCoord.xy / u_resolution;
  p.x *= aspect;

  vec2 cur = u_cursor / u_resolution;
  cur.x *= aspect;

  vec2  d    = p - cur;
  float dist = length(d);
  float fall = exp(-dist * dist * 14.0);
  p += normalize(d + vec2(1e-4)) * fall * u_warp * 0.16;

  float h = fbm(p * 2.6 + vec2(u_seed, u_seed * 0.7)
                + vec2(u_time * 0.015, -u_time * 0.010));

  float g  = h * BANDS;
  float f  = abs(fract(g) - 0.5);
  float idx = floor(g + 0.5);
  float major = 1.0 - step(0.5, mod(idx, 5.0));
  float w = mix(0.045, 0.085, major);

#ifdef GL_OES_standard_derivatives
  float aa = fwidth(g);
#else
  float aa = 1.5 * BANDS / u_resolution.y;
#endif
  float line = 1.0 - smoothstep(w - aa, w + aa, f);

  // Intro flood-in: low terrain appears first, peaks last.
  line *= smoothstep(u_reveal + 0.06, u_reveal - 0.06, h);

  float alpha = line * mix(0.34, 0.62, major);
  vec3 col = mix(CREAM, INK, alpha);

  // Single magenta index contour, very faint — a topo-map wink.
  float accent = (1.0 - step(0.5, abs(idx - 13.0))) * line * 0.22;
  col = mix(col, MAGENTA, accent);

  gl_FragColor = vec4(col, 1.0);
}
`;
