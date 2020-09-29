class Network{
  constructor(){
    this.nodes = [];
    this.edges = [];
  }
  addNode(id_, name_ = '', weight_ = 0){
    this.nodes.push(new Node(id_, name_, weight_));
  }
  getNode(nodeId_){
    let counter;
    for (counter = 0; counter < this.nodes.length; counter++)
      if (nodeId_ == this.nodes[counter].id) return this.nodes[counter];
    return null;
  }
  setNodeColor(id_, color_){
    let counter
    for (counter = 0; counter < this.nodes.length; counter++)
      if(this.nodes[counter].id == id_) this.nodes[counter].color = color_;
      // will add optimization later (add break)
  }
  setNodeX(id_, x_){
    let counter
    for (counter = 0; counter < this.nodes.length; counter++)
      if(this.nodes[counter].id == id_) this.nodes[counter].x = x_;
  }
  setNodeColor(id_, color_){
    let counter
    for (counter = 0; counter < this.nodes.length; counter++)
      if(this.nodes[counter].id == id_) this.nodes[counter].color = color_;
  }
  setNodeY(id_, y_){
    let counter
    for (counter = 0; counter < this.nodes.length; counter++)
      if(this.nodes[counter].id == id_) this.nodes[counter].y = y_;
  }
  addEdge(node1_, node2_, weight_ = 0, direction_ = 0){
    this.edges.push(new Edge(node1_, node2_, weight_, direction_));
    // if the nodes don't exist, they are added without names or weights
    if (this.getNode(node1_) == null)
      this.addNode(node1_);
    if (this.getNode(node2_) == null)
      this.addNode(node2_);
  }
  addEdges(edges_){
    let counter;
    for(counter = 0; counter < edges_.length; counter++)
      this.addEdge(edges_[counter][0], edges_[counter][1], 0, 1);
  }
  addDirectedEdges(edges_){
    let counter;
    for(counter = 0; counter < edges_.length; counter++)
      this.addEdge(edges_[counter][0], edges_[counter][1], 0, 1);
  }
  getNetworkWeight(){
    let counter;
    let answer = 0;
    for (counter = 0; counter < this.nodes.length; counter ++)
      answer += this.nodes[counter].weight;
    return answer;
  }
  getGenus(){
    return this.edges.length - this.nodes.length + 1;
  }
  // takes in 2 node IDs and checks if they have an edge connecting them
  undirectedEdge(node1_, node2_){
    let counter;
    // console.log("AAA");
    // console.log(this.edges.length);
    for (counter = 0; counter < this.edges.length; counter++){
      if ((this.edges[counter].nodes[0] == node1_ && this.edges[counter].nodes[1] == node2_) ||
          (this.edges[counter].nodes[0] == node2_ && this.edges[counter].nodes[1] == node1_)){
        return true;
      }
      // console.log("BBB");
      // console.log(this.edges[counter].nodes[0], this.edges[counter].nodes[0]);
    }
    return false;
  }
  directedEdge(node1_, node2_){
    let counter;
    for (counter = 0; counter < this.edges.legth; counter++)
      if ((this.edges[counter].nodes[0] == node1_ && this.edges[counter].nodes[1] == node2_) &&
          (this.edges[counter].direction == 1))
        return true;
    return false;
  }
  outNeighbors(id_){
    let answer = [];
    let counter;
    for (counter = 0; counter < this.nodes.length; counter++)
      if(this.directedEdge(id_, this.nodes[counter].id)) answer.push(this.nodes[counter]);
    return answer;
  }
  inNeighbors(id_){
    let answer = [];
    let counter;
    for (counter = 0; counter < this.nodes.length; counter++)
      if(this.directedEdge(this.nodes[counter].id, id_)) answer.push(this.nodes[counter]);
    return answer;
  }
  nodeNeighbors(id_){
    let answer = [];
    let counter;
    for (counter = 0; counter < this.nodes.length; counter++)
      if(this.undirectedEdge(this.nodes[counter].id, id_)) answer.push(this.nodes[counter]);
    return answer;
  }
  inDegree(id_){
    return this.inNeighbors(id_).length;
  }
  outDegree(id_){
    return this.outNeighbors(id_).length;
  }
  degree(id_){
    return this.nodeNeighbors(id_).length;
  }
  negativeWeightNodes(){
    let answer = [];
    let counter;
    for (counter = 0; counter < this.nodes.length; counter++)
      if(this.nodes[counter].weight < 0) answer.push(this.nodes[counter]);
    return answer;
  }
  positiveWeightNodes(){
    let answer = [];
    let counter;
    for (counter = 0; counter < this.nodes.length; counter++)
      if(this.nodes[counter].weight > 0) answer.push(this.nodes[counter]);
    return answer;
  }
  zeroWeightNodes(){
    let answer = [];
    let counter;
    for (counter = 0; counter < this.nodes.length; counter++)
      if(this.nodes[counter].weight = 0) answer.push(this.nodes[counter]);
    return answer;
  }
  undirectedMaxEdges(){
    return this.nodes.length*(this.nodes.length - 1)/2;
  }
  density(){
    return this.edges.length/this.undirectedMaxEdges();
  }
}

class Node{
  // x and y positions kept to facilitate visualizations
  constructor(id_, name_ = '', weight_ = 0, x_ = 0, y_ = 0, color_ = []){
    this.id = id_;
    this.weight = weight_;
    this.name = name_;
    this.x = x_;
    this.y = y_;
    this.color = color_;
  }
}

class Edge{
  // takes 2 nodes' ids, a value, and a direction (0 = undirected,
  // 1 = directed towards node 2)
  constructor(node1_, node2_, weight_ = 0, direction_ = 0){
    this.nodes = [node1_, node2_];
    this.direction = direction_;
    this.weight = weight_;
  }
}
module.exports = {Network}
