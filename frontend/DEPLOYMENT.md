# ===========================================
# FRONTEND DEPLOYMENT GUIDE
# ===========================================

## 🚀 **Frontend Server Deployment**

This guide covers deploying the React frontend application to a production server.

### **📋 Prerequisites**

- **Node.js 16+** installed on the server
- **Nginx** (recommended for production)
- **SSL certificate** (for HTTPS)
- **Domain name** pointing to your server

### **🔧 Environment Setup**

1. **Copy environment template:**
   ```bash
   cp env.production .env
   ```

2. **Update `.env` with your production values:**
   ```bash
   # API Configuration
   REACT_APP_API_BASE_URL=https://your-backend-domain.com/api
   REACT_APP_ADMIN_API_BASE_URL=https://your-backend-domain.com/admin
   
   # Frontend URL
   REACT_APP_FRONTEND_URL=https://your-frontend-domain.com
   ```

### **🏗️ Build & Deploy**

#### **Option 1: Using NPM**
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Serve static files (for testing)
npx serve -s build -l 3000
```

#### **Option 2: Using Docker**
```bash
# Build Docker image
docker build -t ideafactory-frontend .

# Run container
docker run -p 3000:3000 --env-file .env ideafactory-frontend
```

#### **Option 3: Using Nginx (Recommended)**

1. **Build the application:**
   ```bash
   npm install
   npm run build
   ```

2. **Install Nginx:**
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

3. **Configure Nginx:**
   ```bash
   sudo nano /etc/nginx/sites-available/ideafactory-frontend
   ```

   **Nginx configuration:**
   ```nginx
   server {
       listen 80;
       server_name your-frontend-domain.com;
       
       root /var/www/ideafactory-frontend/build;
       index index.html;
       
       # Handle React Router
       location / {
           try_files $uri $uri/ /index.html;
       }
       
       # Cache static assets
       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
       
       # Security headers
       add_header X-Frame-Options "SAMEORIGIN" always;
       add_header X-XSS-Protection "1; mode=block" always;
       add_header X-Content-Type-Options "nosniff" always;
       add_header Referrer-Policy "no-referrer-when-downgrade" always;
       add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
   }
   ```

4. **Enable the site:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/ideafactory-frontend /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

5. **Copy build files:**
   ```bash
   sudo mkdir -p /var/www/ideafactory-frontend
   sudo cp -r build/* /var/www/ideafactory-frontend/
   sudo chown -R www-data:www-data /var/www/ideafactory-frontend
   ```

### **🔒 SSL/TLS Setup**

1. **Install Certbot:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

2. **Obtain SSL certificate:**
   ```bash
   sudo certbot --nginx -d your-frontend-domain.com
   ```

3. **Auto-renewal:**
   ```bash
   sudo crontab -e
   # Add this line:
   0 12 * * * /usr/bin/certbot renew --quiet
   ```

### **📊 Monitoring & Logs**

1. **Check Nginx status:**
   ```bash
   sudo systemctl status nginx
   ```

2. **View Nginx logs:**
   ```bash
   sudo tail -f /var/log/nginx/access.log
   sudo tail -f /var/log/nginx/error.log
   ```

3. **Check application health:**
   ```bash
   curl -I http://localhost
   ```

### **🔄 Update Process**

1. **Build new version:**
   ```bash
   git pull origin main
   npm install
   npm run build
   ```

2. **Deploy to server:**
   ```bash
   sudo cp -r build/* /var/www/ideafactory-frontend/
   sudo chown -R www-data:www-data /var/www/ideafactory-frontend
   ```

3. **Reload Nginx:**
   ```bash
   sudo systemctl reload nginx
   ```

### **🔍 Troubleshooting**

1. **Build fails:**
   - Check Node.js version: `node --version`
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`

2. **Nginx issues:**
   - Check configuration: `sudo nginx -t`
   - Check error logs: `sudo tail -f /var/log/nginx/error.log`
   - Verify file permissions: `ls -la /var/www/ideafactory-frontend/`

3. **CORS issues:**
   - Verify backend CORS configuration includes your frontend domain
   - Check browser console for CORS errors

### **📈 Performance Optimization**

1. **Enable Gzip compression:**
   ```nginx
   # Add to Nginx config
   gzip on;
   gzip_vary on;
   gzip_min_length 1024;
   gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
   ```

2. **Browser caching:**
   ```nginx
   # Add to Nginx config
   location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
       expires 1y;
       add_header Cache-Control "public, immutable";
   }
   ```

3. **CDN Setup:**
   - Consider using Cloudflare or AWS CloudFront
   - Configure CDN to cache static assets

### **🛡️ Security Configuration**

1. **Firewall setup:**
   ```bash
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw allow 22/tcp
   sudo ufw enable
   ```

2. **Security headers (already in Nginx config):**
   - X-Frame-Options
   - X-XSS-Protection
   - X-Content-Type-Options
   - Content-Security-Policy

### **📞 Support**

For deployment issues, check:
- Nginx logs: `sudo tail -f /var/log/nginx/error.log`
- Application logs: Check browser console
- System logs: `sudo journalctl -xe` 