package com.luxtravel.services;

import com.luxtravel.models.ManualTrip;
import com.luxtravel.repositories.ManualTripRepository;

public class ManualTripService {
    private final ManualTripRepository repository;

    public ManualTripService(ManualTripRepository repository) {
        this.repository = repository;
    }

    public ManualTrip saveManualTrip(ManualTrip trip) {
        return repository.save(trip);
    }

    public java.util.List<ManualTrip> getAllTrips() {
        return repository.findAll();
    }

    public void deleteTrip(Long id) {
        repository.delete(id);
    }
}
