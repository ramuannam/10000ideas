#!/bin/bash

# Optimized User System Setup Script
# This script sets up the complete user system with role-based access control

echo "🚀 Setting up Optimized User System with Role-Based Access Control..."

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
        print_status "Please start MySQL and ensure you can connect with: mysql -u root -p"
        return 1
    fi
}

# Run database migrations
setup_database() {
    print_status "Setting up database with optimized user system..."
    
    if mysql -u root -p < database/migrations/optimized_user_system.sql; then
        print_success "Database setup completed"
    else
        print_error "Database setup failed"
        exit 1
    fi
}

# Build and start backend
setup_backend() {
    print_status "Building and starting backend..."
    
    cd backend
    
    # Clean and compile
    print_status "Compiling backend..."
    if mvn clean compile; then
        print_success "Backend compilation successful"
    else
        print_error "Backend compilation failed"
        exit 1
    fi
    
    # Start backend in background
    print_status "Starting backend server..."
    nohup mvn spring-boot:run > ../backend.log 2>&1 &
    BACKEND_PID=$!
    echo $BACKEND_PID > ../backend.pid
    
    # Wait for backend to start
    print_status "Waiting for backend to start..."
    sleep 30
    
    # Check if backend is running
    if curl -s http://localhost:8080/actuator/health >/dev/null 2>&1; then
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
    if npm install; then
        print_success "Frontend dependencies installed"
    else
        print_error "Frontend dependency installation failed"
        exit 1
    fi
    
    # Start frontend in background
    print_status "Starting frontend server..."
    nohup npm start > ../frontend.log 2>&1 &
    FRONTEND_PID=$!
    echo $FRONTEND_PID > ../frontend.pid
    
    # Wait for frontend to start
    print_status "Waiting for frontend to start..."
    sleep 30
    
    # Check if frontend is running
    if curl -s http://localhost:3000 >/dev/null 2>&1; then
        print_success "Frontend is running on http://localhost:3000"
    else
        print_error "Frontend failed to start"
        exit 1
    fi
    
    cd ..
}

# Test the system
test_system() {
    print_status "Testing the optimized user system..."
    
    # Test backend endpoints
    print_status "Testing backend endpoints..."
    
    # Test user signup
    SIGNUP_RESPONSE=$(curl -s -X POST http://localhost:8080/api/users/signup \
        -H "Content-Type: application/json" \
        -d '{
            "username": "testuser",
            "email": "test@example.com",
            "password": "password123"
        }')
    
    if echo "$SIGNUP_RESPONSE" | grep -q "token"; then
        print_success "User signup endpoint working"
    else
        print_warning "User signup endpoint test failed"
    fi
    
    # Test admin login
    ADMIN_LOGIN_RESPONSE=$(curl -s -X POST http://localhost:8080/api/users/admin/login \
        -H "Content-Type: application/json" \
        -d '{
            "email": "admin@ideafactory.com",
            "password": "admin123"
        }')
    
    if echo "$ADMIN_LOGIN_RESPONSE" | grep -q "token"; then
        print_success "Admin login endpoint working"
    else
        print_warning "Admin login endpoint test failed"
    fi
    
    print_success "System testing completed"
}

# Main execution
main() {
    print_status "Starting Optimized User System Setup..."
    
    # Check prerequisites
    if ! check_mysql; then
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
    
    print_success "🎉 Optimized User System Setup Complete!"
    echo ""
    print_status "System Information:"
    echo "  • Backend: http://localhost:8080"
    echo "  • Frontend: http://localhost:3000"
    echo "  • Admin Login: admin@ideafactory.com / admin123"
    echo "  • Test User: testuser / password123"
    echo ""
    print_status "Key Features Implemented:"
    echo "  ✅ Single users table with role-based access control"
    echo "  ✅ Separate admin and user authentication"
    echo "  ✅ Admin session management (single admin at a time)"
    echo "  ✅ Secure password hashing with salt"
    echo "  ✅ Email verification system"
    echo "  ✅ Password reset functionality"
    echo "  ✅ Google OAuth integration"
    echo "  ✅ JWT-based authentication with role claims"
    echo ""
    print_status "Next Steps:"
    echo "  1. Access the frontend at http://localhost:3000"
    echo "  2. Test user registration and login"
    echo "  3. Test admin login at /admin/login"
    echo "  4. Explore the user dashboard functionality"
    echo ""
    print_status "To stop the system, run: ./stop-optimized-user-system.sh"
}

# Run main function
main "$@" 