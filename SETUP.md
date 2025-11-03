# Backend Setup Guide

## Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (running on localhost:5432)
- Database created with name: `management`

## Database Configuration

Your PostgreSQL database should be configured with:
- **Username**: postgres
- **Password**: postgres
- **Database**: management
- **Host**: 127.0.0.1
- **Port**: 5432

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Generate Prisma Client
```bash
npm run db:generate
```

### 3. Push Database Schema
This will create all tables in your PostgreSQL database:
```bash
npm run db:push
```

### 4. Seed Database with Initial Data
This will populate your database with sample users, clients, projects, etc.:
```bash
npm run db:seed
```

### 5. Start the Backend Server
In one terminal:
```bash
npm run server
```

### 6. Start the Frontend Development Server
In another terminal:
```bash
npm run dev
```

## Default Login Credentials

After seeding, you can login with these accounts:

| Username   | Password | Role     |
|------------|----------|----------|
| admin      | password | Admin    |
| hr         | password | HR       |
| sales      | password | Sales    |
| dev        | password | Employee |
| johndoe    | password | Client   |
| janesmith  | password | Client   |

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with username and password

### Clients
- `GET /api/clients` - Get all clients
- `POST /api/clients` - Create new client
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client

### Employees
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Invoices
- `GET /api/invoices` - Get all invoices
- `POST /api/invoices` - Create new invoice
- `PUT /api/invoices/:id` - Update invoice
- `DELETE /api/invoices/:id` - Delete invoice

### Documents
- `GET /api/documents/folders` - Get all folders
- `POST /api/documents/folders` - Create new folder
- `DELETE /api/documents/folders/:id` - Delete folder
- `GET /api/documents/docs` - Get all documents
- `POST /api/documents/docs` - Create new document
- `PUT /api/documents/docs/:id` - Update document
- `DELETE /api/documents/docs/:id` - Delete document

## Useful Commands

- `npm run db:studio` - Open Prisma Studio to view/edit database
- `npm run db:push` - Push schema changes to database
- `npm run db:seed` - Re-seed database (will fail if data exists)

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Verify database credentials in `.env.local`
- Check if database `management` exists

### Port Already in Use
- Backend runs on port 5000
- Frontend runs on port 3000
- Change ports in `.env.local` (backend) or `vite.config.ts` (frontend)

### Prisma Client Not Found
Run: `npm run db:generate`
