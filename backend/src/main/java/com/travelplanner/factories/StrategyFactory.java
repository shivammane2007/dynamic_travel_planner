package com.travelplanner.factories;

import com.travelplanner.strategies.AdventureStrategy;
import com.travelplanner.strategies.BudgetStrategy;
import com.travelplanner.strategies.CulturalStrategy;
import com.travelplanner.strategies.LuxuryStrategy;
import com.travelplanner.strategies.RecommendationStrategy;

public final class StrategyFactory {
    private StrategyFactory() {
    }

    public static RecommendationStrategy getStrategy(String theme) {
        return switch (theme == null ? "" : theme.toLowerCase()) {
            case "adventure" -> new AdventureStrategy();
            case "luxury" -> new LuxuryStrategy();
            case "cultural" -> new CulturalStrategy();
            default -> new BudgetStrategy();
        };
    }
}
