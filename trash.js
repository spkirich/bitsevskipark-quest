var canvas  = document.getElementById("trash");
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
  self.image.src    = "trash/" + src + ".png";
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
  new Sprite("p1",   0, 390),
  new Sprite("p2", 155, 390),
  new Sprite("p3", 310, 390),
  new Sprite("p4", 465, 390),
];

var iss = [
  [new Sprite("i1-1", 160,   0), new Sprite("i1-2",   0,   0)],
  [new Sprite("i2-1", 320,   0), new Sprite("i2-2", 480,   0)],
  [new Sprite("i3-1", 480, 160), new Sprite("i3-2",   0, 160)],
  [new Sprite("i4-1", 160,  60), new Sprite("i4-2", 320, 160)],
];

function draw(sprite) {
  if (sprite !== null) context.drawImage(sprite.image, sprite.x, sprite.y);
}

function update() {
  if (iss.every(group => group.every(sprite => sprite === null))) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillText("ВЕРНО!", 320, 320);
    context.strokeText("ВЕРНО!", 320, 320);
  } else {
    context.clearRect(0, 0, canvas.width, canvas.height);
    pss.forEach(draw);
    iss.forEach(group => group.forEach(draw));
    if (picked !== null) draw(iss[picked[0]][picked[1]]);
  }
}

function Position(cursor) {
  var self = this

  self.x = (cursor.pageX - canvas.offsetLeft) * (640 / canvas.clientWidth );
  self.y = (cursor.pageY - canvas.offsetTop ) * (640 / canvas.clientHeight);
}

function handlePress(p) {
  for (var i = 0; i < iss.length; i++) {
    for (var j = 0; j < iss[i].length; j++) {
      if (iss[i][j] !== null && iss[i][j].contains(p)) picked = [i, j];
    }
  }
}

function handleMove(p) {
  if (picked !== null) {
    sprite = iss[picked[0]][picked[1]];
    sprite.x = p.x - sprite.width  / 2;
    sprite.y = p.y - sprite.height / 2;
  }
}

function handleRelease(p) {
  for (var i = 0; i < pss.length; i++) {
    if (pss[i].contains(p) && i == picked[0]) iss[i][picked[1]] = null;
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
