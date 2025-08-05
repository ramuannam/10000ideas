-- Migration script for Idea Details tables
-- This script creates all the necessary tables for the detailed idea pages

-- Idea Reviews table
CREATE TABLE IF NOT EXISTS idea_reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    idea_id BIGINT NOT NULL,
    reviewer_name VARCHAR(100) NOT NULL,
    reviewer_email VARCHAR(100),
    reviewer_website VARCHAR(100),
    comment TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    helpful_votes INT DEFAULT 0,
    unhelpful_votes INT DEFAULT 0,
    is_recommended BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_approved BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (idea_id) REFERENCES ideas(id) ON DELETE CASCADE,
    INDEX idx_idea_reviews_idea_id (idea_id),
    INDEX idx_idea_reviews_approved (is_approved),
    INDEX idx_idea_reviews_created_at (created_at)
);

-- Idea Internal Factors table
CREATE TABLE IF NOT EXISTS idea_internal_factors (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    idea_id BIGINT NOT NULL,
    factor_type VARCHAR(50) NOT NULL, -- STRENGTHS, WEAKNESSES, OPPORTUNITIES, THREATS
    factors JSON NOT NULL, -- Array of factor strings
    color_code VARCHAR(20),
    icon_code VARCHAR(50),
    FOREIGN KEY (idea_id) REFERENCES ideas(id) ON DELETE CASCADE,
    INDEX idx_idea_internal_factors_idea_id (idea_id),
    INDEX idx_idea_internal_factors_type (factor_type)
);

-- Idea Investments table
CREATE TABLE IF NOT EXISTS idea_investments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    idea_id BIGINT NOT NULL,
    investment_category VARCHAR(100) NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    description TEXT,
    priority_level VARCHAR(20), -- HIGH, MEDIUM, LOW
    is_optional BOOLEAN DEFAULT FALSE,
    payment_terms VARCHAR(200),
    supplier_info TEXT,
    FOREIGN KEY (idea_id) REFERENCES ideas(id) ON DELETE CASCADE,
    INDEX idx_idea_investments_idea_id (idea_id),
    INDEX idx_idea_investments_category (investment_category),
    INDEX idx_idea_investments_priority (priority_level)
);

-- Idea Schemes table
CREATE TABLE IF NOT EXISTS idea_schemes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    idea_id BIGINT NOT NULL,
    scheme_name VARCHAR(200) NOT NULL,
    scheme_type VARCHAR(50), -- GOVERNMENT, BANK, PRIVATE, NGO
    scheme_category VARCHAR(50), -- SUBSIDY, LOAN, GRANT, TRAINING
    region_state VARCHAR(100),
    description TEXT,
    eligibility_criteria TEXT,
    maximum_amount DECIMAL(15,2),
    interest_rate DECIMAL(5,2),
    repayment_period VARCHAR(100),
    application_deadline TIMESTAMP,
    contact_info TEXT,
    website_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idea_id) REFERENCES ideas(id) ON DELETE CASCADE,
    INDEX idx_idea_schemes_idea_id (idea_id),
    INDEX idx_idea_schemes_type (scheme_type),
    INDEX idx_idea_schemes_category (scheme_category),
    INDEX idx_idea_schemes_region (region_state),
    INDEX idx_idea_schemes_active (is_active)
);

-- Idea Bank Loans table
CREATE TABLE IF NOT EXISTS idea_bank_loans (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    idea_id BIGINT NOT NULL,
    bank_name VARCHAR(100) NOT NULL,
    loan_type VARCHAR(100),
    loan_name VARCHAR(200),
    description TEXT,
    minimum_amount DECIMAL(15,2),
    maximum_amount DECIMAL(15,2),
    interest_rate_min DECIMAL(5,2),
    interest_rate_max DECIMAL(5,2),
    loan_tenure_min VARCHAR(50),
    loan_tenure_max VARCHAR(50),
    processing_fee DECIMAL(15,2),
    eligibility_criteria TEXT,
    required_documents TEXT,
    contact_info TEXT,
    website_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idea_id) REFERENCES ideas(id) ON DELETE CASCADE,
    INDEX idx_idea_bank_loans_idea_id (idea_id),
    INDEX idx_idea_bank_loans_bank (bank_name),
    INDEX idx_idea_bank_loans_type (loan_type),
    INDEX idx_idea_bank_loans_active (is_active)
);

-- Sample data for testing

-- Sample Internal Factors for Groundnut Oil Processing Unit
INSERT INTO idea_internal_factors (idea_id, factor_type, factors, color_code, icon_code) VALUES
(1, 'STRENGTHS', '["Quality", "Availability", "Expertise", "Efficiency"]', '#fbbf24', 'S'),
(1, 'WEAKNESSES', '["Competition", "Dependence", "Location"]', '#f59e0b', 'W'),
(1, 'OPPORTUNITIES', '["Growing market", "Diversification", "Export potential", "Technological Advancements"]', '#1e40af', 'O'),
(1, 'THREATS', '["Market saturation", "Price volatility", "Government regulations", "Economic downturns"]', '#fbbf24', 'T');

