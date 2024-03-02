import Graph from "graphology";
import Sigma from "sigma";
import ForceSupervisor from "graphology-layout-force/worker.js";
// simple constants
const NODE_COLOR = "#DE5555";
const NODE_NORMAL_SIZE = 20;
const NODE_BIG_SIZE = 50;
const LINE_COLOR = "#983D3D";
const LINE_NORMAL_SIZE = 5;
const NODE_BIG_RADIUS = 25;
// HTML Element constants
const container = document.getElementById("sigma-container");
const zoomInBtn = document.getElementById("zoom-in");
const zoomOutBtn = document.getElementById("zoom-out");
const zoomResetBtn = document.getElementById("zoom-reset");
// Sigma and Graphology constants
const graph = new Graph();

// actual graph building and rendering
graph.addNode("John", { x: 0, y: 0, size: 5, label: "John", color: "blue" });
graph.addNode("Mary", { x: 0, y: 0, size: 5, label: "Mary", color: "red" });

graph.addEdge("John", "Mary");

const layout = new ForceSupervisor(graph, { isNodeFixed: (_, attr) => attr.highlighted });
layout.start();
const renderer = new Sigma(graph, container, {
	minCameraRatio: 0.1,
	maxCameraRatio: 10
});
const camera = renderer.getCamera();
// HTML Event Bindings
zoomInBtn.addEventListener("click", () => {
	camera.animatedZoom({ duration: 600 });
});
zoomOutBtn.addEventListener("click", () => {
	camera.animatedUnzoom({ duration: 600 });
});
zoomResetBtn.addEventListener("click", () => {
	camera.animatedReset({ duration: 600 });
});
