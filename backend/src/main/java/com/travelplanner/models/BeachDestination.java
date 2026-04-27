package com.travelplanner.models;

public class BeachDestination extends Destination {
    private final String beachType;

    public BeachDestination(int id, String name, String country, String city, String subcategory, double costPerDay, String imageUrl, double rating, String beachType) {
        super(id, name, country, city, "beach", subcategory, costPerDay, imageUrl, rating);
        this.beachType = beachType;
    }

    @Override
    public String getHighlight() {
        return "Beach: " + beachType;
    }
}
