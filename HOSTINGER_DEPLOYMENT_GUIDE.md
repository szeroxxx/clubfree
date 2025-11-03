# Complete Hostinger VPS Deployment Guide

## Project Overview
- **Frontend**: React + Vite (Port 3000)
- **Backend**: Express.js (Port 5000)
- **Database**: PostgreSQL
- **Domain**: clubxero.com
- **Subdomain**: app.clubxero.com (or os.clubxero.com)

---

## Prerequisites Checklist
- [ ] VPS access (SSH credentials from Hostinger)
- [ ] Domain clubxero.com already configured
- [ ] Root or sudo access to VPS

---

## STEP 1: Connect to Your VPS

### Using SSH (Windows)
```bash
ssh root@your-vps-ip-address
# Or if you have a username:
ssh username@your-vps-ip-address
```

**Find your VPS IP**: Check your Hostinger panel under VPS section

---

## STEP 2: Install Required Software on VPS

### Update System
```bash
sudo apt update && sudo apt upgrade -y
```

### Install Node.js (v20 LTS)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node --version  # Should show v20.x.x
npm --version
```

### Install PostgreSQL
```bash
sudo apt install postgresql postgresql-contrib -y
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Install Nginx (Web Server)
```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
```

### Install Git
```bash
sudo apt install git -y
```

---

## STEP 3: Setup PostgreSQL Database

### Create Database and User
```bash
# Switch to postgres user
sudo -u postgres psql

# Inside PostgreSQL prompt, run these commands:
CREATE DATABASE management;
CREATE USER clubxero_user WITH PASSWORD 'your_secure_password_here';
GRANT ALL PRIVILEGES ON DATABASE management TO clubxero_user;
\c management
GRANT ALL ON SCHEMA public TO clubxero_user;
\q
```

### Configure PostgreSQL for Remote Access (if needed)
```bash
sudo nano /etc/postgresql/*/main/postgresql.conf
# Find and change: listen_addresses = 'localhost'

sudo nano /etc/postgresql/*/main/pg_hba.conf
# Add this line:
# local   all   clubxero_user   md5
```

```bash
sudo systemctl restart postgresql
```

---

## STEP 4: Upload Your Project to VPS

### Option A: Using Git (Recommended)

#### On your local machine, push to GitHub:
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

#### On VPS, clone the repository:
```bash
cd /var/www
sudo mkdir clubxero
sudo chown -R $USER:$USER clubxero
cd clubxero
git clone https://github.com/yourusername/your-repo.git .
```

### Option B: Using SCP (Direct Upload)

#### On your local machine (Windows PowerShell):
```powershell
# Compress your project first (exclude node_modules)
# Then upload:
scp -r C:\path\to\your\project root@your-vps-ip:/var/www/clubxero
```

---

## STEP 5: Configure Environment Variables on VPS

```bash
cd /var/www/clubxero

# Create production environment file
nano .env.local
```

### Add these variables:
```env
# Database
DATABASE_URL="postgresql://clubxero_user:your_secure_password_here@localhost:5432/management?schema=public"

# Server
PORT=5000
NODE_ENV=production

# JWT Secret (generate a random string)
JWT_SECRET=your_random_jwt_secret_here_make_it_long_and_secure

# Gemini API (if you're using it)
GEMINI_API_KEY=your_gemini_api_key_here
```

**Save**: Press `Ctrl+X`, then `Y`, then `Enter`

---

## STEP 6: Build and Setup the Application

```bash
cd /var/www/clubxero

# Install dependencies
npm install

# Generate Prisma Client
npm run db:generate

# Push database schema
npm run db:push

# Seed database with initial data
npm run db:seed

# Build frontend
npm run build
```

---

## STEP 7: Setup PM2 to Run Backend

### Create PM2 ecosystem file
```bash
nano ecosystem.config.js
```

### Add this configuration:
```javascript
module.exports = {
  apps: [{
    name: 'clubxero-backend',
    script: 'server/index.ts',
    interpreter: 'node',
    interpreter_args: '--loader tsx',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    }
  }]
};
```

### Start the backend with PM2
```bash

pm2 save
pm2 startup
# Follow the command it gives you (copy and paste it)
```

### Check if backend is running
```bash
pm2 status
pm2 logs clubxero-backend
```

---

## STEP 8: Configure Nginx for Subdomain

### Create Nginx configuration
```bash
sudo nano /etc/nginx/sites-available/clubxero
```

