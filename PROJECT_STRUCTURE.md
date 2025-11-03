# Project Structure

## 📁 Complete File Tree

```
freelancer-command-center/
│
├── 📄 .env.local                    # Environment variables (DB, JWT secret)
├── 📄 .gitignore                    # Git ignore rules
├── 📄 package.json                  # Dependencies and scripts
├── 📄 tsconfig.json                 # TypeScript config (frontend)
├── 📄 vite.config.ts                # Vite configuration
├── 📄 index.html                    # HTML entry point
├── 📄 index.tsx                     # React entry point
│
├── 📄 README.md                     # Main documentation
├── 📄 QUICKSTART.md                 # Quick start guide
├── 📄 SETUP.md                      # Detailed setup guide
├── 📄 ARCHITECTURE.md               # Architecture overview
├── 📄 INTEGRATION_SUMMARY.md        # Integration summary
├── 📄 PROJECT_STRUCTURE.md          # This file
│
├── 📄 App.tsx                       # Main React component
├── 📄 types.ts                      # TypeScript type definitions
├── 📄 constants.ts                  # Constants (legacy, not used with backend)
│
├── 📂 server/                       # 🆕 BACKEND CODE
│   ├── 📄 index.ts                  # Express server setup
│   ├── 📄 tsconfig.json             # TypeScript config (backend)
│   │
│   ├── 📂 middleware/
│   │   └── 📄 auth.ts               # JWT authentication middleware
│   │
│   └── 📂 routes/                   # API route handlers
│       ├── 📄 auth.ts               # Login endpoint
│       ├── 📄 clients.ts            # Client CRUD
│       ├── 📄 employees.ts          # Employee CRUD
│       ├── 📄 projects.ts           # Project CRUD
│       ├── 📄 tasks.ts              # Task CRUD
│       ├── 📄 invoices.ts           # Invoice CRUD
│       └── 📄 documents.ts          # Document & Folder CRUD
│
├── 📂 prisma/                       # 🆕 DATABASE
│   ├── 📄 schema.prisma             # Database schema definition
│   └── 📄 seed.ts                   # Database seeding script
│
├── 📂 services/                     # 🆕 API CLIENT
│   ├── 📄 api.ts                    # API service layer
│   └── 📄 geminiService.ts          # AI text generation
│
├── 📂 hooks/                        # React hooks
│   └── 📄 useAuth.ts                # 🔄 UPDATED - Authentication hook
│
├── 📂 utils/                        # Utility functions
│   └── 📄 permissions.ts            # Role-based permissions
│
└── 📂 components/                   # React UI components
    ├── 📄 Login.tsx                 # Login form
    ├── 📄 Header.tsx                # App header
    ├── 📄 Sidebar.tsx               # Navigation sidebar
    ├── 📄 Modal.tsx                 # Modal component
    ├── 📄 Icons.tsx                 # Icon components
    ├── 📄 Dashboard.tsx             # Dashboard view
    ├── 📄 Clients.tsx               # Client management
    ├── 📄 Employees.tsx             # Employee management
    ├── 📄 Projects.tsx              # Project management
    ├── 📄 Tasks.tsx                 # Task management
    ├── 📄 Invoices.tsx              # Invoice management
    └── 📄 Documents.tsx             # Document management
```

## 🆕 New Files Created

### Backend Infrastructure
- `server/index.ts` - Express server
- `server/middleware/auth.ts` - JWT middleware
- `server/routes/*.ts` - 7 route handlers
- `server/tsconfig.json` - Backend TypeScript config

### Database Layer
- `prisma/schema.prisma` - Database schema
- `prisma/seed.ts` - Seed data script

### Frontend Integration
- `services/api.ts` - API client service

### Documentation
- `README.md` - Complete rewrite
- `SETUP.md` - Setup guide
- `QUICKSTART.md` - Quick start
- `ARCHITECTURE.md` - Architecture docs
- `INTEGRATION_SUMMARY.md` - Integration summary
- `PROJECT_STRUCTURE.md` - This file

### Configuration
- `.env.local` - Updated with DB credentials
- `package.json` - Updated with dependencies
- `.gitignore` - Updated

## 🔄 Modified Files

### Updated for Backend Integration
- `App.tsx` - Now fetches from API, async CRUD handlers
- `hooks/useAuth.ts` - Uses backend authentication
- `.env.local` - Added DATABASE_URL, JWT_SECRET, PORT

## 📊 File Count Summary

