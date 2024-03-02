/**
 * This is a minimal example of sigma. You can use it as a base to write new
 * examples, or reproducible test cases for new issues, for instance.
 */
import Person from "./person.js";
import Graph from "graphology";
import Sigma from "sigma";
import ForceSupervisor from "graphology-layout-force/worker";

const graph = new Graph();

// HTML Elements

const container = document.getElementById("sigma-container") as HTMLElement;
const zoomInBtn = document.getElementById("zoom-in") as HTMLButtonElement;
const zoomOutBtn = document.getElementById("zoom-out") as HTMLButtonElement;
const zoomResetBtn = document.getElementById("zoom-reset") as HTMLButtonElement;

// Other constants

const NODE_COLOR = "#DE5555";
const NODE_NORMAL_SIZE = 20;
const NODE_BIG_SIZE = 50;
const LINE_COLOR = "#983D3D";
const LINE_NORMAL_SIZE = 5;
const NODE_BIG_RADIUS = 25;
const ORIGIN: [number, number] = [0, 0];
const STARTING_PT: [number, number] = [30, 0];

// Temporary people, but the person array should stay

const person0 = new Person("Super User",   "admin",    "na");
const person1 = new Person("John Smith",   "jsmith",   "jsmith@email.com");
const person2 = new Person("Mary Smith",   "msmith",   "msmith@email.com");
const person3 = new Person("Joseph John",  "jjohn",    "jjohn@email.net");
const person4 = new Person("John Jackson", "jackson",  "jjackson@email.gov");

person0.userID = 0;
person0.addConnection(person1)
person0.addConnection(person2)
person0.addConnection(person3)
person1.addConnection(person2);
person3.addConnection(person4);

const person_arr = [person0, person1, person2, person3, person4];

// Goes through the person array and adds all the nodes to the canvas

for(let i = 0; i < person_arr.length; i++){
	if(person_arr[i].userID == 0){
		graph.addNode(person_arr[i].userID.toString(), { x: ORIGIN[0], y: ORIGIN[1], size: NODE_BIG_SIZE, color: NODE_COLOR });
		console.log("Created the admin user node with UID " + person_arr[i].userID);
		continue;
	}

	graph.addNode(
		person_arr[i].userID.toString(),
		{
			x: STARTING_PT[0] + (NODE_BIG_RADIUS * Math.cos( (2 * Math.PI * i) / person_arr.length )),
			y: STARTING_PT[1] + (NODE_BIG_RADIUS * Math.sin( (2 * Math.PI * i) / person_arr.length )),
			size: NODE_NORMAL_SIZE,
			label: person_arr[i].name,
			color: NODE_COLOR
		}
	);
	console.log("Created node for username " + person_arr[i].username + " with name " + person_arr[i].name);
}

// Goes through the connections and connects people up

let connectionsMade: Array<Array<{id1: number, id2: number}>> = [];
for(let i = 0; i < person_arr.length; i++){
	console.log("Adding connections from user " + person_arr[i].username);
	for(let j = 0; j < person_arr[i].connections.length; j++){		
		console.log("Checking connection to user " + person_arr[i].connections[j])
		let connection1: Array<{id1: number, id2: number}> = [
			person_arr[i].userID,
			person_arr[i].connections[j].userID
		];
		let connection2: Array<{id1: number, id2: number}> = [
			person_arr[i].connections[j].userID,
			person_arr[i].userID
		];

		let connectionAlreadyMade: Boolean = connectionsMade.includes(connection1) || connectionsMade.includes(connection2);

		if(connectionAlreadyMade){
			console.log("Connection already made! Skipping...")
			continue;
		}

		graph.addEdge(
			person_arr[i].userID.toString(),  
			person_arr[i].connections[j].toString(),   
			{
				size: LINE_NORMAL_SIZE, 
				color: LINE_COLOR
			}
		);

		connectionsMade.push(connection1);
		connectionsMade.push(connection2);
	}
}

// Force supervisor initialize

const layout = new ForceSupervisor(graph, { isNodeFixed: (_, attr) => attr.highlighted });
layout.start();

// eslint-disable-next-line @typescript-eslint/no-unused-vars

// Rendering the graph and adding listeners

const renderer = new Sigma(graph, container, {
	minCameraRatio: 0.1,
	maxCameraRatio: 10
});
const camera = renderer.getCamera();

// Bind zoom manipulation buttons

zoomInBtn.addEventListener("click", () => {
	camera.animatedZoom({ duration: 600 });
});
zoomOutBtn.addEventListener("click", () => {
	camera.animatedUnzoom({ duration: 600 });
});
zoomResetBtn.addEventListener("click", () => {
	camera.animatedReset({ duration: 600 });
});

