var canvas  = document.getElementById("map");
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
  self.image.src    = "map/" + src + ".png";
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
  new Sprite("p1", 397, 239),
  new Sprite("p2", 344, 151),
  new Sprite("p3", 283, 191),
  new Sprite("p4", 249, 195),
  new Sprite("p5", 147, 148),
  new Sprite("p6", 135, 213),
  new Sprite("p7", 234, 436),
  new Sprite("p8", 340, 449),
];

var ess = new Array(8);

var iss = [
  new Sprite("i1", 480, 100),
  new Sprite("i2", 480,  50),
  new Sprite("i3", 480, 250),
  new Sprite("i4", 310,  50),
  new Sprite("i5", 480,   0),
  new Sprite("i6", 480, 150),
  new Sprite("i7", 310,   0),
  new Sprite("i8", 480, 200),
];

function draw(sprite) {
  if (sprite !== null) context.drawImage(sprite.image, sprite.x, sprite.y);
}

function update() {
  if (iss.every(sprite => sprite === null)) {
    context.clearRect(0, 0, canvas.width, canvas.height);
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

  setTimeout(update, 60);
}

function handleMove(p) {
  if (picked !== null) {
    sprite = iss[picked];
    sprite.x = p.x - sprite.width  / 2;
    sprite.y = p.y - sprite.height / 2;
  }

  setTimeout(update, 60);
}

function handleRelease(p) {
  for (var i = 0; i < pss.length; i++) {
    if (pss[i].contains(p) && i == picked) {
      iss[i] = null;
      ess[i] = new Sprite("e" + (i + 1), 0, 0);
    }
  }

  picked = null;

  setTimeout(update, 60);
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

setTimeout(update, 120);
