export default class Person {
	constructor(name, username, email) {
		this.name = name;
		this.username = username;
		this.email = email;
		this.userID = this.generateUserID();
		this.groups = [];
		this.tags = new Map();
		this.connections = [];
	}
  
	generateUserID() {
		const SIMULTANEOUS_SIGNUPS = 1_000_000;
		const timestamp = Date.now().toString();
		const randomNum = Math.floor(Math.random() * SIMULTANEOUS_SIGNUPS).toString().padStart(4, '0');
		return parseInt(`${timestamp}${randomNum}`, 10);
	}

	getFirstName() {
		return this.name.split(" ")[0];
	}

	addConnection(person){
		this.connections.push(person.userID);
		person.connections.push(this.userID)
	}
  }
  