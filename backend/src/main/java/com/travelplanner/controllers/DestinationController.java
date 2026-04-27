package com.travelplanner.controllers;

import com.sun.net.httpserver.HttpExchange;
import com.travelplanner.repositories.DestinationRepository;

import java.io.IOException;
import java.util.Map;

public class DestinationController extends BaseController {
    private final DestinationRepository destinationRepository;

    public DestinationController(DestinationRepository destinationRepository) {
        this.destinationRepository = destinationRepository;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if (handleOptions(exchange)) {
            return;
        }

        if (!"GET".equalsIgnoreCase(exchange.getRequestMethod())) {
            sendError(exchange, 405, "Method not allowed");
            return;
        }

        String[] segments = exchange.getRequestURI().getPath().split("/");
        if (segments.length == 3) {
            sendJson(exchange, 200, Map.of("success", true, "data", destinationRepository.findAll()));
            return;
        }

        if (segments.length == 4) {
            int id = Integer.parseInt(segments[3]);
            destinationRepository.findById(id)
                .ifPresentOrElse(
                    destination -> {
                        try {
                            sendJson(exchange, 200, Map.of("success", true, "data", destination));
                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        }
                    },
                    () -> {
                        try {
                            sendError(exchange, 404, "Destination not found");
                        } catch (IOException e) {
                            throw new RuntimeException(e);
                        }
                    }
                );
            return;
        }

        sendError(exchange, 404, "Route not found");
    }
}
