package com.travelplanner.repositories;

import com.travelplanner.models.Destination;

import java.util.List;
import java.util.Optional;

public interface DestinationRepository {
    List<Destination> findAll();
    Optional<Destination> findById(int id);
}
