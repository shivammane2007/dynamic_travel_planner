package com.travelplanner.strategies;

import com.travelplanner.models.Destination;
import com.travelplanner.models.UserPreferences;

public class BudgetStrategy extends AbstractRecommendationStrategy {
    @Override
    protected int calculateScore(Destination destination, UserPreferences preferences) {
        return baseScore(destination, preferences);
    }
}
