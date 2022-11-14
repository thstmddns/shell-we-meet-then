#!/bin/bash
cd /home/ubuntu/server

docker build -t mungmnb777/be-server .

docker run -d -p 443:443 -p 80:80 --name be-server mungmnb777/be-server