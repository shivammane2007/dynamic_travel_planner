package com.travelplanner.config;

public final class DatabaseConfig {
    private static final String URL = System.getenv().getOrDefault("DB_URL", "jdbc:sqlite:travel.db");
    private static final String USER = System.getenv().getOrDefault("DB_USER", "root");
    private static final String PASSWORD = System.getenv().getOrDefault("DB_PASSWORD", "");

    private DatabaseConfig() {
    }

    public static String getUrl() {
        return URL;
    }

    public static String getUser() {
        return USER;
    }

    public static String getPassword() {
        return PASSWORD;
    }
}
