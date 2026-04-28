package com.travelplanner.services;

import com.travelplanner.models.WishlistItem;
import com.travelplanner.repositories.WishlistRepository;

import java.util.List;

public class WishlistService {
    private final WishlistRepository wishlistRepository;

    public WishlistService(WishlistRepository wishlistRepository) {
        this.wishlistRepository = wishlistRepository;
    }

    public List<WishlistItem> getWishlist(int userId) {
        return wishlistRepository.findByUserId(userId);
    }

    public WishlistItem add(int userId, int destinationId) {
        return wishlistRepository.save(userId, destinationId);
    }

    public void remove(int userId, int destinationId) {
        wishlistRepository.remove(userId, destinationId);
    }
}
