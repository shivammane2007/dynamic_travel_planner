package com.travelplanner.strategies;

import com.travelplanner.models.Destination;
import com.travelplanner.models.UserPreferences;

public class CulturalStrategy extends AbstractRecommendationStrategy {
    @Override
    protected int calculateScore(Destination destination, UserPreferences preferences) {
        int score = baseScore(destination, preferences);
        if ("cultural".equalsIgnoreCase(destination.getTheme()) && preferences.getDurationDays() >= 3) {
            score += 5;
        }
        return Math.min(score, 100);
    }
}
