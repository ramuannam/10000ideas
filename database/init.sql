-- 10000 Ideas Database Initialization Script
-- This script sets up the basic database structure for PostgreSQL

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create database if not exists (Note: This is handled by Docker environment variables)
-- The actual database creation is done via POSTGRES_DB environment variable

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'ADMIN' CHECK (role IN ('ADMIN', 'SUPER_ADMIN')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- Create ideas table
CREATE TABLE IF NOT EXISTS ideas (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    sector VARCHAR(100) NOT NULL,
    investment_needed DECIMAL(15,2) NOT NULL DEFAULT 0,
    expertise_needed TEXT,
    training_needed TEXT,
    resources TEXT,
    success_examples TEXT,
    video_url VARCHAR(500),
    government_subsidies TEXT,
    funding_options TEXT,
    bank_assistance TEXT,
    difficulty_level VARCHAR(50),
    time_to_market VARCHAR(100),
    location VARCHAR(50),
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create target_audience table (for many-to-many relationship)
CREATE TABLE IF NOT EXISTS idea_target_audience (
    idea_id BIGINT REFERENCES ideas(id) ON DELETE CASCADE,
    target_audience VARCHAR(100),
    PRIMARY KEY (idea_id, target_audience)
);

-- Create special_advantages table (for many-to-many relationship)
CREATE TABLE IF NOT EXISTS idea_special_advantages (
    idea_id BIGINT REFERENCES ideas(id) ON DELETE CASCADE,
    special_advantage VARCHAR(200),
    PRIMARY KEY (idea_id, special_advantage)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_ideas_category ON ideas(category);
CREATE INDEX IF NOT EXISTS idx_ideas_sector ON ideas(sector);
CREATE INDEX IF NOT EXISTS idx_ideas_difficulty_level ON ideas(difficulty_level);
CREATE INDEX IF NOT EXISTS idx_ideas_location ON ideas(location);
CREATE INDEX IF NOT EXISTS idx_ideas_is_active ON ideas(is_active);
CREATE INDEX IF NOT EXISTS idx_ideas_investment ON ideas(investment_needed);
CREATE INDEX IF NOT EXISTS idx_admins_username ON admins(username);
CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);
CREATE INDEX IF NOT EXISTS idx_admins_is_active ON admins(is_active);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_ideas_updated_at 
    BEFORE UPDATE ON ideas 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin user (password: admin123)
-- Note: The actual password will be encoded by the Spring Boot application
INSERT INTO admins (username, email, password, full_name, role, is_active) 
VALUES (
    'admin', 
    'admin@10000ideas.com', 
    '$2a$10$8qvVzLzWpTr0wKw8mPv8xOuOFGVr6XbYHvk3WnNmQD0wJ6vY5FWi6', -- BCrypt hash for 'admin123'
    'Admin User', 
    'ADMIN', 
    TRUE
) 
ON CONFLICT (username) DO NOTHING;

-- Insert some sample ideas
INSERT INTO ideas (
    title, description, category, sector, investment_needed, 
    expertise_needed, difficulty_level, location, is_active
) VALUES 
(
    'Organic Vegetable Farming',
    'Start an organic vegetable farming business using sustainable practices. Focus on high-demand vegetables like tomatoes, cucumbers, and leafy greens.',
    'Business',
    'Agriculture',
    50000.00,
    'Basic farming knowledge, organic farming techniques',
    'Easy',
    'Rural',
    TRUE
),
(
    'Digital Marketing Agency',
    'Start a digital marketing agency offering services like social media management, SEO, and content creation for small businesses.',
    'Service',
    'Technology',
    100000.00,
    'Digital marketing skills, social media management, basic design',
    'Medium',
    'Urban',
    TRUE
),
(
    'AI-Powered Healthcare Platform',
    'Develop an AI-powered healthcare platform that provides telemedicine, health monitoring, and personalized health recommendations.',
    'Unicorn',
    'Healthcare',
    5000000.00,
    'AI/ML, healthcare domain knowledge, software development',
    'Hard',
    'Urban',
    TRUE
)
ON CONFLICT DO NOTHING;

-- Insert sample target audiences
INSERT INTO idea_target_audience (idea_id, target_audience) VALUES 
(1, 'Rural'),
(1, 'Lower Middle Class'),
(2, 'Women'),
(2, 'Middle Class'),
(2, 'Urban'),
(3, 'Urban'),
(3, 'Middle Class')
ON CONFLICT DO NOTHING;

-- Insert sample special advantages
INSERT INTO idea_special_advantages (idea_id, special_advantage) VALUES 
(1, 'Low initial investment'),
(1, 'Government support'),
(1, 'Growing market demand'),
(2, 'Work from home'),
(2, 'Flexible hours'),
(2, 'High earning potential'),
(3, 'High growth potential'),
(3, 'Government support'),
(3, 'Social impact')
ON CONFLICT DO NOTHING;

-- Grant necessary permissions (if needed)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ideafactory_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO ideafactory_user;

-- Ensure all ideas are active by default (fix for existing data)
-- This ensures that any ideas that might have been created with is_active = false are set to true
UPDATE ideas SET is_active = true WHERE is_active = false OR is_active IS NULL;

-- Also ensure the default value is set for future inserts
ALTER TABLE ideas ALTER COLUMN is_active SET DEFAULT true; 