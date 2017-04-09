// fs to read input file
const fs = require('fs');

// get command line arguments
const args = process.argv.slice(2);

// read file supplied as first argument (node graph.js input.txt)
// Graph: AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7
let input = [];
fs.readFile('./' + args[0], 'utf8', function(err, data) {  
    if (err) throw err;
	// Get individual node/weight pairs
    input = data.split(/, |: /)
	if (input[0] == 'Graph' || input[0] == 'graph') {
		input.shift()
	}
	// console.log(input);
	run();
});

let Graph = require('directed-graph');

let diGraph = new Graph();

function run() {
	buildGraph(input);
	console.log('Output #1:', calcDistance(['A', 'B', 'C']))
	console.log('Output #2:', calcDistance(['A', 'D']))
	console.log('Output #3:', calcDistance(['A', 'D', 'C']))
	console.log('Output #4:', calcDistance(['A', 'E', 'B', 'C', 'D']))
	console.log('Output #5:', calcDistance(['A', 'E', 'D']))
	console.log('Output #6:',  countRoutes('C', 'C', 3))

	// TODO
	console.log('Output #7:')

	console.log('Output #8:',  shortestDistance('A', 'C'))
	console.log('Output #9:',  shortestDistance('B', 'B'))

	// TODO
	console.log('Output #10:')
}

function buildGraph(input) {
	input.forEach(item => {
		let nodes = item.split('')
		diGraph.addVertex(nodes[0])
		diGraph.addVertex(nodes[1])
		diGraph.addEdge(nodes[0], nodes[1])
		diGraph.setWeight(nodes[0], nodes[1], parseInt(nodes[2]))
	})

	// console.log(diGraph);
}

function calcDistance(nodes) {
	let distance = 0;
	for (let i = 0; i < nodes.length - 1; i++) {
		if (diGraph.hasEdge(nodes[i], nodes[i+1])) {
			distance += diGraph.getWeight(nodes[i], nodes[i+1])
		} else return 'NO SUCH ROUTE';
	}
	return distance;
}

function getNodePairs() {
	let graph = diGraph.getGraph();
	let nodes = Object.keys(graph);
	let pairs = [];
	for (let node of nodes) {
		let children = Object.keys(graph[node]);
		for (let child of children) {
			pairs.push([node, child])
		}
	} 
	return pairs;
}

function countRoutes(nodeOne, nodeTwo, maxStops) {
	let count = 0;
	let routes = paths({graph: getNodePairs(), from: nodeOne, to: nodeTwo})
	// console.log(routes);
	for (let route of routes) {
		// console.log(route.length)
		if (route.length <= maxStops + 1) count++;
	}
	return count;
}

function shortestDistance(nodeOne, nodeTwo) {
	let routes = paths({graph: getNodePairs(), from: nodeOne, to: nodeTwo})
	let distance = calcDistance(routes[0]);
	for (let route of routes) {
		let thisDistance = calcDistance(route);
		if (thisDistance < distance) distance = thisDistance;
	}
	return distance;
}

// function countRoutes(nodeOne) {
// 	let routes = 0
// 	let paths = []
// 	// for (let i = 0; i < maxStops; i++) {
		
// 	// }
// 	let nextNodes = diGraph.getNeighbors(nodeOne)
// 	console.log(nextNodes)
// 	for (let node of Object.keys(nextNodes)) {
// 		extendPath(paths, node);
// 	}
// 	console.log(paths);

// }

// function extendPath(paths, node) {
// 	for (let path of paths) {
// 		path.push(node);
// 	}
// 	for (let child of Object.keys(diGraph.getNeighbors(node))) {
// 		extendPath(paths, child)
// 	}
// }

// function buildPath(parents, targetNode) {
// 	var result = [targetNode];
// 	while (parents[targetNode] !== null) {
// 		targetNode = parents[targetNode];
// 		result.push(targetNode);
// 	}
// 	return result.reverse();
// }

// function getPaths(graph, startNode, targetNode) {
// 	var parents = [];
// 	var queue = [];
// 	var visited = [];
// 	var current;
// 	queue.push(startNode);
// 	parents[startNode] = null;
// 	visited[startNode] = true;
// 	while (queue.length) {
// 		current = queue.shift();
// 		if (current === targetNode) {
// 			return buildPath(parents, targetNode);
// 		}
// 		// for (var i = 0; i < graph.length; i += 1) {
// 		for (let node of graph[current]) {
// 			if (node !== current && graph[current][node] && !visited[node]) {
// 				parents[node] = current;
// 				visited[node] = true;
// 				queue.push(node);
// 			}
// 		}
// 	}
// 	return null;
// };
function paths({ graph = [], from, to }, path = []) {
    const linkedNodes = memorize(nodes.bind(null, graph));
    return explore(from, to);

    function explore(currNode, to, paths = []) {
        path.push(currNode);
        for (let linkedNode of linkedNodes(currNode)) {
            if (linkedNode === to) {
                let result = path.slice(); // copy values
                result.push(to);
                paths.push(result);
                continue;
            }
            // do not re-explore edges
            if (!hasEdgeBeenFollowedInPath({
                    edge: {
                        from: currNode,
                        to: linkedNode
                    },
                    path
                })) {                    
                explore(linkedNode, to, paths);
            }
        }
        path.pop(); // sub-graph fully explored            
        return paths;
    }
}

/** 
 * Get all nodes linked 
 * to from `node`.
 */
function nodes(graph, node) {
    return graph.reduce((p, c) => {
        (c[0] === node) && p.push(c[1]);
        return p;
    }, []);
}

/**
 * Has an edge been followed 
 * in the given path?
 */
function hasEdgeBeenFollowedInPath({ edge, path }) {
    var indices = allIndices(path, edge.from);
    return indices.some(i => path[i + 1] === edge.to);
}

/**
 * Utility to get all indices of 
 * values matching `val` in `arr`.
 */
function allIndices(arr, val) {
    var indices = [],
        i;
    for (i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
            indices.push(i);
        }
    }
    return indices;
}

/**
 * Avoids recalculating linked 
 * nodes.
 */
function memorize(fn) {
    const cache = new Map();
    return function() {
        var key = JSON.stringify(arguments);
        var cached = cache.get(key);
        if (cached) {
            return cached;
        }
        cached = fn.apply(this, arguments)
        cache.set(key, cached);
        return cached;;
    };
}