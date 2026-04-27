package com.travelplanner.controllers;

import com.sun.net.httpserver.HttpExchange;
import com.travelplanner.services.TripService;
import com.travelplanner.utils.JsonUtil;

import java.io.IOException;
import java.util.Map;

public class TripController extends BaseController {
    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
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
        if ("GET".equalsIgnoreCase(method)) {
            sendJson(exchange, 200, Map.of("success", true, "data", tripService.getTrips(userId)));
            return;
        }

        if ("POST".equalsIgnoreCase(method)) {
            Map<String, Object> body = JsonUtil.fromJson(readBody(exchange));
            sendJson(exchange, 201, Map.of("success", true, "data", tripService.bookTrip(userId, body)));
            return;
        }

        sendError(exchange, 405, "Method not allowed");
    }
}
