#!/bin/bash

echo "コマンド実行"

set COMPOSE_FILE compose.develop.yaml

docker-compose -f $COMPOSE_FILE run --rm --service-ports api ./gradlew bootRun
EXIT_CODE 2
docker-compose -f $COMPOSE_FILE down
exit $EXIT_CODE
