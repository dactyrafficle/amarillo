
function Box(x, y, w, h, r, g, b, obj) {
 this.obj = obj;
 this.x = x;
 this.y = y;
 this.w = w;
 this.h = h;
 this.r = r;
 this.g = g;
 this.b = b;
 this.hover = false;
}
Box.prototype.display = function() {
 strokeWeight(2);
 stroke(170);
 fill(this.r, this.g, this.b, 120);
 rect(this.x, this.y, this.w, this.h);
}
Box.prototype.hovered = function() {
 this.hover = false;
 if (mouseX > this.x && mouseX < (this.x+this.w) && mouseY > this.y && mouseY < (this.y+this.h)) {
  this.hover = true;
 }
}