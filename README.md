# 10000Ideas - Idea Showcase Platform

A fullstack MVP application for showcasing innovative ideas across different industries and sectors.

## Features

- **Idea Cards**: Pinterest-style card layout for easy browsing
- **Comprehensive Idea Details**: Investment needs, expertise requirements, training, resources, success examples
- **Advanced Filtering**: Filter by industry, sector, investment level, target audience
- **Special Advantages**: Highlight opportunities for specific groups (women, rural people, specially abled, etc.)
- **Government Support**: Information about subsidies, bank assistance, funding options
- **Responsive Design**: Modern UI/UX optimized for all devices

## Tech Stack

- **Frontend**: React.js with TypeScript
- **Backend**: Spring Boot with Java
- **Database**: H2 (for MVP, can be upgraded to PostgreSQL/MySQL)
- **Styling**: Tailwind CSS
- **Icons**: React Icons

## Project Structure

```
ideaFactory/
├── frontend/          # React application
├── backend/           # Spring Boot application
├── README.md         # This file
└── docker-compose.yml # For easy deployment
```

## Quick Start

### Prerequisites
- Node.js (v16+)
- Java 17+
- Maven

### Backend Setup
```bash
cd backend
mvn spring-boot:run
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080

## API Endpoints

- `GET /api/ideas` - Get all ideas with filtering
- `GET /api/ideas/{id}` - Get specific idea details
- `GET /api/categories` - Get all categories/sectors
- `GET /api/filters` - Get available filters

## Idea Categories

- Business Ideas
- Manufacturing Ideas
- Service Ideas
- Unicorn Ideas
- Emerging Tech Ideas
- Ideas for Women
- Rural Development Ideas
- Middle Class Opportunities
- Lower Middle Class Opportunities 