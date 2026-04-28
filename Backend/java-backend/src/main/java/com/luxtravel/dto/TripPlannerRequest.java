package com.luxtravel.dto;

import java.util.List;

public class TripPlannerRequest {
    private String sourceCity;
    private String destinationCity;
    private String departureDate;
    private String returnDate; // optional
    private int travelers;
    private String budget; // Low, Medium, Luxury, Custom Range
    private String travelMode; // Car, Bus, Train, Flight
    private String hotelPreference; // Budget, 3 Star, 4 Star, 5 Star, Luxury
    private List<String> interests; // Food, Beaches, Shopping, Nature, Nightlife, Religious, Adventure

    public TripPlannerRequest() {}

    public String getSourceCity() { return sourceCity; }
    public void setSourceCity(String sourceCity) { this.sourceCity = sourceCity; }

    public String getDestinationCity() { return destinationCity; }
    public void setDestinationCity(String destinationCity) { this.destinationCity = destinationCity; }

    public String getDepartureDate() { return departureDate; }
    public void setDepartureDate(String departureDate) { this.departureDate = departureDate; }

    public String getReturnDate() { return returnDate; }
    public void setReturnDate(String returnDate) { this.returnDate = returnDate; }

    public int getTravelers() { return travelers; }
    public void setTravelers(int travelers) { this.travelers = travelers; }

    public String getBudget() { return budget; }
    public void setBudget(String budget) { this.budget = budget; }

    public String getTravelMode() { return travelMode; }
    public void setTravelMode(String travelMode) { this.travelMode = travelMode; }

    public String getHotelPreference() { return hotelPreference; }
    public void setHotelPreference(String hotelPreference) { this.hotelPreference = hotelPreference; }

    public List<String> getInterests() { return interests; }
    public void setInterests(List<String> interests) { this.interests = interests; }
}
