-- Create the database
CREATE DATABASE ideafactory_db;

-- Create the user
CREATE USER ideafactory_user WITH PASSWORD 'ideafactory_pass';

-- Grant privileges to the user
GRANT ALL PRIVILEGES ON DATABASE ideafactory_db TO ideafactory_user;

-- Connect to the database
\c ideafactory_db;

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO ideafactory_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ideafactory_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO ideafactory_user;

-- Set default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO ideafactory_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO ideafactory_user; 