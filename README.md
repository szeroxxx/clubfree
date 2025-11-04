# Freelancer's Command Center

.env
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/management?schema=public"
JWT_SECRET="your-secret-key-change-in-production"
PORT=5000
GEMINI_API_KEY=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



A full-stack management application for freelancers with role-based access control, built with React, Node.js, Express, PostgreSQL, and Prisma.



## 🚀 Features

- **Role-Based Access Control**: Admin, HR, Sales, Employee, and Client roles with different permissions
- **Client Management**: Track clients and their information
- **Project Management**: Manage projects with team assignments
- **Task Tracking**: Assign and monitor tasks with priorities and statuses
- **Invoice Management**: Create and track invoices
- **Document Management**: Organize documents in folders with AI-powered text generation
- **Employee Management**: Maintain employee records
- **Dashboard**: Visual overview with charts and statistics
- **Authentication**: Secure JWT-based authentication

## 🛠️ Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- Recharts (for data visualization)
- Google Gemini AI (for document generation)

### Backend

- Node.js
- Express
- PostgreSQL
- Prisma ORM
- JWT Authentication
- bcryptjs (password hashing)

## 📋 Prerequisites

- Node.js v18 or higher
- PostgreSQL database
- npm or yarn

## 🔧 Installation & Setup

### 1. Clone and Install

```bash
npm install
```

### 2. Database Setup

Make sure PostgreSQL is running with these credentials:

- **Host**: 127.0.0.1
- **Port**: 5432
- **Database**: management
- **Username**: postgres
- **Password**: postgres

### 3. Initialize Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with initial data
npm run db:seed
```

### 4. Start Development Servers

**Terminal 1 - Backend:**

```bash
npm run server
```

**Terminal 2 - Frontend:**

```bash
npm run dev
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 👤 Default Login Credentials

| Username  | Password | Role     | Access                                  |
| --------- | -------- | -------- | --------------------------------------- |
| admin     | password | Admin    | Full access to all features             |
| hr        | password | HR       | Employee management and documents       |
| sales     | password | Sales    | Client and project management           |
| dev       | password | Employee | View projects and manage assigned tasks |
| johndoe   | password | Client   | View own projects, tasks, and invoices  |
| janesmith | password | Client   | View own projects, tasks, and invoices  |

## 📁 Project Structure

```
├── server/                 # Backend code
│   ├── routes/            # API route handlers
│   ├── middleware/        # Authentication middleware
│   └── index.ts           # Express server setup
├── prisma/                # Database schema and migrations
│   ├── schema.prisma      # Prisma schema definition
│   └── seed.ts            # Database seeding script
├── components/            # React components
├── services/              # API and external services
├── hooks/                 # Custom React hooks
├── utils/                 # Utility functions
└── types.ts               # TypeScript type definitions
```

## 🔐 API Endpoints

All endpoints (except `/api/auth/login`) require JWT authentication via `Authorization: Bearer <token>` header.

### Authentication

- `POST /api/auth/login` - Login

### Resources

- Clients: `/api/clients`
- Employees: `/api/employees`
- Projects: `/api/projects`
- Tasks: `/api/tasks`
- Invoices: `/api/invoices`
- Documents: `/api/documents/folders`, `/api/documents/docs`

Each resource supports: GET (list), POST (create), PUT (update), DELETE (delete)

## 🎯 Role Permissions

| Feature   | Admin | HR  | Sales | Employee      | Client   |
| --------- | ----- | --- | ----- | ------------- | -------- |
| Dashboard | ✅    | ✅  | ✅    | ✅            | ✅       |
| Clients   | ✅    | ❌  | ✅    | ❌            | ❌       |
| Employees | ✅    | ✅  | ❌    | ❌            | ❌       |
| Projects  | ✅    | ❌  | ✅    | View Own      | View Own |
| Tasks     | ✅    | ❌  | ❌    | View/Edit Own | View Own |
| Invoices  | ✅    | ❌  | ❌    | ❌            | View Own |
| Documents | ✅    | ✅  | ❌    | ❌            | ❌       |

## 🛠️ Available Scripts

```bash
npm run dev          # Start frontend dev server
npm run server       # Start backend server
npm run build        # Build frontend for production
npm run db:generate  # Generate Prisma Client
npm run db:push      # Push schema to database
npm run db:seed      # Seed database with initial data
npm run db:studio    # Open Prisma Studio
```

## 🔍 Database Schema

The application uses the following main entities:

- **Users**: Authentication and role management
- **Clients**: Client information
- **Employees**: Employee records
- **Projects**: Projects with client and team member relationships
- **Tasks**: Tasks assigned to employees within projects
- **Invoices**: Invoices linked to projects
- **Folders & Documents**: Document organization system

## 🐛 Troubleshooting

See [SETUP.md](./SETUP.md) for detailed troubleshooting steps.

## 📧 Support

For issues or questions, please open an issue in the repository.

docker build -t app:production .
docker run -d -p 3000:3000 --name app app:production

GEMINI_API_KEY="your_gemini_api_key_if_needed"
JWT_SECRET="your_secure_jwt_secret"
