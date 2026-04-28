import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import DestinationCard from "@/components/DestinationCard";
import PackageCard from "@/components/PackageCard";
import TestimonialCard from "@/components/TestimonialCard";
import BlogCard from "@/components/BlogCard";
import { ChevronRight, Zap, MapPin, Award } from "lucide-react";

export default function Home() {
  // Sample data
  const destinations = [
    {
      name: "Paris, France",
      description: "The City of Light awaits with iconic landmarks and romance",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&h=400&fit=crop",
      packages: 12,
    },
    {
      name: "Bali, Indonesia",
      description:
        "Tropical paradise with stunning beaches and ancient temples",
      image:
        "/assets/images/indonesia-bali.jpg",
      packages: 15,
    },
    {
      name: "Tokyo, Japan",
      description:
        "Modern metropolis blending tradition with cutting-edge culture",
      image:
        "/assets/images/japan-tokyo.jpg",
      packages: 10,
    },
    {
      name: "New York, USA",
      description: "The city that never sleeps with world-class attractions",
      image:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&h=400&fit=crop",
      packages: 18,
    },
  ];

  const packages = [
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
  ];

  const testimonials = [
    {
      author: "Sarah Johnson",
      role: "Travel Enthusiast",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      content:
        "LUX Travel made my dream vacation a reality! The attention to detail and personalized service were exceptional. Can't wait for my next adventure!",
      rating: 5,
    },
    {
      author: "Michael Chen",
      role: "Business Executive",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      content:
        "Booked the Tokyo package and everything was perfectly arranged. From flights to accommodations, every detail was handled professionally.",
      rating: 5,
    },
    {
      author: "Emma Williams",
      role: "Adventure Seeker",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      content:
        "The Bali trip was life-changing! Great value for money and amazing memories with knowledgeable guides throughout the journey.",
      rating: 5,
    },
  ];

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
  ];

  const offers = [
    {
      title: "Early Bird Special",
      discount: "20% OFF",
      description: "Book 3 months in advance and save on any package",
      color: "from-primary to-blue-500",
    },
    {
      title: "Group Discounts",
      discount: "15% OFF",
      description: "Travel with 4+ friends and enjoy special group rates",
      color: "from-secondary to-orange-500",
    },
    {
      title: "Loyalty Rewards",
      discount: "Up to 30%",
      description: "Existing customers get exclusive perks and upgrades",
      color: "from-accent to-yellow-500",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-r from-primary/10 to-secondary/10 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop"
            alt="Hero background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-screen flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-primary rounded-full" />
                <span className="text-primary font-semibold">
                  Welcome to LUX Travel
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-foreground mb-6 leading-tight">
                Discover the <span className="text-primary">World's</span>{" "}
                <span className="text-secondary">Magic</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
                Experience unforgettable journeys with luxury travel packages
                designed for modern adventurers. From exotic beaches to historic
                cities, we curate the perfect escape.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/packages"
                  className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  Explore Packages <ChevronRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all flex items-center justify-center"
                >
                  Get in Touch
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-16 pt-8 border-t border-gray-300">
                <div>
                  <p className="text-3xl font-bold text-primary">50+</p>
                  <p className="text-sm text-gray-600">Destinations</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-secondary">10K+</p>
                  <p className="text-sm text-gray-600">Happy Travelers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-accent">100+</p>
                  <p className="text-sm text-gray-600">Packages</p>
                </div>
              </div>
            </div>

            <div className="hidden lg:block animate-slide-up">
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=600&fit=crop"
                alt="Travel"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
              Popular Destinations
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our handpicked selection of the world's most inspiring
              destinations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((destination, idx) => (
              <div
                key={idx}
                className="animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <DestinationCard {...destination} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
              Featured Travel Packages
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Curated experiences with all-inclusive pricing and unforgettable
              memories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className="animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <PackageCard {...pkg} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all"
            >
              View All Packages <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
              Limited Time Offers
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Don't miss out on our exclusive deals and special promotions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offers.map((offer, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-br ${offer.color} p-8 rounded-xl text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1`}
              >
                <Zap className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-playfair font-bold mb-2">
                  {offer.title}
                </h3>
                <p className="text-4xl font-bold mb-3">{offer.discount}</p>
                <p className="text-white/90 mb-6">{offer.description}</p>
                <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-all">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
              What Our Travelers Say
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Join thousands of satisfied customers who've experienced the LUX
              Travel difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
              Travel Guides & Inspiration
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Tips, guides, and inspiring stories from fellow travelers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {blogPosts.map((post, idx) => (
              <div
                key={idx}
                className="animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <BlogCard {...post} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all"
            >
              Read All Articles <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-accent section-padding">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Let our expert team help you plan the perfect trip tailored to your
            dreams
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Start Planning <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
