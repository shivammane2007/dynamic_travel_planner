import React from "react";
import Layout from "@/components/Layout";
import { useFavorites, FavoritePackage } from "@/hooks/useFavorites";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Star, Trash2, Heart } from "lucide-react";
import { toast } from "sonner";

function FavoriteCard({
  pkg,
  onRemove,
}: {
  pkg: FavoritePackage;
  onRemove: (id: string) => void;
}) {
  const [imgError, setImgError] = React.useState(false);

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove(pkg.id);
    toast("💔 Removed from Favorites", {
      description: `${pkg.title} removed from your wishlist`,
      duration: 2500,
    });
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
        {!imgError ? (
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/30 to-secondary/30">
            <Heart className="w-12 h-12 text-white/70" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Price badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-secondary to-orange-500 text-white px-4 py-1.5 rounded-full font-bold text-sm shadow-lg">
          ${pkg.price}
        </div>

        {/* Remove button */}
        <button
          onClick={handleRemove}
          id={`remove-fav-${pkg.id}`}
          title="Remove from favorites"
          className="absolute top-4 left-4 p-2 bg-white/90 hover:bg-red-500 hover:text-white text-gray-600 rounded-full shadow transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-center gap-1.5 text-primary text-sm font-semibold mb-1.5">
          <MapPin className="w-4 h-4" />
          {pkg.destination}
        </div>
        <h3 className="text-lg font-playfair font-bold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {pkg.title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4">{pkg.description}</p>

        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="font-medium">{pkg.duration} Days</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="font-semibold text-foreground">{pkg.rating}</span>
            <span className="text-gray-400">({pkg.reviews})</span>
          </div>
        </div>

        <Link
          to={`/package/${pkg.id}`}
          id={`view-fav-${pkg.id}`}
          className="block w-full py-2.5 text-center bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:opacity-90 hover:shadow-lg transition-all duration-200 active:scale-95"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-foreground">
              My Favorites
            </h1>
          </div>
          <p className="text-gray-600 text-lg mt-2">
            {favorites.length > 0
              ? `You have ${favorites.length} saved package${favorites.length !== 1 ? "s" : ""} in your wishlist`
              : "Your wishlist is empty — start exploring packages!"}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((pkg) => (
                <FavoriteCard key={pkg.id} pkg={pkg} onRemove={removeFavorite} />
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-12 h-12 text-red-300" />
              </div>
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-3">
                No favorites yet
              </h2>
              <p className="text-gray-500 text-lg max-w-md mb-8">
                Browse our packages and tap the ❤️ heart icon to save your
                dream destinations here.
              </p>
              <Link
                to="/packages"
                id="explore-packages-btn"
                className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:opacity-90 hover:shadow-lg transition-all duration-200"
              >
                Explore Packages
              </Link>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
