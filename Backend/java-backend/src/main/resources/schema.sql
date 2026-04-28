CREATE DATABASE IF NOT EXISTS lux_travel;
USE lux_travel;

-- DROP OLD TABLES
DROP TABLE IF EXISTS itineraries;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS manual_trips;
DROP TABLE IF EXISTS contact_messages;
DROP TABLE IF EXISTS hotels;
DROP TABLE IF EXISTS packages;
DROP TABLE IF EXISTS trips;
DROP TABLE IF EXISTS destinations;
DROP TABLE IF EXISTS blogs;
DROP TABLE IF EXISTS users;

-- 1. USERS TABLE
CREATE TABLE users (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name   VARCHAR(100) NOT NULL,
    email       VARCHAR(150) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    role        ENUM('ADMIN','USER') DEFAULT 'USER',
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. PACKAGES TABLE
CREATE TABLE packages (
    id               BIGINT AUTO_INCREMENT PRIMARY KEY,
    title            VARCHAR(200) NOT NULL,
    slug             VARCHAR(200) NOT NULL UNIQUE,
    city             VARCHAR(100),
    country          VARCHAR(100),
    description      TEXT,
    duration_days    INT NOT NULL,
    min_people       INT DEFAULT 1,
    max_people       INT DEFAULT 10,
    price_per_person DECIMAL(10,2) NOT NULL,
    rating           DECIMAL(3,1) DEFAULT 0.0,
    reviews_count    INT DEFAULT 0,
    hero_image       VARCHAR(500),
    gallery_images   JSON,
    highlights       JSON,
    itinerary        JSON,
    category         VARCHAR(100),
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. HOTELS TABLE
CREATE TABLE hotels (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    package_id      BIGINT,
    hotel_name      VARCHAR(200) NOT NULL,
    city            VARCHAR(100),
    rating          DECIMAL(3,1),
    price_per_night DECIMAL(10,2),
    amenities       JSON,
    image_url       VARCHAR(500),
    location        VARCHAR(200),
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE SET NULL
);

-- 4. BOOKINGS TABLE
CREATE TABLE bookings (
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id      BIGINT NOT NULL,
    package_id   BIGINT NOT NULL,
    travelers    INT NOT NULL,
    total_price  DECIMAL(12,2) NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    travel_date  DATE,
    status       ENUM('PENDING','CONFIRMED','CANCELLED') DEFAULT 'PENDING',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE
);

-- 5. FAVORITES TABLE
CREATE TABLE favorites (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id    BIGINT NOT NULL,
    package_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_package (user_id, package_id)
);

-- 6. CONTACT MESSAGES TABLE
CREATE TABLE contact_messages (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name  VARCHAR(150) NOT NULL,
    email      VARCHAR(150) NOT NULL,
    subject    VARCHAR(200),
    message    TEXT NOT NULL,
    sent_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. MANUAL TRIPS TABLE
CREATE TABLE manual_trips (
    id               BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id          BIGINT,
    source_city      VARCHAR(100) NOT NULL,
    destination_city VARCHAR(100) NOT NULL,
    travelers        INT NOT NULL,
    budget           VARCHAR(50),
    travel_mode      VARCHAR(50),
    hotel_type       VARCHAR(50),
    trip_date        DATE,
    return_date      DATE,
    generated_plan   JSON,
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 8. BLOGS TABLE
CREATE TABLE blogs (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    title      VARCHAR(255) NOT NULL,
    category   VARCHAR(100),
    image_url  VARCHAR(500),
    content    TEXT,
    author     VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- SEED DATA
-- ==========================================

-- Admin User
INSERT IGNORE INTO users (full_name, email, password, role) VALUES 
('Admin User', 'admin@luxtravel.com', '$2a$10$w09A2Ew2a3G1O6Q5P5P06O8Hw0T2w0A5X9W1q7Y0M5R1E3D5X0', 'ADMIN');

-- Packages
INSERT IGNORE INTO packages (id, title, slug, city, country, description, duration_days, price_per_person, rating, reviews_count, hero_image) VALUES
(1, 'Parisian Romance', 'parisian-romance', 'Paris', 'France', 'Experience the magic of Paris with 7 days of luxury, culture, and romance.', 7, 2499.00, 4.9, 328, 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=600&fit=crop'),
(2, 'Bali Escape', 'bali-escape', 'Bali', 'Indonesia', 'All-inclusive tropical getaway with spa treatments and beach time.', 5, 1799.00, 4.8, 512, '/assets/images/indonesia-bali.jpg'),
(3, 'Tokyo Adventure', 'tokyo-adventure', 'Tokyo', 'Japan', 'Immerse yourself in Japanese culture with traditional and modern experiences.', 8, 2199.00, 4.7, 276, '/assets/images/japan-tokyo.jpg'),
(4, 'NYC Discovery', 'nyc-discovery', 'New York', 'USA', 'See Broadway shows, visit iconic museums, and enjoy world-class dining.', 6, 2099.00, 4.6, 441, 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&h=400&fit=crop'),
(5, 'Dubai Luxury', 'dubai-luxury', 'Dubai', 'UAE', 'Experience ultra-modern luxury with desert safaris and world-class shopping.', 4, 1999.00, 4.8, 389, 'https://images.unsplash.com/photo-1512453475885-1b2d8b5c8e1e?w=500&h=400&fit=crop'),
(6, 'European Grand Tour', 'european-grand-tour', 'Paris', 'France', 'Visit multiple European capitals with guided tours and luxury accommodations.', 14, 3499.00, 4.9, 203, 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=400&fit=crop'),
(7, 'Kyoto Traditional', 'kyoto-traditional', 'Kyoto', 'Japan', 'Explore ancient temples, traditional tea ceremonies, and peaceful gardens.', 6, 1899.00, 4.7, 294, 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=500&h=400&fit=crop'),
(8, 'Beach Paradise', 'beach-paradise', 'Bali', 'Indonesia', 'Surfing, diving, and relaxation on the most beautiful tropical beaches.', 5, 1599.00, 4.6, 567, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=400&fit=crop');

-- Blogs
INSERT IGNORE INTO blogs (title, category, image_url, content, author) VALUES
('10 Hidden Gems You Must Visit in Paris', 'Guides', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&h=400&fit=crop', 'Discover the lesser-known attractions that make Paris truly magical, from charming cafés to secret gardens...', 'Sophie Martin'),
('Bali on a Budget: Travel Smart in 2024', 'Tips', '/assets/images/indonesia-bali.jpg', 'How to experience luxury travel in Bali without breaking the bank. Complete tips and money-saving hacks...', 'David Kumar'),
('Tokyo''s Best Neighborhoods for First-Timers', 'Guides', '/assets/images/japan-tokyo.jpg', 'Navigate Tokyo like a local! Our comprehensive guide to the must-visit neighborhoods and what to do there...', 'Alex Tanaka'),
('Ultimate New York City Travel Guide', 'Guides', 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&h=400&fit=crop', 'Everything you need to know about visiting NYC: attractions, dining, nightlife, and insider tips...', 'Emma Williams'),
('Best Times to Visit Popular Destinations', 'Tips', 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=400&fit=crop', 'Plan your trip perfectly by knowing the best seasons to visit destinations around the world...', 'Michael Chen'),
('Luxury Hotel Chains We Recommend', 'Reviews', 'https://images.unsplash.com/photo-1470252649378-9c29740ff023?w=500&h=400&fit=crop', 'Explore the world''s best luxury hotel chains that guarantee unforgettable stays and premium service...', 'Sarah Johnson');

-- Hotels
INSERT IGNORE INTO hotels (hotel_name, city, rating, price_per_night, image_url, location) VALUES
('The Taj Mahal Palace', 'Mumbai', 4.9, 15000.00, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=400&fit=crop', '0.5 km from center'),
('Trident Nariman Point', 'Mumbai', 4.7, 12000.00, 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500&h=400&fit=crop', '1.2 km from center'),
('Budget Inn Mumbai', 'Mumbai', 3.9, 2500.00, 'https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?w=500&h=400&fit=crop', '3 km from center');
