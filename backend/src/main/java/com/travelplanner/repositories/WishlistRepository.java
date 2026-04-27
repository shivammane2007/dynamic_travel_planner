package com.travelplanner.repositories;

import com.travelplanner.models.WishlistItem;

import java.util.List;

public interface WishlistRepository {
    List<WishlistItem> findByUserId(int userId);
    WishlistItem save(int userId, int destinationId);
    void remove(int userId, int destinationId);
}
