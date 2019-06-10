#!/usr/bin/env bash

docker run \
    -v $PWD/container-config:/home/app/config \
    -v /home/app/node_modules \
    -e HOST_UID=`id -u` \
    -e HOST_GID=`id -g` \
    -d \
    --rm \
    --name="config-microservice" \
    robodomo/config-microservice
