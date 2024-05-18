#ifndef DATAPARSER_H
#define DATAPARSER_H
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>

typedef struct DATARECV {
    int recv_type;
    void **chunks;
} data_recv;

data_recv *parse_data(unsigned char *buf, size_t size) {
    data_recv *data = malloc(sizeof(struct DATARECV));
    data->chunks = calloc(1, size + 1);
    data->recv_type = (int)buf[0];
    strcpy(data->chunks, buf);
    return data;
}

#endif // !DATAPARSER_H