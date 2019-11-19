
const pi = Math.PI;
const oneStep = pi/32;

let points = [[0,1.5,0],[1,1.5,0],[1,1.3,0],[0.6,1.1,0],[0.7,1,0],[0.7,0.9,0],[0.6,0.8,0],[0.4,-1,0],[0.6, -1.1,0],[0.6, -1.2,0],[0.55, -1.3,0],[0.6, -1.4,0],[0.6, -1.5,0],[0.5, -1.7,0],[0.4, -1.8,0],[0.2, -1.9,0],[0, -2,0]];
let vectors = [];

draw(vectors);
/** */
function draw(vectors) {
  drawFigure(points, vectors);
  vectors.length = 0;
}

/** */
function drawFigure(points, vectors, i = 0) {
  while (oneStep*i <= 2*pi) {
    vectors.push(calculateDeformation(points, oneStep*i).data.slice(0, 3));
    i++;
  }
}

/** */
function calculateDeformation(points, deformation) {
  const matrix = Matrix.rotateY(deformation);
  const vectors = points.map(e => new Vector(e));
  let vectorMatrixes = vectors.map(e => Matrix.from(e).transpose());
  let result = vectorMatrixes.map(e => e.multiply(matrix).row(0));
  return result;
}
