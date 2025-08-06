# Optimized User System Documentation

## Overview

The Optimized User System implements a comprehensive role-based access control (RBAC) architecture that properly separates user and admin functionality while maintaining security, scalability, and maintainability. This system follows industry best practices for authentication, authorization, and session management.

## Architecture Highlights

### 1. Single Users Table with Role-Based Access Control

**Key Design Principle**: One table, multiple roles, secure separation

```sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    password_salt VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user' NOT NULL, -- Key column
    is_active BOOLEAN DEFAULT TRUE,
    -- ... other fields
);
```

**Benefits**:
- ✅ **Scalability**: Single table reduces complexity and join overhead
- ✅ **Security**: Role-based access control prevents privilege escalation
- ✅ **Maintainability**: Centralized user management
- ✅ **Performance**: Optimized indexes for role-based queries

### 2. Admin Session Management

**Single Admin Session Enforcement**: Only one admin can be logged in at a time

```java
// Admin session management
@Transactional
public UserAuthResponse adminLogin(UserLoginRequest request) {
    // Verify admin role
    if (!user.isAdmin()) {
        throw new RuntimeException("Access denied. Admin privileges required.");
    }
    
    // Handle single admin session
    String sessionId = UUID.randomUUID().toString();
    adminSessionRepository.deactivateOtherSessionsForUser(user.getId(), sessionId);
    
    // Create new admin session
    AdminSession adminSession = new AdminSession(user, sessionId, expiresAt);
    adminSessionRepository.save(adminSession);
}
```

**Benefits**:
- ✅ **Security**: Prevents multiple admin sessions
- ✅ **Audit Trail**: Clear session tracking
- ✅ **Resource Management**: Efficient session cleanup

## Database Schema

### Core Tables

#### 1. Users Table
```sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    password_salt VARCHAR(255) NOT NULL,
    google_id VARCHAR(255) UNIQUE NULL,
    role ENUM('user', 'admin') DEFAULT 'user' NOT NULL,
    profile_image_url TEXT,
    bio TEXT,
    phone_number VARCHAR(20),
    location VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    auth_provider ENUM('EMAIL', 'GOOGLE') DEFAULT 'EMAIL',
    verification_token VARCHAR(255),
    verification_token_expiry TIMESTAMP NULL,
    reset_password_token VARCHAR(255),
    reset_password_token_expiry TIMESTAMP NULL,
    last_admin_login TIMESTAMP NULL,
    admin_session_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);
```

#### 2. Admin Sessions Table
```sql
CREATE TABLE admin_sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    session_id VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

#### 3. User-Related Tables
- `saved_ideas`: User's saved ideas
- `user_reviews`: User's reviews on ideas
- `user_rewards`: User's earned rewards/badges
- `proposed_ideas`: User's proposed ideas

## Backend Implementation

### 1. User Model with Role-Based Methods

```java
@Entity
@Table(name = "users")
public class User {
    // ... fields
    
    public enum UserRole {
        USER, ADMIN
    }
    
    // Helper methods
    public boolean isAdmin() {
        return UserRole.ADMIN.equals(this.role);
    }
    
    public boolean isUser() {
        return UserRole.USER.equals(this.role);
    }
}
```

### 2. Service Layer with Role Separation

#### UserService Methods
- `signup()`: Regular user registration
- `login()`: Regular user login
- `adminLogin()`: Admin-specific login with session management
- `googleLogin()`: OAuth integration
- `forgotPassword()`: Password reset functionality
- `verifyEmail()`: Email verification
- `validateAdminSession()`: Admin session validation

### 3. Controller Layer with Role-Based Endpoints

```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    // User endpoints
    @PostMapping("/signup")
    @PostMapping("/login")
    @PostMapping("/google-login")
    @PostMapping("/forgot-password")
    @PostMapping("/reset-password")
    @PostMapping("/verify-email")
    
    // Admin endpoints
    @PostMapping("/admin/login")
    @GetMapping("/admin/validate-session")
}
```

## Frontend Implementation

### 1. Service Separation

#### AuthService (User Authentication)
```typescript
class AuthService {
    private baseUrl = `${API_BASE_URL}/users`;
    
    async signup(request: UserSignupRequest): Promise<UserAuthResponse>
    async login(request: UserLoginRequest): Promise<UserAuthResponse>
    async googleLogin(request: GoogleLoginRequest): Promise<UserAuthResponse>
    async forgotPassword(email: string): Promise<void>
    async resetPassword(token: string, newPassword: string): Promise<void>
    async verifyEmail(token: string): Promise<void>
    async getProfile(email: string): Promise<User>
    async updateProfile(userId: number, profileData: any): Promise<User>
}
```

#### AdminService (Admin-Specific Operations)
```typescript
class AdminService {
    private baseURL = `${ADMIN_API_BASE_URL}/auth`;
    
