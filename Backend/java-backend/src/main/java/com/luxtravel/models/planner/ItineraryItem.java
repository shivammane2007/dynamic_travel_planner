package com.luxtravel.models.planner;

import java.util.List;

public class ItineraryItem {
    private int day;
    private String title;
    private List<String> activities;

    public ItineraryItem() {}

    public int getDay() { return day; }
    public void setDay(int day) { this.day = day; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public List<String> getActivities() { return activities; }
    public void setActivities(List<String> activities) { this.activities = activities; }
}
