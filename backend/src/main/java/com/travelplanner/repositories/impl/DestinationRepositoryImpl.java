package com.travelplanner.repositories.impl;

import com.travelplanner.config.DatabaseConfig;
import com.travelplanner.models.AdventureDestination;
import com.travelplanner.models.BeachDestination;
import com.travelplanner.models.CulturalDestination;
import com.travelplanner.models.Destination;
import com.travelplanner.models.LuxuryDestination;
import com.travelplanner.repositories.DestinationRepository;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class DestinationRepositoryImpl implements DestinationRepository {

    private Connection getConnection() throws Exception {
        Class.forName("org.sqlite.JDBC");
        return DriverManager.getConnection(DatabaseConfig.getUrl());
    }

    private Destination mapRowToDestination(ResultSet rs) throws Exception {
        int id = rs.getInt("id");
        String name = rs.getString("name");
        String country = rs.getString("country");
        String city = rs.getString("city");
        String theme = rs.getString("theme");
        String subcategory = rs.getString("subcategory");
        double costPerDay = rs.getDouble("cost_per_day");
        String imageUrl = rs.getString("image_url");
        double rating = rs.getDouble("rating");

        if ("adventure".equalsIgnoreCase(theme)) {
            return new AdventureDestination(id, name, country, city, subcategory, costPerDay, imageUrl, rating, "Extreme");
        } else if ("beach".equalsIgnoreCase(theme)) {
            return new BeachDestination(id, name, country, city, subcategory, costPerDay, imageUrl, rating, "Tropical");
        } else if ("culture".equalsIgnoreCase(theme)) {
            return new CulturalDestination(id, name, country, city, subcategory, costPerDay, imageUrl, rating, "Ancient");
        } else {
            return new LuxuryDestination(id, name, country, city, subcategory, costPerDay, imageUrl, rating, "Ultra-Luxury");
        }
    }

    @Override
    public List<Destination> findAll() {
        List<Destination> destinations = new ArrayList<>();
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement("SELECT * FROM destinations");
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                destinations.add(mapRowToDestination(rs));
            }
        } catch (Exception e) {
            System.err.println("Database fetch error: " + e.getMessage());
            // Return empty list if DB is not setup or fails
        }
        return destinations;
    }

    @Override
    public Optional<Destination> findById(int id) {
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement("SELECT * FROM destinations WHERE id = ?")) {
            
            stmt.setInt(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapRowToDestination(rs));
                }
            }
        } catch (Exception e) {
            System.err.println("Database fetch error: " + e.getMessage());
        }
        return Optional.empty();
    }
}
