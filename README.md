# Blog Application

This is a simple blog application built with NestJS and TypeORM, featuring authentication, post creation, and more. This guide provides detailed instructions on setting up and running the application.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [PostgreSQL](https://www.postgresql.org/) (if running without Docker)

## Project Structure

- `src/`: Source code of the application
- `Dockerfile`: Docker configuration for building the application
- `docker-compose.yml`: Docker Compose configuration for running the application
- `.env`: Environment variables configuration

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/blog-application.git
cd blog-application
```

### 2. Create a `.env` File

Create a `.env` file in the root of your project with the following content:

```plaintext
DATABASE_HOST=db
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=your_database
JWT_SECRET=your_jwt_secret
```

## Running the Application with Docker

### 1. Build and Run the Application

Use Docker Compose to build and run the application:

```sh
docker-compose up --build
```

This command will:

- Build the Docker image for the application.
- Start the application and the PostgreSQL database in separate containers.
- Map port `3000` on your host to port `3000` in the application container.

### 2. Access the Application

The application will be available at `http://localhost:3000`.

## Running the Application without Docker

### 1. Install Dependencies

Ensure you have PostgreSQL installed and running. Then, install the dependencies for the application:

```sh
npm install
```

### 2. Set Up the Database

Create a PostgreSQL database and update the `.env` file with your database credentials.

### 3. Run the Migrations

Run the TypeORM migrations to set up the database schema:

```sh
npm run typeorm migration:run
```

### 4. Start the Application

Start the NestJS application:

```sh
npm run start:dev
```

### 5. Access the Application

The application will be available at `http://localhost:3000`.

## API Endpoints

### Authentication

- **Register**: `POST /users/register`
- **Login**: `POST /users/login`
- **Profile**: `GET /users/profile` (Protected)

### Posts

- **Get All Posts**: `GET /posts`
- **Get Post by ID**: `GET /posts/:id`
- **Create Post**: `POST /posts` (Protected)
- **Update Post**: `PUT /posts/:id` (Protected)
- **Delete Post**: `DELETE /posts/:id` (Protected)

## Pagination and Search

The `/posts` endpoint supports pagination and search functionality.

- **Pagination**: Add `?page=1&limit=10` to the URL to get the first page with 10 posts per page.
- **Search**: Add `?search=keyword` to the URL to search for posts containing the keyword.

Example:

```sh
curl http://localhost:3000/posts?page=1&limit=10&search=nestjs
```

## Running Tests

To run tests, use the following command:

```sh
npm run test
```

## Deployment

To deploy the application to a cloud provider like AWS, follow these steps:

### 1. Set up AWS Account

Set up an AWS account and create an ECS (Elastic Container Service) cluster.

### 2. Push Docker Image to Amazon ECR

Push your Docker image to Amazon ECR (Elastic Container Registry).

### 3. Create ECS Task Definition

Create a task definition in ECS using the pushed Docker image.

### 4. Run ECS Task

Run the ECS task in your cluster.

Detailed instructions for deploying a Dockerized application to AWS ECS can be found in the [AWS documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/docker-basics.html).

## Additional Notes

- Ensure your environment variables are correctly set in the `.env` file before running the application.
- The JWT secret used in this application should be kept secure and not hard-coded in production environments.
- Regularly update your dependencies and check for security vulnerabilities.

## Contributing

If you would like to contribute to this project, please fork the repository and create a pull request with your changes. All contributions are welcome!

## License

This project is licensed under the MIT License.
