let canvas = document.getElementById("canvas");
let flagPoint = false;

canvas.width = 1024;
canvas.height = 766;

if (canvas.getContext('2d')) {
  let ctx = canvas.getContext('2d');
  ctx.font = "48px serif";

  let inputText = document.getElementById('text');
  let addText = document.getElementById('addText');
  let x = canvas.width/10*3;
  let y = canvas.height/10*3;
  let delta = 100;
  let width = 400;
  let height = 0.7*width;
  let anim = -1;
  let border = 100;
  let pi = Math.PI;

  flag(x, y ,width, height, delta);

  let img = new Image();

  img.onload = function() {
    ctx.drawImage(img ,x+ 20, y + 20, 70, 70);
  };
  img.src = 'sssr.png';


  function animateFlag() {
    let widthLocal = width - Math.abs(delta/10);

    if (!flagPoint) {
      drawText();
      flag(x, y ,widthLocal, height, delta);
      ctx.drawImage(img ,x + 20, y + 35 + -1*delta/7, 70, 70);
      return;
    }
    if (Math.abs(delta) > border) anim*=-1;

    drawText();
    flag(x, y, widthLocal, height, delta);
    ctx.drawImage(img ,x + 20, y + 35 + -1*delta/7, 70, 70);
    setTimeout(a, 1);
  }

  function a() {
    clearScreen();
    animateFlag(delta+=anim)
  }

  function flag(x, y, width, height, delta) {

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x + width*2/4, y - delta, x + 3/4 * width, y + delta, x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.bezierCurveTo(x + 3/4*width, y + delta + height, x + width*2/4, y - delta + height, x, y + height);
    ctx.lineTo(x, y);
    ctx.fillStyle = "#CC0000";
    ctx.stroke();
    ctx.fill();

    flagpole(x,y);
  }

  function flagpole(x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, canvas.height);
    ctx.lineTo(x-25, canvas.height);
    ctx.lineTo(x-25, y);
    ctx.lineTo(x, y);
    ctx.fillStyle = 'gray';
    ctx.stroke();
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x - 12.5,y - 5, 25,  0, 2*pi);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.stroke();
  }

  function clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  addText.addEventListener('click', drawText);

  function drawText() {
    let text = inputText.value;

    if (text != '') {
      ctx.fillStyle = 'black';
      ctx.clearRect(0,0,width, 150);
      ctx.fillText(text, 100, 100);
    }
  }

  document.getElementById('save').addEventListener('click', saveImg);

  function saveImg() {
    let imgData = canvas.toDataURL();
    let img = new Image();
    img.src = imgData;
    let link = document.createElement("a");
    link.setAttribute("href", img.src);
    link.setAttribute("download", "canvasImage");
    link.click();
  }

  document.getElementById('open').addEventListener('change', e => {
    let img = new Image();
    const file = e.target.files[0];
    img.addEventListener('load', e => {
      ctx.drawImage(img ,0,0,canvas.width, canvas.height);
    });
    img.src = URL.createObjectURL(file);
  });

//   function openImg() {
//     let img = new Image();
//     let file = document.getElementById(open);
//     file.addEventListener('change', e => {
//       img.src = e.target.files[0];
//     })

//     ctx.drawImage(img ,x + 20, y + 35 + -1*delta/7, 70, 70);
//   }

//   function handleImage(e){
//     var reader = new FileReader();
//     reader.onload = function(event){
//         var img = new Image();
//         img.onload = function(){
//             canvas.width = img.width;
//             canvas.height = img.height;
//             ctx.drawImage(img,0,0);
//         }
//         img.src = event.target.result;
//     }
//     reader.readAsDataURL(e.target.files[0]);
// }

  }

let buttonAnimation = document.getElementById('animation');
buttonAnimation.addEventListener('click', () => {
  flagPoint = !flagPoint;
  if (flagPoint) animateFlag();
});


