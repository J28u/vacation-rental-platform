# ChâTop — Vacation Rental Platform
 
**OpenClassrooms — Lead Developer JavaScript Path | Project 3** (May 2026)
 
A full-stack TypeScript application connecting tenants and property owners in a tourist area.
 
![Vacation Rental Platform Demo](./screenshots/vacation_rental_platform_demo.gif)

## Context
 
ChâTop already had a React frontend running on mock data (Mockoon). The mission was to design and implement the backend that powers it: modelling the data, building the REST API, and connecting both ends.

## Tech Stack
 
**Backend**
- NestJS 11 (Express)
- Prisma ORM
- MySQL 8.0
- JWT (authentication)
- class-validator (DTO validation)
- Swagger (API documentation)
  
**Frontend**
- React 19 (Vite)
- TypeScript
- Axios

## API Overview

- Authentication routes (register, login)
- Full CRUD routes for the rentals, users, and messages domains
- DTO validation on all inputs
- Swagger documentation at `/swagger`

## Security & Architecture
 
**Security**
- JWT required for all routes (except register, login, and Swagger)
- Passwords hashed with bcrypt (never stored in plain text)
- Database credentials stored in environment variables (`.env`)
- User input validation via DTOs and class-validator
  
**Architecture**
- Modular NestJS structure: one module per domain (Controller / Service / Module)
- Prisma ORM — no raw SQL
- SOLID principles and separation of concerns throughout
- Error handling with NestJS Exception Filters
  
**Image upload**
- Rental images uploaded directly to the server via `@UseInterceptors(FileInterceptor())`
- Image URL saved to the database after upload

## 📂 Project Structure

```
vacation-rental-platform/
├── backend/                # NestJS 11 API
│   ├── prisma/             # Database schema and migrations
│   └── src/
│       ├── auth/           # Auth domain (dto, service, controller, module)
│       ├── common/         # Shared decorators, DTOs and interfaces
│       ├── messages/       # Messages domain
│       ├── rentals/        # Rentals domain
│       ├── users/          # Users domain
│       ├── app.module.ts
│       └── main.ts         # API entry point
├── frontend/               # React 19 application (Vite)
│   └── src/
│       ├── components/     # Reusable components
│       ├── pages/          # Application pages
│       ├── services/       # API services (Axios)
│       └── types/          # TypeScript types
└── README.md
```

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

### 2. Create environment files

Copy the provided example files and fill in your own values:

```bash
cp frontend/src/.env.example frontend/src/.env
cp backend/src/.env.example backend/src/.env
```

Required variables in `backend/.env`:

| Variable        | Description                        |
| --------------- | ---------------------------------- |
| `DATABASE_URL`  | Full MySQL connection string       |
| `DATABASE_HOST` | Database host                      |
| `DATABASE_PORT` | Database port                      |
| `TOKEN_SECRET`  | Secret key used to sign JWT tokens |
| `PORT`          | API port                           |

### 3. Install backend dependencies

```bash
cd backend && npm install
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

Run migrations to create all tables from the Prisma schema:

```bash
cd backend
npx prisma migrate dev --name init
```

Generate the Prisma TypeScript client to interact with the database:

```bash
npx prisma generate
```

<details>
<summary>View generated table schemas</summary>
  
```
users
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

messages
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

rentals
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
</details>

### 6. Start the API

```bash
cd backend && npm run start
```

- API: [http://localhost:3001](http://localhost:3001)
- Swagger: [http://localhost:3001/swagger](http://localhost:3001/swagger)

### 7. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)

## Skills
 
- Modelling and implementing a backend with NestJS
- Designing a relational database schema and managing migrations with Prisma
- Securing a REST API with JWT authentication
- Integrating a frontend and backend via a REST API
