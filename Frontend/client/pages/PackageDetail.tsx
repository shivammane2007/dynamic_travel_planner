import Layout from "@/components/Layout";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Users,
  Star,
  Check,
  Phone,
  Mail,
  Heart,
  Share2,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import CustomizeTripModal from "@/components/CustomizeTripModal";

export default function PackageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  const handleBookNow = async () => {
    setIsBookingLoading(true);
    // Brief loading feedback before navigation
    await new Promise((r) => setTimeout(r, 600));
    setIsBookingLoading(false);
    navigate(`/booking/${id || "1"}`, {
      state: {
        packageData: {
          id: id || "1",
          title: package_data.title,
          destination: package_data.destination,
          price: package_data.price,
          duration: package_data.duration,
          image: package_data.image,
        },
        travelers: quantity,
      },
    });
  };

  // Package data (in a real app, this would come from an API)
  const packagesData: Record<string, any> = {
    "1": {
      title: "Parisian Romance",
      destination: "Paris, France",
      description:
        "Experience the magic of Paris with 7 days of luxury, culture, and romance",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=600&fit=crop",
      price: 2499,
      duration: 7,
      rating: 4.9,
      reviewCount: 328,
      groupSize: "2-8 people",
      bestFor: "Couples, honeymooners, culture enthusiasts",
      highlights: [
        "Skip-the-line Eiffel Tower access",
        "Private Seine river cruise",
        "Gourmet dining experiences",
        "Louvre Museum guided tour",
        "Champs-Élysées shopping",
        "Versailles Palace visit",
      ],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Paris",
          description:
            "Arrive at Paris Charles de Gaulle Airport. Transfer to your luxury hotel in the heart of Paris.",
        },
        {
          day: 2,
          title: "Eiffel Tower & City Exploration",
          description:
            "Visit the iconic Eiffel Tower with skip-the-line access. Evening Seine river cruise with dinner.",
        },
        {
          day: 3,
          title: "Louvre & Art",
          description:
            "Guided tour of the world-famous Louvre Museum. Explore masterpieces and cultural treasures.",
        },
        {
          day: 4,
          title: "Versailles Palace",
          description:
            "Day trip to the stunning Palace of Versailles. Explore gardens and royal chambers.",
        },
        {
          day: 5,
          title: "Shopping & Leisure",
          description:
            "Free day for shopping on Champs-Élysées or exploring neighborhoods. Optional activities available.",
        },
        {
          day: 6,
          title: "Montmartre & Nightlife",
          description:
            "Visit artistic Montmartre. Evening cabaret show at a famous Parisian venue.",
        },
        {
          day: 7,
          title: "Departure",
          description:
            "Breakfast at a local café. Transfer to airport for departure.",
        },
      ],
      included: [
        "6 nights accommodation in 5-star hotel",
        "Daily breakfast",
        "4 gourmet dinners",
        "All main attractions entrance fees",
        "Professional English-speaking guide",
        "Private transportation",
        "Travel insurance",
      ],
      notIncluded: [
        "International flights",
        "Personal expenses",
        "Optional activities",
        "Beverages at restaurants",
      ],
      customerReviews: [
        {
          author: "Sarah M.",
          rating: 5,
          comment:
            "The most romantic trip I could have asked for! Everything was perfectly organized.",
        },
        {
          author: "James L.",
          rating: 5,
          comment:
            "Outstanding service and incredible attention to detail. Highly recommended!",
        },
      ],
    },
  };

  const package_data = packagesData[id || "1"] || packagesData["1"];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden bg-gray-800">
        <img
          src={package_data.image}
          alt={package_data.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                <div className="flex items-center gap-2 text-primary text-lg font-semibold mb-3">
                  <MapPin className="w-5 h-5" />
                  {package_data.destination}
                </div>
                <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white">
                  {package_data.title}
                </h1>
              </div>
              <div className="flex gap-3">
                <button className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-all text-white">
                  <Heart className="w-6 h-6" />
                </button>
                <button className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-all text-white">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Quick Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 pb-12 border-b border-gray-200">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-2">
                  DURATION
                </p>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <p className="text-xl font-bold text-foreground">
                    {package_data.duration} Days
                  </p>
                </div>
              </div>
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-2">
                  GROUP SIZE
                </p>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <p className="text-lg font-semibold text-foreground">
                    {package_data.groupSize}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-2">
                  RATING
                </p>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-accent text-accent" />
                  <p className="text-lg font-bold text-foreground">
                    {package_data.rating}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-2">
                  REVIEWS
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {package_data.reviewCount} Reviews
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-12">
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">
                About This Package
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {package_data.description}
              </p>
            </div>

            {/* Highlights */}
            <div className="mb-12">
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-6">
                Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {package_data.highlights.map(
                  (highlight: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <p className="text-gray-700">{highlight}</p>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Itinerary */}
            <div className="mb-12">
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-6">
                Day-by-Day Itinerary
              </h2>
              <div className="space-y-6">
                {package_data.itinerary.map((day: any, idx: number) => (
                  <div key={idx} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                        {day.day}
                      </div>
                      {idx < package_data.itinerary.length - 1 && (
                        <div className="w-1 h-16 bg-primary/20 mt-2" />
                      )}
                    </div>
                    <div className="pb-6">
                      <h3 className="text-lg font-playfair font-bold text-foreground mb-2">
                        {day.title}
                      </h3>
                      <p className="text-gray-700">{day.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What's Included */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 pb-12 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-playfair font-bold text-foreground mb-4">
                  Included
                </h3>
                <ul className="space-y-3">
                  {package_data.included.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-playfair font-bold text-foreground mb-4">
                  Not Included
                </h3>
                <ul className="space-y-3">
                  {package_data.notIncluded.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-gray-400 mt-0.5">✕</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-6">
                Traveler Reviews
              </h2>
              <div className="space-y-6">
                {package_data.customerReviews.map((review: any, idx: number) => (
                  <div
                    key={idx}
                    className="border-l-4 border-primary pl-6 py-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">
                        {review.author}
                      </h4>
                      <div className="flex gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-accent text-accent"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gray-50 rounded-xl p-8 shadow-lg">
              {/* Price */}
              <div className="mb-8">
                <p className="text-gray-600 text-sm font-semibold mb-2">
                  PRICE PER PERSON
                </p>
                <p className="text-5xl font-bold text-primary">
                  ${package_data.price}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  All-inclusive pricing
                </p>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Number of Travelers
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-200 transition-all"
                  >
                    −
                  </button>
                  <span className="flex-1 text-center font-bold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-200 transition-all"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="mb-8 pb-8 border-b border-gray-300">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">
                    ${package_data.price * quantity}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Tax (15%)</span>
                  <span className="font-semibold">
                    ${Math.round(package_data.price * quantity * 0.15)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">
                    ${Math.round(package_data.price * quantity * 1.15)}
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <button
                onClick={handleBookNow}
                disabled={isBookingLoading}
                className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity mb-3 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isBookingLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Book Now"
                )}
              </button>
              <button
                onClick={() => setIsCustomizeOpen(true)}
                className="w-full py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all mb-6"
              >
                Customize Trip
              </button>

              {/* Contact */}
              <div className="space-y-4 text-sm">
                <p className="text-gray-600">
                  Questions? Our travel experts are here to help!
                </p>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <a
                    href="tel:+1234567890"
                    className="text-primary hover:underline font-semibold"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <a
                    href="mailto:hello@luxtravel.com"
                    className="text-primary hover:underline font-semibold break-all"
                  >
                    hello@luxtravel.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Packages */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-playfair font-bold text-foreground mb-8">
            More Packages to Explore
          </h2>
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-6">
              Check out our other fantastic travel packages
            </p>
            <a
              href="/packages"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all"
            >
              View All Packages <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
      <CustomizeTripModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        packageData={{
          id: id || "1",
          title: package_data.title,
          price: package_data.price,
          duration: package_data.duration,
        }}
        travelers={quantity}
      />
    </Layout>
  );
}
