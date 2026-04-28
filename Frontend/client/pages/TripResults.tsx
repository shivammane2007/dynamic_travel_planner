import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { HotelCard } from "@/components/planner/HotelCard";
import { TravelSuggestions } from "@/components/planner/TravelSuggestions";
import { ItineraryTimeline } from "@/components/planner/ItineraryTimeline";
import { ArrowLeft, Cloud, MapPin, IndianRupee, Lightbulb, Utensils, Map as MapIcon, Share2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function TripResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const tripData = location.state?.tripData;

  if (!tripData) {
    return <Navigate to="/manual-trip" replace />;
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `My Trip to ${tripData.destinationCity}`,
          text: `Check out my custom trip plan to ${tripData.destinationCity}! Estimated Budget: ₹${tripData.budgetBreakdown.totalEstimatedBudget}`,
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-12">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070')] bg-cover bg-center" />
        <div className="max-w-6xl mx-auto relative z-10">
          <Button 
            variant="ghost" 
            className="text-slate-300 hover:text-white mb-6 -ml-4"
            onClick={() => navigate("/manual-trip")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Planner
          </Button>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-red-400 mb-2 font-medium">
                <MapPin className="h-5 w-5" />
                {tripData.sourceCity} → {tripData.destinationCity}
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                Your Custom Trip Plan
              </h1>
              <div className="flex items-center gap-6 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-blue-400" />
                  {tripData.weather.temperature}°C {tripData.weather.condition}
                </div>
                <div className="flex items-center gap-2">
                  <IndianRupee className="h-5 w-5 text-green-400" />
                  Est. {tripData.budgetBreakdown.totalEstimatedBudget.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleShare} variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20 text-white">
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                <Download className="mr-2 h-4 w-4" /> Save as PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Smart Suggestions Alert */}
          {tripData.smartSuggestions && tripData.smartSuggestions.length > 0 && (
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-blue-800 font-bold mb-3">
                <Lightbulb className="h-5 w-5" /> Smart Suggestions
              </div>
              <ul className="space-y-2">
                {tripData.smartSuggestions.map((suggestion: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-blue-900 text-sm">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Travel Options */}
          <section>
            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-2">
              <MapIcon className="h-6 w-6 text-red-500" /> Travel Options
            </h2>
            <TravelSuggestions suggestions={tripData.travelSuggestions} bestOption={tripData.bestTravelOption} />
          </section>

          {/* Itinerary */}
          <section>
            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Day-wise Itinerary</h2>
            <ItineraryTimeline itinerary={tripData.itinerary} />
          </section>

          {/* Places to Eat & Visit */}
          <section className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Utensils className="h-5 w-5 text-orange-500" /> Recommended Eateries
              </h3>
              <ul className="space-y-3">
                {tripData.restaurants.map((r: string, i: number) => (
                  <li key={i} className="text-slate-600 text-sm pb-3 border-b border-slate-50 last:border-0 last:pb-0">{r}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <MapIcon className="h-5 w-5 text-green-500" /> Top Attractions
              </h3>
              <ul className="space-y-3">
                {tripData.attractions.map((a: string, i: number) => (
                  <li key={i} className="text-slate-600 text-sm pb-3 border-b border-slate-50 last:border-0 last:pb-0">{a}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Budget Breakdown */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm sticky top-24">
            <h3 className="font-serif font-bold text-xl mb-6">Budget Breakdown</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Travel</span>
                <span className="font-medium text-slate-900">₹{tripData.budgetBreakdown.travelCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Hotel</span>
                <span className="font-medium text-slate-900">₹{tripData.budgetBreakdown.hotelCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Food</span>
                <span className="font-medium text-slate-900">₹{tripData.budgetBreakdown.foodCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Local Transport</span>
                <span className="font-medium text-slate-900">₹{tripData.budgetBreakdown.localTransport.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Activities</span>
                <span className="font-medium text-slate-900">₹{tripData.budgetBreakdown.activities.toLocaleString()}</span>
              </div>
              
              <div className="pt-4 mt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="font-bold text-slate-900">Total Est.</span>
                <span className="font-bold text-2xl text-red-600">₹{tripData.budgetBreakdown.totalEstimatedBudget.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Hotels Section (Full Width) */}
      <div className="max-w-6xl mx-auto px-4 mt-12">
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Recommended Stays</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tripData.hotelSuggestions.map((hotel: any, idx: number) => (
            <HotelCard key={idx} hotel={hotel} />
          ))}
        </div>
      </div>

    </div>
  );
}
