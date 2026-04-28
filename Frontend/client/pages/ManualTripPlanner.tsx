import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Calendar, Users, IndianRupee, Plane, Building2, Map } from "lucide-react";
import { toast } from "sonner";

export default function ManualTripPlanner() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    sourceCity: "",
    destinationCity: "",
    departureDate: "",
    returnDate: "",
    travelers: "1",
    budget: "",
    travelMode: "",
    hotelPreference: "",
    interests: [] as string[],
  });

  const interestsOptions = [
    "Food", "Beaches", "Shopping", "Nature", "Nightlife", "Religious", "Adventure"
  ];

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sourceCity || !formData.destinationCity) {
      toast.error("Source and Destination cities are required");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Generating your personalized trip plan...");

    try {
      const response = await fetch("/api/planner/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success("Trip plan generated successfully!", { id: toastId });
        navigate("/trip-results", { state: { tripData: result.data } });
      } else {
        toast.error(result.error || "Failed to generate trip plan", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while generating the trip plan", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">
            Custom Trip Planner
          </h1>
          <p className="text-lg text-slate-600">
            Tell us your travel preferences, and we'll craft the perfect real-world itinerary for you.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Route Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="sourceCity" className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <MapPin className="h-4 w-4 text-red-500" /> From City
                </Label>
                <Input 
                  id="sourceCity"
                  placeholder="e.g. Pune" 
                  value={formData.sourceCity}
                  onChange={(e) => setFormData({...formData, sourceCity: e.target.value})}
                  required
                  className="h-12"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="destinationCity" className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <MapPin className="h-4 w-4 text-red-500" /> To City
                </Label>
                <Input 
                  id="destinationCity"
                  placeholder="e.g. Mumbai" 
                  value={formData.destinationCity}
                  onChange={(e) => setFormData({...formData, destinationCity: e.target.value})}
                  required
                  className="h-12"
                />
              </div>
            </div>

            {/* Dates & Travelers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <Label htmlFor="departureDate" className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Calendar className="h-4 w-4 text-red-500" /> Departure Date
                </Label>
                <Input 
                  id="departureDate"
                  type="date"
                  value={formData.departureDate}
                  onChange={(e) => setFormData({...formData, departureDate: e.target.value})}
                  className="h-12"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="returnDate" className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Calendar className="h-4 w-4 text-slate-400" /> Return Date (Optional)
                </Label>
                <Input 
                  id="returnDate"
                  type="date"
                  value={formData.returnDate}
                  onChange={(e) => setFormData({...formData, returnDate: e.target.value})}
                  className="h-12"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="travelers" className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Users className="h-4 w-4 text-red-500" /> Travelers
                </Label>
                <Input 
                  id="travelers"
                  type="number"
                  min="1"
                  value={formData.travelers}
                  onChange={(e) => setFormData({...formData, travelers: e.target.value})}
                  className="h-12"
                />
              </div>
            </div>

            {/* Preferences */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <IndianRupee className="h-4 w-4 text-red-500" /> Budget
                </Label>
                <Select value={formData.budget} onValueChange={(v) => setFormData({...formData, budget: v})}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low (Budget-friendly)</SelectItem>
                    <SelectItem value="Medium">Medium (Comfortable)</SelectItem>
                    <SelectItem value="Luxury">Luxury (Premium)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Plane className="h-4 w-4 text-red-500" /> Travel Mode
                </Label>
                <Select value={formData.travelMode} onValueChange={(v) => setFormData({...formData, travelMode: v})}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Preferred Mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Car">Car / Cab</SelectItem>
                    <SelectItem value="Train">Train</SelectItem>
                    <SelectItem value="Bus">Bus</SelectItem>
                    <SelectItem value="Flight">Flight</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Building2 className="h-4 w-4 text-red-500" /> Hotel Preference
                </Label>
                <Select value={formData.hotelPreference} onValueChange={(v) => setFormData({...formData, hotelPreference: v})}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Hotel Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Budget">Budget / Hostels</SelectItem>
                    <SelectItem value="3 Star">3 Star Comfort</SelectItem>
                    <SelectItem value="4 Star">4 Star Premium</SelectItem>
                    <SelectItem value="5 Star">5 Star Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Interests */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <Map className="h-4 w-4 text-red-500" /> Select your interests
              </Label>
              <div className="flex flex-wrap gap-3">
                {interestsOptions.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleInterestToggle(interest)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      formData.interests.includes(interest)
                        ? "bg-red-500 text-white shadow-md shadow-red-500/20"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 text-lg bg-red-600 hover:bg-red-700 transition-all rounded-xl shadow-lg shadow-red-600/20"
              disabled={loading}
            >
              {loading ? "Planning..." : "Generate My Custom Trip"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
