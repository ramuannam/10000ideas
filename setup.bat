@echo off
echo 🚀 Setting up 10000Ideas MVP...

REM Check if Java is installed
java -version >nul 2>&1
if errorlevel 1 (
    echo ❌ Java is not installed. Please install Java 17 or later.
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 16 or later.
    pause
    exit /b 1
)

REM Check if Maven is installed
mvn --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Maven is not installed. Please install Maven.
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed!

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
mvn clean install -DskipTests
cd ..

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd frontend
npm install
cd ..

echo ✅ Setup complete!
echo.
echo 🎉 To run the application:
echo 1. Start the backend: cd backend ^&^& mvn spring-boot:run
echo 2. Start the frontend: cd frontend ^&^& npm start
echo.
echo 🌐 The application will be available at:
echo    Frontend: http://localhost:3000
echo    Backend API: http://localhost:8080
echo    H2 Database Console: http://localhost:8080/h2-console
echo.
echo 🐳 Or use Docker: docker-compose up --build
pause 