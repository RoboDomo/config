#!/usr/bin/env bash

docker run \
  -it  \
  --rm \
  --name config-microservice \
  -v $PWD:/home/app \
  -v /home/app/node_modules \
  -v $PWD/avahi-daemon.conf:/etc/avahi/avahi-daemon.conf \
  robodomo/config-microservice \
  /bin/bash
