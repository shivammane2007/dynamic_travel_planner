package com.luxtravel;

import com.google.gson.Gson;
import com.luxtravel.config.DatabaseConfig;
import com.luxtravel.controllers.*;
import com.luxtravel.dto.ApiResponse;
import com.luxtravel.exceptions.DatabaseException;
import com.luxtravel.exceptions.NotFoundException;
import com.luxtravel.exceptions.ValidationException;
import com.luxtravel.repositories.*;
import com.luxtravel.services.*;
import com.luxtravel.utils.EnvUtil;
import com.luxtravel.utils.JsonUtil;
import com.zaxxer.hikari.HikariDataSource;
import io.javalin.Javalin;
import io.javalin.json.JsonMapper;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;

public class Main {
    private static final Logger log = LoggerFactory.getLogger(Main.class);

    public static void main(String[] args) {
        // 1. Load .env file
        EnvUtil.load();

        // 2. Initialize HikariCP connection pool
        HikariDataSource dataSource = DatabaseConfig.createPool();

        // 3. Run schema.sql migrations on startup (CREATE TABLE IF NOT EXISTS — safe to re-run)
        DatabaseConfig.runMigrations(dataSource);

        // 4. Instantiate Repositories (injected with dataSource — Composition)
        DestinationRepository destinationRepo = new DestinationRepository(dataSource);
        TripRepository tripRepo               = new TripRepository(dataSource);
        UserRepository userRepo               = new UserRepository(dataSource);
        BookingRepository bookingRepo         = new BookingRepository(dataSource);
        ItineraryRepository itineraryRepo     = new ItineraryRepository(dataSource);

        // 5. Instantiate Services (injected with repos — Layered Composition)
        DestinationService destinationSvc = new DestinationService(destinationRepo);
        TripService tripSvc               = new TripService(tripRepo, destinationRepo);
        UserService userSvc               = new UserService(userRepo);
        BookingService bookingSvc         = new BookingService(bookingRepo, tripRepo);
        ItineraryService itinerarySvc     = new ItineraryService(itineraryRepo, tripRepo);

        // 6. Build Gson-backed JsonMapper for Javalin
        Gson gson = JsonUtil.getGson();
        JsonMapper gsonMapper = new JsonMapper() {
            @Override
            public @NotNull String toJsonString(@NotNull Object obj, @NotNull Type type) {
                return gson.toJson(obj, type);
            }

            @Override
            public @NotNull <T> T fromJsonString(@NotNull String json, @NotNull Type targetType) {
                return gson.fromJson(json, targetType);
            }
        };

        // 7. Create Javalin app with CORS + Gson
        String corsOrigin = EnvUtil.get("CORS_ORIGIN", "http://localhost:5173");
        Javalin app = Javalin.create(config -> {
            config.bundledPlugins.enableCors(cors -> {
                cors.addRule(it -> {
                    it.allowHost(corsOrigin);
                    it.allowHost("http://localhost:3000");
                    it.allowCredentials = false;
                });
            });
            config.jsonMapper(gsonMapper);
        });

        // 8. Register all controllers — Polymorphism via BaseController::registerRoutes
        List<BaseController> controllers = List.of(
            new DestinationController(app, destinationSvc),
            new TripController(app, tripSvc, itinerarySvc),
            new UserController(app, userSvc),
            new BookingController(app, bookingSvc),
            new ItineraryController(app, itinerarySvc)
        );
        controllers.forEach(BaseController::registerRoutes);

        // 9. Health check endpoint
        app.get("/api/health", ctx -> {
            boolean dbOk;
            try (var conn = dataSource.getConnection()) {
                dbOk = conn.isValid(2);
            } catch (Exception e) {
                dbOk = false;
            }
            ctx.json(Map.of("status", "ok", "db", dbOk ? "connected" : "error"));
        });

        // 10. Global exception handlers — never expose stack traces
        app.exception(NotFoundException.class,   (e, ctx) -> ctx.status(404).json(ApiResponse.error(e.getMessage())));
        app.exception(ValidationException.class, (e, ctx) -> ctx.status(400).json(ApiResponse.error(e.getMessage())));
        app.exception(DatabaseException.class,   (e, ctx) -> {
            log.error("Database error", e);
            ctx.status(500).json(ApiResponse.error("Database error occurred"));
        });
        app.exception(Exception.class,           (e, ctx) -> {
            log.error("Unexpected error", e);
            ctx.status(500).json(ApiResponse.error("Internal server error"));
        });

        // 11. Start server
        int port = Integer.parseInt(EnvUtil.get("JAVA_PORT", "8080"));
        app.start(port);
        log.info("✈️  Lux Travel Java Backend running on http://localhost:{}", port);
    }
}
