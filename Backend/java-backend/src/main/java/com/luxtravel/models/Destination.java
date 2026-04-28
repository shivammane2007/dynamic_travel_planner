package com.luxtravel.models;

import java.math.BigDecimal;

public class Destination extends BaseModel {
    public enum PriceLevel { BUDGET, MID, LUXURY }

    private String name;
    private String country;
    private String city;
    private String description;
    private String imageUrl;
    private String climate;
    private String bestSeason;
    private BigDecimal rating;
    private PriceLevel priceLevel = PriceLevel.MID;

    public Destination() {}

    @Override
    public String getTableName() { return "destinations"; }

    @Override
    public boolean validate() {
        return name != null && !name.trim().isEmpty()
                && country != null && !country.trim().isEmpty();
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getClimate() { return climate; }
    public void setClimate(String climate) { this.climate = climate; }

    public String getBestSeason() { return bestSeason; }
    public void setBestSeason(String bestSeason) { this.bestSeason = bestSeason; }

    public BigDecimal getRating() { return rating; }
    public void setRating(BigDecimal rating) { this.rating = rating; }

    public PriceLevel getPriceLevel() { return priceLevel; }
    public void setPriceLevel(PriceLevel priceLevel) { this.priceLevel = priceLevel; }
}
