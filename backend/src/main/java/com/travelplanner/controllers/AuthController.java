package com.travelplanner.controllers;

import com.sun.net.httpserver.HttpExchange;
import com.travelplanner.services.AuthService;
import com.travelplanner.utils.JsonUtil;

import java.io.IOException;
import java.util.Map;

public class AuthController extends BaseController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if (handleOptions(exchange)) {
            return;
        }

        String path = exchange.getRequestURI().getPath();
        String method = exchange.getRequestMethod();

        if ("POST".equalsIgnoreCase(method) && path.endsWith("/signup")) {
            Map<String, Object> body = JsonUtil.fromJson(readBody(exchange));
            sendJson(exchange, 201, authService.signup(body));
            return;
        }

        if ("POST".equalsIgnoreCase(method) && path.endsWith("/login")) {
            Map<String, Object> body = JsonUtil.fromJson(readBody(exchange));
            Map<String, Object> response = authService.login(body);
            if (Boolean.FALSE.equals(response.get("success"))) {
                sendJson(exchange, 401, response);
                return;
            }
            sendJson(exchange, 200, response);
            return;
        }

        sendError(exchange, 404, "Route not found");
    }
}
