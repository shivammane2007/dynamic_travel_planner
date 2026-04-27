package com.travelplanner.repositories.impl;

import com.travelplanner.models.Destination;
import com.travelplanner.models.Trip;
import com.travelplanner.repositories.DestinationRepository;
import com.travelplanner.repositories.TripRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicInteger;

public class TripRepositoryImpl implements TripRepository {
    private final AtomicInteger sequence = new AtomicInteger(1);
    private final List<Trip> trips = new CopyOnWriteArrayList<>();
    private final DestinationRepository destinationRepository;

    public TripRepositoryImpl(DestinationRepository destinationRepository) {
        this.destinationRepository = destinationRepository;
    }

    @Override
    public List<Trip> findByUserId(int userId) {
        return new ArrayList<>(trips.stream().filter(trip -> trip.getUserId() == userId).toList());
    }

    @Override
    public Trip save(int userId, Map<String, Object> payload) {
        int destinationId = ((Number) payload.get("destinationId")).intValue();
        int durationDays = ((Number) payload.getOrDefault("durationDays", 5)).intValue();
        String tripDate = String.valueOf(payload.getOrDefault("tripDate", LocalDate.now().plusDays(14)));
        Destination destination = destinationRepository.findById(destinationId).orElseThrow();
        Trip trip = new Trip(sequence.getAndIncrement(), userId, destination, durationDays, destination.getCostPerDay() * durationDays, tripDate, "planned");
        trips.add(trip);
        return trip;
    }
}
