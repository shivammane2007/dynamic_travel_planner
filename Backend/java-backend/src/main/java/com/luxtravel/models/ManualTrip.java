package com.luxtravel.models;

import java.sql.Date;

public class ManualTrip extends BaseModel {
    private Long userId;
    private String sourceCity;
    private String destinationCity;
    private int travelers;
    private String budget;
    private String travelMode;
    private String hotelType;
    private Date tripDate;
    private Date returnDate;
    private String generatedPlan; // JSON string

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    
    public String getSourceCity() { return sourceCity; }
    public void setSourceCity(String sourceCity) { this.sourceCity = sourceCity; }
    
    public String getDestinationCity() { return destinationCity; }
    public void setDestinationCity(String destinationCity) { this.destinationCity = destinationCity; }
    
    public int getTravelers() { return travelers; }
    public void setTravelers(int travelers) { this.travelers = travelers; }
    
    public String getBudget() { return budget; }
    public void setBudget(String budget) { this.budget = budget; }
    
    public String getTravelMode() { return travelMode; }
    public void setTravelMode(String travelMode) { this.travelMode = travelMode; }
    
    public String getHotelType() { return hotelType; }
    public void setHotelType(String hotelType) { this.hotelType = hotelType; }
    
    public Date getTripDate() { return tripDate; }
    public void setTripDate(Date tripDate) { this.tripDate = tripDate; }
    
    public Date getReturnDate() { return returnDate; }
    public void setReturnDate(Date returnDate) { this.returnDate = returnDate; }
    
    public String getGeneratedPlan() { return generatedPlan; }
    public void setGeneratedPlan(String generatedPlan) { this.generatedPlan = generatedPlan; }
}
