var controller;
var NETUSE;
var TYPE;
var DEFAULTSIZE;

function setup(){
  controller = new Control();
  DEFAULTSIZE = 27;
  NETUSE = 0;
  TYPE = 'NONE';
  var canvas = createCanvas(windowWidth/2, 4*windowHeight/5);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);
  background(0);
  noStroke();
}

function draw(network_ = 0, type_ = 'NONE'){
  if (network_ != 0) NETUSE = network_;
  if (type_ != 'NONE') TYPE = type_;
  controller.mouseController();
  if (NETUSE === 0);
  else {
    background(240);
    fill(0);
    rect(2, 2, width - 4, height - 4);
    let visual = new Visualize(NETUSE);
    visual.drawNetwork(controller.mouse, TYPE);
  }
}
