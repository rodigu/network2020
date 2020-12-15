// Alt + Crt + Shift + [ collapses
class Network{
  constructor(dir_ = 'undirected', nodes_ = []){
    this.nodes = [];
    this.edges = [];
    if (dir_ == 0) dir_ = 'undirected';
    else if (dir_ == 1) dir_ = 'directed';
    this.direction = dir_;
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
    // Returns a list of nodes neighbors to id_
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
    for (counter = 0; counter < this.nodes.length; counter++){
      if (this.undirectedEdge(id_, this.nodes[counter].id)){
        temp_network.addEdge(id_, this.nodes[counter].id);
        let counter2;
        let neighbors = this.nodeNeighbors(this.nodes[counter].id);
        for (counter2 = 0; counter2 < neighbors.length; counter2++)
          if (this.undirectedEdge(neighbors[counter2].id, this.nodes[counter].id) && this.undirectedEdge(id_, neighbors[counter2].id)) temp_network.addEdge(neighbors[counter2].id, this.nodes[counter].id);
      }
    }
    return temp_network;
  }
  duplicate(){
    let counter;
    let dup = new Network(this.direction);
    for (counter = 0; counter < this.nodes.length; counter++)
      dup.addNode(this.nodes[counter].id, this.nodes[counter].name, this.nodes[counter].weight);
    for (counter = 0; counter < this.edges.length; counter++)
      dup.addEdge(this.edges[counter].nodes[0], this.edges[counter].nodes[1], this.edges[counter].weight, this.edges[counter].direction);
    return dup;
  }
  clusteringCoefficient(id_){
    let ego_net = this.ego(id_);
    if (ego_net.nodes.length <= 2) return 0;
    let max_t = (ego_net.nodes.length - 1)*(ego_net.nodes.length - 2)/2;
    let actual_t = 0;
    let counter;
    for (counter = 0; counter < ego_net.nodes.length; counter ++)
      if (ego_net.nodes[counter].id != id_){
        let counter2;
        for (counter2 = 0; counter2 < ego_net.nodes.length; counter2 ++)
          if (ego_net.nodes[counter2].id != id_ && ego_net.undirectedEdge(ego_net.nodes[counter2].id, ego_net.nodes[counter].id))
            actual_t ++;
      }
      return actual_t/(2*max_t);
  }
  averageClustering(){
    let counter;
    let coefficients = 0;
    for (counter = 0; counter < this.nodes.length; counter++) coefficients += this.clusteringCoefficient(this.nodes[counter].id);
    return coefficients/this.nodes.length;
  }
  closenessCentrality(id_){
    let counter;
    let sum = 0;
    for (counter = 0; counter < this.nodes.length; counter++){
      if (this.breadthFirstSearch(id_, this.nodes[counter].id) < 0)
        return 0;
      sum += this.breadthFirstSearch(id_,this.nodes[counter].id).length - 1;
    }
    return (this.nodes.length - 1)/sum;
  }
}

