import {$} from './script.js';
import {Vector, Matrix} from '/javascript-algebra/index.js';

const oneStep = Math.PI / 32;
let flagx = false, flagy = true, flagz = false, flagP = true, flagL = true, flagE = false;

const points = [[0,1.5,0],[1,1.5,0],[1,1.3,0],[0.6,1.1,0],[0.7,1,0],[0.7,0.9,0],[0.6,0.8,0],[0.4,-1,0],[0.6, -1.1,0],[0.6, -1.2,0],[0.55, -1.3,0],[0.6, -1.4,0],[0.6, -1.5,0],[0.5, -1.7,0],[0.4, -1.8,0],[0.2, -1.9,0],[0, -2,0],[0,1.5,0]];
const vectors = [];

$('#x').addEventListener('click', () => flagx = !flagx);
$('#y').addEventListener('click', () => flagy = !flagy);
$('#z').addEventListener('click', () => flagz = !flagz);

draw(vectors);
/** */
function draw(vectors) {
  drawFigure(points, vectors);
}

/** */
function drawFigure(points, vectors, i = 0) {
  while (oneStep * i <= 2 * Math.PI) {
    vectors.push(calculateDeformation(points, oneStep * i));
    i++;
  }
}

/** */
function calculateDeformation(points, deformation) {
  const matrix = Matrix.rotateY(deformation);
  const vectors = points.map(e => new Vector(e));
  const vectorMatrixes = vectors.map(e => Matrix.from(e).transpose());
  return vectorMatrixes.map(e => [...e.multiply(matrix).row(0).data.slice(0, 3)]);
}

/** */
  export default async function main(canvas, width, height) {
    const gl         = canvas.getContext('webgl');
    gl.canvas.width  = width;
    gl.canvas.height = height;
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

    let flag = false;
      canvas.addEventListener('mouseover', () => {
        flag = true;
        requestAnimationFrame(render);
      });
      canvas.addEventListener('mouseout', () => flag = false);
    canvas.addEventListener('click', () => negative *= -1);

    const vsSource = await fetch('/static/shader/cube.vert.glsl').then(r => r.text());
    const fsSource = await fetch('/static/shader/cube.frag.glsl').then(r => r.text());

    const program = initShaderProgram(gl, vsSource, fsSource);
    const programInfo = {
      program,
      attribute: {
        vertexPosition: gl.getAttribLocation(program, 'aVertexPosition'),
        vertexNormal: gl.getAttribLocation(program, 'aVertexNormal'),
        vertexColor: gl.getAttribLocation(program, 'aVertexColor')
      },
      uniform: {
        projectionMatrix: gl.getUniformLocation(program, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(program, 'uModelViewMatrix'),
        normalMatrix: gl.getUniformLocation(program, 'uModelNormalMatrix'),
        lightPosition: gl.getUniformLocation(program, 'uLightPosition')
      }
    };

    const buffers = await initBuffers(gl);

    let cubeRotation = 0;
    let negative = 1;
    let speed = 0.0001;

    const light = Vector.from(0, 0, 0);

    flag = true;
    render();

    const range = $('#input');
    range.addEventListener('change', () => speed = Number(range.value));

    /** */
      function render(now = 0) {
        if (flag) {
            cubeRotation += negative * speed * 10;
            drawScene(gl, programInfo, buffers, cubeRotation, light);
            requestAnimationFrame(render);
        }
      }

    $('#point').addEventListener('click', () => {
      flagP = !flagP
      if (!flagP && !flagE && !flagL ) flagL = !flagL;
      render();
    });
    $('#line').addEventListener('click', () => {
      flagL = !flagL
      if (!flagP && !flagE && !flagL ) flagL = !flagL;
      render();
    });
    $('#edge').addEventListener('click', () => {
      flagE = !flagE
      if (!flagP && !flagE && !flagL ) flagL = !flagL;
      render();
    });

    $('#light-x').addEventListener('input', e => light.x = Number(e.target.value) - 3)
    $('#light-y').addEventListener('input', e => light.y = Number(e.target.value) - 3)
    $('#light-z').addEventListener('input', e => light.z = Number(e.target.value) - 3)
  }

/** */
  function initBuffers(gl) {
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const points = vectors.flat(1);//!
    const positions = points.flat(1);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const colors = Array.from({length: 65 * 18}, (_, i) => [i / 65 / 18, 0.0, 1.0 - i / 65 / 18, 1.0]).flat();

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    const normalsBuffer = gl.createBuffer(); //!
    gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer);//!

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    const normals = [];//!
    const indices = [];
    for (let i = 0; i < 64 * 18 - 1; ++i) {
      let A, B, C, normal;
      indices.push(i);
      indices.push(i+1);
      indices.push(i+18);
      A = new Vector(points[i]);//!
      B = new Vector(points[i + 1]);//!
      C = new Vector(points[i + 18]);//!
      normal = Vector.normal(A, B, C).data.slice(0, 3);//!
      normals.push(normal, normal, normal);//!

      indices.push(i+18);
      indices.push(i+19);
      indices.push(i+1);
      A = new Vector(points[i + 18]);//!
      B = new Vector(points[i + 19]);//!
      C = new Vector(points[i + 1]);//!
      normal = Vector.normal(A, B, C).data.slice(0, 3);//!
      normals.push(normal, normal, normal);//!
    }

    const normales = normals.flat();//!
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normales), gl.STATIC_DRAW);//!
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);//!

    return {
      position: {buffer: positionBuffer, length: positions.length},
      normals: {buffer: normalsBuffer, length: normales.length}, // !
      color: {buffer: colorBuffer, length: colors.length},
      indices: {buffer: indexBuffer, length: indices.length}
    };
  }

