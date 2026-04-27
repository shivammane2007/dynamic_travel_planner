package com.travelplanner.models;

public class UserPreferences {
    private final String theme;
    private final String subcategory;
    private final double dailyBudget;
    private final int durationDays;
    private final String countryPreference;

    public UserPreferences(String theme, String subcategory, double dailyBudget, int durationDays, String countryPreference) {
        this.theme = theme;
        this.subcategory = subcategory;
        this.dailyBudget = dailyBudget;
        this.durationDays = durationDays;
        this.countryPreference = countryPreference;
    }

    public String getTheme() { return theme; }
    public String getSubcategory() { return subcategory; }
    public double getDailyBudget() { return dailyBudget; }
    public int getDurationDays() { return durationDays; }
    public String getCountryPreference() { return countryPreference; }
}
