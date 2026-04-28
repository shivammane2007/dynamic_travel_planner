package com.luxtravel.controllers;

import com.luxtravel.dto.PaginatedResponse;
import com.luxtravel.models.Destination;
import com.luxtravel.services.DestinationService;
import com.luxtravel.utils.JsonUtil;
import io.javalin.Javalin;

import java.util.List;

public class DestinationController extends BaseController {
    private final DestinationService service;

    public DestinationController(Javalin app, DestinationService service) {
        super(app);
        this.service = service;
    }

    @Override
    public void registerRoutes() {
        // GET /api/destinations?page=1&size=10&search=bali&priceLevel=LUXURY
        app.get("/api/destinations", ctx -> {
            int page = getPage(ctx);
            int size = getSize(ctx);
            String search = ctx.queryParam("search");
            String priceLevel = ctx.queryParam("priceLevel");

            List<Destination> items = service.findAllPaginated(page, size, search, priceLevel);
            long total = service.countFiltered(search, priceLevel);
            sendSuccess(ctx, new PaginatedResponse<>(items, total, page, size));
        });

        // GET /api/destinations/:id
        app.get("/api/destinations/{id}", ctx -> {
            long id = parseId(ctx);
            sendSuccess(ctx, service.findById(id));
        });

        // POST /api/destinations
        app.post("/api/destinations", ctx -> {
            Destination d = JsonUtil.fromJson(ctx.body(), Destination.class);
            Destination created = service.create(d);
            ctx.status(201);
            sendSuccess(ctx, created, "Destination created");
        });

        // PUT /api/destinations/:id
        app.put("/api/destinations/{id}", ctx -> {
            long id = parseId(ctx);
            Destination d = JsonUtil.fromJson(ctx.body(), Destination.class);
            Destination updated = service.update(id, d);
            sendSuccess(ctx, updated, "Destination updated");
        });

        // DELETE /api/destinations/:id
        app.delete("/api/destinations/{id}", ctx -> {
            long id = parseId(ctx);
            service.delete(id);
            sendSuccess(ctx, null, "Destination deleted");
        });
    }
}
