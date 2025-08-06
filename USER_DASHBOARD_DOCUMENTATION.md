# User Dashboard System Documentation

## Overview

The User Dashboard is a comprehensive user management system that provides authentication, profile management, and personalized features for the Idea Factory platform. It includes a complete authentication flow with email and Google OAuth support, user profiles, saved ideas, reviews, rewards, and proposed ideas.

## 🏗️ Architecture

### Backend (Spring Boot)
- **Framework**: Spring Boot 3.x with Spring Security
- **Database**: MySQL with JPA/Hibernate
- **Authentication**: JWT-based with bcrypt password hashing
- **Email Service**: Configurable email service for verification and password reset

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: React Hooks
- **Icons**: React Icons

## 🔐 Authentication Flow

### 1. User Signup
```
Frontend → Backend → Database → Email Service
```

**Process:**
1. User fills signup form (name, email, password)
2. Frontend validates input and sends to `/api/users/signup`
3. Backend validates data and checks for existing email
4. Password is hashed using bcrypt with salt
5. User record is created in database
6. Verification token is generated and stored
7. Verification email is sent to user
8. JWT token is returned to frontend

**Security Features:**
- Password hashing with bcrypt
- Email verification required
- Unique email constraint
- JWT token expiration

### 2. User Login
```
Frontend → Backend → Database → JWT Token
```

**Process:**
1. User provides email and password
2. Backend retrieves user by email
3. Password is verified using bcrypt
4. JWT token is generated with user claims
5. Token is returned to frontend
6. Frontend stores token in localStorage

### 3. Google OAuth
```
Google OAuth → Frontend → Backend → Database
```

**Process:**
1. User clicks "Sign in with Google"
2. Google OAuth popup handles authentication
3. Google returns ID token to frontend
4. Frontend sends token to `/api/users/google-login`
5. Backend validates Google token
6. User is created or updated in database
7. JWT token is returned to frontend

### 4. Password Reset
```
Frontend → Backend → Email Service → Frontend
```

**Process:**
1. User requests password reset with email
2. Backend generates secure reset token (15 min expiry)
3. Reset email is sent with token link
4. User clicks link and enters new password
5. Backend validates token and updates password
6. Token is invalidated after use

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profile_picture_url VARCHAR(500),
    bio TEXT,
    phone_number VARCHAR(20),
    location VARCHAR(100),
    role ENUM('USER', 'PREMIUM_USER', 'ADMIN') DEFAULT 'USER',
    auth_provider ENUM('EMAIL', 'GOOGLE') DEFAULT 'EMAIL',
    google_id VARCHAR(255),
    email_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    verification_token VARCHAR(255),
    verification_token_expiry TIMESTAMP NULL,
    reset_password_token VARCHAR(255),
    reset_password_token_expiry TIMESTAMP NULL
);
```

### Related Tables
- **saved_ideas**: User's saved ideas with notes
- **user_reviews**: User reviews for ideas
- **user_rewards**: Badges, points, and achievements
- **proposed_ideas**: User-submitted ideas

## 🎨 Frontend Components

### 1. Header Integration
- Profile icon in top-right corner
- Redirects to `/dashboard` when clicked
- Shows user status and logout option

### 2. User Dashboard Layout
```
┌─────────────────────────────────────┐
│ Header with Profile Icon            │
├─────────────────────────────────────┤
│ Left Navigation │ Main Content      │
│ • Profile       │ • Profile Section │
│ • Saved Ideas   │ • Saved Ideas     │
│ • My Reviews    │ • Reviews         │
│ • Proposed      │ • Proposed Ideas  │
│ • Rewards       │ • Reward Shelf    │
│ • Settings      │ • Settings        │
│ • Logout        │                   │
└─────────────────────────────────────┘
```

### 3. Dashboard Sections

#### Profile Section
- **Editable Profile**: Name, bio, phone, location
- **Profile Picture**: Upload and display
- **Account Stats**: Member since, last login
- **Email Verification**: Status indicator

#### Saved Ideas Section
- **Grid Layout**: Card-based display
- **Search/Filter**: Find saved ideas quickly
- **Notes**: User can add personal notes
- **Remove Option**: Unsave ideas

#### Reviews Section
- **Rating Display**: Star ratings with comments
- **Idea Context**: Shows reviewed idea details
- **Date Tracking**: When review was posted
- **Edit/Delete**: Manage own reviews

#### Proposed Ideas Section
- **Status Tracking**: Pending, Approved, Rejected
- **Admin Notes**: Feedback from administrators
- **Submission History**: Track all proposals
- **New Proposal**: Link to submit idea form

#### Reward Shelf Section
- **Badge Display**: Visual achievement badges
- **Points System**: Gamification elements
- **Claim Rewards**: Interactive reward claiming
- **Progress Tracking**: Achievement milestones

#### Settings Section
- **Account Settings**: Email notifications, privacy
- **Security**: Password change, 2FA
- **Danger Zone**: Account deletion

## 🔧 API Endpoints

### Authentication
```
POST /api/users/signup          - User registration
POST /api/users/login           - User login
POST /api/users/google-login    - Google OAuth login
POST /api/users/forgot-password - Password reset request
POST /api/users/reset-password  - Password reset
POST /api/users/verify-email    - Email verification
```

### Profile Management
```
GET  /api/users/profile         - Get user profile
PUT  /api/users/profile         - Update user profile
```

### Dashboard Data
```
GET  /api/users/saved-ideas     - Get saved ideas
POST /api/users/save-idea       - Save an idea
DELETE /api/users/saved-ideas/{id} - Remove saved idea

