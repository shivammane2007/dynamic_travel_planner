package com.luxtravel.models;

import java.math.BigDecimal;

public class Package extends BaseModel {
    private String title;
    private String slug;
    private String city;
    private String country;
    private String description;
    private int durationDays;
    private int minPeople;
    private int maxPeople;
    private BigDecimal pricePerPerson;
    private BigDecimal rating;
    private int reviewsCount;
    private String heroImage;
    private String galleryImages; // JSON String
    private String highlights; // JSON String
    private String itinerary; // JSON String
    private String category;

    // Getters and Setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    
    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public int getDurationDays() { return durationDays; }
    public void setDurationDays(int durationDays) { this.durationDays = durationDays; }
    
    public int getMinPeople() { return minPeople; }
    public void setMinPeople(int minPeople) { this.minPeople = minPeople; }
    
    public int getMaxPeople() { return maxPeople; }
    public void setMaxPeople(int maxPeople) { this.maxPeople = maxPeople; }
    
    public BigDecimal getPricePerPerson() { return pricePerPerson; }
    public void setPricePerPerson(BigDecimal pricePerPerson) { this.pricePerPerson = pricePerPerson; }
    
    public BigDecimal getRating() { return rating; }
    public void setRating(BigDecimal rating) { this.rating = rating; }
    
    public int getReviewsCount() { return reviewsCount; }
    public void setReviewsCount(int reviewsCount) { this.reviewsCount = reviewsCount; }
    
    public String getHeroImage() { return heroImage; }
    public void setHeroImage(String heroImage) { this.heroImage = heroImage; }
    
    public String getGalleryImages() { return galleryImages; }
    public void setGalleryImages(String galleryImages) { this.galleryImages = galleryImages; }
    
    public String getHighlights() { return highlights; }
    public void setHighlights(String highlights) { this.highlights = highlights; }
    
    public String getItinerary() { return itinerary; }
    public void setItinerary(String itinerary) { this.itinerary = itinerary; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}
