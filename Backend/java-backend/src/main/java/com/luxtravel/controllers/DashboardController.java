package com.luxtravel.controllers;

import com.luxtravel.services.DashboardService;
import io.javalin.Javalin;
import io.javalin.http.Context;

public class DashboardController extends BaseController {
    private final DashboardService dashboardService;

    public DashboardController(Javalin app, DashboardService dashboardService) {
        super(app);
        this.dashboardService = dashboardService;
    }

    @Override
    public void registerRoutes() {
        app.get("/api/dashboard/stats", this::getStats);
        app.get("/api/dashboard/revenue", this::getRevenueTrends);
        app.get("/api/dashboard/activities", this::getRecentActivities);
    }

    private void getStats(Context ctx) {
        try {
            success(ctx, dashboardService.getDashboardStats());
        } catch (Exception e) {
            error(ctx, 500, e.getMessage());
        }
    }

    private void getRevenueTrends(Context ctx) {
        try {
            success(ctx, dashboardService.getRevenueTrends());
        } catch (Exception e) {
            error(ctx, 500, e.getMessage());
        }
    }

    private void getRecentActivities(Context ctx) {
        try {
            success(ctx, dashboardService.getRecentActivities());
        } catch (Exception e) {
            error(ctx, 500, e.getMessage());
        }
    }
}
