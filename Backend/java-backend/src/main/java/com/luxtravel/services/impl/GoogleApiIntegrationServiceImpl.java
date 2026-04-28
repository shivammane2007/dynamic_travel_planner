package com.luxtravel.services.impl;

import com.luxtravel.models.planner.Hotel;
import com.luxtravel.models.planner.TripRoute;
import com.luxtravel.models.planner.WeatherInfo;
import com.luxtravel.services.ApiIntegrationService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class GoogleApiIntegrationServiceImpl implements ApiIntegrationService {
    
    private final String apiKey;

    public GoogleApiIntegrationServiceImpl(String apiKey) {
        this.apiKey = apiKey;
    }

    @Override
    public List<TripRoute> getTravelRoutes(String source, String destination) {
        // In a real implementation, we would make HTTP calls to Google Maps Directions API.
        // For now, we simulate real-world data intelligently.
        List<TripRoute> routes = new ArrayList<>();
        
        // Basic simulation logic based on common Indian cities (as requested in prompt examples)
        if (source.equalsIgnoreCase("Pune") && destination.equalsIgnoreCase("Mumbai")) {
            routes.add(new TripRoute("Car", "150 km", "3 hrs", "Comfortable via Expressway"));
            routes.add(new TripRoute("Train", "190 km", "3.5 hrs", "Deccan Queen / Vande Bharat"));
            routes.add(new TripRoute("Bus", "150 km", "4 hrs", "Shivneri AC Bus"));
        } else if (source.equalsIgnoreCase("Delhi") && destination.equalsIgnoreCase("Jaipur")) {
            routes.add(new TripRoute("Car", "280 km", "5 hrs", "Via NH48"));
            routes.add(new TripRoute("Train", "300 km", "4.5 hrs", "Vande Bharat Express"));
            routes.add(new TripRoute("Flight", "260 km", "1 hr", "Quickest option"));
        } else {
            // Generic fallback
            routes.add(new TripRoute("Flight", "Varies", "2 hrs", "Fastest"));
            routes.add(new TripRoute("Train", "Varies", "8 hrs", "Scenic"));
        }
        return routes;
    }

    @Override
    public List<Hotel> getHotels(String destination, String hotelPreference) {
        // Simulate Google Places API call for hotels
        List<Hotel> hotels = new ArrayList<>();
        Hotel h1 = new Hotel();
        h1.setName("The Taj Mahal Palace");
        h1.setRating(4.9);
        h1.setPricePerNight(15000);
        h1.setDistanceFromCenter("0.5 km from center");
        h1.setAmenities(Arrays.asList("Pool", "Spa", "Sea View", "Luxury"));
        h1.setImageUrl("https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=400&fit=crop");
        h1.setBookingUrl("https://www.google.com/travel/hotels");

        Hotel h2 = new Hotel();
        h2.setName("Trident Nariman Point");
        h2.setRating(4.7);
        h2.setPricePerNight(12000);
        h2.setDistanceFromCenter("1.2 km from center");
        h2.setAmenities(Arrays.asList("Pool", "Gym", "Ocean View"));
        h2.setImageUrl("https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500&h=400&fit=crop");
        h2.setBookingUrl("https://www.google.com/travel/hotels");

        Hotel h3 = new Hotel();
        h3.setName("ITC Maratha");
        h3.setRating(4.6);
        h3.setPricePerNight(9000);
        h3.setDistanceFromCenter("Near Airport");
        h3.setAmenities(Arrays.asList("Pool", "Airport Shuttle", "Fine Dining"));
        h3.setImageUrl("https://images.unsplash.com/photo-1542314831-c6a4d14d8393?w=500&h=400&fit=crop");
        h3.setBookingUrl("https://www.google.com/travel/hotels");

        Hotel h4 = new Hotel();
        h4.setName("Budget Inn " + destination);
        h4.setRating(3.9);
        h4.setPricePerNight(2500);
        h4.setDistanceFromCenter("3 km from center");
        h4.setAmenities(Arrays.asList("Free Wi-Fi", "Breakfast", "AC"));
        h4.setImageUrl("https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?w=500&h=400&fit=crop");
        h4.setBookingUrl("https://www.google.com/travel/hotels");

        if (hotelPreference != null && hotelPreference.contains("Luxury")) {
            hotels.add(h1);
            hotels.add(h2);
        } else if (hotelPreference != null && hotelPreference.contains("Budget")) {
            hotels.add(h4);
        } else {
            hotels.add(h2);
            hotels.add(h3);
            hotels.add(h4);
        }

        return hotels;
    }

    @Override
    public List<String> getRestaurants(String destination) {
        // Simulate Places API
        if (destination.equalsIgnoreCase("Mumbai")) {
            return Arrays.asList("Leopold Cafe", "Bademiya", "The Bombay Canteen", "Britannia & Co.");
        }
        return Arrays.asList("Local Cafe", "Downtown Bistro", "Street Food Market", "Fine Dining Restaurant");
    }

    @Override
    public List<String> getAttractions(String destination, List<String> interests) {
        // Simulate Places API
        if (destination.equalsIgnoreCase("Mumbai")) {
            return Arrays.asList("Gateway of India", "Marine Drive", "Juhu Beach", "Siddhivinayak Temple", "Colaba Causeway");
        }
        return Arrays.asList("City Museum", "Central Park", "Historic Downtown", "Main Shopping Street");
    }

    @Override
    public WeatherInfo getWeather(String destination) {
        // Simulate OpenWeatherMap API
        WeatherInfo w = new WeatherInfo();
        w.setCondition("Clear");
        w.setTemperature(31.5);
        w.setDescription("Humid with a slight breeze");
        w.setIconUrl("☀️");
        return w;
    }
}
