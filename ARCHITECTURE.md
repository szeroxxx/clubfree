# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  React Components (UI Layer)                         │  │
│  │  - Dashboard, Clients, Projects, Tasks, etc.         │  │
│  └────────────────────┬─────────────────────────────────┘  │
│                       │                                      │
│  ┌────────────────────▼─────────────────────────────────┐  │
│  │  Services Layer (API Client)                         │  │
│  │  - services/api.ts                                   │  │
│  │  - Handles HTTP requests with JWT tokens            │  │
│  └────────────────────┬─────────────────────────────────┘  │
│                       │                                      │
│  ┌────────────────────▼─────────────────────────────────┐  │
│  │  State Management                                    │  │
│  │  - React useState hooks in App.tsx                   │  │
│  │  - useAuth hook for authentication                   │  │
│  └──────────────────────────────────────────────────────┘  │
└───────────────────────┬─────────────────────────────────────┘
                        │ HTTP/REST API
                        │ (JSON + JWT)
┌───────────────────────▼─────────────────────────────────────┐
│                         Backend                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Express Server (server/index.ts)                    │  │
│  │  - CORS enabled                                      │  │
│  │  - JSON body parser                                  │  │
│  └────────────────────┬─────────────────────────────────┘  │
│                       │                                      │
│  ┌────────────────────▼─────────────────────────────────┐  │
│  │  Middleware Layer                                    │  │
│  │  - JWT Authentication (server/middleware/auth.ts)    │  │
│  └────────────────────┬─────────────────────────────────┘  │
│                       │                                      │
│  ┌────────────────────▼─────────────────────────────────┐  │
│  │  Route Handlers (server/routes/)                     │  │
│  │  - auth.ts, clients.ts, employees.ts, etc.          │  │
│  │  - Business logic and validation                     │  │
│  └────────────────────┬─────────────────────────────────┘  │
│                       │                                      │
│  ┌────────────────────▼─────────────────────────────────┐  │
│  │  Prisma ORM                                          │  │
│  │  - Type-safe database queries                        │  │
│  │  - Schema validation                                 │  │
│  └────────────────────┬─────────────────────────────────┘  │
└───────────────────────┬─────────────────────────────────────┘
                        │ SQL Queries
┌───────────────────────▼─────────────────────────────────────┐
│                    PostgreSQL Database                       │
│  - users, clients, employees, projects, tasks, etc.         │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Authentication Flow
```
User Login
    ↓
Frontend: Login Component
    ↓
POST /api/auth/login (username, password)
    ↓
Backend: auth.ts route
    ↓
Prisma: Find user by username
    ↓
bcrypt: Compare password hash
    ↓
JWT: Generate token
    ↓
Response: { user, token }
    ↓
Frontend: Store in localStorage
    ↓
Frontend: Set Authorization header for future requests
```

### 2. CRUD Operations Flow (Example: Create Client)
```
User clicks "Add Client"
    ↓
Frontend: Client Form Component
    ↓
POST /api/clients + JWT token
    ↓
Backend: authenticate middleware
    ↓
Backend: clients.ts route handler
    ↓
Prisma: prisma.client.create()
    ↓
PostgreSQL: INSERT INTO clients
    ↓
Response: New client object
    ↓
Frontend: Update local state
    ↓
UI: Re-render with new client
```

### 3. Data Fetching Flow
```
User logs in
    ↓
App.tsx useEffect triggered
    ↓
Parallel API calls:
  - GET /api/clients
  - GET /api/employees
  - GET /api/projects
  - GET /api/tasks
  - GET /api/invoices
  - GET /api/documents/folders
  - GET /api/documents/docs
    ↓
Backend: authenticate middleware
    ↓
Backend: Route handlers
    ↓
Prisma: Database queries with relations
    ↓
Response: JSON data
    ↓
Frontend: Update all state
    ↓
UI: Render dashboard and components
```

## Database Schema Relationships

```
User ──────────────┐
                   │ (entityId)
                   ├──> Employee
                   └──> Client

Client ────────────> Project (clientId)

Project ───────────> ProjectMember (projectId)
                     └──> Employee (employeeId)

Project ───────────> Task (projectId)
Task ──────────────> Employee (assigneeId)

Project ───────────> Invoice (projectId)

Folder ────────────> Document (folderId)
```

## Security Layers

1. **Password Security**
   - Passwords hashed with bcryptjs (10 rounds)
   - Never stored or transmitted in plain text

2. **JWT Authentication**
   - Tokens signed with secret key
   - 7-day expiration
   - Verified on every protected route

3. **Authorization Middleware**
   - All routes (except login) require valid JWT
   - Token extracted from Authorization header
   - User context available in req.user

4. **Role-Based Access Control**
   - Frontend: Permission checks before rendering UI
   - Backend: Route-level authorization (can be enhanced)

## Technology Choices

### Why Prisma?
- Type-safe database queries
- Automatic migrations
- Great TypeScript support
- Easy relationship management

### Why PostgreSQL?
- Robust relational database
- ACID compliance
- Great for complex relationships
- Excellent performance

### Why JWT?
- Stateless authentication
- Easy to scale
- Works well with REST APIs
- No server-side session storage needed

### Why Express?
- Minimal and flexible
- Large ecosystem
- Easy to understand
- Great middleware support

## Performance Considerations

1. **Database Queries**
   - Prisma includes related data in single queries
   - Reduces N+1 query problems
   - Indexes on foreign keys (automatic with Prisma)

2. **Frontend State**
   - Data fetched once on login
   - Local state updates for instant UI feedback
   - API calls for persistence

3. **API Design**
   - RESTful endpoints
   - JSON responses
   - Proper HTTP status codes

## Scalability Path

Future improvements:
1. Add Redis for session caching
2. Implement pagination for large datasets
3. Add WebSocket for real-time updates
4. Separate read/write database replicas
5. Add API rate limiting
6. Implement request caching
7. Add database connection pooling
8. Deploy backend as microservices
