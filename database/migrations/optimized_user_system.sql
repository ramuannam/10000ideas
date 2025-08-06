-- Optimized User System Database Schema
-- This implements a single users table with role-based access control
-- for better security, scalability, and maintainability

-- Drop existing tables if they exist (for clean migration)
DROP TABLE IF EXISTS user_rewards;
DROP TABLE IF EXISTS user_reviews;
DROP TABLE IF EXISTS saved_ideas;
DROP TABLE IF EXISTS proposed_ideas;
DROP TABLE IF EXISTS users;

-- Optimized users table with role-based access control
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    password_salt VARCHAR(255) NOT NULL,
    google_id VARCHAR(255) UNIQUE NULL,
    role ENUM('user', 'admin') DEFAULT 'user' NOT NULL, -- Key column for role separation
    profile_image_url TEXT,
    bio TEXT,
    phone_number VARCHAR(20),
    location VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE, -- For account deactivation
    email_verified BOOLEAN DEFAULT FALSE,
    auth_provider ENUM('EMAIL', 'GOOGLE') DEFAULT 'EMAIL',
    verification_token VARCHAR(255),
    verification_token_expiry TIMESTAMP NULL,
    reset_password_token VARCHAR(255),
    reset_password_token_expiry TIMESTAMP NULL,
    last_admin_login TIMESTAMP NULL, -- For single admin session enforcement
    admin_session_id VARCHAR(255), -- For admin session management
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    
    -- Indexes for performance
    INDEX idx_email (email),
    INDEX idx_google_id (google_id),
    INDEX idx_role (role),
    INDEX idx_is_active (is_active),
    INDEX idx_verification_token (verification_token),
    INDEX idx_reset_password_token (reset_password_token),
    INDEX idx_admin_session (admin_session_id)
);

-- User-related tables (for regular users)
CREATE TABLE saved_ideas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    idea_id BIGINT NOT NULL,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (idea_id) REFERENCES ideas(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_idea (user_id, idea_id),
    
    INDEX idx_user_id (user_id),
    INDEX idx_idea_id (idea_id),
    INDEX idx_saved_at (saved_at)
);

CREATE TABLE user_reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    idea_id BIGINT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (idea_id) REFERENCES ideas(id) ON DELETE CASCADE,
    
    INDEX idx_user_id (user_id),
    INDEX idx_idea_id (idea_id),
    INDEX idx_rating (rating),
    INDEX idx_created_at (created_at)
);

CREATE TABLE user_rewards (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    type ENUM('BADGE', 'POINTS', 'ACHIEVEMENT', 'MILESTONE') NOT NULL,
    points_value INT DEFAULT 0,
    icon_url VARCHAR(500),
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_claimed BOOLEAN DEFAULT FALSE,
    claimed_at TIMESTAMP NULL,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    INDEX idx_user_id (user_id),
    INDEX idx_type (type),
    INDEX idx_earned_at (earned_at),
    INDEX idx_is_claimed (is_claimed)
);

CREATE TABLE proposed_ideas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100),
    investment_needed DECIMAL(15,2),
    difficulty_level VARCHAR(50),
    status ENUM('PENDING', 'APPROVED', 'REJECTED', 'UNDER_REVIEW') DEFAULT 'PENDING',
    admin_notes TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP NULL,
    reviewed_by BIGINT NULL,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_submitted_at (submitted_at),
    INDEX idx_reviewed_by (reviewed_by)
);

-- Insert sample data for testing

-- Sample Admin User (password: admin123)
INSERT INTO users (
    username, email, password_hash, password_salt, role, 
    is_active, email_verified, bio, location
) VALUES (
    'admin', 'admin@ideafactory.com', 
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- bcrypt hash for 'admin123'
    'salt123', 'admin', TRUE, TRUE,
    'System Administrator', 'Global'
);

-- Sample Regular Users (password: user123)
INSERT INTO users (
    username, email, password_hash, password_salt, role,
    is_active, email_verified, bio, location
) VALUES 
('john_doe', 'john@example.com', 
 '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'salt123', 'user', TRUE, TRUE,
 'Entrepreneur and idea enthusiast', 'New York'),
 
('jane_smith', 'jane@example.com',
 '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'salt123', 'user', TRUE, TRUE,
 'Business consultant and startup advisor', 'San Francisco'),
 
('mike_wilson', 'mike@example.com',
 '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'salt123', 'user', TRUE, TRUE,
 'Tech enthusiast and innovation seeker', 'Austin');

-- Sample Saved Ideas
INSERT INTO saved_ideas (user_id, idea_id, notes) VALUES
(2, 1, 'Great potential for local market'),
(2, 3, 'Interesting tech angle'),
(3, 2, 'Perfect for my skill set'),
(4, 1, 'Low investment, high potential');

-- Sample User Reviews
INSERT INTO user_reviews (user_id, idea_id, rating, comment) VALUES
(2, 1, 5, 'Excellent idea with clear market potential'),
(2, 3, 4, 'Good concept, needs more technical details'),
(3, 2, 5, 'Perfect for beginners, well explained'),
(4, 1, 4, 'Great starting point for entrepreneurs');

-- Sample User Rewards
INSERT INTO user_rewards (user_id, name, description, type, points_value, icon_url) VALUES
(2, 'First Review', 'Posted your first review', 'BADGE', 10, '/icons/first-review.png'),
(2, 'Idea Saver', 'Saved your first idea', 'ACHIEVEMENT', 25, '/icons/idea-saver.png'),
(3, 'Active User', 'Reviewed 5 ideas', 'MILESTONE', 50, '/icons/active-user.png'),
(4, 'Quick Learner', 'Completed profile setup', 'BADGE', 15, '/icons/quick-learner.png');

-- Sample Proposed Ideas
INSERT INTO proposed_ideas (user_id, title, description, category, investment_needed, difficulty_level) VALUES
(2, 'Eco-Friendly Packaging Solution', 'Biodegradable packaging made from agricultural waste', 'Manufacturing', 50000.00, 'Medium'),
(3, 'Smart Home Energy Monitor', 'IoT device to track and optimize home energy usage', 'Technology', 75000.00, 'High'),
(4, 'Local Food Delivery Network', 'Connecting local farmers with urban consumers', 'Services', 25000.00, 'Low');

-- Create admin session management table
CREATE TABLE admin_sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    session_id VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    INDEX idx_session_id (session_id),
    INDEX idx_user_id (user_id),
    INDEX idx_expires_at (expires_at),
    INDEX idx_is_active (is_active)
);

-- Insert initial admin session
INSERT INTO admin_sessions (user_id, session_id, expires_at) VALUES
(1, 'admin_session_001', DATE_ADD(NOW(), INTERVAL 24 HOUR)); 