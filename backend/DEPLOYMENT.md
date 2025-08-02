# ===========================================
# BACKEND DEPLOYMENT GUIDE
# ===========================================

## 🚀 **Backend Server Deployment**

This guide covers deploying the Spring Boot backend application to a production server.

### **📋 Prerequisites**

- **Java 17+** installed on the server
- **PostgreSQL** database server running
- **Maven** (optional, can use Maven wrapper)
- **Domain/SSL certificate** (for production)

### **🔧 Environment Setup**

1. **Copy environment template:**
   ```bash
   cp env.production .env
   ```

2. **Update `.env` with your production values:**
   ```bash
   # Database Configuration
   DATASOURCE_URL=jdbc:postgresql://your-db-server:5432/ideafactory_db
   DATASOURCE_USER=postgres
   DATASOURCE_PASSWORD=your_secure_password
   
   # CORS Configuration
   CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
   
   # Frontend URL
   FRONTEND_URL=https://your-frontend-domain.com
   
   # JWT Secret (CHANGE THIS!)
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

### **🏗️ Build & Deploy**

#### **Option 1: Using Maven Wrapper**
```bash
# Build the application
./mvnw clean package -DskipTests

# Run the application
java -jar target/10000ideas-0.0.1-SNAPSHOT.jar
```

#### **Option 2: Using Docker**
```bash
# Build Docker image
docker build -t ideafactory-backend .

# Run container
docker run -p 8080:8080 --env-file .env ideafactory-backend
```

#### **Option 3: Using Systemd Service**
```bash
# Create service file
sudo nano /etc/systemd/system/ideafactory-backend.service
```

**Service file content:**
```ini
[Unit]
Description=IdeaFactory Backend
After=network.target

[Service]
Type=simple
User=ideafactory
WorkingDirectory=/opt/ideafactory/backend
ExecStart=/usr/bin/java -jar target/10000ideas-0.0.1-SNAPSHOT.jar
EnvironmentFile=/opt/ideafactory/backend/.env
Restart=always

[Install]
WantedBy=multi-user.target
```

**Enable and start service:**
```bash
sudo systemctl daemon-reload
sudo systemctl enable ideafactory-backend
sudo systemctl start ideafactory-backend
```

### **🔒 Security Configuration**

1. **Firewall Setup:**
   ```bash
   # Allow only necessary ports
   sudo ufw allow 8080/tcp
   sudo ufw allow 22/tcp  # SSH
   ```

2. **SSL/TLS Setup:**
   ```bash
   # Install Nginx as reverse proxy
   sudo apt install nginx
   
   # Configure SSL with Let's Encrypt
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-backend-domain.com
   ```

### **📊 Monitoring & Logs**

1. **Check application status:**
   ```bash
   sudo systemctl status ideafactory-backend
   ```

2. **View logs:**
   ```bash
   sudo journalctl -u ideafactory-backend -f
   ```

3. **Health check endpoint:**
   ```bash
   curl http://localhost:8080/actuator/health
   ```

### **🔄 Update Process**

1. **Stop the service:**
   ```bash
   sudo systemctl stop ideafactory-backend
   ```

2. **Update application:**
   ```bash
   git pull origin main
   ./mvnw clean package -DskipTests
   ```

3. **Restart the service:**
   ```bash
   sudo systemctl start ideafactory-backend
   ```

### **🔍 Troubleshooting**

1. **Application won't start:**
   - Check Java version: `java -version`
   - Verify environment variables: `cat .env`
   - Check database connectivity

2. **Database connection issues:**
   - Verify PostgreSQL is running
   - Check database credentials
   - Test connection: `psql -h your-db-server -U postgres -d ideafactory_db`

3. **CORS issues:**
   - Verify `CORS_ALLOWED_ORIGINS` includes your frontend domain
   - Check browser console for CORS errors

### **📈 Performance Optimization**

1. **JVM Tuning:**
   ```bash
   # Add to startup command
   java -Xms512m -Xmx2g -jar target/10000ideas-0.0.1-SNAPSHOT.jar
   ```

2. **Database Connection Pool:**
   ```properties
   # Add to application.properties
   spring.datasource.hikari.maximum-pool-size=20
   spring.datasource.hikari.minimum-idle=5
   ```

### **🛡️ Backup Strategy**

1. **Database backups:**
   ```bash
   # Create backup script
   pg_dump -h your-db-server -U postgres ideafactory_db > backup_$(date +%Y%m%d).sql
   ```

2. **Application backups:**
   ```bash
   # Backup application files
   tar -czf ideafactory-backend-$(date +%Y%m%d).tar.gz /opt/ideafactory/backend
   ```

### **📞 Support**

For deployment issues, check:
- Application logs: `sudo journalctl -u ideafactory-backend -f`
- System logs: `sudo journalctl -xe`
- Database logs: `sudo tail -f /var/log/postgresql/postgresql-*.log` 