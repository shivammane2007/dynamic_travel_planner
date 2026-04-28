package com.luxtravel.controllers;

import com.luxtravel.services.BlogService;
import io.javalin.Javalin;
import io.javalin.http.Context;

public class BlogController extends BaseController {
    private final BlogService service;

    public BlogController(Javalin app, BlogService service) {
        super(app);
        this.service = service;
    }

    @Override
    public void registerRoutes() {
        app.get("/api/blogs", this::getAllBlogs);
        app.get("/api/blogs/{id}", this::getBlogById);
    }

    private void getAllBlogs(Context ctx) {
        ctx.json(service.getAllBlogs());
    }

    private void getBlogById(Context ctx) {
        try {
            long id = Long.parseLong(ctx.pathParam("id"));
            service.getBlogById(id).ifPresentOrElse(
                    ctx::json,
                    () -> ctx.status(404).json("{\"error\": \"Blog not found\"}")
            );
        } catch (NumberFormatException e) {
            ctx.status(400).json("{\"error\": \"Invalid blog ID\"}");
        }
    }
}
