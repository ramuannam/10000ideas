#!/bin/bash

# User Dashboard Setup Script
# This script sets up the complete user dashboard system with authentication

echo "🚀 Setting up User Dashboard System..."

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
        print_error "MySQL is not running or not accessible"
        return 1
    fi
}

# Setup database
setup_database() {
    print_status "Setting up database tables..."
    
    if [ -f "database/migrations/user_dashboard_tables.sql" ]; then
        mysql -u root -p < database/migrations/user_dashboard_tables.sql
        if [ $? -eq 0 ]; then
            print_success "Database tables created successfully"
        else
            print_error "Failed to create database tables"
            exit 1
        fi
    else
        print_error "Database migration file not found"
        exit 1
    fi
}

# Build and start backend
setup_backend() {
    print_status "Building and starting backend..."
    
    cd backend
    
    # Clean and compile
    print_status "Compiling backend..."
    mvn clean compile
    if [ $? -ne 0 ]; then
        print_error "Backend compilation failed"
        exit 1
    fi
    
    # Start backend in background
    print_status "Starting backend server..."
    mvn spring-boot:run > ../backend.log 2>&1 &
    BACKEND_PID=$!
    echo $BACKEND_PID > ../backend.pid
    
    # Wait for backend to start
    print_status "Waiting for backend to start..."
    sleep 30
    
    # Check if backend is running
    if curl -s http://localhost:8080/actuator/health >/dev/null; then
        print_success "Backend is running on http://localhost:8080"
    else
        print_error "Backend failed to start"
        exit 1
    fi
    
    cd ..
}

# Setup frontend
setup_frontend() {
    print_status "Setting up frontend..."
    
    cd frontend
    
    # Install dependencies
    print_status "Installing frontend dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        print_error "Frontend dependency installation failed"
        exit 1
    fi
    
    # Start frontend in background
    print_status "Starting frontend development server..."
    npm start > ../frontend.log 2>&1 &
    FRONTEND_PID=$!
    echo $FRONTEND_PID > ../frontend.pid
    
    # Wait for frontend to start
    print_status "Waiting for frontend to start..."
    sleep 30
    
    # Check if frontend is running
    if curl -s http://localhost:3000 >/dev/null; then
        print_success "Frontend is running on http://localhost:3000"
    else
        print_error "Frontend failed to start"
        exit 1
    fi
    
    cd ..
}

# Test the system
test_system() {
    print_status "Testing the system..."
    
    # Test backend API
    print_status "Testing backend API..."
    if curl -s http://localhost:8080/api/users/profile >/dev/null; then
        print_success "Backend API is accessible"
    else
        print_warning "Backend API test failed (this might be expected for protected endpoints)"
    fi
    
    # Test frontend
    print_status "Testing frontend..."
    if curl -s http://localhost:3000 >/dev/null; then
        print_success "Frontend is accessible"
    else
        print_error "Frontend is not accessible"
        exit 1
    fi
}

# Main execution
main() {
    print_status "Starting User Dashboard setup..."
    
    # Check MySQL
    if ! check_mysql; then
        print_error "Please start MySQL and try again"
        exit 1
    fi
    
    # Setup database
    setup_database
    
    # Setup backend
    setup_backend
    
    # Setup frontend
    setup_frontend
    
    # Test system
    test_system
    
    print_success "🎉 User Dashboard setup completed successfully!"
    echo ""
    echo "📋 System Information:"
    echo "   • Backend: http://localhost:8080"
    echo "   • Frontend: http://localhost:3000"
    echo "   • Dashboard: http://localhost:3000/dashboard"
    echo ""
    echo "🔐 Test Accounts:"
    echo "   • Email: john@example.com, Password: password"
    echo "   • Email: jane@example.com, Password: password"
    echo "   • Email: admin@example.com, Password: password"
    echo ""
    echo "📝 Next Steps:"
    echo "   1. Open http://localhost:3000 in your browser"
    echo "   2. Click 'Sign In / Sign Up' to test authentication"
    echo "   3. After login, click the profile icon to access the dashboard"
    echo "   4. Explore all dashboard sections: Profile, Saved Ideas, Reviews, etc."
    echo ""
    echo "🛠️  To stop the servers:"
    echo "   ./stop-user-dashboard.sh"
}

# Run main function
main "$@" 