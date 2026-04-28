CREATE TABLE IF NOT EXISTS destinations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    city TEXT NOT NULL,
    theme TEXT NOT NULL,
    subcategory TEXT NOT NULL,
    cost_per_day REAL NOT NULL,
    image_url TEXT NOT NULL,
    rating REAL NOT NULL
);
