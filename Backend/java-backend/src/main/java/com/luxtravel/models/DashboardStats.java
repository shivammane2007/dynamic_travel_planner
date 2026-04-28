package com.luxtravel.models;

public class DashboardStats {
    private long totalUsers;
    private long totalBookings;
    private double totalRevenue;
    private long totalPackages;
    private long totalFavorites;
    private long totalContactMessages;
    private long totalManualTrips;
    private long pendingBookings;

    // Getters and Setters
    public long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(long totalUsers) { this.totalUsers = totalUsers; }

    public long getTotalBookings() { return totalBookings; }
    public void setTotalBookings(long totalBookings) { this.totalBookings = totalBookings; }

    public double getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(double totalRevenue) { this.totalRevenue = totalRevenue; }

    public long getTotalPackages() { return totalPackages; }
    public void setTotalPackages(long totalPackages) { this.totalPackages = totalPackages; }

    public long getTotalFavorites() { return totalFavorites; }
    public void setTotalFavorites(long totalFavorites) { this.totalFavorites = totalFavorites; }

    public long getTotalContactMessages() { return totalContactMessages; }
    public void setTotalContactMessages(long totalContactMessages) { this.totalContactMessages = totalContactMessages; }

    public long getTotalManualTrips() { return totalManualTrips; }
    public void setTotalManualTrips(long totalManualTrips) { this.totalManualTrips = totalManualTrips; }

    public long getPendingBookings() { return pendingBookings; }
    public void setPendingBookings(long pendingBookings) { this.pendingBookings = pendingBookings; }
}
