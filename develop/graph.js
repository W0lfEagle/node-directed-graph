// fs to read input file
const fs = require('fs');

// get command line arguments
const args = process.argv.slice(2);

// read file supplied as first argument (node graph.js input.txt)
// Graph: AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7
fs.readFile('./' + args[0], 'utf8', function(err, data) {  
    if (err) throw err;
	// Get individual node/weight pairs
    const input = data.split(/, |: /)
	if (input[0] == 'Graph' || input[0] == 'graph') {
		input.shift()
	}
	console.log(input);
});

const Graph = require('node-dijkstra');
const route = new Graph();

input.forEach((element) => {
	
});

route.addNode('A', { B:5, D:5, E:7 })
route.addNode('B', { C:4 })
route.addNode('C', { D:8, E:2 })
route.addNode('D', { C:8, E:6 })
route.addNode('E', { B:3 })
 
// console.log(route.path('A', 'D', {cost:true}))
let AB = route.path('A', 'B', {cost:true}); 
let AD = route.path('A', 'D', {cost:true}); 
let AE = route.path('A', 'E', {cost:true}); 
let BC = route.path('B', 'C', {cost:true}); 
let CD = route.path('C', 'D', {cost:true}); 
let DC = route.path('D', 'C', {cost:true}); 
let EB = route.path('E', 'B', {cost:true}); 
let ED = route.path('E', 'D', {cost:true}); 

let outOne = function() {
	console.log(AB)
	console.log(BC)
}

let outTwo = function() {
	console.log(AB)
	console.log(BC)
}

let outThree = function() {
	console.log(AB)
	console.log(BC)
}
let outFour = function() {
	console.log(AB)
	console.log(BC)
}
let outFive = function() {
	console.log(AE)
	console.log(ED)
}
// outFive();