package com.luxtravel.services;

import com.luxtravel.exceptions.NotFoundException;
import com.luxtravel.exceptions.ValidationException;
import com.luxtravel.models.Trip;
import com.luxtravel.repositories.DestinationRepository;
import com.luxtravel.repositories.TripRepository;

import java.util.List;

public class TripService extends BaseService<Trip, TripRepository> {
    private final DestinationRepository destinationRepository;

    public TripService(TripRepository repository, DestinationRepository destinationRepository) {
        super(repository);
        this.destinationRepository = destinationRepository;
    }

    @Override
    protected void beforeSave(Trip trip) throws ValidationException {
        super.beforeSave(trip);
        // Validate FK: destination must exist
        try {
            destinationRepository.findById(trip.getDestinationId());
        } catch (NotFoundException e) {
            throw new ValidationException("Destination not found: " + trip.getDestinationId());
        }
    }

    public List<Trip> findByUserId(Long userId) {
        return repository.findByUserId(userId);
    }

    public List<Trip> findByStatus(String status) {
        return repository.findByStatus(status);
    }

    public List<Trip> findByUserIdAndStatus(Long userId, String status) {
        return repository.findByUserIdAndStatus(userId, status);
    }
}
