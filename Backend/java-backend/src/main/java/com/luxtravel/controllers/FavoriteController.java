package com.luxtravel.controllers;

import com.luxtravel.models.Favorite;
import com.luxtravel.services.FavoriteService;
import io.javalin.Javalin;
import io.javalin.http.Context;

public class FavoriteController extends BaseController {
    private final FavoriteService service;

    public FavoriteController(Javalin app, FavoriteService service) {
        super(app);
        this.service = service;
    }

    @Override
    public void registerRoutes() {
        app.post("/api/favorites", this::addFavorite);
        app.delete("/api/favorites/{id}", this::removeFavorite);
    }

    private void addFavorite(Context ctx) {
        try {
            Favorite fav = ctx.bodyAsClass(Favorite.class);
            Favorite saved = service.addFavorite(fav);
            ctx.status(201).json(saved);
        } catch (Exception e) {
            ctx.status(400).json("{\"error\": \"Invalid request body\"}");
        }
    }
    
    private void removeFavorite(Context ctx) {
        try {
            long id = Long.parseLong(ctx.pathParam("id"));
            service.removeFavorite(id);
            ctx.status(204);
        } catch (Exception e) {
            ctx.status(400).json("{\"error\": \"Invalid ID\"}");
        }
    }
}
