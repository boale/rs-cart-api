# Links

- [FE](https://d2d25cyeqtftsg.cloudfront.net/)
- [nestjs: cart](https://tvb9bbhu68.execute-api.eu-west-1.amazonaws.com/dev/api/profile/cart)
- [nestjs: order](https://tvb9bbhu68.execute-api.eu-west-1.amazonaws.com/dev/api/profile/order)

# Task 8

## Task 8.1

- Fork a copy of Cart Service template
- integrate nestjs application
- Deploy to AWS Lambda

## Task 8.2

- Use AWS Console to create a database instance in RDS with PostgreSQL and default configuration
- Connect to database instance via a tool called DBeaver
- Create the following tables: Cart model, Cart Items

## Task 8.3

- Update source code in the application to use PostgreSQL instead of memory storage.
- Integrate with RDS
- Extend your serverless.yml file with credentials to your database instance and pass it to lambda’s environment variables section.

## Task 8.4

- PR

## Additional (optional) tasks

- +20 (All languages) - Create orders table and integrated with it Order model
- +3 - Transaction based creation of checkout
- +3 - Integrate Cart service with FE repository
