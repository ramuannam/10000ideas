# ===========================================
# DATABASE DEPLOYMENT GUIDE
# ===========================================

## 🚀 **Database Server Deployment**

This guide covers deploying PostgreSQL database server for the IdeaFactory application.

### **📋 Prerequisites**

- **Ubuntu 20.04+** or **CentOS 8+** server
- **Root/sudo access** to the server
- **Domain name** (optional, for SSL)
- **Backup storage** location

### **🔧 PostgreSQL Installation**

#### **Ubuntu/Debian:**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Start and enable PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### **CentOS/RHEL:**
```bash
# Install PostgreSQL
sudo yum install postgresql-server postgresql-contrib -y

# Initialize database
sudo postgresql-setup initdb

# Start and enable PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### **🔧 Environment Setup**

1. **Copy environment template:**
   ```bash
   cp env.production .env
   ```

2. **Update `.env` with your production values:**
   ```bash
   # Database Configuration
   POSTGRES_DB=ideafactory_db
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=your_secure_password
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   ```

### **🔧 Database Configuration**

1. **Switch to postgres user:**
   ```bash
   sudo -u postgres psql
   ```

2. **Create database and user:**
   ```sql
   -- Create database
   CREATE DATABASE ideafactory_db;
   
   -- Create user (optional, can use postgres user)
   CREATE USER ideafactory_user WITH PASSWORD 'your_secure_password';
   
   -- Grant privileges
   GRANT ALL PRIVILEGES ON DATABASE ideafactory_db TO ideafactory_user;
   
   -- Exit psql
   \q
   ```

3. **Configure PostgreSQL for remote connections:**
   ```bash
   # Edit postgresql.conf
   sudo nano /etc/postgresql/*/main/postgresql.conf
   ```

   **Add/modify these lines:**
   ```conf
   listen_addresses = '*'
   port = 5432
   max_connections = 100
   shared_buffers = 256MB
   effective_cache_size = 1GB
   ```

4. **Configure pg_hba.conf for authentication:**
   ```bash
   sudo nano /etc/postgresql/*/main/pg_hba.conf
   ```

   **Add these lines:**
   ```conf
   # Allow connections from backend server
   host    ideafactory_db    postgres    your-backend-server-ip/32    md5
   host    ideafactory_db    ideafactory_user    your-backend-server-ip/32    md5
   ```

5. **Restart PostgreSQL:**
   ```bash
   sudo systemctl restart postgresql
   ```

### **🗄️ Database Initialization**

1. **Run initialization script:**
   ```bash
   # Connect to database
   sudo -u postgres psql ideafactory_db
   
   # Run init.sql
   \i /path/to/init.sql
   
   # Exit
   \q
   ```

2. **Verify tables created:**
   ```bash
   sudo -u postgres psql ideafactory_db -c "\dt"
   ```

### **🔒 Security Configuration**

1. **Firewall setup:**
   ```bash
   # Allow PostgreSQL port
   sudo ufw allow 5432/tcp
   
   # Allow SSH
   sudo ufw allow 22/tcp
   
   # Enable firewall
   sudo ufw enable
   ```

2. **SSL/TLS Setup:**
   ```bash
   # Generate SSL certificate
   sudo openssl req -new -x509 -days 365 -nodes -text -out server.crt -keyout server.key -subj "/CN=your-db-server.com"
   
   # Move certificates
   sudo cp server.crt /etc/ssl/certs/
   sudo cp server.key /etc/ssl/private/
   sudo chmod 600 /etc/ssl/private/server.key
   ```

3. **Update postgresql.conf for SSL:**
   ```conf
   ssl = on
   ssl_cert_file = '/etc/ssl/certs/server.crt'
   ssl_key_file = '/etc/ssl/private/server.key'
   ```

### **📊 Monitoring & Logs**

1. **Check PostgreSQL status:**
   ```bash
   sudo systemctl status postgresql
   ```

2. **View PostgreSQL logs:**
   ```bash
   sudo tail -f /var/log/postgresql/postgresql-*.log
   ```

3. **Monitor connections:**
   ```bash
   sudo -u postgres psql -c "SELECT count(*) FROM pg_stat_activity;"
   ```

### **🛡️ Backup Strategy**

1. **Create backup script:**
   ```bash
   sudo nano /opt/backup-db.sh
   ```

   **Backup script content:**
   ```bash
   #!/bin/bash
   BACKUP_DIR="/var/backups/postgresql"
   DATE=$(date +%Y%m%d_%H%M%S)
   DB_NAME="ideafactory_db"
   
   # Create backup directory
   mkdir -p $BACKUP_DIR
   
   # Create backup
   sudo -u postgres pg_dump $DB_NAME > $BACKUP_DIR/${DB_NAME}_${DATE}.sql
   
   # Compress backup
   gzip $BACKUP_DIR/${DB_NAME}_${DATE}.sql
   
   # Remove old backups (keep last 30 days)
   find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete
   
   echo "Backup completed: ${DB_NAME}_${DATE}.sql.gz"
   ```

2. **Make script executable:**
   ```bash
   sudo chmod +x /opt/backup-db.sh
   ```

3. **Setup cron job for automatic backups:**
   ```bash
   sudo crontab -e
   # Add this line for daily backups at 2 AM:
   0 2 * * * /opt/backup-db.sh
   ```

### **📈 Performance Optimization**

1. **Memory optimization:**
   ```conf
   # Add to postgresql.conf
   shared_buffers = 256MB
   effective_cache_size = 1GB
   work_mem = 4MB
   maintenance_work_mem = 64MB
   ```

2. **Connection pooling:**
   ```bash
   # Install PgBouncer for connection pooling
   sudo apt install pgbouncer
   ```

3. **Regular maintenance:**
   ```bash
   # Create maintenance script
   sudo nano /opt/maintenance.sh
   ```

   **Maintenance script:**
   ```bash
   #!/bin/bash
   DB_NAME="ideafactory_db"
   
   # Vacuum and analyze
   sudo -u postgres psql $DB_NAME -c "VACUUM ANALYZE;"
   
   # Reindex
   sudo -u postgres psql $DB_NAME -c "REINDEX DATABASE $DB_NAME;"
   ```

### **🔄 Update Process**

1. **Backup before updates:**
   ```bash
   /opt/backup-db.sh
   ```

2. **Update PostgreSQL:**
   ```bash
   sudo apt update
   sudo apt upgrade postgresql postgresql-contrib
   sudo systemctl restart postgresql
   ```

3. **Verify database integrity:**
   ```bash
   sudo -u postgres psql ideafactory_db -c "SELECT version();"
   ```

### **🔍 Troubleshooting**

1. **Connection issues:**
   - Check PostgreSQL status: `sudo systemctl status postgresql`
   - Verify port is listening: `sudo netstat -tlnp | grep 5432`
   - Check firewall: `sudo ufw status`

2. **Authentication issues:**
   - Check pg_hba.conf configuration
   - Verify user permissions: `sudo -u postgres psql -c "\du"`

3. **Performance issues:**
   - Check slow queries: `sudo -u postgres psql -c "SELECT * FROM pg_stat_activity WHERE state = 'active';"`
   - Monitor disk usage: `df -h`

### **📞 Support**

For database issues, check:
- PostgreSQL logs: `sudo tail -f /var/log/postgresql/postgresql-*.log`
- System logs: `sudo journalctl -xe`
- Connection logs: `sudo tail -f /var/log/postgresql/postgresql-*.log | grep "connection"` 