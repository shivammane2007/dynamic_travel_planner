import { MapPin, Star, IndianRupee, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Hotel {
  name: string;
  rating: number;
  pricePerNight: number;
  distanceFromCenter: string;
  amenities: string[];
  imageUrl: string;
  bookingUrl: string;
}

interface HotelCardProps {
  hotel: Hotel;
}

export function HotelCard({ hotel }: HotelCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={hotel.imageUrl} 
          alt={hotel.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-bold flex items-center gap-1 shadow-sm">
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          {hotel.rating}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold font-serif text-slate-900 mb-1">{hotel.name}</h3>
        <div className="flex items-center gap-1 text-sm text-slate-500 mb-4">
          <MapPin className="h-3.5 w-3.5" />
          {hotel.distanceFromCenter}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {hotel.amenities.map((amenity, idx) => (
            <span key={idx} className="px-2 py-1 bg-slate-50 text-slate-600 rounded-md text-xs font-medium border border-slate-100">
              {amenity}
            </span>
          ))}
        </div>

        <div className="flex items-end justify-between mt-auto">
          <div>
            <div className="text-xs text-slate-500 font-medium">Price per night</div>
            <div className="text-2xl font-bold text-slate-900 flex items-center">
              <IndianRupee className="h-5 w-5" />
              {hotel.pricePerNight.toLocaleString('en-IN')}
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => navigate("/booking/custom", {
                state: {
                  packageData: {
                    title: hotel.name,
                    destination: "Hotel Stay",
                    price: hotel.pricePerNight,
                    duration: 1,
                    image: hotel.imageUrl
                  }
                }
              })}
              className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl group-hover:bg-red-600 transition-colors"
            >
              Book Stay
            </Button>
            <Button 
              onClick={() => window.open(hotel.bookingUrl, '_blank')}
              variant="outline"
              className="rounded-xl px-3 border-slate-200 hover:bg-slate-100"
              title="View External"
            >
              <ExternalLink className="h-4 w-4 text-slate-600" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
