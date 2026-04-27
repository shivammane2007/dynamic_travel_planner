package com.travelplanner.controllers;

import com.sun.net.httpserver.HttpExchange;
import com.travelplanner.services.RecommendationService;
import com.travelplanner.utils.JsonUtil;

import java.io.IOException;
import java.util.Map;

public class RecommendationController extends BaseController {
    private final RecommendationService recommendationService;

    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if (handleOptions(exchange)) {
            return;
        }

        if (!"POST".equalsIgnoreCase(exchange.getRequestMethod())) {
            sendError(exchange, 405, "Method not allowed");
            return;
        }

        Map<String, Object> body = JsonUtil.fromJson(readBody(exchange));
        sendJson(exchange, 200, Map.of("success", true, "data", recommendationService.recommend(body)));
    }
}