// Path finding and walk functions
Network.prototype.weightedPathNetwork = function (id_){
  let weighted_net = this.duplicate();
  let counter0;
  let initial_node = id_;
  for (counter0 = 0; counter0 < weighted_net.nodes.length; counter0 ++){
    weighted_net.nodes[counter0].weight = -1;
    if (weighted_net.nodes[counter0].id == id_) weighted_net.nodes[counter0].weight = 0;
  }
  let get_path = function(initial_node){
    let counter;
    let node_neighbors = weighted_net.nodeNeighbors(initial_node);
    for (counter = 0; counter < node_neighbors.length; counter++){
      if (((weighted_net.getEdgeDirection(initial_node,node_neighbors[counter].id) == 1 && weighted_net.directedEdge(initial_node,node_neighbors[counter].id)) || weighted_net.direction == 'undirected') && (weighted_net.getNode(node_neighbors[counter].id).weight == -1 ||
          weighted_net.getNode(initial_node).weight + weighted_net.getEdgeWeight(initial_node, node_neighbors[counter].id) < weighted_net.getNode(node_neighbors[counter].id).weight)){
        weighted_net.setNodeWeight(node_neighbors[counter].id,
                                   weighted_net.getEdgeWeight(initial_node, node_neighbors[counter].id) + weighted_net.getNode(initial_node).weight);
        weighted_net.getNode(node_neighbors[counter].id).previous_node = weighted_net.getNode(initial_node).id;
        get_path(node_neighbors[counter].id);
      }
    }
  }
  get_path(id_);
  return weighted_net;
}
Network.prototype.breadthFirstSearch = function (node1_, node2_){
  let path = [];
  let weighted_net = this.weightedPathNetwork(node1_);
  let end_node = node2_;
  path.push(end_node);
  if (weighted_net.getNode(node2_).weight < 0 || weighted_net.getNode(node1_) == null || weighted_net.getNode(node2_) == null){
    console.log(`There is no path between ${node1_} and ${node2_}`);
    return -1;
  }
  while (end_node != node1_){
    end_node = weighted_net.getNode(end_node).previous_node;
    path.push(end_node);
  }
  let inverted_path = [];
  let counter;
  for (counter = path.length - 1; counter >= 0; counter--) inverted_path.push(path[counter]);
  return inverted_path;
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
Network.prototype.getNode = function (id_){
  let counter;
  for (counter = 0; counter < this.nodes.length; counter++)
    if (id_ == this.nodes[counter].id) return this.nodes[counter];
  return null;
}
Network.prototype.removeNode = function (id_){
  let counter;
  for (counter = 0; counter < this.edges.length; counter++){
    if (this.edges[counter].nodes[0] == id_)
      this.removeEdge(id_, this.edges[counter].nodes[1]);
    else if (this.edges[counter].nodes[1] == id_)
      this.removeEdge(this.edges[counter].nodes[0], id_);
  }
  for (counter = 0; counter < this.nodes.length; counter++)
    if(this.nodes[counter].id == id_)
      this.nodes.splice(counter,1);

}
Network.prototype.setNodeColor = function (id_, color_){
  let counter;
  for (counter = 0; counter < this.nodes.length; counter++)
    if(this.nodes[counter].id == id_){
      this.nodes[counter].color = color_;
      break;
    }
}
Network.prototype.setNodeX = function (id_, x_){
  let counter;
  for (counter = 0; counter < this.nodes.length; counter++)
    if(this.nodes[counter].id == id_){
      this.nodes[counter].x = x_;
      break;
    }
}
Network.prototype.setNodeY = function (id_, y_){
  let counter;
  for (counter = 0; counter < this.nodes.length; counter++)
    if(this.nodes[counter].id == id_){
      this.nodes[counter].y = y_;
      break;
    }
}
Network.prototype.setNodeWeight = function (id_, weight_){
  let counter;
  for (counter = 0; counter < this.nodes.length; counter++)
    if(this.nodes[counter].id == id_){
      this.nodes[counter].weight = weight_;
      break;
    }
}

// Edge Functions
Network.prototype.addEdge = function (node1_ = 'ERR', node2_ = 'ERR', weight_ = 1){
  if (node1_ == 'ERR' || node2_ == 'ERR' || node1_ == node2_) return 'Insufficient info';
  if (this.direction == 'undirected') this.addEdgeType(node1_, node2_, weight_,0);
  else this.addEdgeType(node1_, node2_, weight_, 1);
}
Network.prototype.setEdgeWeight = function (node1_, node2_, weight_){
  if (this.direction == 'undirected'){
    let counter;
    for (counter = 0; counter < this.edges.length; counter++)
      if ((this.edges[counter].nodes[0] == node1_ && this.edges[counter].nodes[1] == node2_) ||
          (this.edges[counter].nodes[0] == node2_ && this.edges[counter].nodes[1] == node1_))
        this.edges[counter].weight = weight_;
  }
}
Network.prototype.addEdgeType = function (node1_, node2_, weight_ = 1, direction_ = 0){
  if (direction_ == 0 && !this.undirectedEdge(node1_, node2_) && node1_ != node2_){
    this.edges.push(new Edge(node1_, node2_, weight_, direction_));
    // if the nodes don't exist, they are added without names or weights
    if (this.getNode(node1_) == null)
      this.addNode(node1_);
    if (this.getNode(node2_) == null)
      this.addNode(node2_);
  }
  else if (direction_ == 1 && !this.directedEdge(node1_, node2_)){
    this.edges.push(new Edge(node1_, node2_, weight_, direction_));
    // if the nodes don't exist, they are added without names or weights
    if (this.getNode(node1_) == null)
      this.addNode(node1_);
    if (this.getNode(node2_) == null)
      this.addNode(node2_);
  }
  // else console.log("Edge already exists");
}
Network.prototype.addEdgesType = function (edges_){
  let counter;
  for(counter = 0; counter < edges_.length; counter++)
    this.addEdge(edges_[counter][0], edges_[counter][1]);
}
Network.prototype.directedEdge = function (node1_, node2_){
  let counter;
  for (counter = 0; counter < this.edges.length; counter++){
    if (int(this.edges[counter].nodes[0]) == int(node1_) && int(this.edges[counter].nodes[1]) == int(node2_))
      return true;
    }
  return false;
}
Network.prototype.getEdgeWeight = function (node1_, node2_){
  let counter;
  for (counter = 0; counter < this.edges.length; counter++)
    if ((this.edges[counter].nodes[0] == node1_ && this.edges[counter].nodes[1] == node2_) ||
        (this.edges[counter].nodes[0] == node2_ && this.edges[counter].nodes[1] == node1_))
      return this.edges[counter].weight;
  return -1;
}
Network.prototype.getEdgeDirection = function (node1_, node2_){
  let counter;
  for (counter = 0; counter < this.edges.length; counter++)
    if ((this.edges[counter].nodes[0] == node1_ && this.edges[counter].nodes[1] == node2_) ||
        (this.edges[counter].nodes[0] == node2_ && this.edges[counter].nodes[1] == node1_))
      return this.edges[counter].direction;
  return -1;
}
Network.prototype.undirectedEdge = function (node1_, node2_){
  let counter;
  for (counter = 0; counter < this.edges.length; counter++)
    if ((this.edges[counter].nodes[0] == node1_ && this.edges[counter].nodes[1] == node2_) ||
        (this.edges[counter].nodes[0] == node2_ && this.edges[counter].nodes[1] == node1_))
      return true;
  return false;
}
Network.prototype.undirectedMaxEdges = function (){
  return this.nodes.length*(this.nodes.length - 1)/2;
}
Network.prototype.removeEdge = function (node1_, node2_){
  let counter;
  // Note that all edges connecting the two nodes will be deleted, if you want to only remove one do it yorself
  for (counter = 0; counter < this.edges.length; counter++){
    if ((this.edges[counter].direction == 0) && ((this.edges[counter].nodes[1] == node1_ && this.edges[counter].nodes[0] == node2_)||(this.edges[counter].nodes[0] == node1_ && this.edges[counter].nodes[1] == node2_)))
      this.edges.splice(counter,1);
    else if (this.edges[counter].direction == 1 && this.edges[counter].nodes[0] == node1_ && this.edges[counter].nodes[1] == node2_)
      this.edges.splice(counter,1);
  }
  // Why even bother doing this if it only solves the problem for edges a>b, a<b; not a>>b
}

// Node and Edges classes
class Node{
  // x and y positions kept to facilitate visualizations
  constructor(id_, name_ = '', weight_ = 1, x_ = 0, y_ = 0, color_ = -1){
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
  constructor(node1_, node2_, weight_ = 1, direction_ = 0, color_ = -1){
    this.nodes = [node1_, node2_];
    this.direction = direction_;
    this.weight = weight_;
    this.color = color_;
  }
}
