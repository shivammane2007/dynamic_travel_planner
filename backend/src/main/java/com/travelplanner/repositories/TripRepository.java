package com.travelplanner.repositories;

import com.travelplanner.models.Trip;

import java.util.List;
import java.util.Map;

public interface TripRepository {
    List<Trip> findByUserId(int userId);
    Trip save(int userId, Map<String, Object> payload);
}
