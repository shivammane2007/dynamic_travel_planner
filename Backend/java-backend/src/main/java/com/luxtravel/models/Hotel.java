package com.luxtravel.models;

import java.math.BigDecimal;

public class Hotel extends BaseModel {
    private Long packageId;
    private String hotelName;
    private String city;
    private BigDecimal rating;
    private BigDecimal pricePerNight;
    private String amenities; // JSON string
    private String imageUrl;
    private String location;

    public Long getPackageId() { return packageId; }
    public void setPackageId(Long packageId) { this.packageId = packageId; }
    
    public String getHotelName() { return hotelName; }
    public void setHotelName(String hotelName) { this.hotelName = hotelName; }
    
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    
    public BigDecimal getRating() { return rating; }
    public void setRating(BigDecimal rating) { this.rating = rating; }
    
    public BigDecimal getPricePerNight() { return pricePerNight; }
    public void setPricePerNight(BigDecimal pricePerNight) { this.pricePerNight = pricePerNight; }
    
    public String getAmenities() { return amenities; }
    public void setAmenities(String amenities) { this.amenities = amenities; }
    
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
}
