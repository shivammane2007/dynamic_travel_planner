package com.travelplanner.repositories.impl;

import com.travelplanner.models.Destination;
import com.travelplanner.models.WishlistItem;
import com.travelplanner.repositories.DestinationRepository;
import com.travelplanner.repositories.WishlistRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

public class WishlistRepositoryImpl implements WishlistRepository {
    private final List<WishlistItem> items = new CopyOnWriteArrayList<>();
    private final DestinationRepository destinationRepository;

    public WishlistRepositoryImpl(DestinationRepository destinationRepository) {
        this.destinationRepository = destinationRepository;
    }

    @Override
    public List<WishlistItem> findByUserId(int userId) {
        return new ArrayList<>(items.stream().filter(item -> item.getUserId() == userId).toList());
    }

    @Override
    public WishlistItem save(int userId, int destinationId) {
        remove(userId, destinationId);
        Destination destination = destinationRepository.findById(destinationId).orElseThrow();
        WishlistItem item = new WishlistItem(userId, destination);
        items.add(item);
        return item;
    }

    @Override
    public void remove(int userId, int destinationId) {
        items.removeIf(item -> item.getUserId() == userId && item.getDestination().getId() == destinationId);
    }
}
