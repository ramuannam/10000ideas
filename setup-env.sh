#!/bin/bash

echo "🚀 Setting up environment files for production deployment..."

# Backend environment setup
echo "📦 Setting up backend environment..."
cd backend
if [ -f "env.production" ]; then
    cp env.production .env
    echo "✅ Backend .env file created"
else
    echo "❌ Backend env.production file not found"
fi
cd ..

# Frontend environment setup
echo "📦 Setting up frontend environment..."
cd frontend
if [ -f "env.production" ]; then
    cp env.production .env
    echo "✅ Frontend .env file created"
else
    echo "❌ Frontend env.production file not found"
fi
cd ..

# Database environment setup
echo "📦 Setting up database environment..."
cd database
if [ -f "env.production" ]; then
    cp env.production .env
    echo "✅ Database .env file created"
else
    echo "❌ Database env.production file not found"
fi
cd ..

echo "🎉 Environment setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Update the .env files with your actual production values"
echo "2. Follow the deployment guides in each component folder"
echo "3. Start with database, then backend, then frontend" 