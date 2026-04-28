import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Check, ChevronDown } from "lucide-react";
import { toast } from "sonner";

interface CustomizeTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageData: {
    id: string;
    title: string;
    price: number;
    duration: number;
  };
  travelers: number;
}

const HOTEL_TYPES = [
  { label: "3-Star Comfort", multiplier: 0.8 },
  { label: "4-Star Superior", multiplier: 1.0 },
  { label: "5-Star Luxury", multiplier: 1.35 },
  { label: "Boutique & Unique", multiplier: 1.5 },
];

const FLIGHT_CLASSES = [
  { label: "Economy", multiplier: 1.0 },
  { label: "Premium Economy", multiplier: 1.2 },
  { label: "Business Class", multiplier: 1.6 },
  { label: "First Class", multiplier: 2.2 },
];

const MEAL_PREFS = ["Standard", "Vegetarian", "Vegan", "Halal", "Gluten-Free"];

const ACTIVITIES = [
  "City Tours",
  "Adventure Sports",
  "Cultural Experiences",
  "Fine Dining",
  "Spa & Wellness",
  "Photography Tours",
  "Night Life",
];

export default function CustomizeTripModal({
  isOpen,
  onClose,
  packageData,
  travelers,
}: CustomizeTripModalProps) {
  const [days, setDays] = useState(packageData.duration);
  const [numTravelers, setNumTravelers] = useState(travelers);
  const [hotelIdx, setHotelIdx] = useState(1);
  const [flightIdx, setFlightIdx] = useState(0);
  const [mealPref, setMealPref] = useState("Standard");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([
    "City Tours",
    "Cultural Experiences",
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const basePricePerDay = packageData.price / packageData.duration;
  const customPrice =
    basePricePerDay *
    days *
    numTravelers *
    HOTEL_TYPES[hotelIdx].multiplier *
    FLIGHT_CLASSES[flightIdx].multiplier;
  const tax = customPrice * 0.15;
  const total = customPrice + tax;

  const toggleActivity = (activity: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity]
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    onClose();
    toast.success("🎯 Custom itinerary request sent! Our team will contact you within 24 hours.", {
      duration: 5000,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10 rounded-t-2xl">
          <div>
            <h2 className="text-xl font-playfair font-bold text-foreground">
              Customize Your Trip
            </h2>
            <p className="text-sm text-gray-500">{packageData.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Duration */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Number of Days
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDays(Math.max(1, days - 1))}
                className="w-10 h-10 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all"
              >
                −
              </button>
              <span className="text-2xl font-bold text-foreground w-12 text-center">
                {days}
              </span>
              <button
                onClick={() => setDays(days + 1)}
                className="w-10 h-10 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all"
              >
                +
              </button>
              <span className="text-gray-500 text-sm">days</span>
            </div>
          </div>

          {/* Travelers */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Number of Travelers
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setNumTravelers(Math.max(1, numTravelers - 1))}
                className="w-10 h-10 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all"
              >
                −
              </button>
              <span className="text-2xl font-bold text-foreground w-12 text-center">
                {numTravelers}
              </span>
              <button
                onClick={() => setNumTravelers(numTravelers + 1)}
                className="w-10 h-10 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all"
              >
                +
              </button>
              <span className="text-gray-500 text-sm">travelers</span>
            </div>
          </div>

          {/* Hotel Type */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Hotel Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {HOTEL_TYPES.map((hotel, idx) => (
                <button
                  key={hotel.label}
                  onClick={() => setHotelIdx(idx)}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-all text-left ${
                    hotelIdx === idx
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-gray-200 text-gray-600 hover:border-primary/50"
                  }`}
                >
                  {hotel.label}
                </button>
              ))}
            </div>
          </div>

          {/* Flight Class */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Flight Class
            </label>
            <div className="grid grid-cols-2 gap-3">
              {FLIGHT_CLASSES.map((fc, idx) => (
                <button
                  key={fc.label}
                  onClick={() => setFlightIdx(idx)}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-all text-left ${
                    flightIdx === idx
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-gray-200 text-gray-600 hover:border-primary/50"
                  }`}
                >
                  {fc.label}
                </button>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Activities (select all that apply)
            </label>
            <div className="flex flex-wrap gap-2">
              {ACTIVITIES.map((activity) => {
                const selected = selectedActivities.includes(activity);
                return (
                  <button
                    key={activity}
                    onClick={() => toggleActivity(activity)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                      selected
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-gray-600 border-gray-300 hover:border-primary"
                    }`}
                  >
                    {selected && <Check className="w-3 h-3 inline mr-1" />}
                    {activity}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Meal Preference */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Meal Preference
            </label>
            <div className="relative">
              <select
                value={mealPref}
                onChange={(e) => setMealPref(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              >
                {MEAL_PREFS.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <h3 className="font-semibold text-foreground mb-4">
              Custom Price Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>
                  Base ({days} days × {numTravelers} travelers)
                </span>
                <span>${Math.round(basePricePerDay * days * numTravelers).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Hotel ({HOTEL_TYPES[hotelIdx].label})</span>
                <span>×{HOTEL_TYPES[hotelIdx].multiplier}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Flight ({FLIGHT_CLASSES[flightIdx].label})</span>
                <span>×{FLIGHT_CLASSES[flightIdx].multiplier}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (15%)</span>
                <span>${Math.round(tax).toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-foreground pt-2 border-t border-gray-300 mt-2">
                <span>Total</span>
                <span className="text-primary">${Math.round(total).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending Request...
              </>
            ) : (
              "Submit Custom Request"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