GET  /api/users/reviews         - Get user reviews
POST /api/users/reviews         - Create review
PUT  /api/users/reviews/{id}    - Update review
DELETE /api/users/reviews/{id}  - Delete review

GET  /api/users/rewards         - Get user rewards
POST /api/users/rewards/{id}/claim - Claim reward

GET  /api/users/proposed-ideas  - Get proposed ideas
POST /api/users/proposed-ideas  - Submit new idea
```

## 🚀 Setup Instructions

### Prerequisites
- Java 17+
- Node.js 16+
- MySQL 8.0+
- Maven 3.6+

### Quick Start
```bash
# 1. Clone the repository
git clone <repository-url>
cd ideaFactory

# 2. Setup database
mysql -u root -p < database/migrations/user_dashboard_tables.sql

# 3. Run setup script
chmod +x setup-user-dashboard.sh
./setup-user-dashboard.sh

# 4. Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:8080
# Dashboard: http://localhost:3000/dashboard
```

### Manual Setup

#### Backend Setup
```bash
cd backend
mvn clean compile
mvn spring-boot:run
```

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 🧪 Testing

### Test Accounts
```
Email: john@example.com
Password: password

Email: jane@example.com
Password: password

Email: admin@example.com
Password: password
```

### Test Scenarios
1. **User Registration**: Sign up with new email
2. **Email Verification**: Check verification flow
3. **Login**: Test email and password login
4. **Google OAuth**: Test Google sign-in
5. **Password Reset**: Test forgot password flow
6. **Profile Management**: Edit profile information
7. **Dashboard Navigation**: Test all dashboard sections
8. **Save Ideas**: Save and unsave ideas
9. **Write Reviews**: Create and edit reviews
10. **Propose Ideas**: Submit new ideas
11. **Rewards**: Earn and claim rewards

## 🔒 Security Features

### Password Security
- **Hashing**: bcrypt with salt
- **Minimum Length**: 6 characters
- **Reset Tokens**: 15-minute expiration
- **Secure Storage**: No plain text passwords

### JWT Security
- **Expiration**: Configurable token lifetime
- **Claims**: User ID, email, role
- **Validation**: Server-side token verification
- **Refresh**: Optional refresh token support

### Email Security
- **Verification**: Required email verification
- **Reset Tokens**: Secure token generation
- **Expiration**: Time-limited tokens
- **One-time Use**: Tokens invalidated after use

### Data Protection
- **Input Validation**: Server-side validation
- **SQL Injection**: JPA/Hibernate protection
- **XSS Protection**: Content Security Policy
- **CORS**: Configured for frontend domain

## 📈 Scalability Considerations

### Database Optimization
- **Indexes**: Email, tokens, user relationships
- **Foreign Keys**: Proper constraint relationships
- **Connection Pooling**: HikariCP configuration
- **Query Optimization**: Efficient JPA queries

### Caching Strategy
- **User Sessions**: JWT-based stateless auth
- **Profile Data**: Optional Redis caching
- **Static Assets**: CDN for images/icons
- **API Responses**: HTTP caching headers

### Performance Monitoring
- **Health Checks**: Spring Boot Actuator
- **Logging**: Structured logging with SLF4J
- **Metrics**: Application metrics collection
- **Error Tracking**: Exception monitoring

## 🛠️ Development

### Code Structure
```
backend/src/main/java/com/ideafactory/
├── config/          # Security, JWT, CORS config
├── controller/      # REST API controllers
├── dto/            # Data transfer objects
├── model/          # JPA entities
├── repository/     # Data access layer
└── service/        # Business logic

frontend/src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── services/       # API service layer
├── types/          # TypeScript interfaces
└── layouts/        # Layout components
```

### Environment Configuration
```properties
# Backend (application.properties)
spring.datasource.url=jdbc:mysql://localhost:3306/ideafactory
spring.datasource.username=root
spring.datasource.password=password
jwt.secret=your-secret-key
jwt.expiration=18000000

# Frontend (.env)
REACT_APP_API_BASE_URL=http://localhost:8080/api
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
```

## 🔄 Deployment

### Production Checklist
- [ ] Update database credentials
- [ ] Configure JWT secret
- [ ] Set up email service
- [ ] Configure Google OAuth
- [ ] Update CORS settings
- [ ] Set up SSL certificates
- [ ] Configure logging
- [ ] Set up monitoring

### Docker Deployment
```dockerfile
# Backend Dockerfile
FROM openjdk:17-jdk-slim
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]

# Frontend Dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📚 Additional Resources

### Documentation
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://reactjs.org/docs/)
- [JWT.io](https://jwt.io/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Security Best Practices
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Spring Security](https://spring.io/projects/spring-security)
- [JWT Best Practices](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/)

### Performance Optimization
- [React Performance](https://reactjs.org/docs/optimizing-performance.html)
- [Spring Boot Performance](https://spring.io/guides/gs/spring-boot/)
- [Database Optimization](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)

## 🤝 Contributing

### Development Workflow
1. Create feature branch
2. Implement changes
3. Add tests
4. Update documentation
5. Submit pull request

### Code Standards
- **Backend**: Follow Spring Boot conventions
- **Frontend**: Use TypeScript and React hooks
- **Database**: Use JPA annotations
- **Security**: Follow OWASP guidelines

### Testing Strategy
- **Unit Tests**: JUnit for backend, Jest for frontend
- **Integration Tests**: API endpoint testing
- **E2E Tests**: User workflow testing
- **Security Tests**: Authentication and authorization

---

**Last Updated**: January 2024
**Version**: 1.0.0
**Maintainer**: Development Team 