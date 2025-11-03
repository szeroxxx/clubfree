# Command Reference

Quick reference for all commands you'll need.

## 🚀 Initial Setup (Run Once)

```bash
# 1. Install all dependencies
npm install

# 2. Generate Prisma Client
npm run db:generate

# 3. Create database tables
npm run db:push

# 4. Seed database with sample data
npm run db:seed
```

## 💻 Daily Development

```bash
# Terminal 1 - Start Backend Server
npm run server

# Terminal 2 - Start Frontend Dev Server
npm run dev
```

## 🗄️ Database Commands

```bash
# Generate Prisma Client (after schema changes)
npm run db:generate

# Push schema changes to database
npm run db:push

# Seed database with initial data
npm run db:seed

# Open Prisma Studio (visual database editor)
npm run db:studio
```

## 🏗️ Build Commands

```bash
# Build frontend for production
npm run build

# Preview production build locally
npm run preview
```

## 🔍 Useful Commands

```bash
# Check if PostgreSQL is running (Windows)
Get-Service postgresql*

# Start PostgreSQL (Windows)
Start-Service postgresql-x64-14

# Check Node version
node --version

# Check npm version
npm --version

# List all npm scripts
npm run
```

## 🧪 Testing API Endpoints

### Using curl (Command Line)

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password"}'

# Get Clients (replace TOKEN with actual JWT)
curl http://localhost:5000/api/clients \
  -H "Authorization: Bearer TOKEN"

# Create Client
curl -X POST http://localhost:5000/api/clients \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Client","email":"test@example.com","company":"Test Co"}'
```

### Using PowerShell

```powershell
# Login
$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" `
  -Method Post `
  -ContentType "application/json" `
  -Body '{"username":"admin","password":"password"}'

$token = $response.token

# Get Clients
Invoke-RestMethod -Uri "http://localhost:5000/api/clients" `
  -Headers @{Authorization="Bearer $token"}
```

## 🐛 Troubleshooting Commands

```bash
# Kill process on port 5000 (if backend won't start)
# Windows PowerShell:
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process

# Kill process on port 3000 (if frontend won't start)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules
npm install

# Reset database (WARNING: Deletes all data)
npm run db:push -- --force-reset
npm run db:seed
```

## 📦 Package Management

```bash
# Install a new package
npm install package-name

# Install a dev dependency
npm install --save-dev package-name

# Update all packages
npm update

# Check for outdated packages
npm outdated

# Audit for security vulnerabilities
npm audit

# Fix security vulnerabilities
npm audit fix
```

## 🔄 Git Commands (If using Git)

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit with backend integration"

# Create .gitignore (already created)
# Ensure .env.local is in .gitignore

# Push to remote
git remote add origin YOUR_REPO_URL
git push -u origin main
```

## 🎯 Quick Command Sequences

### First Time Setup
```bash
npm install && npm run db:generate && npm run db:push && npm run db:seed
```

### Start Development
```bash
# Run in separate terminals:
npm run server
npm run dev
```

### Reset Everything
```bash
npm run db:push -- --force-reset && npm run db:seed
```

### Update After Schema Changes
```bash
npm run db:generate && npm run db:push
```

## 📊 Database Inspection

```bash
# Open Prisma Studio
npm run db:studio

# Connect to PostgreSQL directly (if psql installed)
psql -U postgres -d management

# Inside psql:
\dt                    # List all tables
\d users              # Describe users table
SELECT * FROM users;  # Query users
\q                    # Quit
```

## 🔐 Environment Variables

```bash
# View current environment (PowerShell)
Get-Content .env.local

# Edit environment file
notepad .env.local

# Required variables:
# DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/management?schema=public"
# JWT_SECRET="your-secret-key-change-in-production"
# PORT=5000
# GEMINI_API_KEY=your-api-key
```

## 🎨 Development Workflow

### Making Changes to Database Schema

```bash
# 1. Edit prisma/schema.prisma
# 2. Generate new Prisma Client
npm run db:generate

# 3. Push changes to database
npm run db:push

# 4. Restart backend server
# Ctrl+C in backend terminal, then:
npm run server
```

### Adding New API Endpoint

```bash
# 1. Create/edit route file in server/routes/
# 2. Add route to server/index.ts
# 3. Restart backend server
# 4. Add API call to services/api.ts
# 5. Use in React components
```

### Debugging

```bash
# Backend logs
# Check terminal running 'npm run server'

# Frontend logs
# Check browser console (F12)

# Database logs
# Check Prisma Studio or psql
```

## 📱 Access URLs

```bash
# Frontend
http://localhost:3000

# Backend API
http://localhost:5000

# Prisma Studio
http://localhost:5555
```

## 🎓 Learning Commands

```bash
# View Prisma schema
cat prisma/schema.prisma

# View API routes
ls server/routes/

# View all components
ls components/

# Count lines of code
# PowerShell:
(Get-ChildItem -Recurse -Include *.ts,*.tsx | Get-Content | Measure-Object -Line).Lines
```

## 🚨 Emergency Commands

```bash
# Backend won't start - check port
netstat -ano | findstr :5000

# Database connection failed - check PostgreSQL
Get-Service postgresql*

# Frontend build failed - clear cache
npm cache clean --force
rm -rf node_modules
npm install

# Everything broken - nuclear option
rm -rf node_modules
rm package-lock.json
npm install
npm run db:generate
npm run db:push
```

## 📝 Useful Aliases (Optional)

Add to your PowerShell profile:

```powershell
# Edit profile
notepad $PROFILE

# Add these aliases:
function dev-start { npm run dev }
function server-start { npm run server }
function db-studio { npm run db:studio }
function db-reset { npm run db:push -- --force-reset; npm run db:seed }

# Save and reload
. $PROFILE
```

## 🎯 Production Commands

```bash
# Build for production
npm run build

# Test production build locally
npm run preview

# Deploy backend (example for Railway)
railway up

# Deploy frontend (example for Vercel)
vercel deploy

# Run migrations on production
npx prisma db push
```

## 📚 Documentation Commands

```bash
# View README
cat README.md

# View Quick Start
cat QUICKSTART.md

# View all documentation
ls *.md

# Search documentation
# PowerShell:
Select-String -Path *.md -Pattern "search-term"
```

---

## 💡 Pro Tips

1. **Always run backend before frontend** - Frontend needs API to be available
2. **Use Prisma Studio** - Visual way to inspect/edit database
3. **Check both terminals** - Errors might appear in either backend or frontend
4. **Save often** - Both servers auto-reload on file changes
5. **Use browser DevTools** - Network tab shows API calls and responses

## 🆘 Getting Help

If a command fails:
1. Read the error message carefully
2. Check if services are running (PostgreSQL, backend)
3. Verify environment variables in .env.local
4. Check SETUP.md for troubleshooting
5. Try the emergency commands above
