#include <stdio.h>
#include <stdlib.h>
#include <signal.h>
#include <string.h>
// System includes
#include <sys/socket.h>
// Networking includes
#include <microhttpd.h>
#include <arpa/inet.h>
#include <netinet/in.h>
// Database includes
#include <sqlite3.h>
// Personal headers
#include "../lib/networking.h"

int close_server = 0;

static int req_handler(
	void * cls, 
	struct MHD_Connection * connection,
	const char * url,
	const char * method,
	const char * version,
	const char * upload_data,
	size_t * upload_data_size,
	void ** con_cls) 
{
	// check method and url to make sure they are correct
	if(strcmp(method, "GET") != 0 || strcmp(url, "/connection") != 0){
		if(DEBUG_STATEMENTS)
			printf("[DEBUG] Method or URL were not correct\n");
		return MHD_NO;
	}
	// read request body
	if(*upload_data_size < 1){
		if(DEBUG_STATEMENTS)
			printf("[DEBUG] Body size was 0\n");
		return MHD_NO;
	}
	//TODO: finish this
}

void nice_server_shutdown(int sig){
	close_server = 1;
	if(DEBUG_STATEMENTS) 
		printf("\n[DEBUG] Nice server shutdown in progress...\n");
	signal(sig, SIG_IGN);
}

int main(void) {
	// grabs the SIGINT signal and reroutes it to perform
	// nice server shutdown
	// signal(SIGINT, nice_server_shutdown);
	// these two can be modified later to get from console in
	int port = 6000;
	char * ip_addr = NULL;
	// socket and address vars
	int server_socket, client_socket, errval;
	struct sockaddr_in server_addr, client_addr;
	socklen_t server_addr_len, client_addr_len;
	pid_t client_pid;
	// http daemon
	struct MHD_Daemon * daemon;

	// making sure everything is clean
	char * msg = (char *)malloc(MAX_MSG_SIZE);
	memset(&server_addr, 0, sizeof(server_addr));
	memset(&client_addr, 0, sizeof(client_addr));
	memset(&msg, 0, sizeof(MAX_MSG_SIZE));
	// setting up said socket and address vars
	client_socket = 0;
	server_socket = tcp_socket_init();

	errval = socket_config(&server_socket);
	if(errval < 0) error("[ERROR] Configuring server socket");

	port = address_config(&server_addr, port, ip_addr);
	if (port < 0) error("[ERROR] Configuring server address");

	server_addr_len = sizeof(server_addr);
	if(server_addr_len <= 0) error("[ERROR] Server address length");
	
	errval = bind(
		server_socket, 
		(struct sockaddr *)&server_addr,
		server_addr_len
	);
	if(errval < 0) error("[ERROR] Binding server socket");

	errval = listen(server_socket, MAX_TCP_CONNECTIONS);
	if(errval < 0) error("[ERROR] Listening for incoming connections");

	printf(
		"[LOG] Host at address %s is waiting for connections on port %d\n", 
		inet_ntoa(server_addr.sin_addr),
		port
	);

	while(!close_server){
		client_socket = accept(
			server_socket,
			(struct sockaddr *)&client_addr,
			&client_addr_len
		);

		if(client_socket < 0) error("[ERROR] Accepting new client");
		printf(
			"[LOG] New connection accepted from %s on port %d\n",
			inet_ntoa(client_addr.sin_addr),
			ntohs(client_addr.sin_port)
		);
		// fork the process to another thread to be handled
		client_pid = fork();

		if(client_pid < 0) error("[ERROR] Forking the process");
		if(client_pid == 0){
			close(server_socket);
			
			// TODO: processing GET request from client
			// We only want two types, a GET for a single person and a GET
			// for a group of people related to a person. We probably do not
			// want a GET for every person in the database, sercurity flaw
			// and performance issue
			
			if(DEBUG_STATEMENTS)
				printf("[DEBUG] Placeholder statement for work by thread");
			close(client_socket);
		}
	}

	close(server_socket);
	if(DEBUG_STATEMENTS) 
		printf("[DEBUG] Server shutdown complete!\n");
	return EXIT_SUCCESS;
}
