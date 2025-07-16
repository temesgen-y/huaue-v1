CREATE DATABASE huayue_plastics_db;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    otp_code VARCHAR(10),
    otp_expiry TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMP NOT NULL DEFAULT NOW(),
    is_read BOOLEAN NOT NULL DEFAULT FALSE
);

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

CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    reset_token VARCHAR(255),
    reset_token_expiry TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);
CREATE INDEX IF NOT EXISTS idx_admins_otp_expiry ON admins(otp_expiry);
CREATE INDEX IF NOT EXISTS idx_messages_email ON messages(email);
CREATE INDEX IF NOT EXISTS idx_messages_submitted_at ON messages(submitted_at);
CREATE INDEX IF NOT EXISTS idx_messages_is_read ON messages(is_read);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);
CREATE INDEX IF NOT EXISTS idx_news_publish_date ON news(publish_date);
CREATE INDEX IF NOT EXISTS idx_news_created_at ON news(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);

INSERT INTO admins (id, email, password_hash, name, created_at) VALUES (3, 'admin@huayueplasticsindustry.com', '$2b$10$hashed_password_here', 'System Administrator', '2025-07-04 19:40:27.82469') ON CONFLICT (id) DO NOTHING;

INSERT INTO messages (id, name, email, subject, message, submitted_at, is_read) VALUES 
(19, 'Masresha Yayeh', 'admin@huayueplasticsindustry.com', 'partnership', 'Test 1', '2025-07-04 19:13:42.954611', true),
(18, 'Masresha Yayeh', 'masresha004@gmail.com', 'partnership', 'I''am looking for huayue pipe.I''am looking for huayue pipe.', '2025-07-04 19:04:02.674816', false),
(5, 'Haymanot AMSALU', 'admin@huayueplastics.com', 'partnership', 'I am looking for huway products to jigjiga', '2025-07-03 16:23:38.804809', false),
(4, 'Masresha Yayeh', 'masresha004@gmail.com', 'other', 'test sunday test sundaytest sundayvv test sundayv test sunday test sunday test sunday test sunday test sunday test sunday test  test sunday test sundaytest sundayvv test sundayv test sunday test sunday test sunday test sunday test sunday test sunday test ', '2025-06-15 18:56:17.897064', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO products (id, name, description, category, image_url, specifications, certifications, is_active, created_at, updated_at) VALUES 
(1, 'Heavy-Duty Steel Pipes', 'High-strength carbon steel pipes for oil & gas transmission, designed to withstand extreme pressure and temperature conditions.', 'HUAYUE', 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400', 'Material: Carbon Steel, Pressure Rating: 5000 PSI, Temperature Range: -20°C to 400°C', 'Industrial Grade', true, '2025-06-15 16:26:22.778313', '2025-06-15 16:26:22.778313'),
(2, 'Pipe Fittings & Flanges', 'Precision-engineered fittings, elbows, and flanges manufactured to ANSI, API, and international standards for reliable connections.', 'HUAYUE', 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400', 'Standards: ANSI B16.5, API 6A, Size Range: 1/2" to 48", Material: Forged Steel', 'ANSI Certified', true, '2025-06-15 16:26:22.778313', '2025-06-15 16:26:22.778313'),
(3, 'Welded Pipe Systems', 'Custom-welded pipeline systems for large-scale industrial projects, including pre-fabricated modules and on-site installation.', 'HUAYUE', 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400', 'Welding: GTAW/GMAW, Material: Various Steel Grades, Custom Fabrication Available', 'Custom Built', true, '2025-06-15 16:26:22.778313', '2025-06-15 16:26:22.778313'),
(4, 'Seamless Steel Pipes', 'High-pressure seamless pipes for critical applications in power plants, refineries, and chemical processing facilities.', 'HUAYUE', 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400', 'Manufacturing: Hot Rolled/Cold Drawn, Pressure Rating: Up to 15000 PSI, Length: Up to 12m', 'High Pressure', true, '2025-06-15 16:26:22.778313', '2025-06-15 16:26:22.778313'),
(5, 'Alloy Steel Pipes', 'Specialized alloy steel pipes designed for extreme temperature and corrosive environments in petrochemical applications.', 'HUAYUE', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400', 'Alloy Grades: P11, P22, P91, Corrosion Resistance: Excellent, Service Life: 25+ years', 'Corrosion Resistant', true, '2025-06-15 16:26:22.778313', '2025-06-15 16:26:22.778313'),
(6, 'Pipeline Infrastructure', 'Complete pipeline infrastructure solutions including design, manufacturing, and installation for large-scale energy projects.', 'HUAYUE', 'https://images.unsplash.com/photo-1596142332133-327b0a5c0789?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400', 'Project Scale: Up to 1000km, Services: Design to Commissioning, Warranty: 10 years', 'Turnkey Solution', true, '2025-06-15 16:26:22.778313', '2025-06-15 16:26:22.778313'),
(7, 'Sanitary Stainless Steel', 'Food-grade stainless steel piping systems with smooth interior surfaces for pharmaceutical and food processing applications.', 'EIDER', 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400', 'Material: 316L SS, Surface Finish: 32 Ra, Sanitary Standards: 3A, BPE', 'FDA Approved', true, '2025-06-15 16:26:41.117742', '2025-06-15 16:26:41.117742'),
(8, 'Clean Room Piping', 'Ultra-clean piping systems for semiconductor and biotechnology facilities with exceptional contamination control.', 'EIDER', 'https://images.unsplash.com/photo-1567789884554-0b844b597180?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400', 'Cleanliness: ISO 14644-1 Class 1, Material: Electropolished 316L, Particle Count: <0.1 µm', 'Ultra Clean', true, '2025-06-15 16:26:41.117742', '2025-06-15 16:26:41.117742'),
(9, 'Precision Tube Fittings', 'High-precision tube fittings and connections engineered for critical applications requiring zero-leak performance.', 'EIDER', 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400', 'Tolerances: ±0.05mm, Leak Rate: <1×10⁻⁹ mbar·l/s, Pressure: Up to 6000 PSI', 'Zero Leak', true, '2025-06-15 16:26:41.117742', '2025-06-15 16:26:41.117742'),
(10, 'Pharmaceutical Systems', 'Validated piping systems for pharmaceutical manufacturing with full documentation and compliance certification.', 'EIDER', 'https://images.unsplash.com/photo-1615729947596-a598e5de52e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400', 'Validation: IQ/OQ/PQ, Standards: FDA 21 CFR Part 11, GAMP 5, Documentation: Complete', 'GMP Validated', true, '2025-06-15 16:26:41.117742', '2025-06-15 16:26:41.117742'),
(11, 'Vacuum Systems', 'Specialized vacuum piping for research laboratories and semiconductor manufacturing with ultra-low outgassing materials.', 'EIDER', 'https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400', 'Vacuum Level: 10⁻¹² Torr, Outgassing Rate: <10⁻¹² Torr·l/s·cm², Bakeout: 450°C', 'Low Outgassing', true, '2025-06-15 16:26:41.117742', '2025-06-15 16:26:41.117742'),
(12, 'Process Control Tubing', 'Instrumentation and process control tubing for analytical and measurement systems requiring precise flow characteristics.', 'EIDER', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400', 'Flow Precision: ±0.1%, Material: 316L SS, Instrument Compatibility: Universal', 'High Precision', true, '2025-06-15 16:26:41.117742', '2025-06-15 16:26:41.117742')
ON CONFLICT (id) DO NOTHING;

INSERT INTO news (id, title, summary, content, publish_date, author, created_at, updated_at) VALUES (1, 'HUAYUE PLASTICS INDUSTRY Achieves ISO 14001 Environmental Certification', 'Our commitment to environmental stewardship has been recognized with ISO 14001 certification, demonstrating our dedication to sustainable manufacturing practices.', 'Recognition for outstanding contribution to sustainable manufacturing and job creation in the Horn of Africa region.', '2025-07-03 15:52:54.892316', 'Admin', '2025-07-03 15:52:54.892316', '2025-07-03 15:52:54.892316') ON CONFLICT (id) DO NOTHING;

INSERT INTO contact_messages (id, first_name, last_name, email, phone, company, subject, message, is_read, created_at) VALUES 
(3, 'Masresha', 'Zewdie', 'admin@example.com', '+251928730333', 'engineering', 'huayue', 'test 1 test 1test 1test 1test 1test 1test 1test 1test 1', true, '2025-06-05 14:43:14.247859'),
(2, 'Masresha', 'yayeh', 'hannayilma@doqatech.com', '+251928730333', 'doqatech', 'support', 'Test two after login message', true, '2025-06-05 14:01:36.285594'),
(1, 'fvdfvdxc', 'fvcdxfvcdx', 'heloomas2021@gmail.com', '+251928730333', 'doqatech', 'eider', 'dgfdcvgf', true, '2025-06-05 13:48:02.745733')
ON CONFLICT (id) DO NOTHING;