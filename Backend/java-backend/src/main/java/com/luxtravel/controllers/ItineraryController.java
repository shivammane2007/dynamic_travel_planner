package com.luxtravel.controllers;

import com.luxtravel.models.Itinerary;
import com.luxtravel.services.ItineraryService;
import com.luxtravel.utils.JsonUtil;
import io.javalin.Javalin;

public class ItineraryController extends BaseController {
    private final ItineraryService service;

    public ItineraryController(Javalin app, ItineraryService service) {
        super(app);
        this.service = service;
    }

    @Override
    public void registerRoutes() {
        // GET /api/itinerary/:tripId
        app.get("/api/itinerary/{tripId}", ctx -> {
            long tripId;
            try { tripId = Long.parseLong(ctx.pathParam("tripId")); }
            catch (NumberFormatException e) { throw new com.luxtravel.exceptions.ValidationException("Invalid tripId"); }
            sendSuccess(ctx, service.findByTripId(tripId));
        });

        // POST /api/itinerary
        app.post("/api/itinerary", ctx -> {
            Itinerary item = JsonUtil.fromJson(ctx.body(), Itinerary.class);
            Itinerary created = service.create(item);
            ctx.status(201);
            sendSuccess(ctx, created, "Itinerary item added");
        });

        // PUT /api/itinerary/:id
        app.put("/api/itinerary/{id}", ctx -> {
            long id = parseId(ctx);
            Itinerary item = JsonUtil.fromJson(ctx.body(), Itinerary.class);
            Itinerary updated = service.update(id, item);
            sendSuccess(ctx, updated, "Itinerary item updated");
        });

        // DELETE /api/itinerary/:id
        app.delete("/api/itinerary/{id}", ctx -> {
            long id = parseId(ctx);
            service.delete(id);
            sendSuccess(ctx, null, "Itinerary item removed");
        });
    }
}
