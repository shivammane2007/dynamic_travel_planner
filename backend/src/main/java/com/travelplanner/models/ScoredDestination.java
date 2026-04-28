package com.travelplanner.models;

public class ScoredDestination {
    private final int id;
    private final String name;
    private final String country;
    private final String city;
    private final String theme;
    private final String subcategory;
    private final double costPerDay;
    private final String imageUrl;
    private final double rating;
    private final int score;
    private final String highlight;

    public ScoredDestination(Destination destination, int score) {
        this.id = destination.getId();
        this.name = destination.getName();
        this.country = destination.getCountry();
        this.city = destination.getCity();
        this.theme = destination.getTheme();
        this.subcategory = destination.getSubcategory();
        this.costPerDay = destination.getCostPerDay();
        this.imageUrl = destination.getImageUrl();
        this.rating = destination.getRating();
        this.score = score;
        this.highlight = destination.getHighlight();
    }

    public int getId() { return id; }
    public String getName() { return name; }
    public String getCountry() { return country; }
    public String getCity() { return city; }
    public String getTheme() { return theme; }
    public String getSubcategory() { return subcategory; }
    public double getCostPerDay() { return costPerDay; }
    public String getImageUrl() { return imageUrl; }
    public double getRating() { return rating; }
    public int getScore() { return score; }
    public String getHighlight() { return highlight; }
}
