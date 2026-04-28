import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleContact } from "./routes/contact";
import { handleBooking } from "./routes/bookings";
import { handlePlanner } from "./routes/planner";
import { 
  handleGetStats, handleGetRevenue, handleGetActivities, 
  handleGetManualTrips, handleGetContactMessages, 
  handleGetPackages, handleGetPackageById, handleGetBookingsList 
} from "./routes/mockDashboard";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Contact form — sends email via Nodemailer
  app.post("/api/contact", handleContact);

  // Booking confirmation — sends email to user
  app.post("/api/bookings", handleBooking);

  // Trip Planner generator
  app.post("/api/planner/generate", handlePlanner);

  // MOCK DASHBOARD ENDPOINTS (used when Java backend is off)
  app.get("/api/dashboard/stats", handleGetStats);
  app.get("/api/dashboard/revenue", handleGetRevenue);
  app.get("/api/dashboard/activities", handleGetActivities);
  app.get("/api/manual-trips", handleGetManualTrips);
  app.get("/api/contact-messages", handleGetContactMessages);
  app.get("/api/packages", handleGetPackages);
  app.get("/api/packages/:id", handleGetPackageById);
  app.get("/api/bookings", handleGetBookingsList);

  return app;
}
