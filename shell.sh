#!/usr/bin/env bash

docker run \
  -it  \
  --rm \
  --name config-microservice \
  -e HOST_UID=`id -u` \
  -e HOST_GID=`id -g` \
  -v $PWD/container-config:/home/config \
  -v /home/app/node_modules \
  robodomo/config-microservice \
  /bin/bash
