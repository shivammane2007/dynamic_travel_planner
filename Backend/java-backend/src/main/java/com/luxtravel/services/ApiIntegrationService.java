package com.luxtravel.services;

import com.luxtravel.models.planner.Hotel;
import com.luxtravel.models.planner.TripRoute;
import com.luxtravel.models.planner.WeatherInfo;

import java.util.List;

public interface ApiIntegrationService {
    
    /**
     * Gets travel options and routes between two cities.
     */
    List<TripRoute> getTravelRoutes(String source, String destination);
    
    /**
     * Gets hotel suggestions based on location and budget.
     */
    List<Hotel> getHotels(String destination, String hotelPreference);
    
    /**
     * Gets popular restaurants in the destination.
     */
    List<String> getRestaurants(String destination);
    
    /**
     * Gets top tourist attractions based on interests.
     */
    List<String> getAttractions(String destination, List<String> interests);
    
    /**
     * Gets current/forecast weather for the destination.
     */
    WeatherInfo getWeather(String destination);
}
