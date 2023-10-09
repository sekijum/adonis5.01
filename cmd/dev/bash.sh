#!/bin/bash

echo "コマンド実行"

COMPOSE_FILE=compose.develop.yaml

docker-compose -f $COMPOSE_FILE run --rm --service-ports api /bin/bash
EXIT_CODE=2
docker-compose -f $COMPOSE_FILE down
exit $EXIT_CODE
