class VisualNetwork{
  constructor(){
    this.network = new Network();

  }
  checkOverlaps(){

  }
  checkMouse(){
     // check if mouse is pressed and overlaping each node
  }
}
// 0 to 18
// Note: only go through the connections and draw them

var classNetwork = new VisualNetwork();
function setup(){
  createCanvas(windowWidth, windowHeight);
  background(120, 50, 100);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  fill(200);
  rect(mouseX, mouseY, 10, 10);
  // if (mouseIsPressed) classNetwork.checkMouse();
}
