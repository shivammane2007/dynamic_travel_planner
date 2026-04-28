package com.luxtravel.controllers;

import com.luxtravel.models.Trip;
import com.luxtravel.services.ItineraryService;
import com.luxtravel.services.TripService;
import com.luxtravel.utils.JsonUtil;
import io.javalin.Javalin;

import java.util.List;

public class TripController extends BaseController {
    private final TripService service;
    private final ItineraryService itineraryService;

    public TripController(Javalin app, TripService service, ItineraryService itineraryService) {
        super(app);
        this.service = service;
        this.itineraryService = itineraryService;
    }

    @Override
    public void registerRoutes() {
        // GET /api/trips?userId=1&status=PLANNED
        app.get("/api/trips", ctx -> {
            String userIdParam = ctx.queryParam("userId");
            String statusParam = ctx.queryParam("status");

            List<Trip> trips;
            if (userIdParam != null && statusParam != null) {
                trips = service.findByUserIdAndStatus(Long.parseLong(userIdParam), statusParam);
            } else if (userIdParam != null) {
                trips = service.findByUserId(Long.parseLong(userIdParam));
            } else if (statusParam != null) {
                trips = service.findByStatus(statusParam);
            } else {
                trips = service.findAll();
            }
            sendSuccess(ctx, trips);
        });

        // GET /api/trips/:id
        app.get("/api/trips/{id}", ctx -> {
            long id = parseId(ctx);
            sendSuccess(ctx, service.findById(id));
        });

        // POST /api/trips
        app.post("/api/trips", ctx -> {
            Trip trip = JsonUtil.fromJson(ctx.body(), Trip.class);
            Trip created = service.create(trip);
            ctx.status(201);
            sendSuccess(ctx, created, "Trip created");
        });

        // PUT /api/trips/:id
        app.put("/api/trips/{id}", ctx -> {
            long id = parseId(ctx);
            Trip trip = JsonUtil.fromJson(ctx.body(), Trip.class);
            Trip updated = service.update(id, trip);
            sendSuccess(ctx, updated, "Trip updated");
        });

        // DELETE /api/trips/:id
        app.delete("/api/trips/{id}", ctx -> {
            long id = parseId(ctx);
            service.delete(id);
            sendSuccess(ctx, null, "Trip deleted");
        });

        // GET /api/trips/:id/itinerary
        app.get("/api/trips/{id}/itinerary", ctx -> {
            long tripId = parseId(ctx);
            sendSuccess(ctx, itineraryService.findByTripId(tripId));
        });
    }
}