| Category | Count | Description |
|----------|-------|-------------|
| Backend Routes | 7 | API endpoint handlers |
| Backend Core | 2 | Server setup + middleware |
| Database | 2 | Schema + seed script |
| Frontend Services | 2 | API client + AI service |
| React Components | 12 | UI components |
| Documentation | 6 | Guides and references |
| Configuration | 5 | Config files |
| **Total New/Modified** | **36** | Files created or updated |

## 🎯 Key Directories Explained

### `/server` - Backend API
All Node.js/Express backend code lives here. This is where API requests are handled, authentication happens, and database operations are performed.

### `/prisma` - Database Layer
Contains the database schema and seeding scripts. Prisma generates type-safe database client from the schema.

### `/services` - Frontend Services
API client and external service integrations. This layer abstracts API calls from React components.

### `/components` - React UI
All React components for the user interface. Each component handles its own view logic and user interactions.

### `/hooks` - React Hooks
Custom React hooks for shared logic like authentication state management.

### `/utils` - Utilities
Helper functions and utilities used across the application, like permission checks.

## 🔗 How Files Connect

```
User Interaction
    ↓
React Component (components/*.tsx)
    ↓
API Service (services/api.ts)
    ↓
HTTP Request with JWT
    ↓
Express Server (server/index.ts)
    ↓
Auth Middleware (server/middleware/auth.ts)
    ↓
Route Handler (server/routes/*.ts)
    ↓
Prisma Client (@prisma/client)
    ↓
PostgreSQL Database
```

## 📦 Dependencies by Layer

### Frontend Dependencies
- `react` - UI framework
- `react-dom` - React DOM renderer
- `recharts` - Charts and graphs
- `@google/genai` - AI text generation

### Backend Dependencies
- `express` - Web framework
- `@prisma/client` - Database ORM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT tokens
- `cors` - CORS middleware
- `dotenv` - Environment variables

### Development Dependencies
- `typescript` - Type safety
- `vite` - Build tool
- `prisma` - Database toolkit
- `tsx` - TypeScript execution
- `@types/*` - TypeScript definitions

## 🚀 Execution Flow

### Development Mode
1. **Terminal 1**: `npm run server` → Starts Express on port 5000
2. **Terminal 2**: `npm run dev` → Starts Vite on port 3000
3. Browser connects to port 3000
4. Frontend makes API calls to port 5000

### Build for Production
1. `npm run build` → Creates optimized frontend bundle
2. Deploy frontend to static hosting (Vercel, Netlify)
3. Deploy backend to Node.js hosting (Heroku, Railway, AWS)
4. Update API_URL in frontend to production backend URL

## 🎨 Code Organization Principles

1. **Separation of Concerns**: Frontend, backend, and database are clearly separated
2. **Type Safety**: TypeScript throughout for better DX
3. **Modularity**: Each route handler is a separate file
4. **Reusability**: Shared logic in hooks and utils
5. **Security**: Authentication middleware protects all routes
6. **Documentation**: Comprehensive docs for every aspect

## 📈 Scalability Considerations

The current structure supports:
- ✅ Adding new API endpoints (new route files)
- ✅ Adding new database models (update schema.prisma)
- ✅ Adding new React components (new files in components/)
- ✅ Adding new features (extend existing files)
- ✅ Team collaboration (clear file organization)
- ✅ Testing (can add test files alongside source)

## 🎓 Learning Path

To understand the codebase:
1. Start with `README.md` - Overview
2. Read `QUICKSTART.md` - Get it running
3. Explore `App.tsx` - See how frontend works
4. Check `services/api.ts` - Understand API calls
5. Look at `server/index.ts` - See backend setup
6. Review `server/routes/clients.ts` - Example CRUD
7. Study `prisma/schema.prisma` - Database structure
8. Read `ARCHITECTURE.md` - System design

## 🔍 Finding Things

| Looking for... | Check... |
|----------------|----------|
| API endpoints | `server/routes/*.ts` |
| Database models | `prisma/schema.prisma` |
| UI components | `components/*.tsx` |
| API calls | `services/api.ts` |
| Authentication | `hooks/useAuth.ts`, `server/middleware/auth.ts` |
| Permissions | `utils/permissions.ts` |
| Types | `types.ts` |
| Configuration | `.env.local`, `package.json` |
| Documentation | `*.md` files |

## ✨ Best Practices Followed

- ✅ Environment variables for secrets
- ✅ Password hashing (never plain text)
- ✅ JWT for stateless auth
- ✅ TypeScript for type safety
- ✅ Prisma for SQL injection protection
- ✅ CORS configuration
- ✅ Modular code structure
- ✅ Comprehensive documentation
- ✅ Git ignore for sensitive files
- ✅ Consistent naming conventions
