import Layout from "@/components/Layout";
import PackageCard from "@/components/PackageCard";
import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

export default function Packages() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState("popular");
  const [allPackages, setAllPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch("/api/packages");
        if (res.ok) {
          const data = await res.json();
          // API returns an ApiResponse { success: true, data: [...] } or direct array
          const pkgs = data.data ? data.data : data;
          
          // Map DB keys to frontend keys if necessary, or just use as is
          const mappedPkgs = pkgs.map((p: any) => ({
            id: p.id.toString(),
            title: p.title,
            destination: `${p.city}, ${p.country}`,
            description: p.description,
            image: p.heroImage || p.image,
            price: p.pricePerPerson,
            duration: p.durationDays,
            rating: p.rating,
            reviews: p.reviewsCount
          }));
          
          setAllPackages(mappedPkgs);
        }
      } catch (err) {
        console.error("Failed to fetch packages", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);


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
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">Loading packages...</p>
                </div>
              ) : filteredPackages.length > 0 ? (
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
