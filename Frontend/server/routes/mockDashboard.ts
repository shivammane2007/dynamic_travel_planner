import { RequestHandler } from "express";

export const handleGetStats: RequestHandler = (_req, res) => {
  res.json({
    totalRevenue: 549500,
    totalBookings: 124,
    totalUsers: 85,
    totalPackages: 12,
    pendingBookings: 8,
    totalFavorites: 45,
    manualTrips: 15,
    contactInquiries: 22
  });
};

export const handleGetRevenue: RequestHandler = (_req, res) => {
  res.json([
    { month: "Jan", revenue: 45000 },
    { month: "Feb", revenue: 52000 },
    { month: "Mar", revenue: 48000 },
    { month: "Apr", revenue: 61000 },
    { month: "May", revenue: 59000 },
    { month: "Jun", revenue: 75000 }
  ]);
};

export const handleGetActivities: RequestHandler = (_req, res) => {
  res.json([
    { id: 1, type: "Booking", description: "New booking for Bali Escape", date: new Date().toISOString() },
    { id: 2, type: "Message", description: "Alice Johnson sent a message", date: new Date(Date.now() - 3600000).toISOString() },
    { id: 3, type: "ManualTrip", description: "New custom trip to Tokyo requested", date: new Date(Date.now() - 7200000).toISOString() }
  ]);
};

export const handleGetManualTrips: RequestHandler = (_req, res) => {
  res.json([
    { id: 1, sourceCity: "New York", destinationCity: "Tokyo", travelers: 2, budget: "Luxury ($5000+)", travelMode: "Flight", tripDate: new Date(Date.now() + 864000000).toISOString() },
    { id: 2, sourceCity: "London", destinationCity: "Paris", travelers: 4, budget: "Mid-Range ($2000-$5000)", travelMode: "Train", tripDate: new Date(Date.now() + 1728000000).toISOString() }
  ]);
};

export const handleGetContactMessages: RequestHandler = (_req, res) => {
  res.json([
    { id: 1, fullName: "Alice Johnson", email: "alice@test.com", subject: "Custom Trip to Italy", message: "Hello, I would like to arrange a custom trip to Rome for 5 days. What are my options?", sentAt: new Date(Date.now() - 86400000).toISOString() },
    { id: 2, fullName: "Bob Williams", email: "bob@test.com", subject: "Refund Inquiry", message: "Hi, I need to cancel my booking to Bali due to an emergency. How do I proceed with a refund?", sentAt: new Date(Date.now() - 10800000).toISOString() }
  ]);
};

export const handleGetPackages: RequestHandler = (_req, res) => {
  res.json([
    { id: 1, title: "Parisian Romance", city: "Paris", country: "France", durationDays: 7, pricePerPerson: 2499, rating: 4.9 },
    { id: 2, title: "Bali Escape", city: "Bali", country: "Indonesia", durationDays: 5, pricePerPerson: 1799, rating: 4.8 },
    { id: 3, title: "Tokyo Adventure", city: "Tokyo", country: "Japan", durationDays: 8, pricePerPerson: 2199, rating: 4.7 }
  ]);
};

export const handleGetBookingsList: RequestHandler = (_req, res) => {
  res.json([
    { id: 1, packageId: 1, travelers: 2, totalPrice: 4998, bookingDate: new Date(Date.now() - 432000000).toISOString(), status: "CONFIRMED" },
    { id: 2, packageId: 2, travelers: 4, totalPrice: 7196, bookingDate: new Date(Date.now() - 172800000).toISOString(), status: "PENDING" },
    { id: 3, packageId: 3, travelers: 1, totalPrice: 2199, bookingDate: new Date(Date.now() - 1296000000).toISOString(), status: "CONFIRMED" }
  ]);
};
