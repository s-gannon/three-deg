#!/usr/bin/python
import subprocess
import logging
#https://docs.python.org/3/library/threading.html#
import threading
from time import sleep

global_lock = threading.Lock()	#lock to be shared by more than one thread
wait_time = 10	#time to wait until next pull of the database

def get_database(addr):
	while True:
		with global_lock: 
			logging.debug("cURLing database from address %s", addr)
			shell_cmd = "./run.sh " + addr + "/main.db"
			subprocess.Popen(shell_cmd, shell=True)
			logging.debug("cURL successful!")
			sleep(wait_time)

if __name__ == "__main__":
	db_thread = threading.Thread(target=get_database, args=("127.0.0.1:8000"), daemon=True)
	logging.basicConfig(format=format, level=logging.DEBUG, datefmt="%D/%M/%Y - %H:%M:%S")

	db_thread.start()