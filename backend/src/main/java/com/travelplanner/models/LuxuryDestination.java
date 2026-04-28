package com.travelplanner.models;

public class LuxuryDestination extends Destination {
    private final String luxuryTier;

    public LuxuryDestination(int id, String name, String country, String city, String subcategory, double costPerDay, String imageUrl, double rating, String luxuryTier) {
        super(id, name, country, city, "luxury", subcategory, costPerDay, imageUrl, rating);
        this.luxuryTier = luxuryTier;
    }

    @Override
    public String getHighlight() {
        return "Tier: " + luxuryTier;
    }
}
