class VisualNetwork{
  constructor(classSheet_){
    this.network = new Network();
    this.classMatrix = [];
    this.mouseOn = [];
    let counter;
    for (counter = 0; counter < classSheet_.length; counter++){
      let counter2;
      let tempMatrix = [];
      for (counter2 = 0; counter2 < classSheet_[counter].length; counter2++){
        if (classSheet[counter][counter2] != ',')
          tempMatrix.push(classSheet[counter][counter2]);
        else if (classSheet[counter][counter2] == ','){
          this.classMatrix.push(tempMatrix);
          tempMatrix = [];
        }
      }
    }

    for (counter = 1; counter < 19; counter++){
      let counter2;
      for (counter2 = 1; counter2 < 19; counter2++){
        // this makes it so we are only taking in values below the diagonal
        if (counter2 < counter && this.classMatrix[19*counter + counter2] == "1")
          this.network.createConnection((counter2 - 1)%19, (counter - 1)%19);
      }
    }
    for (counter = 0; counter < classSheet_.length -  2; counter++){
      this.network.createNode(counter, this.classMatrix[counter + 1], 0, random(width), random(height));
      this.mouseOn.push(false);
    }
  }
  display(){
    let counter;
    for (counter = 0; counter < this.network.connections.length; counter++){
      strokeWeight(3);
      stroke(220, 50);
      let nodeA = this.network.getNode(this.network.connections[counter].nodes[0]);
      let nodeB = this.network.getNode(this.network.connections[counter].nodes[1]);
      line(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
      strokeWeight(2);
      stroke(0);
    }
    for (counter = 0; counter < this.network.nodes.length; counter++){
      fill(174, 198, 207);
      circle(this.network.nodes[counter].x, this.network.nodes[counter].y, 20);
      push();
      fill(255);
      translate(this.network.nodes[counter].x, this.network.nodes[counter].y);
      text(this.network.nodes[counter].name.join(""), 0, 0);
      pop();
    }
  }
  redoConnectionsA(){
    this.network.connections = [];
    let counter;
    for (counter = 1; counter < 19; counter++){
      let counter2;
      for (counter2 = 1; counter2 < 19; counter2++){
        // this makes it so we are only taking in values below the diagonal
        if (counter2 < counter && this.classMatrix[19*counter + counter2] == "1"){
          this.network.createConnection((counter2 - 1)%19, (counter - 1)%19);
        }
      }
    }
  }
  redoConnectionsB(){
    this.network.connections = [];
    let counter;
    for (counter = 1; counter < 19; counter++){
      let counter2;
      for (counter2 = 1; counter2 < 19; counter2++){
        // this makes it so we are only taking in values below the diagonal
        if (counter2 > counter && this.classMatrix[19*counter + counter2] == "1"){
          this.network.createConnection((counter2 - 1)%19, (counter - 1)%19);
        }
      }
    }
  }
  checkMouse(){
    let counter;
     // check if mouse is pressed and overlaping each node
     for (counter = 0; counter < this.network.nodes.length; counter++){
       if ((mouseX - this.network.nodes[counter].x)**2 + (mouseY - this.network.nodes[counter].y)**2 < 100){
         push();
         fill(255, 100, 100);
         translate(this.network.nodes[counter].x, this.network.nodes[counter].y);
         text(this.network.nodes[counter].name.join(""), 0, 0);
         pop();
         if (mouseCheck){
           this.mouseOn[counter] = true
         }
         else this.mouseOn[counter] = false;
       }
       if (this.mouseOn[counter]){
         this.network.nodes[counter].x = mouseX;
         this.network.nodes[counter].y = mouseY;
       }
     }
  }
}
var classSheet;
var classNetwork;
var mouseCheck;
function preload(){
  classSheet = loadStrings('ClassSheet.txt');
}
function setup(){
  noStroke();
  textAlign(CENTER);
  createCanvas(windowWidth, windowHeight);
  classNetwork = new VisualNetwork(classSheet);
  background(50);
  mouseCheck = false;
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
function mousePressed(){
  mouseCheck = true;
}
function mouseReleased(){
  mouseCheck = false;
  console.log(classNetwork.classMatrix.length);
}

function keyPressed(){
  if (key == 'a')
    classNetwork.redoConnectionsA();
  else if (key == 'b');
    classNetwork.redoConnectionsB();
}
function keyTyped() {
  // lower diagonal
  if (key === 'a')
    classNetwork.redoConnectionsA();
  // upper diagonal
  else if (key === 'b')
    classNetwork.redoConnectionsB();
  return false;
}

function draw(){
  // rect(mouseX, mouseY, 10, 10);
  background(50);
  classNetwork.display();
  classNetwork.checkMouse();

  // if (mouseIsPressed) classNetwork.checkMouse();
}
