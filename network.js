class Network{
  constructor(){
    this.nodes = [];
    this.connections = [];
  }
  createNode(id_, value_, name_, x_ = 0, y_ = 0){
    this.nodes.push(new Node(id_, value_, name_, x_, y_));
  }
  createConnection(node1_, node2_, weight_, direction_){
    this.connections.push(new Connection(node1_, node2_, weight_, direction_));
  }
  // returns a node given an specific id
  getNode(nodeId_){
    let counter;
    for (counter = 0; counter < nodes.length; counter++)
      if (nodeId == nodes[counter].id) return nodes[counter];
  }
}

class Node{
  constructor(id_, value_, name_, x_ = 0, y_ = 0){
    this.id = id_;
    this.value = value_;
    this.name = name_;
    this.x = x_;
    this.y = y_;
  }
}

class Connection{
  // takes 2 nodes' ids, a value, and a direction (0 = undirected,
  // 1 = directed towards node 1, 2 = directed towards node 2)
  constructor(node1_, node2_, weight_, direction_){
    this.nodes = [node1_, node2_];
    this.direction = direction_;
    this.weight = weight_;
  }
}
