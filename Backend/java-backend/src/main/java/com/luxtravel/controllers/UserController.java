package com.luxtravel.controllers;

import com.luxtravel.models.User;
import com.luxtravel.services.UserService;
import com.luxtravel.utils.JsonUtil;
import io.javalin.Javalin;

import java.util.Map;

public class UserController extends BaseController {
    private final UserService service;

    public UserController(Javalin app, UserService service) {
        super(app);
        this.service = service;
    }

    @Override
    public void registerRoutes() {
        // POST /api/users/register
        app.post("/api/users/register", ctx -> {
            User user = JsonUtil.fromJson(ctx.body(), User.class);
            User created = service.register(user);
            created.setPassword(null); // never return password
            ctx.status(201);
            sendSuccess(ctx, created, "User registered successfully");
        });

        // POST /api/users/login
        app.post("/api/users/login", ctx -> {
            Map<?, ?> body = JsonUtil.fromJson(ctx.body(), Map.class);
            String email = (String) body.get("email");
            String password = (String) body.get("password");
            User user = service.login(email, password);
            // Return a simple session token (user id based — extend with JWT for production)
            sendSuccess(ctx, Map.of(
                "user", user,
                "token", "session-" + user.getId() + "-" + System.currentTimeMillis()
            ), "Login successful");
        });

        // GET /api/users/:id
        app.get("/api/users/{id}", ctx -> {
            long id = parseId(ctx);
            User user = service.findById(id);
            user.setPassword(null);
            sendSuccess(ctx, user);
        });

        // PUT /api/users/:id
        app.put("/api/users/{id}", ctx -> {
            long id = parseId(ctx);
            User user = JsonUtil.fromJson(ctx.body(), User.class);
            // If password is blank, keep existing one
            if (user.getPassword() == null || user.getPassword().isBlank()) {
                User existing = service.findById(id);
                user.setPassword(existing.getPassword());
            }
            User updated = service.update(id, user);
            updated.setPassword(null);
            sendSuccess(ctx, updated, "Profile updated");
        });
    }
}
