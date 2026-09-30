# HCL User Service

A full-stack user management application built with a .NET 8 Web API backend and a React frontend. The project supports user registration, login, JWT-based authentication, and CRUD operations for user records.

## Overview

This repository contains:

- `user_service_api/` — ASP.NET Core Web API with SQLite database and JWT authentication
- `user_service_app/` — React + Tailwind frontend for login and user management
- `user_service_api.Tests/` — unit tests for the user service layer

## Features

- Secure JWT login using email and password
- User CRUD operations (create, read, update, delete)
- Unique email validation
- Password hashing with ASP.NET Core Identity
- SQLite persistence with Entity Framework Core
- Protected user endpoints with authorization
- Frontend routes for login, user list, add user, and edit user

## Tech Stack

### Backend

- ASP.NET Core Web API (.NET 8)
- Entity Framework Core
- SQLite
- JWT bearer authentication
- Swagger UI for API testing

### Frontend

- React
- React Router
- Axios
- Tailwind CSS
- CRA (Create React App)

### Testing

- xUnit
- FluentAssertions
- EF Core InMemory database

## Project Structure

```text
HCL_UserService/
├── README.md
├── user_service_api/
│   ├── Controllers/
│   ├── Data/
│   ├── Migrations/
│   ├── Model/
│   ├── Services/
│   ├── appsettings.json
│   ├── appsettings.Development.json
│   ├── Program.cs
│   ├── user_service_api.csproj
│   └── Properties/
├── user_service_api.Tests/
│   ├── UserServiceTests.cs
│   └── user_service_api.Tests.csproj
└── user_service_app/
    ├── public/
    ├── src/
    ├── package.json
    ├── tailwind.config.js
    └── README.md
```

## Prerequisites

Before running the project, make sure you have:

- .NET 8 SDK installed
- Node.js and npm installed
- A browser to access the frontend and Swagger UI

## Backend Setup

1. Open a terminal in the repository root.
2. Navigate to the API project:

```bash
cd user_service_api
```

3. Restore dependencies and build:

```bash
dotnet restore
dotnet build
```

4. Run the API:

```bash
dotnet run
```

The API runs by default in development mode and exposes Swagger at:

- https://localhost:7200/swagger

The backend uses the SQLite database connection configured in `appsettings.json`:

```json
"ConnectionStrings": {
  "UserContext": "Data Source=Data/app.db"
}
```

If the database is not created yet, run:

```bash
dotnet ef database update
```

> If the .NET EF CLI is not available globally, install it with:
>
> ```bash
> dotnet tool install --global dotnet-ef
> ```

## Frontend Setup

1. Open a second terminal.
2. Navigate to the frontend app:

```bash
cd user_service_app
```

3. Install dependencies:

```bash
npm install
```

4. Start the app:

```bash
npm start
```

The frontend runs on:

- http://localhost:3000

The React app is configured to call the API at:

- https://localhost:7200/api

## Authentication and Login

The app supports self-registration from the Login screen. Registration and login work as follows:

1. On the Login screen, select **Create an account** and enter the user's details.
2. The frontend submits the registration to `POST /api/User`. This endpoint allows anonymous access, so a JWT is not required to register.
3. The API generates the initial password as `Name + Age` and stores its hash. No password is entered in the registration form.
4. After registration succeeds, return to the Login screen and sign in with the registered email and generated password.
5. On successful login, the API returns a JWT token and user details; the frontend stores the token for authenticated user-management requests.

For example, a user registered with the name `Test User`, age `30`, and email `test.user@example.com` signs in with:

```text
Email: test.user@example.com
Password: Test User30
```

The password is generated from the name and age exactly as registered. It is not the user's email address.

### Login endpoint

```http
POST /api/Auth/login
Content-Type: application/json
```

Example request:

```json
{
  "email": "test.user@example.com",
  "password": "Test User30"
}
```

## API Endpoints

### Authentication

| Method | Endpoint            | Description                            |
| ------ | ------------------- | -------------------------------------- |
| POST   | `/api/Auth/login` | Logs in a user and returns a JWT token |

### User Management

| Method | Endpoint           | Description               |
| ------ | ------------------ | ------------------------- |
| GET    | `/api/User`      | Get all users             |
| GET    | `/api/User/{id}` | Get a specific user by ID |
| POST   | `/api/User`      | Register a user (anonymous) |
| PUT    | `/api/User/{id}` | Update a user             |
| DELETE | `/api/User/{id}` | Delete a user             |

### User payload example

```json
{
  "name": "Test User",
  "email": "test.user@example.com",
  "age": 30,
  "city": "Chennai",
  "state": "Tamil Nadu",
  "pincode": "600001"
}
```

## Frontend Routes

The React app includes these routes:

- `/Login` — login page
- `/user` — user list page
- `/user/add` — add new user page
- `/user/edit/:id` — edit user page

## User Flow

1. The user opens the login page.
2. The user signs in using the email and password.
3. On success, the app stores the JWT in session storage.
4. The authenticated user can view and manage users.
5. The frontend automatically attaches the token to API requests.

## Docker Setup

This application can be run with Docker Compose for both the ASP.NET API and React frontend.

### Prerequisites

- Docker Desktop or Docker Engine installed
- Docker Compose enabled

### Start the app with Docker Compose

From the repository root:

```bash
docker compose up --build
```

### Access the app

- Frontend: http://localhost:3000
- API Swagger: http://localhost:8080/swagger

### Stop the app

```bash
docker compose down
```

### Docker files included

- `docker-compose.yml`
- `user_service_api/Dockerfile`
- `user_service_app/Dockerfile`
- `user_service_app/nginx.conf`

### Notes

- The React frontend uses a runtime API URL fallback and does not require a local `.env` file.
- The API container exposes port `8080` and serves the Swagger UI there.
- SQLite data is stored in a Docker volume so it persists while the container is running.

## Running Tests

To run the backend unit tests:

```bash
cd user_service_api.Tests
dotnet test
```

The tests cover:

- user creation
- duplicate email validation
- fetching users
- updating user details
- deleting users

## Notes

- The backend is protected using JWT and authorization middleware.
- CORS is enabled so the React app can call the API from a different port during local development.
- The project uses SQLite for a simple local database setup and quick testing.

## Common Issues

- If the frontend cannot connect to the backend, make sure the API is running on https://localhost:7200.
- If Swagger does not load, check that the API started without build errors.
- If login fails, verify the correct email and password format match the created user record.

## License

This repository is intended for learning, project-based development, and demonstration within the workspace environment.

- CORS is enabled in the API to allow the React app to communicate with the backend.
- The current project uses SQLite for ease of local development and quick setup.
