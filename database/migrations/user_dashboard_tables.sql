-- User Dashboard Tables Migration
-- This script creates all necessary tables for the user dashboard functionality

-- Users table
CREATE TABLE IF NOT EXISTS users (
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
    reset_password_token_expiry TIMESTAMP NULL,
    INDEX idx_email (email),
    INDEX idx_google_id (google_id),
    INDEX idx_verification_token (verification_token),
    INDEX idx_reset_password_token (reset_password_token)
);

-- Saved Ideas table
CREATE TABLE IF NOT EXISTS saved_ideas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    idea_id BIGINT NOT NULL,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (idea_id) REFERENCES ideas(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_idea (user_id, idea_id),
    INDEX idx_user_id (user_id),
    INDEX idx_idea_id (idea_id)
);

-- User Reviews table
CREATE TABLE IF NOT EXISTS user_reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    idea_id BIGINT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (idea_id) REFERENCES ideas(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_idea_review (user_id, idea_id),
    INDEX idx_user_id (user_id),
    INDEX idx_idea_id (idea_id),
    INDEX idx_rating (rating)
);

-- User Rewards table
CREATE TABLE IF NOT EXISTS user_rewards (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
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
    INDEX idx_earned_at (earned_at)
);

-- Proposed Ideas table
CREATE TABLE IF NOT EXISTS proposed_ideas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100),
    investment_needed BIGINT,
    difficulty_level VARCHAR(50),
    status ENUM('PENDING', 'APPROVED', 'REJECTED', 'UNDER_REVIEW') DEFAULT 'PENDING',
    admin_notes TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP NULL,
    reviewed_by VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_submitted_at (submitted_at)
);

-- Insert sample data for testing
INSERT INTO users (full_name, email, password, role, email_verified, is_active) VALUES
('John Doe', 'john@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'USER', TRUE, TRUE),
('Jane Smith', 'jane@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'USER', TRUE, TRUE),
('Admin User', 'admin@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN', TRUE, TRUE);

-- Insert sample saved ideas
INSERT INTO saved_ideas (user_id, idea_id, notes) VALUES
(1, 1, 'Great idea for urban farming'),
(1, 2, 'Interesting AI application'),
(2, 1, 'Perfect for my area');

-- Insert sample reviews
INSERT INTO user_reviews (user_id, idea_id, rating, comment) VALUES
(1, 1, 5, 'Excellent idea with great potential'),
(1, 2, 4, 'Very innovative approach'),
(2, 1, 5, 'Love this concept');

-- Insert sample rewards
INSERT INTO user_rewards (user_id, name, description, type, points_value) VALUES
(1, 'First Review', 'Posted your first review', 'BADGE', 10),
(1, 'Idea Saver', 'Saved your first idea', 'ACHIEVEMENT', 20),
(2, 'Active User', 'Been active for 7 days', 'MILESTONE', 50);

-- Insert sample proposed ideas
INSERT INTO proposed_ideas (user_id, title, description, category, investment_needed, difficulty_level) VALUES
(1, 'Smart Home Security System', 'AI-powered home security with facial recognition', 'Technology', 5000000, 'Challenging'),
(2, 'Organic Food Delivery', 'Farm-to-table organic food delivery service', 'Food & Beverage', 2000000, 'Moderate'); 