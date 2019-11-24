varying highp vec4 vColor;
varying highp vec3 vLighting;

void main(void) {
  // vColor.xyz *
  gl_FragColor = vec4(vLighting, vColor.a);
  // gl_FragColor = vec4(vColor.xyz, vColor.a);
}
