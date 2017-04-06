let Graph = require('directed-graph');

let diGraph = new Graph();

diGraph.addVertex('A')
diGraph.addVertex('B')
diGraph.addVertex('C')
diGraph.addVertex('D')
diGraph.addVertex('E')

diGraph.addEdge('A','B')
diGraph.setWeight('A','B', 5)
diGraph.addEdge('A','D')
diGraph.setWeight('A','D', 5)
diGraph.addEdge('A','E')
diGraph.setWeight('A','E', 7)

diGraph.addEdge('B','C')
diGraph.setWeight('B','C', 4)

diGraph.addEdge('C','D')
diGraph.setWeight('C','D', 8)
diGraph.addEdge('C','E')
diGraph.setWeight('C','E', 2)

diGraph.addEdge('D','C')
diGraph.setWeight('D','C', 8)
diGraph.addEdge('D','E')
diGraph.setWeight('D','E', 6)

diGraph.addEdge('E','B')
diGraph.setWeight('E','B', 3)

let AB = diGraph.hasEdge('A', 'B'); 
let AD = diGraph.hasEdge('A', 'D'); 
let AE = diGraph.hasEdge('A', 'E'); 
let BC = diGraph.hasEdge('B', 'C'); 
let CD = diGraph.hasEdge('C', 'D'); 
let DC = diGraph.hasEdge('D', 'C'); 
let EB = diGraph.hasEdge('E', 'B'); 
let ED = diGraph.hasEdge('E', 'D'); 

// console.log(diGraph.pathExists('B','D'))

let outOne = function() {
	if (AB && BC) {
		return diGraph.getWeight('A', 'B') + diGraph.getWeight('B', 'C')
	} else return 'NO SUCH ROUTE'
}

let outTwo = function() {
	if (AD) {
		return diGraph.getWeight('A', 'D')
	} else return 'NO SUCH ROUTE'
}

let outThree = function() {
	if (AD && DC) {
		return diGraph.getWeight('A', 'D') + diGraph.getWeight('D', 'C')
	} else return 'NO SUCH ROUTE'
}

let outFour = function() {
	if (AE && EB && BC && CD) {
		return diGraph.getWeight('A', 'E') + diGraph.getWeight('E', 'B') + diGraph.getWeight('B', 'C') + diGraph.getWeight('C', 'D')
	} else return 'NO SUCH ROUTE'
}

let outFive = function() {
	if (AE && ED) {
		return diGraph.getWeight('A', 'E') + diGraph.getWeight('E', 'D')
	} else return 'NO SUCH ROUTE'
}


console.log(outOne());
console.log(outTwo());
console.log(outThree());
console.log(outFour());
console.log(outFive());