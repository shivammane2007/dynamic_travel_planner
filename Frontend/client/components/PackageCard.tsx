import { Link } from "react-router-dom";
import { MapPin, Calendar, Users, Star, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

interface PackageCardProps {
  id: string;
  title: string;
  destination: string;
  description: string;
  image: string;
  price: number;
  duration: number;
  rating: number;
  reviews: number;
}

export default function PackageCard({
  id,
  title,
  destination,
  description,
  image,
  price,
  duration,
  rating,
  reviews,
}: PackageCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <Link
      to={`/package/${id}`}
      className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-primary/20"
    >
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
        {!imageError ? (
          <>
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                <ImageIcon className="w-12 h-12 text-gray-400 animate-pulse" />
              </div>
            )}
            <img
              src={image}
              alt={title}
              className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${imageLoading ? "opacity-0" : "opacity-100"
                }`}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/40 to-secondary/40">
            <ImageIcon className="w-16 h-16 text-white/80 mb-2" />
            <p className="text-white font-semibold text-center px-4">{title}</p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4 bg-gradient-to-r from-secondary to-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
          ${price}
        </div>
        {rating > 4.5 && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-accent to-yellow-400 text-foreground px-4 py-2 rounded-full font-semibold text-sm shadow-lg flex items-center gap-1">
            <Star className="w-4 h-4 fill-current" />
            Popular
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="mb-4">
          <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-2">
            <MapPin className="w-4 h-4" />
            {destination}
          </div>
          <h3 className="text-xl font-playfair font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
        </div>

        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="font-medium">{duration} Days</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="font-semibold text-foreground">{rating}</span>
            <span className="text-gray-500 text-sm">({reviews})</span>
          </div>
        </div>

        <button className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
          View Details
        </button>
      </div>
    </Link>
  );
}
