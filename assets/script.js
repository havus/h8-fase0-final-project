let canvas = document.getElementById('mycanvas'),
    ctx = canvas.getContext('2d');

// MAIN
let box = {
  posX: 480 - 350,
  posY: 320 - 220,
  witdh: 30,
  height: 30,
  moveX: 0,
  moveY: 0,
  jump: true,
}

let control = {
  left: false,
  up: false,
  right: false,
  key: (event) => {
    
    let tombol = event.type == 'keydown' ? true : false;
    switch(event.keyCode) {
      case 37:
        control.left = tombol;
      break;
      case 38:
        control.up = tombol;
      break;
      case 39:
        control.right = tombol;
      break;
    }

  }
}

// rekursif VAR LOAD

let load = function() {
  let power = Number(document.getElementById('power').value);

  if (control.right) {
    box.moveX += power/2;
  }

  if (control.left) {
    box.moveX -= power/2;
  }
  
  if (box.posX >= 300) {
    box.posX = -30;
  } else if (box.posX <= -30) {
    box.posX = 300;
  }
  
  if (control.up && box.jump == false) {
    box.jump = true;
    box.moveY += power * 10;
  }

  box.posX += box.moveX;
  box.moveX *= 9/10;
  
  box.posY -= box.moveY;
  box.moveY *= 9/10;
  box.posY += power * 5;


  if (box.posY >= 320 - 220) {
    box.jump = false;
    box.posY = 320 - 220;
    box.moveY = 0;
  } else if (box.posY <= 0) {
    box.posY = 0;
    box.moveY = 0;
  }
    
  // #30cfd0 #330867
  // #667eea #764ba2
  ctx.fillStyle = '#8b9dc3';
  ctx.beginPath();
  ctx.fillRect(0, 0, 480, 320);
  ctx.fillStyle = '#011f4b';
  ctx.rect(box.posX, box.posY, box.witdh, box.height);
  ctx.fill();
  
  ctx.beginPath();
  ctx.moveTo(0, 132);
  ctx.lineTo(480, 132);
  ctx.stroke();
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#202830";

  document.getElementById('speed').innerHTML = 'Speed = ' + Math.abs(box.moveX.toFixed(2));
  window.requestAnimationFrame(load);
}


window.addEventListener('keydown', control.key);
window.addEventListener('keyup', control.key);
window.requestAnimationFrame(load);
