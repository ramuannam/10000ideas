#!/bin/bash

# Setup script for Idea Details Features
# This script sets up the database and runs migrations for the new detailed idea pages

echo "🚀 Setting up Idea Details Features..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if MySQL is running
check_mysql() {
    print_status "Checking MySQL connection..."
    if mysql -u root -p -e "SELECT 1;" >/dev/null 2>&1; then
        print_success "MySQL is running"
        return 0
    else
        print_error "MySQL is not running or connection failed"
        return 1
    fi
}

# Create database if it doesn't exist
create_database() {
    print_status "Creating database if it doesn't exist..."
    
    # Read database name from application.properties
    DB_NAME=$(grep "spring.datasource.url" backend/src/main/resources/application.properties | sed 's/.*\/\([^?]*\).*/\1/')
    
    if [ -z "$DB_NAME" ]; then
        DB_NAME="ideafactory"
        print_warning "Could not read database name from application.properties, using default: $DB_NAME"
    fi
    
    mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
    
    if [ $? -eq 0 ]; then
        print_success "Database '$DB_NAME' is ready"
    else
        print_error "Failed to create database"
        exit 1
    fi
}

# Run database migrations
run_migrations() {
    print_status "Running database migrations..."
    
    # Run the migration script
    if mysql -u root -p ideafactory < database/migrations/idea_details_tables.sql; then
        print_success "Database migrations completed successfully"
    else
        print_error "Failed to run database migrations"
        exit 1
    fi
}

# Build and start backend
build_backend() {
    print_status "Building backend application..."
    
    cd backend
    
    # Check if Maven is installed
    if ! command -v mvn &> /dev/null; then
        print_error "Maven is not installed. Please install Maven first."
        exit 1
    fi
    
    # Clean and build
    mvn clean install -DskipTests
    
    if [ $? -eq 0 ]; then
        print_success "Backend built successfully"
    else
        print_error "Failed to build backend"
        exit 1
    fi
    
    cd ..
}

# Build and start frontend
build_frontend() {
    print_status "Building frontend application..."
    
    cd frontend
    
    # Check if Node.js is installed
    if ! command -v npm &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    
    # Install dependencies
    npm install
    
    if [ $? -eq 0 ]; then
        print_success "Frontend dependencies installed"
    else
        print_error "Failed to install frontend dependencies"
        exit 1
    fi
    
    cd ..
}

# Check system requirements
check_requirements() {
    print_status "Checking system requirements..."
    
    # Check Java
    if ! command -v java &> /dev/null; then
        print_error "Java is not installed. Please install Java 11 or higher."
        exit 1
    fi
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 14 or higher."
        exit 1
    fi
    
    # Check MySQL
    if ! command -v mysql &> /dev/null; then
        print_error "MySQL client is not installed. Please install MySQL client."
        exit 1
    fi
    
    print_success "All system requirements are met"
}

# Start applications
start_applications() {
    print_status "Starting applications..."
    
    # Start backend in background
    cd backend
    nohup mvn spring-boot:run > ../backend.log 2>&1 &
    BACKEND_PID=$!
    cd ..
    
    # Wait for backend to start
    print_status "Waiting for backend to start..."
    sleep 30
    
    # Check if backend is running
    if curl -s http://localhost:8080/api/ideas > /dev/null; then
        print_success "Backend is running on http://localhost:8080"
    else
        print_error "Backend failed to start"
        exit 1
    fi
    
    # Start frontend in background
    cd frontend
    nohup npm start > ../frontend.log 2>&1 &
    FRONTEND_PID=$!
    cd ..
    
    # Wait for frontend to start
    print_status "Waiting for frontend to start..."
    sleep 30
    
    # Check if frontend is running
    if curl -s http://localhost:3000 > /dev/null; then
        print_success "Frontend is running on http://localhost:3000"
    else
        print_error "Frontend failed to start"
        exit 1
    fi
    
    # Save PIDs for later cleanup
    echo $BACKEND_PID > backend.pid
    echo $FRONTEND_PID > frontend.pid
}

# Create sample data
create_sample_data() {
    print_status "Creating sample data..."
    
    # The sample data is already included in the migration script
    print_success "Sample data created"
}

# Display final information
show_final_info() {
    echo ""
    echo "🎉 Idea Details Features Setup Complete!"
    echo ""
    echo "📋 Summary:"
    echo "  ✅ Database created and migrated"
    echo "  ✅ Backend built and started"
    echo "  ✅ Frontend built and started"
    echo "  ✅ Sample data created"
    echo ""
    echo "🌐 Access your application:"
    echo "  Frontend: http://localhost:3000"
    echo "  Backend API: http://localhost:8080"
    echo ""
    echo "📚 New Features Available:"
    echo "  • Detailed idea pages with comprehensive information"
    echo "  • Internal factors (SWOT analysis)"
    echo "  • Investment breakdown and bank loans"
    echo "  • Government schemes and funding options"
    echo "  • Ratings and reviews system"
    echo "  • Admin panel for content management"
    echo ""
    echo "🔧 Admin Panel:"
    echo "  • Review moderation: http://localhost:3000/admin/dashboard"
    echo "  • Content management for schemes and loans"
    echo ""
    echo "📖 Documentation:"
    echo "  • See IDEA_DETAILS_FEATURES.md for complete documentation"
    echo ""
    echo "🛑 To stop the applications:"
    echo "  ./stop-applications.sh"
    echo ""
}

# Main execution
main() {
    echo "🚀 Starting Idea Details Features Setup..."
    echo ""
    
    check_requirements
    check_mysql
    create_database
    run_migrations
    build_backend
    build_frontend
    start_applications
    create_sample_data
    show_final_info
}

# Run main function
main "$@" 