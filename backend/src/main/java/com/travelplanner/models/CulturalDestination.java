package com.travelplanner.models;

public class CulturalDestination extends Destination {
    private final String heritageType;

    public CulturalDestination(int id, String name, String country, String city, String subcategory, double costPerDay, String imageUrl, double rating, String heritageType) {
        super(id, name, country, city, "cultural", subcategory, costPerDay, imageUrl, rating);
        this.heritageType = heritageType;
    }

    @Override
    public String getHighlight() {
        return "Heritage: " + heritageType;
    }
}
