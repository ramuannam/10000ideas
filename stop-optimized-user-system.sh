#!/bin/bash

# Stop Optimized User System Script

echo "🛑 Stopping Optimized User System..."

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
    
    if [ -f backend.pid ]; then
        BACKEND_PID=$(cat backend.pid)
        if kill -0 $BACKEND_PID 2>/dev/null; then
            kill $BACKEND_PID
            print_success "Backend stopped (PID: $BACKEND_PID)"
        else
            print_warning "Backend process not found (PID: $BACKEND_PID)"
        fi
        rm -f backend.pid
    else
        print_warning "Backend PID file not found"
        # Try to kill any Java processes running on port 8080
        JAVA_PID=$(lsof -ti:8080 2>/dev/null)
        if [ ! -z "$JAVA_PID" ]; then
            kill $JAVA_PID
            print_success "Killed Java process on port 8080 (PID: $JAVA_PID)"
        fi
    fi
}

# Stop frontend
stop_frontend() {
    print_status "Stopping frontend server..."
    
    if [ -f frontend.pid ]; then
        FRONTEND_PID=$(cat frontend.pid)
        if kill -0 $FRONTEND_PID 2>/dev/null; then
            kill $FRONTEND_PID
            print_success "Frontend stopped (PID: $FRONTEND_PID)"
        else
            print_warning "Frontend process not found (PID: $FRONTEND_PID)"
        fi
        rm -f frontend.pid
    else
        print_warning "Frontend PID file not found"
        # Try to kill any Node processes running on port 3000
        NODE_PID=$(lsof -ti:3000 2>/dev/null)
        if [ ! -z "$NODE_PID" ]; then
            kill $NODE_PID
            print_success "Killed Node process on port 3000 (PID: $NODE_PID)"
        fi
    fi
}

# Clean up log files
cleanup_logs() {
    print_status "Cleaning up log files..."
    
    if [ -f backend.log ]; then
        rm backend.log
        print_success "Removed backend.log"
    fi
    
    if [ -f frontend.log ]; then
        rm frontend.log
        print_success "Removed frontend.log"
    fi
}

# Main execution
main() {
    print_status "Starting system shutdown..."
    
    # Stop backend
    stop_backend
    
    # Stop frontend
    stop_frontend
    
    # Clean up logs
    cleanup_logs
    
    print_success "🎉 Optimized User System stopped successfully!"
    echo ""
    print_status "System Status:"
    echo "  • Backend: Stopped"
    echo "  • Frontend: Stopped"
    echo "  • Log files: Cleaned up"
    echo ""
    print_status "To restart the system, run: ./setup-optimized-user-system.sh"
}

# Run main function
main "$@" 