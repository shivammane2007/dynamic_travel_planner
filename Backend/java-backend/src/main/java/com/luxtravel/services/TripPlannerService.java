package com.luxtravel.services;

import com.luxtravel.dto.TripPlannerRequest;
import com.luxtravel.dto.TripPlannerResponse;
import com.luxtravel.models.planner.BudgetPlan;
import com.luxtravel.models.planner.Hotel;
import com.luxtravel.models.planner.ItineraryItem;
import com.luxtravel.models.planner.TripRoute;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class TripPlannerService {

    private final ApiIntegrationService apiService;

    public TripPlannerService(ApiIntegrationService apiService) {
        this.apiService = apiService;
    }

    public TripPlannerResponse generateTripPlan(TripPlannerRequest request) {
        TripPlannerResponse response = new TripPlannerResponse();
        response.setSourceCity(request.getSourceCity());
        response.setDestinationCity(request.getDestinationCity());

        // 1. Get Travel Routes
        List<TripRoute> routes = apiService.getTravelRoutes(request.getSourceCity(), request.getDestinationCity());
        response.setTravelSuggestions(routes);

        // Best travel option logic
        if (!routes.isEmpty()) {
            response.setBestTravelOption(routes.get(0).getMode() + " - " + routes.get(0).getRecommendedText());
        }

        // 2. Get Hotels
        List<Hotel> hotels = apiService.getHotels(request.getDestinationCity(), request.getHotelPreference());
        response.setHotelSuggestions(hotels);

        // 3. Get Restaurants & Attractions
        List<String> restaurants = apiService.getRestaurants(request.getDestinationCity());
        response.setRestaurants(restaurants);

        List<String> attractions = apiService.getAttractions(request.getDestinationCity(), request.getInterests());
        response.setAttractions(attractions);

        // 4. Get Weather
        response.setWeather(apiService.getWeather(request.getDestinationCity()));

        // 5. Generate Itinerary (Smart logic)
        response.setItinerary(generateItinerary(request, attractions, restaurants));

        // 6. Generate Budget Breakdown
        response.setBudgetBreakdown(calculateBudget(request, hotels));

        // 7. Smart Suggestions
        List<String> smartSuggestions = new ArrayList<>();
        if (request.getBudget() != null && request.getBudget().equalsIgnoreCase("Low")) {
            smartSuggestions.add("Consider traveling by Train and staying in Budget Hotels to save money.");
        }
        if (response.getWeather().getCondition().equalsIgnoreCase("Rainy")) {
            smartSuggestions.add("It looks like it might rain. We recommend indoor attractions like museums or malls.");
        }
        smartSuggestions.add("Book your hotels at least 2 weeks in advance for the best rates.");
        response.setSmartSuggestions(smartSuggestions);

        return response;
    }

    private List<ItineraryItem> generateItinerary(TripPlannerRequest req, List<String> attractions, List<String> restaurants) {
        List<ItineraryItem> itinerary = new ArrayList<>();
        // Simple logic for a 3-day trip if dates are not parsed, or parse dates in a real app.
        // Assuming 3 days for now
        int days = 3;
        
        for (int i = 1; i <= days; i++) {
            ItineraryItem item = new ItineraryItem();
            item.setDay(i);
            if (i == 1) {
                item.setTitle("Arrival & Exploring Nearby");
                item.setActivities(Arrays.asList(
                    "Reach " + req.getDestinationCity() + " and check-in to your hotel",
                    attractions.size() > 0 ? "Visit " + attractions.get(0) : "Explore local neighborhood",
                    restaurants.size() > 0 ? "Dinner at " + restaurants.get(0) : "Dinner at a local cafe"
                ));
            } else if (i == days) {
                item.setTitle("Departure");
                item.setActivities(Arrays.asList(
                    "Breakfast at hotel",
                    attractions.size() > 1 ? "Morning visit to " + attractions.get(1) : "Last minute shopping",
                    "Head back to " + req.getSourceCity()
                ));
            } else {
                item.setTitle("Sightseeing & Adventure");
                item.setActivities(Arrays.asList(
                    attractions.size() > 2 ? "Explore " + attractions.get(2) : "Full day city tour",
                    restaurants.size() > 1 ? "Lunch at " + restaurants.get(1) : "Lunch at famous spot",
                    attractions.size() > 3 ? "Evening at " + attractions.get(3) : "Relaxing evening"
                ));
            }
            itinerary.add(item);
        }
        return itinerary;
    }

    private BudgetPlan calculateBudget(TripPlannerRequest req, List<Hotel> hotels) {
        BudgetPlan plan = new BudgetPlan();
        plan.setCurrency("INR"); // Assuming India for Pune->Mumbai example
        
        int travelers = req.getTravelers() > 0 ? req.getTravelers() : 1;
        int days = 3; // Fixed for now
        
        double avgHotelPrice = hotels.isEmpty() ? 3000 : hotels.get(0).getPricePerNight();
        
        plan.setTravelCost(1500 * travelers); // Rough estimate
        plan.setHotelCost(avgHotelPrice * days * Math.ceil(travelers / 2.0)); // 2 per room
        plan.setFoodCost(1000 * travelers * days);
        plan.setLocalTransport(500 * days);
        plan.setActivities(1000 * travelers);
        
        double total = plan.getTravelCost() + plan.getHotelCost() + plan.getFoodCost() + plan.getLocalTransport() + plan.getActivities();
        plan.setTotalEstimatedBudget(total);
        
        return plan;
    }
}
