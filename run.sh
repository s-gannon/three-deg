#!/bin/sh

#default was 127.0.0.1:8000/main.db
curl $1 --output db/main.db
