# Task #8

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## After install steps

1. Create ```.env``` file with database credentials:
````dotenv
   DB_HOST='<PUT YOUR DATA HERE>'
   DB_USER='<PUT YOUR DATA HERE>'
   DB_PASS='<PUT YOUR DATA HERE>'
   DB_NAME='<PUT YOUR DATA HERE>'
   DB_PORT='<PUT YOUR DATA HERE>'
````
2. Scripts for [create database tables](sql/ddl.sql)
3. Scripts for [import sample data](sql/data.sql)

## Task includes
1. Created database in AWS console
2. Connected to DBeaver and database tables `carts`, `cart_items`, `orders`, `users` created
3. Change logic in application to use `Posters`
4. Integrate with `RDS`
5. Create [Serverless](serverless.yaml) file
6. Integrate `Cart service` with FE
7. Integrate `Orders service` with FE
8. Use transactions for orders creating
9. Integrate `Users` to BE

[Cart service API: https://onsx99gysa.execute-api.eu-west-1.amazonaws.com/dev/](https://onsx99gysa.execute-api.eu-west-1.amazonaws.com/dev/)

[Frontend: https://d1w4or432cxowo.cloudfront.net/admin/orders](https://d1w4or432cxowo.cloudfront.net/admin/orders)
## Deploymnt

```bash
# development
$ npm run deploy
```

