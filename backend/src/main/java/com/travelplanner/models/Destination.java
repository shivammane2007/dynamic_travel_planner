package com.travelplanner.models;

public abstract class Destination {
    private int id;
    private String name;
    private String country;
    private String city;
    private String theme;
    private String subcategory;
    private double costPerDay;
    private String imageUrl;
    private double rating;

    public Destination(int id, String name, String country, String city, String theme, String subcategory, double costPerDay, String imageUrl, double rating) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.city = city;
        this.theme = theme;
        this.subcategory = subcategory;
        this.costPerDay = costPerDay;
        this.imageUrl = imageUrl;
        this.rating = rating;
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

    public abstract String getHighlight();
}
