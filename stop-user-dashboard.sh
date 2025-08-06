#!/bin/bash

# Stop User Dashboard Script
# This script stops the backend and frontend servers

echo "🛑 Stopping User Dashboard servers..."

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

# Stop backend
stop_backend() {
    print_status "Stopping backend server..."
    
    if [ -f "backend.pid" ]; then
        BACKEND_PID=$(cat backend.pid)
        if kill -0 $BACKEND_PID 2>/dev/null; then
            kill $BACKEND_PID
            print_success "Backend server stopped (PID: $BACKEND_PID)"
        else
            print_warning "Backend server was not running"
        fi
        rm -f backend.pid
    else
        print_warning "Backend PID file not found"
    fi
    
    # Kill any remaining Java processes on port 8080
    PORT_8080_PID=$(lsof -ti:8080 2>/dev/null)
    if [ ! -z "$PORT_8080_PID" ]; then
        kill -9 $PORT_8080_PID
        print_success "Killed process on port 8080 (PID: $PORT_8080_PID)"
    fi
}

# Stop frontend
stop_frontend() {
    print_status "Stopping frontend server..."
    
    if [ -f "frontend.pid" ]; then
        FRONTEND_PID=$(cat frontend.pid)
        if kill -0 $FRONTEND_PID 2>/dev/null; then
            kill $FRONTEND_PID
            print_success "Frontend server stopped (PID: $FRONTEND_PID)"
        else
            print_warning "Frontend server was not running"
        fi
        rm -f frontend.pid
    else
        print_warning "Frontend PID file not found"
    fi
    
    # Kill any remaining Node processes on port 3000
    PORT_3000_PID=$(lsof -ti:3000 2>/dev/null)
    if [ ! -z "$PORT_3000_PID" ]; then
        kill -9 $PORT_3000_PID
        print_success "Killed process on port 3000 (PID: $PORT_3000_PID)"
    fi
}

# Clean up log files
cleanup_logs() {
    print_status "Cleaning up log files..."
    
    if [ -f "backend.log" ]; then
        rm backend.log
        print_success "Removed backend.log"
    fi
    
    if [ -f "frontend.log" ]; then
        rm frontend.log
        print_success "Removed frontend.log"
    fi
}

# Main execution
main() {
    print_status "Starting shutdown process..."
    
    stop_backend
    stop_frontend
    cleanup_logs
    
    print_success "🎉 All servers stopped successfully!"
    echo ""
    echo "📋 Cleanup Summary:"
    echo "   • Backend server stopped"
    echo "   • Frontend server stopped"
    echo "   • Log files cleaned up"
    echo ""
    echo "🔄 To restart the system:"
    echo "   ./setup-user-dashboard.sh"
}

# Run main function
main "$@" 