#!/usr/bin/env bash

docker run \
  -it  \
  --rm \
  --name config-microservice \
  -v /home/app/node_modules \
  robodomo/config-microservice \
  /bin/bash
