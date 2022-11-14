#!/bin/bash
docker ps -f name=be-server -q | xargs --no-run-if-empty docker container stop

docker ps -a -f name=be-server -q | xargs --no-run-if-empty docker container rm