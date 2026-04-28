package com.luxtravel.controllers;

import com.luxtravel.models.ManualTrip;
import com.luxtravel.services.ManualTripService;
import io.javalin.Javalin;
import io.javalin.http.Context;

public class ManualTripController extends BaseController {
    private final ManualTripService service;

    public ManualTripController(Javalin app, ManualTripService service) {
        super(app);
        this.service = service;
    }

    @Override
    public void registerRoutes() {
        app.post("/api/planner/save", this::saveTrip);
        app.get("/api/planner", this::getAllTrips);
        app.delete("/api/planner/{id}", this::deleteTrip);
    }

    private void getAllTrips(Context ctx) {
        ctx.json(service.getAllTrips());
    }

    private void deleteTrip(Context ctx) {
        try {
            long id = Long.parseLong(ctx.pathParam("id"));
            service.deleteTrip(id);
            ctx.status(204);
        } catch (Exception e) {
            ctx.status(400).json("{\"error\": \"Invalid ID\"}");
        }
    }

    private void saveTrip(Context ctx) {
        try {
            ManualTrip trip = ctx.bodyAsClass(ManualTrip.class);
            ManualTrip saved = service.saveManualTrip(trip);
            ctx.status(201).json(saved);
        } catch (Exception e) {
            ctx.status(400).json("{\"error\": \"Invalid request body\"}");
        }
    }
}
