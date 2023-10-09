# ex-ddd-kotlin

kotlinでドメイン駆動設計＋クリーンアーキテクチャのサンプル

- [Spring Boot](https://github.com/spring-projects/spring-boot)
- [Exposed](https://github.com/JetBrains/Exposed)
- [H2 Database](https://github.com/h2database/h2database)

## Package configuration

[Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
の思想に則ったパッケージを用意する。

| package  | layer                      | description                                                         |
----------|----------------------------|---------------------------------------------------------------------
| domain   | Enterprise Business Rules  | ビジネスロジックを表現するレイヤー。                                                  |
| usecase  | Application Business Rules | ビジネスロジックを用いてユースケースを実現するレイヤー。                                        |
| adapter  | Interface Adapters         | REST APIを用いた外部からのリクエストやデータベースのような外部接続といった外界と内部のレイヤーの連携する役割を果たすレイヤー。 |
| external | Frameworks & Drivers       | 外界との境界ににあり相互に通信する役割を果たすレイヤー。Webフレームワークやデータベースなどに関連するコードを配置する。       |
