package com.luxtravel.models;

import java.time.LocalTime;

public class Itinerary extends BaseModel {
    private Long tripId;
    private int dayNumber;
    private String title;
    private String description;
    private String location;
    private LocalTime startTime;
    private LocalTime endTime;
    private String activityType;

    public Itinerary() {}

    @Override
    public String getTableName() { return "itineraries"; }

    @Override
    public boolean validate() {
        return tripId != null && dayNumber > 0;
    }

    public Long getTripId() { return tripId; }
    public void setTripId(Long tripId) { this.tripId = tripId; }

    public int getDayNumber() { return dayNumber; }
    public void setDayNumber(int dayNumber) { this.dayNumber = dayNumber; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public LocalTime getStartTime() { return startTime; }
    public void setStartTime(LocalTime startTime) { this.startTime = startTime; }

    public LocalTime getEndTime() { return endTime; }
    public void setEndTime(LocalTime endTime) { this.endTime = endTime; }

    public String getActivityType() { return activityType; }
    public void setActivityType(String activityType) { this.activityType = activityType; }
}
