package com.travelplanner.strategies;

import com.travelplanner.models.Destination;
import com.travelplanner.models.ScoredDestination;
import com.travelplanner.models.UserPreferences;

import java.util.List;

public interface RecommendationStrategy {
    List<ScoredDestination> recommend(List<Destination> destinations, UserPreferences preferences);
}
