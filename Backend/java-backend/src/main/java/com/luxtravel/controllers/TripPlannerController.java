package com.luxtravel.controllers;

import com.luxtravel.dto.TripPlannerRequest;
import com.luxtravel.dto.TripPlannerResponse;
import com.luxtravel.services.TripPlannerService;
import com.luxtravel.utils.JsonUtil;
import io.javalin.Javalin;

public class TripPlannerController extends BaseController {

    private final TripPlannerService plannerService;

    public TripPlannerController(Javalin app, TripPlannerService plannerService) {
        super(app);
        this.plannerService = plannerService;
    }

    @Override
    public void registerRoutes() {
        // POST /api/planner/generate
        app.post("/api/planner/generate", ctx -> {
            try {
                TripPlannerRequest request = JsonUtil.fromJson(ctx.body(), TripPlannerRequest.class);
                
                if (request.getSourceCity() == null || request.getDestinationCity() == null) {
                    ctx.status(400);
                    sendError(ctx, "Source and Destination cities are required.", 400);
                    return;
                }

                TripPlannerResponse response = plannerService.generateTripPlan(request);
                
                ctx.status(200);
                sendSuccess(ctx, response, "Trip generated successfully");
            } catch (Exception e) {
                ctx.status(500);
                sendError(ctx, "Failed to generate trip: " + e.getMessage(), 500);
            }
        });
    }
}
