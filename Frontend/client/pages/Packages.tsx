import Layout from "@/components/Layout";
import PackageCard from "@/components/PackageCard";
import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

export default function Packages() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState("popular");

  // All packages data
  const allPackages = [
    {
      id: "1",
      title: "Parisian Romance",
      destination: "Paris, France",
      description:
        "Experience luxury in the heart of Europe with guided tours and fine dining",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&h=400&fit=crop",
      price: 2499,
      duration: 7,
      rating: 4.9,
      reviews: 328,
    },
    {
      id: "2",
      title: "Bali Escape",
      destination: "Bali, Indonesia",
      description:
        "All-inclusive tropical getaway with spa treatments and beach time",
      image:
        "/assets/images/indonesia-bali.jpg",
      price: 1799,
      duration: 5,
      rating: 4.8,
      reviews: 512,
    },
    {
      id: "3",
      title: "Tokyo Adventure",
      destination: "Tokyo, Japan",
      description:
        "Immerse yourself in Japanese culture with traditional and modern experiences",
      image:
        "/assets/images/japan-tokyo.jpg",
      price: 2199,
      duration: 8,
      rating: 4.7,
      reviews: 276,
    },
    {
      id: "4",
      title: "NYC Discovery",
      destination: "New York, USA",
      description:
        "See Broadway shows, visit iconic museums, and enjoy world-class dining",
      image:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&h=400&fit=crop",
      price: 2099,
      duration: 6,
      rating: 4.6,
      reviews: 441,
    },
    {
      id: "5",
      title: "Dubai Luxury",
      destination: "Dubai, UAE",
      description:
        "Experience ultra-modern luxury with desert safaris and world-class shopping",
      image:
        "https://images.unsplash.com/photo-1512453475885-1b2d8b5c8e1e?w=500&h=400&fit=crop",
      price: 1999,
      duration: 4,
      rating: 4.8,
      reviews: 389,
    },
    {
      id: "6",
      title: "European Grand Tour",
      destination: "Paris, France",
      description:
        "Visit multiple European capitals with guided tours and luxury accommodations",
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=400&fit=crop",
      price: 3499,
      duration: 14,
      rating: 4.9,
      reviews: 203,
    },
    {
      id: "7",
      title: "Kyoto Traditional",
      destination: "Tokyo, Japan",
      description:
        "Explore ancient temples, traditional tea ceremonies, and peaceful gardens",
      image:
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=500&h=400&fit=crop",
      price: 1899,
      duration: 6,
      rating: 4.7,
      reviews: 294,
    },
    {
      id: "8",
      title: "Beach Paradise",
      destination: "Bali, Indonesia",
      description:
        "Surfing, diving, and relaxation on the most beautiful tropical beaches",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=400&fit=crop",
      price: 1599,
      duration: 5,
      rating: 4.6,
      reviews: 567,
    },
  ];

  // Get unique destinations
  const destinations = [...new Set(allPackages.map((pkg) => pkg.destination))];

  // Filter packages
  let filteredPackages = allPackages.filter((pkg) => {
    const matchesSearch =
      pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDestination =
      !selectedDestination || pkg.destination === selectedDestination;
    const matchesPrice =
      pkg.price >= priceRange[0] && pkg.price <= priceRange[1];

    return matchesSearch && matchesDestination && matchesPrice;
  });

  // Sort packages
  if (sortBy === "price-low") {
    filteredPackages.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredPackages.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filteredPackages.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "duration") {
    filteredPackages.sort((a, b) => a.duration - b.duration);
  }

  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 section-padding">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
            Travel Packages
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Discover our curated collection of travel packages to the world's
            most inspiring destinations
          </p>
        </div>
      </section>

      {/* Filters & Packages */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Search */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Search Packages
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Destination Filter */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Destination
                  </label>
                  <select
                    value={selectedDestination}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">All Destinations</option>
                    {destinations.map((dest) => (
                      <option key={dest} value={dest}>
                        {dest}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Price Range
                  </label>
                  <div className="space-y-3">
                    <div>
                      <input
                        type="range"
                        min="0"
                        max="5000"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([
                            parseInt(e.target.value),
                            priceRange[1],
                          ])
                        }
                        className="w-full"
                      />
                    </div>
                    <div>
                      <input
                        type="range"
                        min="0"
                        max="5000"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([
                            priceRange[0],
                            parseInt(e.target.value),
                          ])
                        }
                        className="w-full"
                      />
                    </div>
                    <div className="text-sm text-gray-600">
                      ${priceRange[0]} - ${priceRange[1]}
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedDestination("");
                    setPriceRange([0, 5000]);
                    setSortBy("popular");
                  }}
                  className="w-full py-2 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            {/* Packages Grid */}
            <div className="lg:col-span-3">
              {/* Sort Options */}
              <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="text-gray-600 font-semibold">
                  {filteredPackages.length} packages found
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 text-sm">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="duration">Shortest Duration</option>
                  </select>
                </div>
              </div>

              {/* Packages */}
              {filteredPackages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPackages.map((pkg) => (
                    <PackageCard key={pkg.id} {...pkg} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">
                    No packages found matching your filters. Try adjusting your
                    search criteria.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
