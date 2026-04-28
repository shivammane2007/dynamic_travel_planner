import { MapPin, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

interface DestinationCardProps {
  name: string;
  description: string;
  image: string;
  packages: number;
}

export default function DestinationCard({
  name,
  description,
  image,
  packages,
}: DestinationCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
        {!imageError ? (
          <>
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
                <ImageIcon className="w-12 h-12 text-gray-400" />
              </div>
            )}
            <img
              src={image}
              alt={name}
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
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/30 to-secondary/30">
            <ImageIcon className="w-16 h-16 text-white/80 mb-2" />
            <p className="text-white/80 text-sm font-semibold">{name}</p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-playfair font-bold mb-2 transform group-hover:translate-x-1 transition-transform">
            {name}
          </h3>
          <p className="text-sm text-white/90 line-clamp-2">{description}</p>
        </div>
      </div>
      <div className="p-6 bg-white group-hover:bg-gradient-to-br group-hover:from-primary/5 group-hover:to-secondary/5 transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <MapPin className="w-5 h-5" />
            <span className="font-semibold">{packages} Packages</span>
          </div>
          <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-lg hover:scale-105 transition-all">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}
