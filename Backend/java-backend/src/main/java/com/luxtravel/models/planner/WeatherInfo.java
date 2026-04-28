package com.luxtravel.models.planner;

public class WeatherInfo {
    private String condition;
    private double temperature;
    private String description;
    private String iconUrl;

    public WeatherInfo() {}

    public String getCondition() { return condition; }
    public void setCondition(String condition) { this.condition = condition; }

    public double getTemperature() { return temperature; }
    public void setTemperature(double temperature) { this.temperature = temperature; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getIconUrl() { return iconUrl; }
    public void setIconUrl(String iconUrl) { this.iconUrl = iconUrl; }
}
