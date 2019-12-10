precision mediump float;

varying highp vec4 vColor;
varying highp vec3 vLighting;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void) {
  // gl_FragColor = vec4(vColor.xyz * vLighting, vColor.a);
  gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
}
