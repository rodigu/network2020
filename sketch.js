var controller;
var NETUSE;

function setup(){
  controller = new Control();
  NETUSE = 0;
  var canvas = createCanvas(600, 400);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);
  background(0);
  noStroke();
}

function draw(network_ = 0){
  if (network_ != 0) NETUSE = network_;
  controller.mouseController();
  if (NETUSE === 0);
  else {
    background(0);
    let visual = new Visualize(NETUSE);
    visual.drawNetwork(controller.mouse);
  }
}
