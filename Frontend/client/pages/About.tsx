import Layout from "@/components/Layout";
import { Award, Users, Globe, Heart, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 section-padding">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
            About LUX Travel
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Discover the story behind the world's most inspiring travel
            experiences
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-6">
              Our Story
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              LUX Travel was founded with a simple vision: to make luxury travel
              accessible and unforgettable for everyone. What started as a
              passion project by a group of travel enthusiasts has evolved into
              a trusted travel partner serving thousands of adventurers
              annually.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              We believe that travel transforms lives. Every journey you take
              with us is carefully curated to offer authentic experiences,
              exceptional service, and memories that last a lifetime.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Today, we're proud to operate in over 50 destinations across 6
              continents, helping travelers discover the world on their terms.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop"
              alt="Our team"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-playfair font-bold text-foreground mb-3">
                Global Reach
              </h3>
              <p className="text-gray-600">
                We operate worldwide, connecting travelers to the most inspiring
                destinations on Earth.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-playfair font-bold text-foreground mb-3">
                Authentic Experiences
              </h3>
              <p className="text-gray-600">
                We focus on genuine connections and meaningful experiences that
                go beyond tourism.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-playfair font-bold text-foreground mb-3">
                Excellence
              </h3>
              <p className="text-gray-600">
                Every detail matters. We maintain the highest standards in
                service and quality.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-playfair font-bold text-foreground mb-3">
                Community
              </h3>
              <p className="text-gray-600">
                We support local communities and practice responsible travel in
                every destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="gradient-accent section-padding text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold mb-2">50+</p>
              <p className="text-lg text-white/80">Destinations</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">10K+</p>
              <p className="text-lg text-white/80">Happy Travelers</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">100+</p>
              <p className="text-lg text-white/80">Packages</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">15+</p>
              <p className="text-lg text-white/80">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground text-center mb-12">
            Meet Our Team
          </h2>
          <p className="text-center text-gray-600 text-lg max-w-2xl mx-auto mb-12">
            Our diverse team of travel experts, destination specialists, and
            logistics professionals work together to create unforgettable
            journeys.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((idx) => (
              <div key={idx} className="text-center">
                <img
                  src={`https://images.unsplash.com/photo-${
                    1494790108377 + idx
                  }?w=300&h=300&fit=crop`}
                  alt="Team member"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-playfair font-bold text-foreground">
                  Expert Traveler {idx}
                </h3>
                <p className="text-primary font-semibold mb-2">Specialist</p>
                <p className="text-gray-600">
                  Passionate about creating memorable travel experiences
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-6">
            Ready to Create Your Story?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Join thousands of travelers who've discovered the world with LUX
            Travel. Let's plan your next adventure together.
          </p>
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Explore Packages <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
