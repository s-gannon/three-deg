# three-deg
Three Degrees, a web application that displays the relationships between people.

## Local Usage
Edit the `main.db` SQLite3 database in the `db` directory. The database schema is layed out in `db/db_schema.txt`. Currently the titles are not implemented, but are meant to further define the relations between two people (ex: Person 1 is the son of Person 2, Person 3 is the teacher of Person 4). The database can be edited live while viewing the HTML page. Opening `local_main.html` in the browser shows an interactive SVG of the connections between the people in the database. 

## Web Usage
Currently not implemented, but the idea is to have a database that can be queried by a user only based on the people they know. The idea is to be able to friend people and see how they fit into your web of connections.
