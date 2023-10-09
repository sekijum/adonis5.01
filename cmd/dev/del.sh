#!/bin/bash

echo "後片付け"

COMPOSE_FILE=compose.develop.yaml

docker-compose -f $COMPOSE_FILE down --rmi all --volumes --remove-orphans
