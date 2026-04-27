package com.travelplanner.models;

public class WishlistItem {
    private final int userId;
    private final Destination destination;

    public WishlistItem(int userId, Destination destination) {
        this.userId = userId;
        this.destination = destination;
    }

    public int getUserId() { return userId; }
    public Destination getDestination() { return destination; }
}
