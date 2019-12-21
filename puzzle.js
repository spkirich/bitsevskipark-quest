var canvas  = document.getElementById("puzzle");
var context = canvas.getContext("2d");

context.fillStyle   = "#80ff21";
context.strokeStyle = "#152a06";

context.font = "bold 64px Arial";

context.textAlign    = "center";
context.textBaseline = "middle";

var picked = null;

function Sprite(src, x, y) {
  var self = this;

  self.image        = new Image();
  self.image.src    = "puzzle/" + src + ".png";
  self.image.onload = function() {
    self.width      = this.width;
    self.height     = this.height;
  }

  self.x = x;
  self.y = y;

  self.contains = function(p) {
    var containsX = false;
    var containsY = false;

    if (self.x <= p.x && p.x <= self.x + self.width ) containsX = true;
    if (self.y <= p.y && p.y <= self.y + self.height) containsY = true;

    if (containsX && containsY)
      return true;
    else
      return false;
  }
}

var pss = [
  new Sprite("p_",   0, 426),
  new Sprite("p_", 213, 426),
  new Sprite("p_", 426, 426),
  new Sprite("p_",   0, 213),
  new Sprite("p_", 213, 213),
  new Sprite("p_", 426, 213),
  new Sprite("p_",   0,   0),
  new Sprite("p_", 213,   0),
  new Sprite("p_", 426,   0),
];

var ess = new Array(8);

var iss = [
  new Sprite("i1", 200,   5),
  new Sprite("i2",  10,  20),
  new Sprite("i3", 434, 275),
  new Sprite("i4", 216, 225),
  new Sprite("i5", 380,  16),
  new Sprite("i6",  15, 384),
  new Sprite("i7", 220, 480),
  new Sprite("i8", 450, 450),
  new Sprite("i9",   5, 220),
];

function draw(sprite) {
  if (sprite !== null) context.drawImage(sprite.image, sprite.x, sprite.y);
}

function update() {
  if (iss.every(sprite => sprite === null)) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    ess.forEach(draw);
    context.fillText("ВЕРНО!", 320, 320);
    context.strokeText("ВЕРНО!", 320, 320);
  } else {
    context.clearRect(0, 0, canvas.width, canvas.height);
    pss.forEach(draw);
    ess.forEach(draw);
    iss.forEach(draw);
    if (picked !== null) draw(iss[picked]);
  }
}

function Position(cursor) {
  var self = this

  self.x = (cursor.pageX - canvas.offsetLeft) * (640 / canvas.clientWidth );
  self.y = (cursor.pageY - canvas.offsetTop ) * (640 / canvas.clientHeight);
}

function handlePress(p) {
  for (var i = 0; i < iss.length; i++) {
    if (iss[i] !== null && iss[i].contains(p)) picked = i;
  }
}

function handleMove(p) {
  if (picked !== null) {
    sprite = iss[picked];
    sprite.x = p.x - sprite.width  / 2;
    sprite.y = p.y - sprite.height / 2;
  }
}

function handleRelease(p) {
  for (var i = 0; i < pss.length; i++) {
    if (pss[i].contains(p) && i == picked) {
      iss[i] = null;
      ess[i] = new Sprite("e" + (i + 1), 0, 0);
    }
  }

  picked = null;
}

canvas.onmousedown = function(event) {
  handlePress(new Position(event));
}

canvas.onmousemove = function(event) {
  handleMove(new Position(event));
}

canvas.onmouseup = function(event) {
  handleRelease(new Position(event));
}

canvas.ontouchstart = function(event) {
  handlePress(new Position(event.targetTouches[0]));
  event.preventDefault();
}

canvas.ontouchmove = function(event) {
  handleMove(new Position(event.targetTouches[0]));
  event.preventDefault();
}

canvas.ontouchend = function(event) {
  handleRelease(new Position(event.changedTouches[0]));
  event.preventDefault();
}

setInterval(update, 16);
