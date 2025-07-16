-- =====================================================
-- HUAYUE PLASTICS INDUSTRY - Complete Database Setup
-- =====================================================
-- This script creates the complete database structure for 
-- HUAYUE PLASTICS INDUSTRY website with admin authentication,
-- contact management, news system, and product catalog.
-- =====================================================

-- CREATE DATABASE (if needed)
-- Note: In Neon/hosted environments, the database is usually pre-created
-- CREATE DATABASE huayue_plastics_db;
-- \c huayue_plastics_db;

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USERS TABLE - Basic user management
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- =====================================================
-- ADMINS TABLE - Secure admin authentication with OTP
-- =====================================================
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    otp_code VARCHAR(10),
    otp_expiry TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- =====================================================
-- MESSAGES TABLE - Contact form submissions
-- =====================================================
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMP NOT NULL DEFAULT NOW(),
    is_read BOOLEAN NOT NULL DEFAULT FALSE
);

-- =====================================================
-- CONTACT_MESSAGES TABLE - Alternative contact storage
-- =====================================================
CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- =====================================================
-- PRODUCTS TABLE - Product catalog management
-- =====================================================
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    specifications TEXT,
    certifications VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- NEWS TABLE - News and announcements management
-- =====================================================
CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    content TEXT NOT NULL,
    thumbnail VARCHAR(500),
    publish_date TIMESTAMP DEFAULT NOW(),
    author VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- ADMIN_USERS TABLE - Legacy admin user storage
-- =====================================================
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    reset_token VARCHAR(255),
    reset_token_expiry TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================
-- Admin table indexes
CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);
CREATE INDEX IF NOT EXISTS idx_admins_otp_expiry ON admins(otp_expiry);

-- Messages table indexes
CREATE INDEX IF NOT EXISTS idx_messages_email ON messages(email);
CREATE INDEX IF NOT EXISTS idx_messages_submitted_at ON messages(submitted_at);
CREATE INDEX IF NOT EXISTS idx_messages_is_read ON messages(is_read);

-- Products table indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);

-- News table indexes
CREATE INDEX IF NOT EXISTS idx_news_publish_date ON news(publish_date);
CREATE INDEX IF NOT EXISTS idx_news_created_at ON news(created_at);

-- Contact messages indexes
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);

-- =====================================================
-- SAMPLE DATA INSERTION
-- =====================================================

-- Insert default admin (if not exists)
INSERT INTO admins (email, password_hash, name) 
VALUES ('admin@huayueplasticsindustry.com', '$2b$10$hash_placeholder', 'System Administrator')
ON CONFLICT (email) DO NOTHING;

-- Insert sample news article (if not exists)
INSERT INTO news (title, summary, content, author) 
VALUES (
    'HUAYUE PLASTICS INDUSTRY - Leading Industrial Solutions', 
    'Welcome to HUAYUE PLASTICS INDUSTRY, your trusted partner for industrial piping solutions in Ethiopia.',
    'HUAYUE PLASTICS INDUSTRY has been at the forefront of providing high-quality industrial piping solutions in Ethiopia. Our commitment to excellence and innovation drives us to deliver superior products that meet international standards.',
    'Admin'
) ON CONFLICT DO NOTHING;

-- Insert sample products (if not exists)
INSERT INTO products (name, description, category, image_url, specifications) VALUES 
('HUAYUE Industrial Pipes', 'High-quality industrial piping solutions for heavy-duty applications', 'HUAYUE', '/assets/huayue-pipes.jpg', 'Pressure rating: 10-16 bar, Temperature range: -20°C to +60°C'),
('EIDER Precision Fittings', 'Precision-engineered pipe fittings for specialized applications', 'EIDER', '/assets/eider-fittings.jpg', 'Material: Brass/PVC, Thread: BSP/NPT, Size range: 1/2" to 4"')
ON CONFLICT DO NOTHING;

-- =====================================================
-- CLEANUP FUNCTIONS (Optional)
-- =====================================================

-- Function to clean expired OTP codes
CREATE OR REPLACE FUNCTION cleanup_expired_otps()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    UPDATE admins 
    SET otp_code = NULL, otp_expiry = NULL 
    WHERE otp_expiry < NOW();
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for automatic timestamp updates
CREATE TRIGGER update_products_updated_at 
    BEFORE UPDATE ON products 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_updated_at 
    BEFORE UPDATE ON news 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- PERMISSIONS SETUP (if needed)
-- =====================================================
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_database_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_database_user;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================
-- Check all tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Check admin account exists
SELECT id, email, name, created_at FROM admins 
WHERE email = 'admin@huayueplasticsindustry.com';

-- Check sample data
SELECT COUNT(*) as total_news FROM news;
SELECT COUNT(*) as total_products FROM products;
SELECT COUNT(*) as total_messages FROM messages;

-- =====================================================
-- END OF SCRIPT
-- =====================================================