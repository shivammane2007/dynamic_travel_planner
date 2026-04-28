package com.luxtravel.controllers;

import com.luxtravel.services.PackageService;
import io.javalin.Javalin;
import io.javalin.http.Context;

public class PackageController extends BaseController {
    private final PackageService service;

    public PackageController(Javalin app, PackageService service) {
        super(app);
        this.service = service;
    }

    @Override
    public void registerRoutes() {
        app.get("/api/packages", this::getAllPackages);
        app.get("/api/packages/{id}", this::getPackageById);
    }

    private void getAllPackages(Context ctx) {
        // Return raw JSON array to match frontend if it expects it, or sendSuccess
        // We'll just return the JSON directly for simpler React integration or wrap in data
        ctx.json(service.getAllPackages());
    }

    private void getPackageById(Context ctx) {
        try {
            long id = Long.parseLong(ctx.pathParam("id"));
            service.getPackageById(id).ifPresentOrElse(
                    ctx::json,
                    () -> ctx.status(404).json("{\"error\": \"Package not found\"}")
            );
        } catch (NumberFormatException e) {
            ctx.status(400).json("{\"error\": \"Invalid package ID\"}");
        }
    }
}
