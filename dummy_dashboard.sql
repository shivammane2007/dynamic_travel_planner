USE lux_travel;

INSERT IGNORE INTO users (id, full_name, email, password, role) VALUES 
(2, 'John Doe', 'john@example.com', 'dummy', 'USER'),
(3, 'Jane Smith', 'jane@example.com', 'dummy', 'USER');

INSERT IGNORE INTO bookings (id, user_id, package_id, travelers, total_price, booking_date, travel_date, status) VALUES
(1, 2, 1, 2, 4998.00, DATE_SUB(CURDATE(), INTERVAL 5 DAY), DATE_ADD(CURDATE(), INTERVAL 10 DAY), 'CONFIRMED'),
(2, 3, 2, 4, 7196.00, DATE_SUB(CURDATE(), INTERVAL 2 DAY), DATE_ADD(CURDATE(), INTERVAL 20 DAY), 'PENDING'),
(3, 2, 3, 1, 2199.00, DATE_SUB(CURDATE(), INTERVAL 15 DAY), DATE_SUB(CURDATE(), INTERVAL 5 DAY), 'CONFIRMED');

INSERT IGNORE INTO contact_messages (id, full_name, email, subject, message, sent_at) VALUES
(1, 'Alice Johnson', 'alice@test.com', 'Custom Trip to Italy', 'Hello, I would like to arrange a custom trip to Rome for 5 days. What are my options?', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(2, 'Bob Williams', 'bob@test.com', 'Refund Inquiry', 'Hi, I need to cancel my booking to Bali due to an emergency. How do I proceed with a refund?', DATE_SUB(NOW(), INTERVAL 3 HOUR));

INSERT IGNORE INTO manual_trips (id, user_id, source_city, destination_city, travelers, budget, travel_mode, hotel_type, trip_date, return_date) VALUES
(1, 2, 'New York', 'Tokyo', 2, 'Luxury ($5000+)', 'Flight', '5-Star', DATE_ADD(CURDATE(), INTERVAL 30 DAY), DATE_ADD(CURDATE(), INTERVAL 40 DAY)),
(2, 3, 'London', 'Paris', 4, 'Mid-Range ($2000-$5000)', 'Train', '4-Star', DATE_ADD(CURDATE(), INTERVAL 15 DAY), DATE_ADD(CURDATE(), INTERVAL 20 DAY));
