var canvas  = document.getElementById("footprints");
var context = canvas.getContext("2d");

context.fillStyle   = "#80ff21";
context.strokeStyle = "#152a06";

context.font = "bold 64px Arial";

context.textAlign    = "center";
context.textBaseline = "middle";

var current = 0;

function Sprite(src, x, y) {
  var self = this;

  self.image        = new Image();
  self.image.src    = "footprints/" + src + ".png";
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

var bss = [new Sprite("b1",   0,   0), new Sprite("b2", 0,   0), new Sprite("b3",   0,   0), new Sprite("b4",   0,   0)];
var iss = [new Sprite("i1", 480, 560), new Sprite("i2", 0, 480), new Sprite("i3", 480, 480), new Sprite("i4",   0, 560)];

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
    draw(bss[current]);
    iss.forEach(draw);
  }
}

function Position(cursor) {
  var self = this

  self.x = (cursor.pageX - canvas.offsetLeft) * (640 / canvas.clientWidth );
  self.y = (cursor.pageY - canvas.offsetTop ) * (640 / canvas.clientHeight);
}

canvas.onclick = function(event) {
  for (var i = 0; i < iss.length; i++) {
    if (iss[i] !== null && iss[i].contains(new Position(event)) && i == current) {
      iss[i]   = null;
      current += 1;
    }
  }

  setTimeout(update, 60);
}

setTimeout(update, 120);
