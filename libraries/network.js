class Network{
  constructor(nodes_ = []){
    this.nodes = [];
    this.edges = [];
    if (nodes_.length > 0){
      let counter1, counter2;
      for (counter1 = 0; counter1 < nodes_.length; counter1 ++)
        for (counter2 = 0; counter2 < nodes_[counter1].length; counter2 ++)
          if (counter2 > counter1)
            if (nodes_[counter1][counter2] == nodes_[counter2][counter1] && nodes_[counter2][counter1] == 1)
              this.addEdge(counter1, counter2, 1, 0);
            else if(nodes_[counter1][counter2] > nodes_[counter2][counter1])
              this.addEdge(counter1, counter2, 1, 1);
            else if(nodes_[counter1][counter2] < nodes_[counter2][counter1])
              this.addEdge(counter2, counter1, 1, 1);
    }
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
  undirectedEdge(node1_, node2_){
    let counter;
    for (counter = 0; counter < this.edges.length; counter++)
      if ((this.edges[counter].nodes[0] == node1_ && this.edges[counter].nodes[1] == node2_) ||
          (this.edges[counter].nodes[0] == node2_ && this.edges[counter].nodes[1] == node1_))
        return true;
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
  assortativity(id_){
    let answer = 0;
    let knn = 1/this.degree(id_);
    let counter;
    let id_neighbors = this.nodeNeighbors(id_);
    console.log(">>", id_neighbors);
    for (counter = 0; counter < id_neighbors.length; counter++)
      answer += this.degree(id_neighbors[counter].id);
    return answer*knn;
  }
  complement(){
    let temp_network = new Network();
    let counter, counter1;
    for (counter = 0; counter < this.nodes.length; counter++)
      for (counter1 = 0; counter1 < this.nodes.length; counter1++)
        if (this.nodes[counter].id != this.nodes[counter1].id && !this.undirectedEdge(this.nodes[counter].id, this.nodes[counter1].id))
          temp_network.addEdge(this.nodes[counter].id, this.nodes[counter1].id);
    return temp_network;
  }
  ego(id_){
    let temp_network = new Network();
    let counter;
    for (counter = 0; counter < this.nodes.length; counter++)
      if (this.undirectedEdge(id_, this.nodes[counter].id)) temp_network.addEdge(id_, this.nodes[counter].id);
    return temp_network;
  }
}

// Basic Network functions
Network.prototype.addNode = function (id_, name_ = '', weight_ = 1){
  let counter;
  for (counter = 0; counter < this.nodes.length; counter++){
    if(this.nodes[counter].id == id_)
      return null;
  }
  this.nodes.push(new Node(id_, name_, weight_));
}
Network.prototype.getNode = function (nodeId_){
  let counter;
  for (counter = 0; counter < this.nodes.length; counter++)
    if (nodeId_ == this.nodes[counter].id) return this.nodes[counter];
  return null;
}

// Edge Functions
Network.prototype.addEdge = function (node1_, node2_, weight_ = 1, direction_ = 0){
  if (!this.undirectedEdge(node1_, node2_)){
    this.edges.push(new Edge(node1_, node2_, weight_, direction_));
    // if the nodes don't exist, they are added without names or weights
    if (this.getNode(node1_) == null)
      this.addNode(node1_);
    if (this.getNode(node2_) == null)
      this.addNode(node2_);
  }
  else console.log("Edge already exists");
}
Network.prototype.addEdges = function (edges_){
  let counter;
  for(counter = 0; counter < edges_.length; counter++)
    this.addEdge(edges_[counter][0], edges_[counter][1], 0, 1);
}

// Node and Edges classes
class Node{
  // x and y positions kept to facilitate visualizations
  constructor(id_, name_ = '', weight_ = 1, x_ = 0, y_ = 0, color_ = []){
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
  constructor(node1_, node2_, weight_ = 1, direction_ = 0){
    this.nodes = [node1_, node2_];
    this.direction = direction_;
    this.weight = weight_;
  }
}
