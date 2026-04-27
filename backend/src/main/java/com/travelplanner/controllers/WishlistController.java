package com.travelplanner.controllers;

import com.sun.net.httpserver.HttpExchange;
import com.travelplanner.services.WishlistService;
import com.travelplanner.utils.JsonUtil;

import java.io.IOException;
import java.util.Map;

public class WishlistController extends BaseController {
    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if (handleOptions(exchange)) {
            return;
        }

        Integer userId = parseUserId(exchange);
        if (userId == null) {
            sendError(exchange, 401, "Unauthorized");
            return;
        }

        String method = exchange.getRequestMethod();
        String[] segments = exchange.getRequestURI().getPath().split("/");

        if ("GET".equalsIgnoreCase(method) && segments.length == 3) {
            sendJson(exchange, 200, Map.of("success", true, "data", wishlistService.getWishlist(userId)));
            return;
        }

        if ("POST".equalsIgnoreCase(method) && segments.length == 3) {
            Map<String, Object> body = JsonUtil.fromJson(readBody(exchange));
            sendJson(exchange, 201, Map.of("success", true, "data", wishlistService.add(userId, ((Number) body.get("destinationId")).intValue())));
            return;
        }

        if ("DELETE".equalsIgnoreCase(method) && segments.length == 4) {
            int destinationId = Integer.parseInt(segments[3]);
            wishlistService.remove(userId, destinationId);
            sendJson(exchange, 200, Map.of("success", true, "message", "Removed from wishlist"));
            return;
        }

        sendError(exchange, 404, "Route not found");
    }
}
