CREATE DATABASE IF NOT EXISTS lux_travel;
USE lux_travel;

-- USERS
CREATE TABLE IF NOT EXISTS users (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    email       VARCHAR(150) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,            -- BCrypt hashed
    role        ENUM('ADMIN','USER') DEFAULT 'USER',
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- DESTINATIONS
CREATE TABLE IF NOT EXISTS destinations (
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    name         VARCHAR(150) NOT NULL,
    country      VARCHAR(100) NOT NULL,
    city         VARCHAR(100),
    description  TEXT,
    image_url    VARCHAR(500),
    climate      VARCHAR(50),
    best_season  VARCHAR(50),
    rating       DECIMAL(3,1) DEFAULT 0.0,
    price_level  ENUM('BUDGET','MID','LUXURY') DEFAULT 'MID',
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- TRIPS
CREATE TABLE IF NOT EXISTS trips (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT NOT NULL,
    destination_id  BIGINT NOT NULL,
    title           VARCHAR(200) NOT NULL,
    start_date      DATE NOT NULL,
    end_date        DATE NOT NULL,
    status          ENUM('PLANNED','CONFIRMED','ONGOING','COMPLETED','CANCELLED') DEFAULT 'PLANNED',
    budget          DECIMAL(12,2),
    notes           TEXT,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (destination_id) REFERENCES destinations(id) ON DELETE CASCADE
);

-- BOOKINGS
CREATE TABLE IF NOT EXISTS bookings (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    trip_id         BIGINT NOT NULL,
    user_id         BIGINT NOT NULL,
    booking_type    ENUM('FLIGHT','HOTEL','CAR','ACTIVITY','PACKAGE') NOT NULL,
    provider        VARCHAR(100),
    reference_code  VARCHAR(100),
    amount          DECIMAL(12,2) NOT NULL,
    currency        VARCHAR(10) DEFAULT 'USD',
    booking_date    DATE,
    status          ENUM('PENDING','CONFIRMED','CANCELLED','REFUNDED') DEFAULT 'PENDING',
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ITINERARIES
CREATE TABLE IF NOT EXISTS itineraries (
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    trip_id      BIGINT NOT NULL,
    day_number   INT NOT NULL,
    title        VARCHAR(200),
    description  TEXT,
    location     VARCHAR(200),
    start_time   TIME,
    end_time     TIME,
    activity_type VARCHAR(100),
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
);

-- SEED DATA (sample destinations)
INSERT IGNORE INTO destinations (name, country, city, description, image_url, climate, best_season, rating, price_level) VALUES
('Bali',       'Indonesia', 'Denpasar', 'Tropical paradise with rich culture',  '/indoneshia.webp', 'Tropical',   'April-October',   4.8, 'MID'),
('Tokyo',      'Japan',     'Tokyo',    'Futuristic city blending old and new',   '/japan_tokyo.webp','Temperate',  'March-May',       4.9, 'LUXURY'),
('Paris',      'France',    'Paris',    'City of lights, fashion and romance',    NULL,               'Continental','June-September',  4.7, 'LUXURY'),
('Santorini',  'Greece',    'Fira',     'Iconic white-blue cliffs over Aegean',   NULL,               'Mediterranean','May-September', 4.6, 'LUXURY'),
('New York',   'USA',       'New York', 'The city that never sleeps',             NULL,               'Humid',      'September-November',4.5,'MID');
