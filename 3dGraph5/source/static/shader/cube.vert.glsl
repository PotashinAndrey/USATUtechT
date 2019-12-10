precision highp float;

attribute vec4 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec4 aVertexColor;
attribute vec2 aTextureCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uNormalMatrix;
// uniform vec3 uLightPosition;

varying highp vec3 vLighting;
varying highp vec4 vColor;
varying vec2 vTextureCoord;

void main(void) {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  gl_PointSize = 5.0;

  // Применяем эффект освещения
  highp vec3 ambientLight = vec3(0.5, 0.5, 0.5);//uLightPosition; // vec3(0.7, 2, 0.5);
  highp vec3 directionalLightColor = vec3(1.0, 1.0, 1.0);
  highp vec3 directionalVector = normalize(vec3(0.0, 0.0, -10.0));

  highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);
  highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);

  vLighting = ambientLight + (directionalLightColor * directional);
  vColor = aVertexColor;
  vTextureCoord = aTextureCoord;
}
