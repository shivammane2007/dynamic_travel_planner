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
            ((Number) payload.getOrDefault("dailyBudget", 0)).doubleValue(),
            ((Number) payload.getOrDefault("durationDays", 1)).intValue(),
            String.valueOf(payload.getOrDefault("countryPreference", ""))
        );
        List<Destination> destinations = destinationRepository.findAll();
        RecommendationStrategy strategy = StrategyFactory.getStrategy(preferences.getTheme());
        return strategy.recommend(destinations, preferences);
    }
}
