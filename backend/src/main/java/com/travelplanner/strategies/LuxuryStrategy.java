package com.travelplanner.strategies;

import com.travelplanner.models.Destination;
import com.travelplanner.models.UserPreferences;

public class LuxuryStrategy extends AbstractRecommendationStrategy {
    @Override
    protected int calculateScore(Destination destination, UserPreferences preferences) {
        int score = baseScore(destination, preferences);
        if ("luxury".equalsIgnoreCase(destination.getTheme()) && preferences.getDailyBudget() >= 300) {
            score += 5;
        }
        return Math.min(score, 100);
    }
}
