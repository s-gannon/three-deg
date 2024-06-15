#!/usr/bin/python
import threading

def get_database(addr):
	pass

if __name__ == "__main__":
	db_thread = threading.Thread(target=get_database, args=("127.0.0.1"))

	db_thread 	