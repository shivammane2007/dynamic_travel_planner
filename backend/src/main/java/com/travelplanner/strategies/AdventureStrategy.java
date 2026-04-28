package com.travelplanner.strategies;

import com.travelplanner.models.Destination;
import com.travelplanner.models.UserPreferences;

public class AdventureStrategy extends AbstractRecommendationStrategy {
    @Override
    protected int calculateScore(Destination destination, UserPreferences preferences) {
        int score = baseScore(destination, preferences);
        if ("adventure".equalsIgnoreCase(destination.getTheme()) && preferences.getDurationDays() >= 5) {
            score += 5;
        }
        return Math.min(score, 100);
    }
}
