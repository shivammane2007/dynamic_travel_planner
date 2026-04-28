import { RequestHandler } from "express";

export const handlePlanner: RequestHandler = (req, res) => {
  const { sourceCity, destinationCity, budget, hotelPreference, interests } = req.body;

  if (!sourceCity || !destinationCity) {
    return res.status(400).json({ error: "Source and Destination cities are required." });
  }

  // Simulated logic mirroring the Java backend for the sake of testing the React UI
  const response = {
    sourceCity,
    destinationCity,
    bestTravelOption: "Train - Vande Bharat Express",
    travelSuggestions: [
      { mode: "Train", distance: "190 km", duration: "3.5 hrs", recommendedText: "Deccan Queen / Vande Bharat" },
      { mode: "Car", distance: "150 km", duration: "3 hrs", recommendedText: "Comfortable via Expressway" },
      { mode: "Bus", distance: "150 km", duration: "4 hrs", recommendedText: "Shivneri AC Bus" }
    ],
    hotelSuggestions: [
      {
        name: "The Taj Mahal Palace",
        rating: 4.9,
        pricePerNight: 15000,
        distanceFromCenter: "0.5 km from center",
        amenities: ["Pool", "Spa", "Sea View", "Luxury"],
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=400&fit=crop",
        bookingUrl: "https://www.google.com/travel/hotels"
      },
      {
        name: "Trident Nariman Point",
        rating: 4.7,
        pricePerNight: 12000,
        distanceFromCenter: "1.2 km from center",
        amenities: ["Pool", "Gym", "Ocean View"],
        imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500&h=400&fit=crop",
        bookingUrl: "https://www.google.com/travel/hotels"
      },
      {
        name: "Budget Inn " + destinationCity,
        rating: 3.9,
        pricePerNight: 2500,
        distanceFromCenter: "3 km from center",
        amenities: ["Free Wi-Fi", "Breakfast", "AC"],
        imageUrl: "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?w=500&h=400&fit=crop",
        bookingUrl: "https://www.google.com/travel/hotels"
      }
    ],
    restaurants: ["Leopold Cafe", "Bademiya", "The Bombay Canteen"],
    attractions: ["Gateway of India", "Marine Drive", "Juhu Beach", "Siddhivinayak Temple"],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Exploring Nearby",
        activities: [
          `Reach ${destinationCity} and check-in to your hotel`,
          "Visit Gateway of India",
          "Dinner at Leopold Cafe"
        ]
      },
      {
        day: 2,
        title: "Sightseeing & Adventure",
        activities: [
          "Explore Marine Drive",
          "Lunch at Bademiya",
          "Evening at Juhu Beach"
        ]
      },
      {
        day: 3,
        title: "Departure",
        activities: [
          "Breakfast at hotel",
          "Morning visit to Siddhivinayak Temple",
          `Head back to ${sourceCity}`
        ]
      }
    ],
    budgetBreakdown: {
      travelCost: 3000,
      hotelCost: 15000,
      foodCost: 6000,
      localTransport: 1500,
      activities: 2000,
      totalEstimatedBudget: 27500,
      currency: "INR"
    },
    weather: {
      condition: "Clear",
      temperature: 31.5,
      description: "Humid with a slight breeze",
      iconUrl: "☀️"
    },
    smartSuggestions: [
      "Consider traveling by Train for a balance of comfort and cost.",
      "Book your hotels at least 2 weeks in advance for the best rates."
    ]
  };

  res.json({ success: true, data: response });
};
