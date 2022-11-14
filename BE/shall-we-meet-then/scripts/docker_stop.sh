#!/bin/bash
docker ps -f status=running -q | xargs --no-run-if-empty docker container stop

docker ps -f status=running -q | xargs --no-run-if-empty docker container rm