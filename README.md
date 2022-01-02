# network2020: a Network Science Library in JavaScript

Developed in 2020 with advising from Professor Katherine Perry for the Network Science class.
Currently being rewritten as part of my Capstone under the mentorship of Professor Katherine Perry.
Open the [GitHub pages](https://rodigu.github.io/network2020/) for this repository, and use the Browser console (F12 on most Browsers).

## Index
1. [Basic Usage](#basic-usage)
2. [Visualization](#visualization)
3. [Algorithms](#algorithms)
4. [Demonstrations](#demonstrations)

## Basic usage

To create a Network:
```js
const net = new Network();
```

Basic network functions:
```js
net.addNode('c');     // nodes' IDs have to be different (case-sensitive), names can repeat
net.addEdge('a','b'); // if nodes don't exist, they will be created automatically
net.addEdge('a','c');

const c_properties = net.getNode('c');  // returns the node object with the specified ID
net.removeNode('c');                    // removing nodes will also remove all edges associated with it
```

## Visualization
The draw function will display a given network:
```js
type = 'id';      // type refers to what gets drawn inside nodes (can be 'id' or 'weight')
draw(net, type);  // default type is id
```
The nodes can be moved around with the mouse. Their position can also be changed with functions:
```js
net.setNodeX('a',300);
net.setNodeY('a',300);
```

## Algorithms
Certain algorithms have also been implemented:
```js
net.breadthFirstSearch('a','b');    // returns a list with the IDs of the nodes in the path from 'a' to 'b'
const k = 3;
net.core(k);                        // returns the k-core decomposition of the network
```
Other algorithms include, but are not limited to:
- Clustering coefficient
- Closeness centrality
- Average clustering
- Assortativity

## Demonstrations
Tools demonstrating the usage of the library:

[NetworkX Graph Builder](https://rodigu.github.io/nxtool/)
- [Source code](https://github.com/rodigu/nxtool)

[Dollar Game using the library](https://rmorais.itch.io/a-monstrous-constelation)
- [Source code](https://github.com/rodigu/monster-constelations)
