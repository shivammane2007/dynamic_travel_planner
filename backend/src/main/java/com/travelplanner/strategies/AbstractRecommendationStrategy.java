package com.travelplanner.strategies;

import com.travelplanner.models.Destination;
import com.travelplanner.models.ScoredDestination;
import com.travelplanner.models.UserPreferences;

import java.util.Comparator;
import java.util.List;

public abstract class AbstractRecommendationStrategy implements RecommendationStrategy {
    @Override
    public List<ScoredDestination> recommend(List<Destination> destinations, UserPreferences preferences) {
        return destinations.stream()
            .map(destination -> new ScoredDestination(destination, calculateScore(destination, preferences)))
            .filter(destination -> destination.getScore() > 0)
            .sorted(Comparator.comparingInt(ScoredDestination::getScore).reversed()
                .thenComparing(Comparator.comparingDouble(ScoredDestination::getRating).reversed()))
            .limit(6)
            .toList();
    }

    protected int baseScore(Destination destination, UserPreferences preferences) {
        int score = 0;
        if (destination.getTheme().equalsIgnoreCase(preferences.getTheme())) {
            score += 50;
        }
        if (destination.getSubcategory().equalsIgnoreCase(preferences.getSubcategory())) {
            score += 30;
        }
        if (destination.getCostPerDay() <= preferences.getDailyBudget()) {
            score += 20;
        }
        if (!preferences.getCountryPreference().isBlank() && destination.getCountry().equalsIgnoreCase(preferences.getCountryPreference())) {
            score += 10;
        }
        return Math.min(score, 100);
    }

    protected abstract int calculateScore(Destination destination, UserPreferences preferences);
}
