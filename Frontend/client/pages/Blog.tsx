import Layout from "@/components/Layout";
import BlogCard from "@/components/BlogCard";

export default function Blog() {
  const blogPosts = [
    {
      id: "1",
      title: "10 Hidden Gems You Must Visit in Paris",
      excerpt:
        "Discover the lesser-known attractions that make Paris truly magical, from charming cafés to secret gardens...",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&h=400&fit=crop",
      author: "Sophie Martin",
      date: "Mar 15, 2024",
      category: "Guides",
    },
    {
      id: "2",
      title: "Bali on a Budget: Travel Smart in 2024",
      excerpt:
        "How to experience luxury travel in Bali without breaking the bank. Complete tips and money-saving hacks...",
      image:
        "/assets/images/indonesia-bali.jpg",
      author: "David Kumar",
      date: "Mar 10, 2024",
      category: "Tips",
    },
    {
      id: "3",
      title: "Tokyo's Best Neighborhoods for First-Timers",
      excerpt:
        "Navigate Tokyo like a local! Our comprehensive guide to the must-visit neighborhoods and what to do there...",
      image:
        "/assets/images/japan-tokyo.jpg",
      author: "Alex Tanaka",
      date: "Mar 5, 2024",
      category: "Guides",
    },
    {
      id: "4",
      title: "Ultimate New York City Travel Guide",
      excerpt:
        "Everything you need to know about visiting NYC: attractions, dining, nightlife, and insider tips...",
      image:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&h=400&fit=crop",
      author: "Emma Williams",
      date: "Feb 28, 2024",
      category: "Guides",
    },
    {
      id: "5",
      title: "Best Times to Visit Popular Destinations",
      excerpt:
        "Plan your trip perfectly by knowing the best seasons to visit destinations around the world...",
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=400&fit=crop",
      author: "Michael Chen",
      date: "Feb 20, 2024",
      category: "Tips",
    },
    {
      id: "6",
      title: "Luxury Hotel Chains We Recommend",
      excerpt:
        "Explore the world's best luxury hotel chains that guarantee unforgettable stays and premium service...",
      image:
        "https://images.unsplash.com/photo-1470252649378-9c29740ff023?w=500&h=400&fit=crop",
      author: "Sarah Johnson",
      date: "Feb 15, 2024",
      category: "Reviews",
    },
  ];

  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 section-padding">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
            Travel Guides & Stories
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Discover inspiring travel guides, tips, and stories from our expert
            writers and fellow adventurers
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
