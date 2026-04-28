package com.travelplanner.models;

public class Trip {
    private final int id;
    private final int userId;
    private final Destination destination;
    private final int durationDays;
    private final double totalCost;
    private final String tripDate;
    private final String status;

    public Trip(int id, int userId, Destination destination, int durationDays, double totalCost, String tripDate, String status) {
        this.id = id;
        this.userId = userId;
        this.destination = destination;
        this.durationDays = durationDays;
        this.totalCost = totalCost;
        this.tripDate = tripDate;
        this.status = status;
    }

    public int getId() { return id; }
    public int getUserId() { return userId; }
    public Destination getDestination() { return destination; }
    public int getDurationDays() { return durationDays; }
    public double getTotalCost() { return totalCost; }
    public String getTripDate() { return tripDate; }
    public String getStatus() { return status; }
}
