# ===========================================
# MASTER DEPLOYMENT GUIDE
# ===========================================

## 🚀 **IdeaFactory Multi-Server Deployment**

This guide covers deploying the IdeaFactory application across three separate servers:
1. **Database Server** - PostgreSQL database
2. **Backend Server** - Spring Boot API
3. **Frontend Server** - React application

### **📋 Architecture Overview**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │    Database     │
│   Server        │◄──►│    Server       │◄──►│    Server       │
│   (React)       │    │   (Spring Boot) │    │  (PostgreSQL)   │
│   Port: 80/443  │    │   Port: 8080    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **🔧 Prerequisites**

- **3 separate servers** (or VMs/containers)
- **Domain names** for each server
- **SSL certificates** for HTTPS
- **Firewall access** between servers
- **Root/sudo access** on all servers

### **📅 Deployment Order**

1. **Database Server** (First)
2. **Backend Server** (Second)
3. **Frontend Server** (Last)

### **🔗 Server Communication**

| From Server | To Server | Port | Protocol | Purpose |
|-------------|-----------|------|----------|---------|
| Frontend | Backend | 8080 | HTTPS | API calls |
| Backend | Database | 5432 | TCP | Database queries |
| Admin | Backend | 8080 | HTTPS | Admin panel |

## 🗄️ **Step 1: Database Server Deployment**

### **Server Requirements:**
- **OS:** Ubuntu 20.04+ or CentOS 8+
- **RAM:** 2GB+ (4GB recommended)
- **Storage:** 20GB+ SSD
- **Network:** Stable internet connection

### **Deployment Steps:**

1. **Follow the database deployment guide:**
   ```bash
   # Navigate to database folder
   cd database/
   
   # Follow DEPLOYMENT.md instructions
   cat DEPLOYMENT.md
   ```

2. **Key configuration points:**
   - Update `env.example` with your database credentials
   - Configure PostgreSQL for remote connections
   - Set up SSL certificates
   - Configure firewall rules

3. **Test database connectivity:**
   ```bash
   # From backend server, test connection
   psql -h your-db-server -U postgres -d ideafactory_db
   ```

## ⚙️ **Step 2: Backend Server Deployment**

### **Server Requirements:**
- **OS:** Ubuntu 20.04+ or CentOS 8+
- **RAM:** 2GB+ (4GB recommended)
- **Storage:** 10GB+ SSD
- **Java:** OpenJDK 17+
- **Network:** Access to database server

### **Deployment Steps:**

1. **Follow the backend deployment guide:**
   ```bash
   # Navigate to backend folder
   cd backend/
   
   # Follow DEPLOYMENT.md instructions
   cat DEPLOYMENT.md
   ```

2. **Key configuration points:**
   - Update `env.example` with your database server details
   - Configure CORS for your frontend domain
   - Set up SSL certificates
   - Configure firewall rules

3. **Test backend connectivity:**
   ```bash
   # Test API health
   curl https://your-backend-domain.com/api/ideas
   
   # Test admin endpoint
   curl https://your-backend-domain.com/admin/ideas
   ```

## 🌐 **Step 3: Frontend Server Deployment**

### **Server Requirements:**
- **OS:** Ubuntu 20.04+ or CentOS 8+
- **RAM:** 1GB+ (2GB recommended)
- **Storage:** 5GB+ SSD
- **Node.js:** 16+
- **Nginx:** For serving static files
- **Network:** Access to backend server

### **Deployment Steps:**

1. **Follow the frontend deployment guide:**
   ```bash
   # Navigate to frontend folder
   cd frontend/
   
   # Follow DEPLOYMENT.md instructions
   cat DEPLOYMENT.md
   ```

2. **Key configuration points:**
   - Update `env.example` with your backend API URLs
   - Configure Nginx for React Router
   - Set up SSL certificates
   - Configure firewall rules

3. **Test frontend connectivity:**
   ```bash
   # Test frontend loads
   curl -I https://your-frontend-domain.com
   
   # Check in browser
   open https://your-frontend-domain.com
   ```

## 🔒 **Security Configuration**

### **Network Security:**

1. **Firewall Rules:**
   ```bash
   # Database Server
   sudo ufw allow 22/tcp    # SSH
   sudo ufw allow 5432/tcp  # PostgreSQL
   
   # Backend Server
   sudo ufw allow 22/tcp    # SSH
   sudo ufw allow 80/tcp    # HTTP
   sudo ufw allow 443/tcp   # HTTPS
   sudo ufw allow 8080/tcp  # Backend API
   
   # Frontend Server
   sudo ufw allow 22/tcp    # SSH
   sudo ufw allow 80/tcp    # HTTP
   sudo ufw allow 443/tcp   # HTTPS
   ```

2. **SSL/TLS Setup:**
   ```bash
   # Install Certbot on each server
   sudo apt install certbot python3-certbot-nginx
   
   # Obtain certificates
   sudo certbot --nginx -d your-domain.com
   ```

