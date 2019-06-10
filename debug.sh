#!/usr/bin/env bash

# run container without making it a daemon - useful to see logging output
docker run \
    -v $PWD:/home/app \
    -v /home/app/node_modules \
    -e HOST_UID=`id -u` \
    -e HOST_GID=`id -g` \
    --rm \
    --name="config-microservice" \
    robodomo/config-microservice