    async login(credentials: LoginRequest): Promise<LoginResponse>
    async uploadIdeas(file: File): Promise<any>
    async getIdeasPaginated(...): Promise<any>
    async getFilterOptions(): Promise<any>
    async getDashboardStats(): Promise<any>
    async updateIdea(id: number, idea: any): Promise<any>
    async deleteIdea(id: number): Promise<any>
    async toggleIdeaStatus(id: number): Promise<any>
    async getUploadHistory(): Promise<UploadHistory[]>
    async deleteUploadBatch(batchId: string): Promise<DeleteUploadResponse>
}
```

### 2. Role-Based UI Components

#### Header Component with Role Detection
```typescript
const Header: React.FC<HeaderProps> = ({ isUserSignedIn, userRole }) => {
    return (
        <div className="auth-section">
            {!isUserSignedIn ? (
                <button onClick={() => openAuthModal('signin')}>
                    Sign In / Sign Up
                </button>
            ) : userRole === 'ADMIN' ? (
                <AdminHeader />
            ) : (
                <UserHeader />
            )}
        </div>
    );
};
```

## Security Features

### 1. Password Security
- **Bcrypt Hashing**: Secure password hashing with salt
- **Salt Generation**: Unique salt per user
- **Password Validation**: Minimum length and complexity requirements

### 2. JWT Token Security
- **Role Claims**: JWT includes user role for authorization
- **Token Expiration**: Configurable token lifetime
- **Secure Storage**: HttpOnly cookies or secure localStorage

### 3. Session Management
- **Single Admin Session**: Only one admin can be logged in
- **Session Expiration**: Automatic session cleanup
- **Session Validation**: Server-side session verification

### 4. Input Validation
- **Email Validation**: Proper email format validation
- **Username Validation**: Unique username requirements
- **Password Strength**: Minimum security requirements

## API Endpoints

### User Endpoints
```
POST /api/users/signup          - User registration
POST /api/users/login           - User login
POST /api/users/google-login    - Google OAuth login
POST /api/users/forgot-password - Password reset request
POST /api/users/reset-password  - Password reset
POST /api/users/verify-email    - Email verification
GET  /api/users/profile         - Get user profile
PUT  /api/users/profile         - Update user profile
```

### Admin Endpoints
```
POST /api/users/admin/login           - Admin login
GET  /api/users/admin/validate-session - Validate admin session
```

### Admin Management Endpoints (Separate Service)
```
POST   /api/admin/auth/login         - Admin authentication
GET    /api/admin/ideas              - Get ideas (paginated)
PUT    /api/admin/ideas/{id}         - Update idea
DELETE /api/admin/ideas/{id}         - Delete idea
POST   /api/admin/upload-ideas       - Bulk upload
GET    /api/admin/upload-history     - Upload history
DELETE /api/admin/upload-history/{id} - Delete upload batch
```

## Setup Instructions

### 1. Database Setup
```bash
# Run the optimized user system migration
mysql -u root -p < database/migrations/optimized_user_system.sql
```

### 2. Backend Setup
```bash
cd backend
mvn clean compile
mvn spring-boot:run
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

### 4. Automated Setup
```bash
# Complete setup with testing
./setup-optimized-user-system.sh

# Stop the system
./stop-optimized-user-system.sh
```

## Testing

### Test Accounts
- **Admin**: admin@ideafactory.com / admin123
- **Test User**: testuser / password123

### API Testing
```bash
# Test user signup
curl -X POST http://localhost:8080/api/users/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

# Test admin login
curl -X POST http://localhost:8080/api/users/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ideafactory.com","password":"admin123"}'
```

## Key Benefits

### 1. Security
- ✅ Role-based access control
- ✅ Secure password hashing
- ✅ JWT with role claims
- ✅ Single admin session enforcement
- ✅ Input validation and sanitization

### 2. Scalability
- ✅ Single users table design
- ✅ Optimized database indexes
- ✅ Efficient session management
- ✅ Modular service architecture

### 3. Maintainability
- ✅ Clear separation of concerns
- ✅ Well-documented code
- ✅ Consistent naming conventions
- ✅ Comprehensive error handling

### 4. User Experience
- ✅ Seamless authentication flow
- ✅ Role-appropriate UI components
- ✅ Responsive design
- ✅ Intuitive navigation

## Future Enhancements

### 1. Advanced Security
- [ ] Two-factor authentication (2FA)
- [ ] Rate limiting for login attempts
- [ ] IP-based access control
- [ ] Audit logging

### 2. Enhanced Features
- [ ] User roles beyond admin/user
- [ ] Permission-based access control
- [ ] Advanced session management
- [ ] Real-time notifications

### 3. Performance Optimization
- [ ] Redis for session storage
- [ ] Database connection pooling
- [ ] API response caching
- [ ] CDN integration

## Troubleshooting

### Common Issues

1. **Database Connection**
   - Ensure MySQL is running
   - Check database credentials
   - Verify database exists

2. **Backend Startup**
   - Check port 8080 availability
   - Verify Java/Maven installation
   - Review backend.log for errors

3. **Frontend Issues**
   - Check port 3000 availability
   - Verify Node.js installation
   - Review frontend.log for errors

4. **Authentication Issues**
   - Verify JWT configuration
   - Check CORS settings
   - Validate API endpoints

### Debug Commands
```bash
# Check running processes
lsof -i :8080  # Backend
lsof -i :3000  # Frontend

# View logs
tail -f backend.log
tail -f frontend.log

# Test database connection
mysql -u root -p -e "SELECT 1;"
```

## Conclusion

The Optimized User System provides a robust, secure, and scalable foundation for user management with proper role-based access control. The implementation follows industry best practices and provides a solid base for future enhancements.

For questions or issues, please refer to the troubleshooting section or contact the development team. 