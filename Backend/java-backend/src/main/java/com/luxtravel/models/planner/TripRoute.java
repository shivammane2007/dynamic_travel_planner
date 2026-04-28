package com.luxtravel.models.planner;

public class TripRoute {
    private String mode; // Car, Train, Flight, Bus
    private String distance;
    private String duration;
    private String recommendedText;

    public TripRoute() {}

    public TripRoute(String mode, String distance, String duration, String recommendedText) {
        this.mode = mode;
        this.distance = distance;
        this.duration = duration;
        this.recommendedText = recommendedText;
    }

    public String getMode() { return mode; }
    public void setMode(String mode) { this.mode = mode; }

    public String getDistance() { return distance; }
    public void setDistance(String distance) { this.distance = distance; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public String getRecommendedText() { return recommendedText; }
    public void setRecommendedText(String recommendedText) { this.recommendedText = recommendedText; }
}
