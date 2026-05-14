# ChâTop - Vacation Rental Platform

A full-stack TypeScript application connecting tenants and property owners in a tourist area.

![Vacation Rental Platform Demo](./screenshots/vacation_rental_platform_demo.gif)

## 🎯 Project Overview

A REST API built with NestJS, featuring:

- Authentication routes
- Full API routes (GET, PUT, POST) for the rentals, users, and messages domains
- DTO validation (class-validator)
- Swagger documentation

## 🚀 Installation

### Prerequisites

- **Node.js** 22 LTS or higher
- **npm** (included with Node.js)
- **MySQL** 8.0+

### 1. Clone the repository

```bash
git clone https://github.com/J28u/vacation-rental-platform.git
cd vacation-rental-platform
```

### 2. Create .env files for the frontend and backend

Copy the provided example files and fill in your own values:

```bash
cp frontend/src/.env.example frontend/src/.env
cp backend/src/.env.example backend/src/.env
```

The following environment variables are required in `backend/.env`:

| Variable        | Description                        |
| --------------- | ---------------------------------- |
| `DATABASE_URL`  | Full MySQL connection string       |
| `DATABASE_HOST` | Database host                      |
| `DATABASE_PORT` | Database port                      |
| `TOKEN_SECRET`  | Secret key used to sign JWT tokens |
| `PORT`          | API port                           |

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Create the MySQL database

Create a new MySQL database named `chatop_db`:

```sql
CREATE DATABASE chatop_db;
```

Create a dedicated user:

```sql
CREATE USER <db_username>@<db_host> IDENTIFIED BY <db_password>;
```

Grant the necessary permissions:

```sql
GRANT SELECT, INSERT, UPDATE, DELETE ON chatop_db.* TO <db_username>@<db_host>;
```

Then update the following variables in `backend/.env`:

```env
DATABASE_URL = "mysql://<db_username>:<db_password>@<db_host>:<db_port>/chatop_db"
DATABASE_HOST = "<db_host>"
DATABASE_PORT = "<db_port>"
```

### 5. Initialize the database with Prisma

Run the migration to create all tables from the Prisma schema:

```bash
cd backend
npx prisma migrate dev --name init
```

The following tables will be created in your database:

```sql
+------------+--------------+------+-----+-------------------+-----------------------------------------------+
| Field      | Type         | Null | Key | Default           | Extra                                         |
+------------+--------------+------+-----+-------------------+-----------------------------------------------+
| id         | int          | NO   | PRI | NULL              | auto_increment                                |
| email      | varchar(255) | NO   | UNI | NULL              |                                               |
| name       | varchar(255) | NO   |     | NULL              |                                               |
| password   | varchar(255) | NO   |     | NULL              |                                               |
| created_at | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
+------------+--------------+------+-----+-------------------+-----------------------------------------------+

+------------+--------------+------+-----+-------------------+-----------------------------------------------+
| Field      | Type         | Null | Key | Default           | Extra                                         |
+------------+--------------+------+-----+-------------------+-----------------------------------------------+
| id         | int          | NO   | PRI | NULL              | auto_increment                                |
| rental_id  | int          | NO   | MUL | NULL              |                                               |
| user_id    | int          | NO   | MUL | NULL              |                                               |
| message    | text         | NO   |     | NULL              |                                               |
| created_at | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
+------------+--------------+------+-----+-------------------+-----------------------------------------------+

+------------+--------------+------+-----+-------------------+-----------------------------------------------+
| Field      | Type         | Null | Key | Default           | Extra                                         |
+------------+--------------+------+-----+-------------------+-----------------------------------------------+
| id         | int          | NO   | PRI | NULL              | auto_increment                                |
| name       | varchar(255) | NO   |     | NULL              |                                               |
| surface    | decimal(10,2)| NO   |     | NULL              |                                               |
| price      | decimal(10,2)| NO   |     | NULL              |                                               |
| picture    | varchar(500) | YES  |     | NULL              |                                               |
| description| text         | NO   |     | NULL              |                                               |
| owner_id   | int          | NO   | MUL | NULL              |                                               |
| created_at | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
+------------+--------------+------+-----+-------------------+-----------------------------------------------+
```

Then generate the Prisma TypeScript client to interact with the database:

```bash
npx prisma generate
```

### 6. Start the API

```bash
cd backend
npm run start
```

The API will be available at [http://localhost:3001](http://localhost:3001)  
The Swagger documentation will be available at [http://localhost:3001/swagger](http://localhost:3001/swagger)

### 7. Start the application

```bash
cd frontend
npm install
npm run dev
```

The frontend application will be available at [http://localhost:5173](http://localhost:5173)

## 📂 Project Structure

```
vacation-rental-platform/
├── backend/                # NestJS 11 API
│   ├── prisma/             # Database schema
│   ├── src/
│   │   ├── auth/           # /auth domain (dto, service, controller, module)
│   │   ├── common/         # Shared decorators, DTOs and interfaces
│   │   ├── messages/       # /messages domain (dto, service, controller, module)
│   │   ├── prisma/         # TypeScript types
│   │   ├── rentals/        # /rentals domain (dto, service, controller, module)
│   │   ├── users/          # /users domain (dto, service, controller, module)
│   │   ├── app.module.ts
│   │   └── main.ts         # API entry point
│   ├── package.json
│   ├── prisma.config.ts
│   └── tsconfig.json
├── frontend/               # React 19 application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Application pages
│   │   ├── services/       # API services (axios)
│   │   ├── types/          # TypeScript types
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## 📡 API Documentation

Swagger UI: [http://localhost:3001/swagger](http://localhost:3001/swagger)

## 🔒 Key Considerations

### Security

- ✅ JWT required for all routes (except register, login, and Swagger)
- ✅ Passwords hashed with bcrypt (never stored in plain text)
- ✅ Database credentials stored in environment variables (`.env`)
- ✅ User input validation (DTOs + class-validator)

### Architecture

- ✅ Modular NestJS architecture (Controller / Service / Module)
- ✅ Prisma ORM (no raw SQL)
- ✅ Separation of concerns (SOLID principles)
- ✅ Error handling with Exception Filters

### Image Upload

- Rental images are uploaded directly to the server
- The image URL is then saved to the database
- Uses `@UseInterceptors(FileInterceptor())` from NestJS
