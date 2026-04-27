package com.travelplanner;

import com.sun.net.httpserver.HttpServer;
import com.travelplanner.controllers.AuthController;
import com.travelplanner.controllers.DestinationController;
import com.travelplanner.controllers.RecommendationController;
import com.travelplanner.controllers.TripController;
import com.travelplanner.controllers.WishlistController;
import com.travelplanner.repositories.DestinationRepository;
import com.travelplanner.repositories.TripRepository;
import com.travelplanner.repositories.UserRepository;
import com.travelplanner.repositories.WishlistRepository;
import com.travelplanner.repositories.impl.DestinationRepositoryImpl;
import com.travelplanner.repositories.impl.TripRepositoryImpl;
import com.travelplanner.repositories.impl.UserRepositoryImpl;
import com.travelplanner.repositories.impl.WishlistRepositoryImpl;
import com.travelplanner.services.AuthService;
import com.travelplanner.services.RecommendationService;
import com.travelplanner.services.TripService;
import com.travelplanner.services.WishlistService;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.concurrent.Executors;

public class Main {
    public static void main(String[] args) throws IOException {
        UserRepository userRepository = new UserRepositoryImpl();
        DestinationRepository destinationRepository = new DestinationRepositoryImpl();
        WishlistRepository wishlistRepository = new WishlistRepositoryImpl(destinationRepository);
        TripRepository tripRepository = new TripRepositoryImpl(destinationRepository);

        AuthService authService = new AuthService(userRepository);
        RecommendationService recommendationService = new RecommendationService(destinationRepository);
        WishlistService wishlistService = new WishlistService(wishlistRepository);
        TripService tripService = new TripService(tripRepository);

        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/api/auth", new AuthController(authService));
        server.createContext("/api/destinations", new DestinationController(destinationRepository));
        server.createContext("/api/recommend", new RecommendationController(recommendationService));
        server.createContext("/api/wishlist", new WishlistController(wishlistService));
        server.createContext("/api/trips", new TripController(tripService));
        server.setExecutor(Executors.newFixedThreadPool(12));
        server.start();

        System.out.println("Dynamic Travel Planner backend listening on http://localhost:8080");
    }
}
