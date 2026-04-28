package com.luxtravel.controllers;

import com.luxtravel.dto.ApiResponse;
import com.luxtravel.exceptions.ValidationException;
import io.javalin.Javalin;
import io.javalin.http.Context;

/**
 * Abstract base controller.
 * All concrete controllers inherit route-registration pattern and shared response helpers.
 * Polymorphism: controllers.forEach(BaseController::registerRoutes) calls each subclass implementation.
 */
public abstract class BaseController {
    protected final Javalin app;

    public BaseController(Javalin app) {
        this.app = app;
    }

    /** Each controller registers its own Javalin routes */
    public abstract void registerRoutes();

    protected <T> void sendSuccess(Context ctx, T data) {
        ctx.json(ApiResponse.ok(data));
    }

    protected <T> void sendSuccess(Context ctx, T data, String message) {
        ctx.json(ApiResponse.ok(data, message));
    }

    protected void sendError(Context ctx, int status, String message) {
        ctx.status(status).json(ApiResponse.error(message));
    }

    protected long parseId(Context ctx) throws ValidationException {
        try {
            return Long.parseLong(ctx.pathParam("id"));
        } catch (NumberFormatException e) {
            throw new ValidationException("Invalid ID format");
        }
    }

    protected int getPage(Context ctx) {
        try { return Math.max(1, Integer.parseInt(ctx.queryParam("page") != null ? ctx.queryParam("page") : "1")); }
        catch (NumberFormatException e) { return 1; }
    }

    protected int getSize(Context ctx) {
        try {
            int size = Integer.parseInt(ctx.queryParam("size") != null ? ctx.queryParam("size") : "10");
            return Math.min(Math.max(1, size), 100);
        } catch (NumberFormatException e) { return 10; }
    }
}
