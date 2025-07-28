#!/bin/bash

echo "🚀 Setting up 10000Ideas MVP..."

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Please install Java 17 or later."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16 or later."
    exit 1
fi

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven is not installed. Please install Maven."
    exit 1
fi

echo "✅ Prerequisites check passed!"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
mvn clean install -DskipTests
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo "✅ Setup complete!"
echo ""
echo "🎉 To run the application:"
echo "1. Start the backend: cd backend && mvn spring-boot:run"
echo "2. Start the frontend: cd frontend && npm start"
echo ""
echo "🌐 The application will be available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8080"
echo "   H2 Database Console: http://localhost:8080/h2-console"
echo ""
echo "🐳 Or use Docker: docker-compose up --build" 