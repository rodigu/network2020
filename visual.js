class VisualNetwork{
  constructor(){

  }
}

// Note: only go through the connections and draw them

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(120, 50, 100);
}
function windowResized(){

}
function draw(){
  fill(100);
  rect(mouseX, mouseY, 10, 10);
}
