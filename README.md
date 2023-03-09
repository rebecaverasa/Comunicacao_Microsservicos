# Microsservices Communication Project

This project is based on a course taught by Victor Hugo Negrisoli, for the Udemy platform.

I used this project for studying for the final challenge on the intern's backend trial of Instituto Atlantico.
Here, we will simulate a small sales sistem.

## Used Technologies:

* **Java 17**
* **Spring Boot**
* **Javascript**
* **Node.js 18**
* **ES6 Modules**
* **Express.js**
* **MongoDB**
* **REST API**
* **PostgreSQL**
* **RabbitMQ**
* **Docker**
* **docker-compose**
* **JWT**
* **Spring Cloud OpenFeign**
* **Axios**

## Here's the Project's Architecture:
![image](https://user-images.githubusercontent.com/68878545/191582963-418b899a-b983-413c-b2ec-e69178f49e68.png)

We will have 3 API's:

* **Auth-API**: Authentication API with Node.js 14, Express.js, Sequelize, PostgreSQL, JWT e Bcrypt.
* **Sales-API**: Sales API with Node.js 14, Express.js, MongoDB, Mongoose, JWT validation, RabbitMQ, Axios for HTTP clients.
* **Product-API**: Products API with Java 11, Spring Boot, Spring Data JPA, PostgreSQL, JWT validation, RabbitMQ, Spring Cloud OpenFeign for HTTP clients.

We will also have the hole architecture running in docker containers via docker-compose.

### Order execution flow:

The flow for making a request will depend on **synchronous** communications (HTTP calls via REST) and **asynchronous** communications (messaging with RabbitMQ).

We have below how the flow goes:

* 01 - The flow beggins when we make a request to the order creation endpoint.
* 02 - The input payload (JSON) will be a list of products informing the ID and the desired quantity.
* 03 - Before creating the order, it will be made a REST call to the Products API to validate that all products are in stock for purchase.
* 04 - If any product is out of stock, the Products API will return an error, and the Sales API will throw an error message stating that there is no stock.
* 05 - If there is stock, then an order will be created and saved in MongoDB with pending status (PENDING).
* 06 - When saving the order, a message will be published in RabbitMQ informing the created order ID, and the products with their respective IDs and quantities.
* 07 - The Products API will be listening to the queue, so it will receive the message.
* 08 - Upon receiving the message, the API will revalidate the product inventory, and if all are ok, it will update the inventory of each product.
* 09 - If the stock is successfully updated, the products API will publish a message in the sales confirmation queue with APPROVED status.
* 10 - In case there is any problem in the update, the API of products will publish a message in the queue of confirmation of sales with status REJECTED.
* 11 - Finally, the Order API will receive the confirmation message and update the order with the status returned in the message.

## Logs e API Tracing

All endpoints need a header called **transactionid**, as it will represent the ID that will go through the entire request in the service, and, if this application calls other microservices, this **transactionid** will be passed on. All input and output endpoints will log the input data (JSON or parameters) and the **transactionid**.

With each request for each microservice, we will have a **serviceid** attribute generated just for the logs of that service itself. We will then have the **transactionid** that will circulate among all the microservices involved in the request, and each microservice will have its own **serviceid**.

Requests Tracing flow:

**POST** - **/api/order** with **transactionid**: ef8347eb-2207-4610-86c0-657b4e5851a3

```
service-1:
transactionid: ef8347eb-2207-4610-86c0-657b4e5851a3
serviceid    : 6116a0f4-6c9f-491f-b180-ea31bea2d9de
|
| HTTP Request
|----------------> service-2:
                   transactionid: ef8347eb-2207-4610-86c0-657b4e5851a3
                   serviceid    : 4e1261c1-9a0c-4a5d-bfc2-49744fd159c6
                   |
                   | HTTP Request
                   |----------------> service-3: /api/check-stock
                                      transactionid: ef8347eb-2207-4610-86c0-657b4e5851a3
                                      serviceid    : b4fbc082-a49a-440d-b1d6-2bd0557fd189
```

As we can see in the flow above, the **transactionid** ef8347eb-2207-4610-86c0-657b4e5851a3 remained the same in the 3 services, and each service has
your own **serviceid**.

Example of a complete flow calling 5 services and generating **transactionid** and **serviceid**:

![Tracing](https://user-images.githubusercontent.com/68878545/223541504-08bd7bcd-081c-4e0a-bff9-582cdaf811d2.png)


## Used Docker Commands:

Here are some of the commands executed during the course to create containers with: PostgreSQL, MongoDB and RabbitMQ message broker databases:

#### Container Auth-DB

`docker run --name auth-db -p 5444:5432 -e POSTGRES_DB=auth-db -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=123456 postgres:11`

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

To ignore the logs, add the flag `-d`.
