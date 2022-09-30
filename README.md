# Microsservices Communication Project

This project is for the final challenge on the intern's backend trial of Instituto Atlantico.
Here, we will simulate a small sales sistem.

## Used Technologies:

* **Java 18**
* **Spring Boot**
* **Javascript**
* **Node.js 16**
* **ES6 Modules**
* **Express.js**
* **MongoDB (Container and Cloud MongoDB)**
* **REST API**
* **PostgreSQL (Container and Heroku Postgres)**
* **RabbitMQ (Container e CloudAMQP)**
* **Docker**
* **docker-compose**
* **JWT**
* **Spring Cloud OpenFeign**
* **Axios**
* **Heroku**
* **Coralogix Logging**
* **Kibana**

## Here's the Project's Architecture:
![image](https://user-images.githubusercontent.com/68878545/191582963-418b899a-b983-413c-b2ec-e69178f49e68.png)

## Used Docker Commands:

Abaixo serão listados alguns dos comandos executados durante o curso para criação dos containers 
dos bancos de dados PostgreSQL, MongoDB e do message broker RabbitMQ:

#### Container Auth-DB

`docker run --name auth-db -p 5432:5432 -e POSTGRES_DB=auth-db -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=123456 postgres:11`

#### Container Product-DB

`docker run --name product-db -p 5433:5432 -e POSTGRES_DB=product-db -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=123456 postgres:11`

#### Container Sales-DB

`docker run --name sales-db -p 27017:27017 -p 28017:28017 -e MONGODB_USER="admin" -e MONGODB_DATABASE="sales" -e MONGODB_PASS="123456" -v  c:/db tutum/mongodb`

#### Conexão no Mongoshell

`mongo "mongodb://admin:123456@localhost:27017/sales"`

#### Container RabbitMQ

`docker run --name sales_rabbit -p 5672:5672 -p 25676:25676 -p 15672:15672 rabbitmq:3-management`

### Execução docker-compose

`docker-compose up --build`

Para ignorar os logs, adicione a flag `-d`.
