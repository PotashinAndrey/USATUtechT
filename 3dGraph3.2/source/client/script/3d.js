import {Vector, Matrix} from '/javascript-algebra/index.js';

// const oneStep = 2 * Math.PI / (180 / Math.PI) +;

const oneStep = Math.PI / 32;
let flagx = false, flagy = true, flagz = false;
let flagP = true, flagL = true, flagE = false;

const points = [[0,1.5,0],[1,1.5,0],[1,1.3,0],[0.6,1.1,0],[0.7,1,0],[0.7,0.9,0],[0.6,0.8,0],[0.4,-1,0],[0.6, -1.1,0],[0.6, -1.2,0],[0.55, -1.3,0],[0.6, -1.4,0],[0.6, -1.5,0],[0.5, -1.7,0],[0.4, -1.8,0],[0.2, -1.9,0],[0, -2,0],[0,1.5,0]];
const vectors = [];

document.getElementById('x').addEventListener('click', () => {
  flagx = !flagx
});
document.getElementById('y').addEventListener('click', () => {
  flagy = !flagy
});
document.getElementById('z').addEventListener('click', () => {
  flagz = !flagz
});


draw(vectors);
/** */
function draw(vectors) {
  drawFigure(points, vectors);
  // vectors.length = 0;
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
        vertexColor: gl.getAttribLocation(program, 'aVertexColor')
      },
      uniform: {
        projectionMatrix: gl.getUniformLocation(program, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(program, 'uModelViewMatrix')
      }
    };

    const buffers = await initBuffers(gl);

    let cubeRotation = 0;
    let negative = 1;
    let speed = 0.0001;
    drawScene(gl, programInfo, buffers, cubeRotation);

    const range = document.getElementById('input');
    range.addEventListener('change', () => speed = Number(range.value));

    /** */
      function render(now) {
        if (flag) {
          setTimeout(() => {
            cubeRotation += negative* speed*10;
            drawScene(gl, programInfo, buffers, cubeRotation);
            requestAnimationFrame(render);
          } ,30);
        }
      }

    document.getElementById('point').addEventListener('click', () => {
      flagP = !flagP
      if (!flagP && !flagE && !flagL ) flagL = !flagL;
      drawScene(gl, programInfo, buffers, cubeRotation);
    });
    document.getElementById('line').addEventListener('click', () => {
      flagL = !flagL
      if (!flagP && !flagE && !flagL ) flagL = !flagL;
      drawScene(gl, programInfo, buffers, cubeRotation);
    });
    document.getElementById('edge').addEventListener('click', () => {
      flagE = !flagE
      if (!flagP && !flagE && !flagL ) flagL = !flagL;
      drawScene(gl, programInfo, buffers, cubeRotation);
    });
  }

/** */
  async function initBuffers(gl) {
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    console.log(vectors.flat(1).length);
    const positions = vectors.flat(2);
    // const positions = await fetch('/model/cube.points.jsonc')
    //   .then(r => r.text())
    //   .then(t => t.split(/\n/).filter(s => !s.trim().startsWith('//')).join(''))
    //   .then(JSON.parse);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const faceColors = [
      [1.0,  1.0,  1.0,  1.0], // Front face: white
      [1.0,  0.0,  0.0,  1.0], // Back face: red
      [0.0,  1.0,  0.0,  1.0], // Top face: green
      [0.0,  0.0,  1.0,  1.0], // Bottom face: blue
      [1.0,  1.0,  0.0,  1.0], // Right face: yellow
      [1.0,  0.0,  1.0,  1.0]  // Left face: purple
    ];

    // Convert the array of colors into a table for all the vertices.

    // let colors = [];
    // for (let j = 0; j < faceColors.length; ++j) {
    //   const c = faceColors[j];
    //   colors = colors.concat(c, c, c, c); // Repeat each color four times for the four vertices of the face
    // }
    const colors = Array.from({length: 65 * 18}, (_, i) => [i / 65 / 18, 0.0, 1.0 - i / 65 / 18, 1.0]).flat();
    console.log(colors);

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    // Build the element array buffer; this specifies the indices into the vertex arrays for each face's vertices.
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    // This array defines each face as two triangles, using the indices into the vertex array to specify each triangle's position.
    // const indices = [
    //   0,  1,  2,      0,  2,  3,    // front
    //   4,  5,  6,      4,  6,  7,    // back
    //   8,  9,  10,     8,  10, 11,   // top
    //   12, 13, 14,     12, 14, 15,   // bottom
    //   16, 17, 18,     16, 18, 19,   // right
    //   20, 21, 22,     20, 22, 23    // left
    // ];
    const indices = [];
    for (let i = 0; i < 64 * 18 - 1; ++i) { // 6840, 76*18*5, 6911
      indices.push(i);
      indices.push(i+1);
      indices.push(i+18);
      indices.push(i+18);
      indices.push(i+19);
      indices.push(i+1);
      // indices.push(i + 1, i, i + 18);
      // indices.push(i + 1, i + 18, i + 18);
    }

    // Now send the element array to GL
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    return {
      position: {buffer: positionBuffer, length: positions.length},
      color: {buffer: colorBuffer, length: colors.length},
      indices: {buffer: indexBuffer, length: indices.length}
    };
  }

/** */
  function drawScene(gl, programInfo, buffers, cubeRotation) {
    gl.clearColor(0.9, 0.9, 0.9, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

    // eslint-disable-next-line no-bitwise
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);  // Clear the canvas before we start drawing on it.

    // Create a perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera.
    // Our field of view is 45 degrees, with a width/height
    // ratio that matches the display size of the canvas
    // and we only want to see objects between 0.1 units
    // and 100 units away from the camera.

    const fieldOfView = 45; // * Math.PI / 180;   // not in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = Matrix.perspective(fieldOfView, aspect, zNear, zFar).rotateX(0.5);
    // const projectionMatrix = Matrix.lookAt(Vector.from(0, 0, 0), Vector.ZERO, Vector.Y)

    // Set the drawing position to the "identity" point, which is the center of the scene.
    let modelViewMatrix = Matrix.identity(4);

    // Now move the drawing position a bit to where we want to start drawing the square.
    // let rotation = cubeRotation; // * Math.PI / 180;

    modelViewMatrix = modelViewMatrix
      .scaleY(-1)
      .translate(Vector.from(0.0, 4.0, -7.0)) // amount to translate
      .rotateY(flagy ? cubeRotation : 0) // amount to rotate not in radians
      .rotateX(flagx ? cubeRotation : 0)
      .rotateZ(flagz ? cubeRotation : 0);

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
    const vertexShader   = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      // alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
      return null;
    }
    return program;
  }

/** */
  function loadShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      // alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }
