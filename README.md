<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="160" alt="Nest Logo" /></a> + 
  <img src="https://www.indellient.com/wp-content/uploads/2020/10/20201021_Introduction-to-Apache-Kafka_BLOG-FEATURED-IMAGE.jpg" width="160" alt="Nest Logo" /><
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Este é um Simples exemplo de como subir um servidor Kafka e também como utiliza-lo em uma aplicação NodeJS com o framework Nest.</p>
    
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descrição

Neste exemplo, vamos precisar subir um servidor Kafka, para isso vamos utilizar o Docker, caso você não conheça o [DOCKER](https://www.docker.com/) recomendo conheçer pois para nós DEV(s) é uma super ferramenta, onde podemos subir diversos ambientes, fazer varios testes e no fim excluir tudo sem ficar gerando dados e configurações inutilizaveis em nossos computadores.

Depois de termos nosso servidor Kafka rodando, vamos executar nossa aplicação Nest e fazer a integração com o Kafka através de microserviços, com o intuito de demonstrar como produzir e consumir mensagens do servidor Kafka.

## Subindo o Server Kafka


Salve o Arquivo abaixo com o nome "docker-compose.yml"

```bash
version: '3'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181

  kafka:
    image: confluentinc/cp-kafka:latest
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"
      - "9094:9094"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_INTER_BROKER_LISTENER_NAME: INTERNAL
      KAFKA_LISTENERS: INTERNAL://:9092,OUTSIDE://:9094
      KAFKA_ADVERTISED_LISTENERS: INTERNAL://kafka:9092,OUTSIDE://host.docker.internal:9094
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: INTERNAL:PLAINTEXT,OUTSIDE:PLAINTEXT
    extra_hosts:
      - "host.docker.internal:172.17.0.1"

  control-center:
    image: confluentinc/cp-enterprise-control-center:6.0.1
    hostname: control-center
    depends_on:
      - kafka
    ports:
      - "9021:9021"
    environment:
      CONTROL_CENTER_BOOTSTRAP_SERVERS: 'kafka:9092'
      CONTROL_CENTER_REPLICATION_FACTOR: 1
      PORT: 9021
```

Agora abra seu TERMINAL, acesse o local onde está salvo o arquivo acima e digite o seguinte comando:

```bash
$ docker-compose up
```

Com a execução do comando acima, o Docker irá fazer download da imagem do servidor Kafka e suas dependencias, com isto irá subir o servidor dentro do Docker, após isso aconselho utilizar a ferramenta Docker Desktop para verificar os containers rodando.



## Instalando nossa aplicação

```bash
$ npm install
```

## Executando nossa aplicação

Após ter o repositorio clonado devemos executar os comandos abaixo para executar nossa aplicação de acordo com nosso ambiente.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

Como essa aplicação foi desenvolvida apenas para demonstração não teremos testes unitários

