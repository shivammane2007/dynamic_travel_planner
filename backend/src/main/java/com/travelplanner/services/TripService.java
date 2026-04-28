package com.travelplanner.services;

import com.travelplanner.models.Trip;
import com.travelplanner.repositories.TripRepository;

import java.util.List;
import java.util.Map;

public class TripService {
    private final TripRepository tripRepository;

    public TripService(TripRepository tripRepository) {
        this.tripRepository = tripRepository;
    }

    public List<Trip> getTrips(int userId) {
        return tripRepository.findByUserId(userId);
    }

    public Trip bookTrip(int userId, Map<String, Object> payload) {
        return tripRepository.save(userId, payload);
    }
}
