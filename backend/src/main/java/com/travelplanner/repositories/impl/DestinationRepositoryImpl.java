package com.travelplanner.repositories.impl;

import com.travelplanner.models.AdventureDestination;
import com.travelplanner.models.BeachDestination;
import com.travelplanner.models.CulturalDestination;
import com.travelplanner.models.Destination;
import com.travelplanner.models.LuxuryDestination;
import com.travelplanner.repositories.DestinationRepository;

import java.util.List;
import java.util.Optional;

public class DestinationRepositoryImpl implements DestinationRepository {
    private final List<Destination> destinations = List.of(
        new AdventureDestination(1, "Annapurna Base Camp", "Nepal", "Pokhara", "trekking", 80, "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80", 4.8, "Extreme"),
        new AdventureDestination(2, "Patagonia Trails", "Argentina", "El Chalten", "hiking", 140, "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80", 4.7, "Moderate"),
        new BeachDestination(3, "Coral Bay Retreat", "Maldives", "Male", "snorkeling", 460, "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80", 4.9, "Coral"),
        new BeachDestination(4, "Palawan Coastline", "Philippines", "El Nido", "island-hopping", 180, "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80", 4.6, "Tropical"),
        new CulturalDestination(5, "Kyoto Heritage Walk", "Japan", "Kyoto", "museums", 210, "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80", 4.8, "Ancient"),
        new CulturalDestination(6, "Rome After Hours", "Italy", "Rome", "architecture", 190, "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1200&q=80", 4.7, "UNESCO"),
        new LuxuryDestination(7, "Alpine Grand Escape", "Switzerland", "Zermatt", "resorts", 520, "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80", 4.9, "Ultra-Luxury"),
        new LuxuryDestination(8, "Desert Dune Reserve", "UAE", "Dubai", "spa", 430, "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80", 4.5, "5-Star")
    );

    @Override
    public List<Destination> findAll() {
        return destinations;
    }

    @Override
    public Optional<Destination> findById(int id) {
        return destinations.stream().filter(destination -> destination.getId() == id).findFirst();
    }
}
