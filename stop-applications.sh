#!/bin/bash

# Stop script for Idea Details Features
# This script stops the running backend and frontend applications

echo "🛑 Stopping Idea Details Features..."

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

# Stop backend application
stop_backend() {
    print_status "Stopping backend application..."
    
    if [ -f "backend.pid" ]; then
        BACKEND_PID=$(cat backend.pid)
        if kill -0 $BACKEND_PID 2>/dev/null; then
            kill $BACKEND_PID
            print_success "Backend stopped (PID: $BACKEND_PID)"
        else
            print_warning "Backend process not found"
        fi
        rm -f backend.pid
    else
        print_warning "Backend PID file not found"
    fi
    
    # Kill any remaining Java processes for the application
    pkill -f "spring-boot:run" 2>/dev/null
}

# Stop frontend application
stop_frontend() {
    print_status "Stopping frontend application..."
    
    if [ -f "frontend.pid" ]; then
        FRONTEND_PID=$(cat frontend.pid)
        if kill -0 $FRONTEND_PID 2>/dev/null; then
            kill $FRONTEND_PID
            print_success "Frontend stopped (PID: $FRONTEND_PID)"
        else
            print_warning "Frontend process not found"
        fi
        rm -f frontend.pid
    else
        print_warning "Frontend PID file not found"
    fi
    
    # Kill any remaining Node.js processes for the application
    pkill -f "react-scripts" 2>/dev/null
}

# Clean up log files
cleanup_logs() {
    print_status "Cleaning up log files..."
    
    if [ -f "backend.log" ]; then
        rm backend.log
        print_success "Backend log file removed"
    fi
    
    if [ -f "frontend.log" ]; then
        rm frontend.log
        print_success "Frontend log file removed"
    fi
}

# Main execution
main() {
    echo "🛑 Starting application shutdown..."
    echo ""
    
    stop_backend
    stop_frontend
    cleanup_logs
    
    echo ""
    echo "✅ Applications stopped successfully!"
    echo ""
    echo "📋 Summary:"
    echo "  ✅ Backend application stopped"
    echo "  ✅ Frontend application stopped"
    echo "  ✅ Log files cleaned up"
    echo ""
    echo "🔄 To restart the applications:"
    echo "  ./setup-idea-details.sh"
    echo ""
}

# Run main function
main "$@" 