/** */
  function drawScene(gl, programInfo, buffers, cubeRotation, light) {
    gl.clearColor(0.9, 0.9, 0.9, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    // eslint-disable-next-line no-bitwise
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const fieldOfView = 45;
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = Matrix.perspective(fieldOfView, aspect, zNear, zFar).rotateX(0.5);

    let modelViewMatrix = Matrix.identity(4);

    modelViewMatrix = modelViewMatrix
      .scaleY(-1)
      .translate(Vector.from(0.0, 4.0, -7.0)) // amount to translate
      .rotateY(flagy ? cubeRotation : 0) // amount to rotate not in radians
      .rotateX(flagx ? cubeRotation : 0)
      .rotateZ(flagz ? cubeRotation : 0);

    const normalMatrix = modelViewMatrix.inverse3D().transpose()

    { // Tell WebGL how to pull out the positions from the position buffer into the vertexPosition attribute
      const numComponents = 3;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position.buffer);
      gl.vertexAttribPointer(programInfo.attribute.vertexPosition, numComponents, type, normalize, stride, offset);
      gl.enableVertexAttribArray(programInfo.attribute.vertexPosition);
    }

    { // Указываем WebGL как извлекать нормали из буфера нормалей в атрибут vertexNormal.
      const numComponents = 3;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normals.buffer);
      gl.vertexAttribPointer(programInfo.attribute.vertexNormal, numComponents, type, normalize, stride, offset);
      gl.enableVertexAttribArray(programInfo.attribute.vertexNormal);
    }

    { // Tell WebGL how to pull out the colors from the color buffer into the vertexColor attribute.
      const numComponents = 4;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color.buffer);
      gl.vertexAttribPointer(programInfo.attribute.vertexColor, numComponents, type, normalize, stride, offset);
      gl.enableVertexAttribArray(programInfo.attribute.vertexColor);
    }

    // Tell WebGL which indices to use to index the vertices
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices.buffer);

    // Tell WebGL to use our program when drawing
    gl.useProgram(programInfo.program);

    // Set the shader uniforms
    gl.uniformMatrix4fv(programInfo.uniform.projectionMatrix, false, projectionMatrix.data);
    gl.uniformMatrix4fv(programInfo.uniform.modelViewMatrix, false, modelViewMatrix.data);
    gl.uniformMatrix4fv(programInfo.uniform.normalMatrix, false, normalMatrix.data);//!
    gl.uniform3fv(programInfo.uniform.lightPosition, light.data);

    {
      const vertexCount = buffers.indices.length;
      const type = gl.UNSIGNED_SHORT;
      const offset = 0;
      if (flagE) gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
      if (flagL) gl.drawElements(gl.LINES, vertexCount, type, offset);
      if (flagP) gl.drawElements(gl.POINTS, vertexCount, type, offset);
    }
  }

/** */
  function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader   = loadShader(gl, 'VERTEX',  gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, 'FRAGMENT', gl.FRAGMENT_SHADER, fsSource);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      return null;
    }
    return program;
  }

/** */
  function loadShader(gl, name, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(name, gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }
