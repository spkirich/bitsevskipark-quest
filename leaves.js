var canvas  = document.getElementById("leaves");
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
  self.image.src    = "leaves/" + src + ".png";
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

var pss = [new Sprite("p1", 0, 560), new Sprite("p2", 240, 560), new Sprite("p3", 480, 560)];
var iss = [new Sprite("i1", 480, 0), new Sprite("i2",   0,   0), new Sprite("i3", 240,   0)];

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
    if (pss[i].contains(p) && i == picked) iss[i] = null;
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
