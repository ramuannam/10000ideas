-- SQL script to ensure all ideas are ACTIVE by default
-- Run this in your database if the application doesn't fix it automatically

-- Update all ideas to be active
UPDATE ideas SET active = true WHERE active = false OR active IS NULL;

-- Check the results
SELECT 
    COUNT(*) as total_ideas,
    SUM(CASE WHEN active = true THEN 1 ELSE 0 END) as active_ideas,
    SUM(CASE WHEN active = false THEN 1 ELSE 0 END) as inactive_ideas
FROM ideas;

-- Show all ideas and their status
SELECT id, title, active FROM ideas ORDER BY id;