package com.luxtravel.models.planner;

import java.util.List;

public class Hotel {
    private String name;
    private double rating;
    private double pricePerNight;
    private String distanceFromCenter;
    private List<String> amenities;
    private String imageUrl;
    private String bookingUrl;

    public Hotel() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }

    public double getPricePerNight() { return pricePerNight; }
    public void setPricePerNight(double pricePerNight) { this.pricePerNight = pricePerNight; }

    public String getDistanceFromCenter() { return distanceFromCenter; }
    public void setDistanceFromCenter(String distanceFromCenter) { this.distanceFromCenter = distanceFromCenter; }

    public List<String> getAmenities() { return amenities; }
    public void setAmenities(List<String> amenities) { this.amenities = amenities; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getBookingUrl() { return bookingUrl; }
    public void setBookingUrl(String bookingUrl) { this.bookingUrl = bookingUrl; }
}
