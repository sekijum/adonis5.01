## 準備

1.  .env.example を .env にコピー
2.  .env の以下を自身の環境に合うように修正
    ```
    WWW_DATA_PUID={your PUID. see `id -u`}
    WWW_DATA_PGID={your PGID. see `id -g`}
    ```
3.  ```
    docker-compose build
    ```
    を実施
4.  ```
    docker-compose up -d
    ```
    で起動し、
    ```
    docker-compose exec app bash
    ```
    コンテナで作業
5.  ```
    node ace migration:run → node ace db:seed
    ```
    で DB 初期値を投入

## 起動

```
docker-compose up -d
```

終了するときは

```
docker-compose down
```
