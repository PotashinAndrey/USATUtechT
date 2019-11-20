attribute vec4 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec4 aVertexColor;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uNormalMatrix;
uniform vec3 uLightPosition;

varying highp vec3 vLighting;
varying highp vec4 vColor;

void main(void) {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  gl_PointSize = 5.0;

  // Применяем эффект освещения
  highp vec3 ambientLight = uLightPosition; // vec3(0.7, 2, 0.5);
  highp vec3 directionalLightColor = vec3(1.0, 1.0, 1.0);
  highp vec3 directionalVector = normalize(vec3(0.85, 0.0, 0.75));

  highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);
  highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);

  vLighting = ambientLight + (directionalLightColor * directional);
  vColor = aVertexColor;
}
