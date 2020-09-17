class Network{
  constructor(){
    this.nodes = [];
    this.connections = [];
  }
  createNode(id_, name_, value_ = 0, x_ = 0, y_ = 0){
    this.nodes.push(new Node(id_, name_, value_, x_, y_));
  }
  createConnection(node1_, node2_, weight_ = 0, direction_ = 0){
    this.connections.push(new Connection(node1_, node2_, weight_, direction_));
  }
  // returns a node given an specific id
  getNode(nodeId_){
    let counter;
    for (counter = 0; counter < this.nodes.length; counter++)
      if (nodeId_ == this.nodes[counter].id) return this.nodes[counter];
  }
}

class Node{
  constructor(id_, name_, value_ = 0, x_ = 0, y_ = 0){
    this.id = id_;
    this.value = value_;
    this.name = name_;
    this.x = x_;
    this.y = y_;
  }
}

class Connection{
  // takes 2 nodes' ids, a value, and a direction (0 = undirected,
  // 1 = directed towards node 0, 2 = directed towards node 1)
  constructor(node0_, node1_, weight_ = 0, direction_ = 0){
    this.nodes = [node0_, node1_];
    this.direction = direction_;
    this.weight = weight_;
  }
}
