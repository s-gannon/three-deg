#include <stdio.h>
#include <errno.h>
#include <stdlib.h>
#include <signal.h>
#include <string.h>
// System includes
#include <sys/socket.h>
// Networking includes
#include <arpa/inet.h>
#include <netinet/in.h>
// Personal headers
#include "../lib/networking.h"

/*
This is an example program meant to represent HTTP GET 
requests from real clients. In production, we will only need
the server. 
*/
int main(int argc, char ** argv){
	// these two can be modified later to get from console in
	int port = 6000;
	char * ip_addr = "127.0.0.1";
	// socket and address vars
	int client_socket, errval;
	struct sockaddr_in server_addr;
	socklen_t server_addr_len;
	
	char * msg = (char *)malloc(MAX_MSG_SIZE);
	// making sure everything is clean
	memset(&server_addr, 0, sizeof(server_addr));
	memset(&msg, 0, sizeof(MAX_MSG_SIZE));
	// setting up said socket and address vars
	client_socket = tcp_socket_init();

	errval = socket_config(&client_socket);
	if(errval < 0) error("Configuring server socket");

	port = address_config(&server_addr, port, ip_addr);
	if (port < 0) error("Configuring server address");

	server_addr_len = sizeof(server_addr);
	if(server_addr_len <= 0) error("Server address length");
	// connecting to the server
	errval = connect(
		client_socket,
		(struct sockaddr *)&server_addr,
		sizeof(server_addr)
	);

	if(errval < 0) error("Connecting to the server");
	
	// TODO: Sending requests to server, have to decide on a format

	close(client_socket);
	return EXIT_SUCCESS;
}
