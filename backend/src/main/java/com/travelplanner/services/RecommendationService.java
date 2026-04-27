package com.travelplanner.services;

import com.travelplanner.factories.StrategyFactory;
import com.travelplanner.models.Destination;
import com.travelplanner.models.ScoredDestination;
import com.travelplanner.models.UserPreferences;
import com.travelplanner.repositories.DestinationRepository;
import com.travelplanner.strategies.RecommendationStrategy;

import java.util.List;
import java.util.Map;

public class RecommendationService {
    private final DestinationRepository destinationRepository;

    public RecommendationService(DestinationRepository destinationRepository) {
        this.destinationRepository = destinationRepository;
    }

    public List<ScoredDestination> recommend(Map<String, Object> payload) {
        UserPreferences preferences = new UserPreferences(
            String.valueOf(payload.getOrDefault("theme", "")),
            String.valueOf(payload.getOrDefault("subcategory", "")),
            ((Number) payload.getOrDefault("budget", payload.getOrDefault("dailyBudget", 0))).doubleValue(),
            ((Number) payload.getOrDefault("durationDays", 1)).intValue(),
            String.valueOf(payload.getOrDefault("country", payload.getOrDefault("countryPreference", "")))
        );

        System.out.println("User Country: " + preferences.getCountryPreference());
        System.out.println("User Budget: " + preferences.getDailyBudget());

        List<Destination> allDestinations = destinationRepository.findAll();

        // Step 1: Apply Filters
        List<Destination> filtered = allDestinations.stream()
            .filter(d -> filterByCountry(d, preferences))
            .filter(d -> filterByBudget(d, preferences))
            .toList();
            
        System.out.println("Filtered Size: " + filtered.size());

        if (filtered.isEmpty()) {
            return List.of();
        }

        // Step 2: Apply Strategy
        RecommendationStrategy strategy = StrategyFactory.getStrategy(preferences.getTheme());
        List<ScoredDestination> scored = strategy.recommend(filtered, preferences);

        // Step 3: Sort
        return scored.stream()
            .sorted((s1, s2) -> Integer.compare(s2.getScore(), s1.getScore()))
            .toList();
    }

    private boolean filterByCountry(Destination d, UserPreferences pref) {
        if (pref.getCountryPreference() == null || pref.getCountryPreference().trim().isEmpty()) {
            return true;
        }
        return d.getCountry().equalsIgnoreCase(pref.getCountryPreference().trim());
    }

    private boolean filterByBudget(Destination d, UserPreferences pref) {
        return d.getCostPerDay() <= pref.getDailyBudget();
    }
}
