# Quick Start Guide

Follow these steps to get your application running in minutes!

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Setup Database
```bash
npm run db:generate
npm run db:push
npm run db:seed
```

## Step 3: Start Servers

Open **TWO** terminal windows:

### Terminal 1 - Backend Server
```bash
npm run server
```
Wait for: `Server running on port 5000`

### Terminal 2 - Frontend Server
```bash
npm run dev
```
Wait for: `Local: http://localhost:3000/`

## Step 4: Login

Open your browser to: **http://localhost:3000**

Login with:
- **Username**: `admin`
- **Password**: `password`

## 🎉 You're Done!

Explore the application with full admin access.

## Other Test Accounts

Try different roles:
- **HR**: username: `hr`, password: `password`
- **Sales**: username: `sales`, password: `password`
- **Employee**: username: `dev`, password: `password`
- **Client**: username: `johndoe`, password: `password`

## Need Help?

See [SETUP.md](./SETUP.md) for detailed documentation and troubleshooting.