-- Sample Investments for Groundnut Oil Processing Unit
INSERT INTO idea_investments (idea_id, investment_category, amount, description, priority_level, is_optional) VALUES
(1, 'Machinery and Equipment', 500000, 'Oil expellers, filter press, storage tanks, weighing scales', 'HIGH', FALSE),
(1, 'Land and Building', 800000, 'Factory space, storage facilities, office space', 'HIGH', FALSE),
(1, 'Marketing and Distribution', 200000, 'Branding, packaging, distribution network', 'MEDIUM', FALSE),
(1, 'Raw Materials', 300000, 'Initial stock of groundnuts and packaging materials', 'HIGH', FALSE),
(1, 'Labour', 150000, 'Skilled workers, machine operators, quality control staff', 'MEDIUM', FALSE),
(1, 'Licenses and Permits', 50000, 'Business registration, food safety licenses, environmental permits', 'HIGH', FALSE);

-- Sample Schemes for Groundnut Oil Processing Unit
INSERT INTO idea_schemes (idea_id, scheme_name, scheme_type, scheme_category, region_state, description, maximum_amount, is_active) VALUES
(1, 'AP Adarana 2 Scheme: Ensuring Financial Support To Unorganized Sector', 'GOVERNMENT', 'SUBSIDY', 'ANDHRA PRADESH', 'Financial support scheme for unorganized sector businesses', 500000, TRUE),
(1, 'Andhra Pradesh State Skill Development Corporation (APSSDC)', 'GOVERNMENT', 'TRAINING', 'ANDHRA PRADESH', 'Skill development and training programs for entrepreneurs', 100000, TRUE),
(1, 'PMEGP - Prime Minister Employment Generation Programme', 'GOVERNMENT', 'SUBSIDY', 'ALL INDIA', 'Employment generation program for micro enterprises', 1000000, TRUE),
(1, 'MUDRA Yojana', 'GOVERNMENT', 'LOAN', 'ALL INDIA', 'Micro Units Development and Refinance Agency loans', 10000000, TRUE);

-- Sample Bank Loans for Groundnut Oil Processing Unit
INSERT INTO idea_bank_loans (idea_id, bank_name, loan_type, loan_name, description, minimum_amount, maximum_amount, interest_rate_min, interest_rate_max, loan_tenure_min, loan_tenure_max, processing_fee, is_active) VALUES
(1, 'Axis Bank', 'MSME_LOAN', 'Axis Bank MSME Loan', 'Specialized loans for MSME sector with competitive rates', 500000, 5000000, 8.5, 12.5, '1 year', '7 years', 5000, TRUE),
(1, 'IDBI Bank', 'BUSINESS_LOAN', 'IDBI Bank Business Loan', 'Business expansion and working capital loans', 100000, 10000000, 9.0, 13.0, '1 year', '10 years', 7500, TRUE),
(1, 'HDFC Bank', 'STARTUP_LOAN', 'HDFC Bank Startup Loan', 'Loans designed specifically for new business ventures', 200000, 2000000, 10.0, 14.0, '1 year', '5 years', 3000, TRUE);

-- Sample Reviews for Groundnut Oil Processing Unit
INSERT INTO idea_reviews (idea_id, reviewer_name, reviewer_email, comment, rating, helpful_votes, unhelpful_votes, is_recommended, is_approved) VALUES
(1, 'Nithika Sharma', 'nithika@example.com', 'Great Idea! Its a great idea to start a business and gaining knowledge before set up!', 5, 15, 2, TRUE, TRUE),
(1, 'Rajesh Kumar', 'rajesh@example.com', 'Very informative and well-structured business idea. The investment breakdown is very helpful.', 4, 8, 1, TRUE, TRUE),
(1, 'Priya Patel', 'priya@example.com', 'Excellent opportunity for rural entrepreneurs. The government schemes mentioned are very useful.', 5, 12, 0, TRUE, TRUE),
(1, 'Amit Singh', 'amit@example.com', 'Good business idea but needs more detailed market analysis. Overall helpful.', 4, 6, 2, FALSE, TRUE),
(1, 'Sneha Reddy', 'sneha@example.com', 'Perfect for first-time entrepreneurs. The step-by-step guidance is excellent.', 5, 20, 1, TRUE, TRUE);

-- Create indexes for better performance
CREATE INDEX idx_idea_reviews_rating ON idea_reviews(rating);
CREATE INDEX idx_idea_reviews_helpful_votes ON idea_reviews(helpful_votes);
CREATE INDEX idx_idea_investments_amount ON idea_investments(amount);
CREATE INDEX idx_idea_schemes_max_amount ON idea_schemes(maximum_amount);
CREATE INDEX idx_idea_bank_loans_min_amount ON idea_bank_loans(minimum_amount);
CREATE INDEX idx_idea_bank_loans_max_amount ON idea_bank_loans(maximum_amount); 