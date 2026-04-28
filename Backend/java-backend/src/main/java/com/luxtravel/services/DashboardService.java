package com.luxtravel.services;

import com.luxtravel.models.DashboardStats;
import com.luxtravel.repositories.DashboardRepository;

import java.util.List;
import java.util.Map;

public class DashboardService {
    private final DashboardRepository dashboardRepository;

    public DashboardService(DashboardRepository dashboardRepository) {
        this.dashboardRepository = dashboardRepository;
    }

    public DashboardStats getDashboardStats() {
        return dashboardRepository.getStats();
    }

    public List<Map<String, Object>> getRevenueTrends() {
        return dashboardRepository.getRevenueTrends();
    }

    public List<Map<String, Object>> getRecentActivities() {
        return dashboardRepository.getRecentActivities();
    }
}
