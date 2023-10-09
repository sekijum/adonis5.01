#!/bin/bash

echo "初期設定"

COMPOSE_FILE=compose.develop.yaml

docker-compose -f $COMPOSE_FILE build --no-cache --build-arg BUILDKIT_INLINE_CACHE=1
EXIT_CODE=2
docker-compose -f $COMPOSE_FILE down
exit $EXIT_CODE
