//IMAGE HOVER SWAP TEXT EFFECT
const text = "Hi, I’m Zeina. I love to combine code and design.";
let i = 0;

function typeWriter() {
  if (i< text.length) {
    document.getElementById("typing-text").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 40);
  }
}

window.onload = typeWriter;


//P5 SKETCH (self portrait)
let sketch = function(p) {
  let font;

  p.preload = function() {
    font = p.loadFont("fonts/VT323-Regular.ttf");
  };

  p.setup = function() {
    let canvas = p.createCanvas(400, 345);
    canvas.parent("p5-sketch");
  };

  p.draw = function() {
    p.background("#9FCB98");


    p.stroke(0);
    p.strokeWeight(4);

    // hair
    p.fill("#D3A45F");
    p.rectMode(p.CENTER);
    p.rect(200, 280, 200, 320, 130);

    // neck
    p.fill("#EEE8D6");
    p.rect(200, 305, 60, 50, 10);

    // ears
    p.ellipse(125, 220, 40);
    p.ellipse(275, 220, 40);

    // face
    p.ellipse(200, 220, 160, 140);

    // shoulders
    p.rect(200, 380, 180, 110, 110);

    // eyes
    p.fill(0);
    p.circle(155, 215, 20);
    p.circle(245, 215, 20);

    //eyelashes
    p.line(146, 212, 140, 207);
    p.line(144, 218, 136, 215);
    p.line(255, 212, 260, 207);
    p.line(256, 218, 263, 215);

    // nose
    p.fill("#E0CDB2");
    p.circle(200, 230, 15);

    // mouth hover = full canvas
    let hover =
      p.mouseX > 0 && p.mouseX < 400 &&
      p.mouseY > 0 && p.mouseY < 345;

    p.fill(0);

    if (hover) {
      p.fill("#EDCBE4");
      p.arc(200, 260, 40, 20, 0, Math.PI);
    } else {
      p.arc(200, 265, 20, 5, 0, Math.PI);
    }

    // blush
    p.fill("#EBA7BE");
    p.noStroke();
    p.ellipse(155, 246, 20, 10);
    p.ellipse(245, 246, 20, 10);

    //eyebrows
    p.fill("#D3A45F");
    p.noStroke();
    p.arc(158, 195, 30, 11, p.PI, p.TWO_PI, p.OPEN);
    p.arc(242, 195, 30, 11, p.PI, p.TWO_PI, p.OPEN);

    //freckles
    p.fill("#D8B077");
    p.circle(155, 235, 5);
    p.circle(150, 240, 5);
    p.circle(160, 240, 5);
    p.circle(245, 235, 5);
    p.circle(240, 240, 5);
    p.circle(250, 240, 5);

    // text
    p.textFont(font);
    p.textSize(30);
    p.fill(0);
    p.noStroke();
    p.textAlign(p.CENTER);
    if (hover) {
      p.text("hi :)", 200, 40);
    } else {
      p.text("hover over me!", 200, 40);
    }

  };
};

new p5(sketch);


//STICKER DRAG AND DROP
const stickers = document.querySelectorAll(".sticker");
const board = document.getElementById("corkboard");

stickers.forEach(sticker => {
  sticker.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("src", sticker.src);
  });
});

board.addEventListener("dragover", (e) => {
  e.preventDefault();
});

board.addEventListener("drop", (e) => {
  e.preventDefault();

  const src = e.dataTransfer.getData("src");

  const newSticker = document.createElement("img");
  newSticker.src = src;
  newSticker.classList.add("placed-sticker");

  newSticker.style.position = "absolute";
  newSticker.style.left = e.offsetX + "px";
  newSticker.style.top = e.offsetY + "px";
  newSticker.style.width = "80px";

  board.appendChild(newSticker);
});

//CLEAR BOARD
const clearBtn =document.getElementById("clearBoard");

clearBtn.addEventListener("click", () => {
  const placed= board.querySelectorAll(".placed-sticker");
  placed.forEach(el => el.remove());
});

//CONTACT
const sendBtn = document.getElementById("sendBtn");
const input =document.getElementById("messageInput");
const chatBox= document.getElementById("chatBox");

sendBtn.addEventListener("click", () => {
  const msg=input.value.trim();
  if (msg=== "") return;

  const userMsg =document.createElement("div");
  userMsg.classList.add("msg", "user");
  userMsg.textContent = msg;
  chatBox.appendChild(userMsg);

  input.value= "";

  setTimeout(() => {
    const systemMsg = document.createElement("div");
    systemMsg.classList.add("msg", "system");
    systemMsg.textContent = "message received ✔ Zeina will see this soon :)";
    chatBox.appendChild(systemMsg);

    chatBox.scrollTop= chatBox.scrollHeight;
  }, 500);
});

const email =document.getElementById("emailCopy");

email.addEventListener("click", () => {
  navigator.clipboard.writeText("znk217@nyu.edu");

  const systemMsg= document.createElement("div");
  systemMsg.classList.add("msg", "system");
  systemMsg.textContent = "email copied ✔";

  chatBox.appendChild(systemMsg);
  chatBox.scrollTop = chatBox.scrollHeight;
});

//MOBILE STICKER 
const isMobile =window.innerWidth <= 768;

if (isMobile) {
  const stickers = document.querySelectorAll(".sticker");
  const board = document.getElementById("corkboard");

  stickers.forEach(sticker => {
    sticker.addEventListener("click", () => {
      const newSticker = document.createElement("img");
      newSticker.src = sticker.src;
      newSticker.classList.add("placed-sticker");

      newSticker.style.position = "absolute";

      //rand pos on board
      const x= Math.random()*(board.clientWidth-80);
      const y= Math.random()*(board.clientHeight-80);

      newSticker.style.left= x + "px";
      newSticker.style.top= y + "px";
      newSticker.style.width= "80px";

      board.appendChild(newSticker);
    });
  });
}