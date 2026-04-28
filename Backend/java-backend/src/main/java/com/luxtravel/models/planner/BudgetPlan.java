package com.luxtravel.models.planner;

public class BudgetPlan {
    private double travelCost;
    private double hotelCost;
    private double foodCost;
    private double localTransport;
    private double activities;
    private double totalEstimatedBudget;
    private String currency;

    public BudgetPlan() {}

    public double getTravelCost() { return travelCost; }
    public void setTravelCost(double travelCost) { this.travelCost = travelCost; }

    public double getHotelCost() { return hotelCost; }
    public void setHotelCost(double hotelCost) { this.hotelCost = hotelCost; }

    public double getFoodCost() { return foodCost; }
    public void setFoodCost(double foodCost) { this.foodCost = foodCost; }

    public double getLocalTransport() { return localTransport; }
    public void setLocalTransport(double localTransport) { this.localTransport = localTransport; }

    public double getActivities() { return activities; }
    public void setActivities(double activities) { this.activities = activities; }

    public double getTotalEstimatedBudget() { return totalEstimatedBudget; }
    public void setTotalEstimatedBudget(double totalEstimatedBudget) { this.totalEstimatedBudget = totalEstimatedBudget; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }
}
