package com.travelplanner.models;

public class AdventureDestination extends Destination {
    private final String adventureLevel;

    public AdventureDestination(int id, String name, String country, String city, String subcategory, double costPerDay, String imageUrl, double rating, String adventureLevel) {
        super(id, name, country, city, "adventure", subcategory, costPerDay, imageUrl, rating);
        this.adventureLevel = adventureLevel;
    }

    @Override
    public String getHighlight() {
        return "Adventure Level: " + adventureLevel;
    }
}
