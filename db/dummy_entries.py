#!./../.venv/bin/python
import sqlite3
#https://faker.readthedocs.io/en/master/	
from faker import Faker

fake = Faker("en_US")

ids_used = [1, 2]

def make_person():
	id = 1
	while id in ids_used:
		id = fake.random_int(min=3, max=10_000_000)
	ids_used.append(id)
	full_name = fake.name()
	fname = full_name.split(" ")[0]
	lname = full_name.split(" ")[1]
	email = fname.lower() + lname.lower() + str(fake.random_int(min=0, max=9999)) + "@" + (fake.email().split("@")[1])
	
	return (id, fname, lname, fake.date_of_birth(), email)

def make_connection():
	possible_titles = ["Friend", "Employer", "Employee", "Sibling", "Parent", "Partner", "Coworker", "Peer", "Student", "Significant Other", "Roommate"]
	num_titles = fake.random.randrange(len(possible_titles))
	num_connections = fake.random.randrange(len(ids_used) - 1)	#exclude the current id

	for id_index in num_connections:
		pass

	pass

if __name__ == "__main__":
	try:
		with sqlite3.connect("main.db") as conn:
			#https://www.sqlitetutorial.net/sqlite-python/insert/
			pass
	except sqlite3.Error as e:
		print(e)