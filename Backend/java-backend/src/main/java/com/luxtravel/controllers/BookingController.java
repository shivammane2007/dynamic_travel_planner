package com.luxtravel.controllers;

import com.luxtravel.models.Booking;
import com.luxtravel.services.BookingService;
import com.luxtravel.utils.JsonUtil;
import io.javalin.Javalin;

import java.util.List;

public class BookingController extends BaseController {
    private final BookingService service;

    public BookingController(Javalin app, BookingService service) {
        super(app);
        this.service = service;
    }

    @Override
    public void registerRoutes() {
        // GET /api/bookings?tripId=1&status=CONFIRMED
        app.get("/api/bookings", ctx -> {
            String tripIdParam = ctx.queryParam("tripId");
            String statusParam = ctx.queryParam("status");

            List<Booking> bookings;
            if (tripIdParam != null && statusParam != null) {
                bookings = service.findByTripIdAndStatus(Long.parseLong(tripIdParam), statusParam);
            } else if (tripIdParam != null) {
                bookings = service.findByTripId(Long.parseLong(tripIdParam));
            } else if (statusParam != null) {
                bookings = service.findByStatus(statusParam);
            } else {
                bookings = service.findAll();
            }
            sendSuccess(ctx, bookings);
        });

        // GET /api/bookings/:id
        app.get("/api/bookings/{id}", ctx -> {
            long id = parseId(ctx);
            sendSuccess(ctx, service.findById(id));
        });

        // POST /api/bookings
        app.post("/api/bookings", ctx -> {
            Booking booking = JsonUtil.fromJson(ctx.body(), Booking.class);
            Booking created = service.create(booking);
            ctx.status(201);
            sendSuccess(ctx, created, "Booking created");
        });

        // PUT /api/bookings/:id
        app.put("/api/bookings/{id}", ctx -> {
            long id = parseId(ctx);
            Booking booking = JsonUtil.fromJson(ctx.body(), Booking.class);
            Booking updated = service.update(id, booking);
            sendSuccess(ctx, updated, "Booking updated");
        });

        // DELETE /api/bookings/:id
        app.delete("/api/bookings/{id}", ctx -> {
            long id = parseId(ctx);
            service.delete(id);
            sendSuccess(ctx, null, "Booking deleted");
        });
    }
}
