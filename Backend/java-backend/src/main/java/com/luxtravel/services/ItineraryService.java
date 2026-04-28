package com.luxtravel.services;

import com.luxtravel.exceptions.NotFoundException;
import com.luxtravel.exceptions.ValidationException;
import com.luxtravel.models.Itinerary;
import com.luxtravel.repositories.ItineraryRepository;
import com.luxtravel.repositories.TripRepository;

import java.util.List;

public class ItineraryService extends BaseService<Itinerary, ItineraryRepository> {
    private final TripRepository tripRepository;

    public ItineraryService(ItineraryRepository repository, TripRepository tripRepository) {
        super(repository);
        this.tripRepository = tripRepository;
    }

    @Override
    protected void beforeSave(Itinerary itinerary) throws ValidationException {
        super.beforeSave(itinerary);
        // Validate FK: trip must exist
        try {
            tripRepository.findById(itinerary.getTripId());
        } catch (NotFoundException e) {
            throw new ValidationException("Trip not found: " + itinerary.getTripId());
        }
    }

    public List<Itinerary> findByTripId(Long tripId) {
        return repository.findByTripId(tripId);
    }
}