### **Application Security:**

1. **Environment Variables:**
   - Use strong passwords
   - Change default JWT secrets
   - Use environment-specific configurations

2. **Database Security:**
   - Use SSL connections
   - Implement connection pooling
   - Regular backups

## 📊 **Monitoring & Health Checks**

### **Health Check Endpoints:**

1. **Database:**
   ```bash
   # Check PostgreSQL status
   sudo systemctl status postgresql
   
   # Test connection
   psql -h localhost -U postgres -d ideafactory_db -c "SELECT 1;"
   ```

2. **Backend:**
   ```bash
   # Health check
   curl https://your-backend-domain.com/actuator/health
   
   # API test
   curl https://your-backend-domain.com/api/ideas
   ```

3. **Frontend:**
   ```bash
   # Check Nginx status
   sudo systemctl status nginx
   
   # Test frontend
   curl -I https://your-frontend-domain.com
   ```

### **Log Monitoring:**

1. **Database logs:**
   ```bash
   sudo tail -f /var/log/postgresql/postgresql-*.log
   ```

2. **Backend logs:**
   ```bash
   sudo journalctl -u ideafactory-backend -f
   ```

3. **Frontend logs:**
   ```bash
   sudo tail -f /var/log/nginx/access.log
   sudo tail -f /var/log/nginx/error.log
   ```

## 🔄 **Update Process**

### **Database Updates:**
```bash
# Backup first
/opt/backup-db.sh

# Update PostgreSQL
sudo apt update && sudo apt upgrade postgresql

# Restart service
sudo systemctl restart postgresql
```

### **Backend Updates:**
```bash
# Stop service
sudo systemctl stop ideafactory-backend

# Update code
git pull origin main
./mvnw clean package -DskipTests

# Start service
sudo systemctl start ideafactory-backend
```

### **Frontend Updates:**
```bash
# Update code
git pull origin main

# Build new version
npm install
npm run build

# Deploy
sudo cp -r build/* /var/www/ideafactory-frontend/
sudo systemctl reload nginx
```

## 🛡️ **Backup Strategy**

### **Database Backups:**
```bash
# Automated daily backups
0 2 * * * /opt/backup-db.sh

# Manual backup
pg_dump -h your-db-server -U postgres ideafactory_db > backup.sql
```

### **Application Backups:**
```bash
# Backup configuration files
tar -czf config-backup-$(date +%Y%m%d).tar.gz /opt/ideafactory/*/.env

# Backup build artifacts
tar -czf builds-backup-$(date +%Y%m%d).tar.gz /opt/ideafactory/*/target/
```

## 🔍 **Troubleshooting**

### **Common Issues:**

1. **CORS Errors:**
   - Verify backend CORS configuration includes frontend domain
   - Check browser console for specific CORS errors

2. **Database Connection Issues:**
   - Verify PostgreSQL is running
   - Check firewall rules
   - Test connection manually

3. **SSL Certificate Issues:**
   - Check certificate expiration
   - Verify domain configuration
   - Test with `openssl s_client`

### **Debug Commands:**

```bash
# Check service status
sudo systemctl status postgresql
sudo systemctl status ideafactory-backend
sudo systemctl status nginx

# Check ports
sudo netstat -tlnp | grep -E ':(5432|8080|80|443)'

# Check logs
sudo journalctl -xe
```

## 📞 **Support & Maintenance**

### **Regular Maintenance:**

1. **Weekly:**
   - Check service status
   - Review error logs
   - Monitor disk usage

2. **Monthly:**
   - Update system packages
   - Review security logs
   - Test backup restoration

3. **Quarterly:**
   - Security audit
   - Performance review
   - SSL certificate renewal

### **Emergency Procedures:**

1. **Database down:**
   - Check PostgreSQL status
   - Review error logs
   - Restore from backup if needed

2. **Backend down:**
   - Check Java process
   - Review application logs
   - Restart service

3. **Frontend down:**
   - Check Nginx status
   - Verify file permissions
   - Check SSL certificates

## 📋 **Deployment Checklist**

- [ ] Database server configured and running
- [ ] Backend server configured and connected to database
- [ ] Frontend server configured and connected to backend
- [ ] SSL certificates installed on all servers
- [ ] Firewall rules configured
- [ ] Health checks passing
- [ ] Backup procedures tested
- [ ] Monitoring configured
- [ ] Documentation updated

## 🎯 **Next Steps**

After successful deployment:

1. **Test all functionality:**
   - User registration/login
   - Idea submission
   - Admin panel access
   - Bulk upload features

2. **Set up monitoring:**
   - Application performance monitoring
   - Error tracking
   - Uptime monitoring

3. **Security audit:**
   - Penetration testing
   - Vulnerability scanning
   - Security headers verification

4. **Performance optimization:**
   - Database query optimization
   - CDN setup
   - Caching strategies 