### Add this configuration:
```nginx
server {
    listen 80;
    server_name app.clubxero.com;

    # Frontend - Serve built Vite files
    root /var/www/clubxero/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Frontend routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API proxy
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Enable the site
```bash
sudo ln -s /etc/nginx/sites-available/clubxero /etc/nginx/sites-enabled/
sudo nginx -t  # Test configuration
sudo systemctl reload nginx
```

---

## STEP 9: Configure DNS for Subdomain

### In Hostinger Control Panel:

1. Go to **Domains** → **clubxero.com** → **DNS/Name Servers**
2. Add an **A Record**:
   - **Type**: A
   - **Name**: app (or os)
   - **Points to**: Your VPS IP address
   - **TTL**: 14400 (or default)

3. Wait 5-30 minutes for DNS propagation

### Test DNS propagation:
```bash
# On your local machine
nslookup app.clubxero.com
# Should return your VPS IP
```

---

## STEP 10: Install SSL Certificate (HTTPS)

### Install Certbot
```bash
sudo apt install certbot python3-certbot-nginx -y
```

### Get SSL Certificate
```bash
sudo certbot --nginx -d app.clubxero.com
```

Follow the prompts:
- Enter your email
- Agree to terms
- Choose to redirect HTTP to HTTPS (option 2)

### Auto-renewal test
```bash
sudo certbot renew --dry-run
```

---

## STEP 11: Configure Firewall

```bash
# Allow SSH, HTTP, HTTPS
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

---

## STEP 12: Final Checks

### Check if everything is running:
```bash
# Backend status
pm2 status

# Backend logs
pm2 logs clubxero-backend --lines 50

# Nginx status
sudo systemctl status nginx

# PostgreSQL status
sudo systemctl status postgresql

# Check if ports are listening
sudo netstat -tulpn | grep LISTEN
```

### Test your application:
1. Open browser: `https://app.clubxero.com`
2. Try logging in with seeded credentials
3. Check browser console for errors
4. Test API calls

---

## Common Issues & Solutions

### Issue 1: "502 Bad Gateway"
**Solution**: Backend not running
```bash
pm2 restart clubxero-backend
pm2 logs
```

### Issue 2: Database connection error
**Solution**: Check DATABASE_URL in .env.local
```bash
cd /var/www/clubxero
cat .env.local
# Verify connection:
psql -U clubxero_user -d management -h localhost
```

### Issue 3: "Cannot GET /" or blank page
**Solution**: Frontend not built properly
```bash
cd /var/www/clubxero
npm run build
sudo systemctl reload nginx
```

### Issue 4: API calls failing
**Solution**: Check CORS and proxy settings
```bash
pm2 logs clubxero-backend
# Check if API is accessible:
curl http://localhost:5000/api/auth/check
```

### Issue 5: SSL certificate issues
**Solution**: Re-run certbot
```bash
sudo certbot --nginx -d app.clubxero.com --force-renewal
```

---

## Useful Commands for Maintenance

### Update application after code changes:
```bash
cd /var/www/clubxero
git pull origin main
npm install
npm run build
npm run db:generate
npm run db:push
pm2 restart clubxero-backend
sudo systemctl reload nginx
```

### View logs:
```bash
# Backend logs
pm2 logs clubxero-backend

# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# PostgreSQL logs
sudo tail -f /var/log/postgresql/postgresql-*-main.log
```

### Database backup:
```bash
pg_dump -U clubxero_user -d management > backup_$(date +%Y%m%d).sql
```

### Database restore:
```bash
psql -U clubxero_user -d management < backup_20241103.sql
```

---

## Security Best Practices

1. **Change default passwords**: Use strong passwords for database
2. **Keep system updated**: Run `sudo apt update && sudo apt upgrade` regularly
3. **Use SSH keys**: Disable password authentication
4. **Enable firewall**: Only allow necessary ports
5. **Regular backups**: Backup database and code regularly
6. **Monitor logs**: Check PM2 and Nginx logs for suspicious activity
7. **Update dependencies**: Keep npm packages updated

---

## Next Steps After Deployment

1. Test all features thoroughly
2. Setup monitoring (optional): Consider using services like UptimeRobot
3. Setup automated backups
4. Configure email notifications for PM2 errors
5. Add Google Analytics or monitoring tools
6. Setup staging environment for testing updates

---

## Support Resources

- **Hostinger Support**: https://www.hostinger.com/tutorials/vps
- **PM2 Documentation**: https://pm2.keymetrics.io/docs/usage/quick-start/
- **Nginx Documentation**: https://nginx.org/en/docs/
- **Prisma Documentation**: https://www.prisma.io/docs/

---

## Quick Reference

**Project Location**: `/var/www/clubxero`
**Nginx Config**: `/etc/nginx/sites-available/clubxero`
**Environment**: `/var/www/clubxero/.env.local`
**Logs**: `pm2 logs` or `/var/log/nginx/`

**Restart Backend**: `pm2 restart clubxero-backend`
**Restart Nginx**: `sudo systemctl reload nginx`
**Rebuild Frontend**: `npm run build`

---

Good luck with your deployment! 🚀
