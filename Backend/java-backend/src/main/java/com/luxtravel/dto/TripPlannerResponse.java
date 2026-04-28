package com.luxtravel.dto;

import com.luxtravel.models.planner.BudgetPlan;
import com.luxtravel.models.planner.Hotel;
import com.luxtravel.models.planner.ItineraryItem;
import com.luxtravel.models.planner.TripRoute;
import com.luxtravel.models.planner.WeatherInfo;

import java.util.List;

public class TripPlannerResponse {
    private String sourceCity;
    private String destinationCity;
    private List<TripRoute> travelSuggestions;
    private String bestTravelOption;
    private List<Hotel> hotelSuggestions;
    private List<String> restaurants;
    private List<String> attractions;
    private List<ItineraryItem> itinerary;
    private BudgetPlan budgetBreakdown;
    private WeatherInfo weather;
    private List<String> smartSuggestions;

    public TripPlannerResponse() {}

    public String getSourceCity() { return sourceCity; }
    public void setSourceCity(String sourceCity) { this.sourceCity = sourceCity; }

    public String getDestinationCity() { return destinationCity; }
    public void setDestinationCity(String destinationCity) { this.destinationCity = destinationCity; }

    public List<TripRoute> getTravelSuggestions() { return travelSuggestions; }
    public void setTravelSuggestions(List<TripRoute> travelSuggestions) { this.travelSuggestions = travelSuggestions; }

    public String getBestTravelOption() { return bestTravelOption; }
    public void setBestTravelOption(String bestTravelOption) { this.bestTravelOption = bestTravelOption; }

    public List<Hotel> getHotelSuggestions() { return hotelSuggestions; }
    public void setHotelSuggestions(List<Hotel> hotelSuggestions) { this.hotelSuggestions = hotelSuggestions; }

    public List<String> getRestaurants() { return restaurants; }
    public void setRestaurants(List<String> restaurants) { this.restaurants = restaurants; }

    public List<String> getAttractions() { return attractions; }
    public void setAttractions(List<String> attractions) { this.attractions = attractions; }

    public List<ItineraryItem> getItinerary() { return itinerary; }
    public void setItinerary(List<ItineraryItem> itinerary) { this.itinerary = itinerary; }

    public BudgetPlan getBudgetBreakdown() { return budgetBreakdown; }
    public void setBudgetBreakdown(BudgetPlan budgetBreakdown) { this.budgetBreakdown = budgetBreakdown; }

    public WeatherInfo getWeather() { return weather; }
    public void setWeather(WeatherInfo weather) { this.weather = weather; }

    public List<String> getSmartSuggestions() { return smartSuggestions; }
    public void setSmartSuggestions(List<String> smartSuggestions) { this.smartSuggestions = smartSuggestions; }
}
