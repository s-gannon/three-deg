import * as sigma from 'sigma.js';

var s = new sigma({
	graph: {
		nodes: [],
		edges: []
	},
	renderer: {
		container: document.getElementById("sigma-container")
	}
});
  
sigma.readCsv('data.csv', function(data) {
	for (var i = 0; i < data.length; i++) {
		var row = data[i];
		s.graph.addNode(row[0]);
		s.graph.addNode(row[1]);
		s.graph.addEdge(row[0], row[1]);
	}
});

s.refresh();
s.render();