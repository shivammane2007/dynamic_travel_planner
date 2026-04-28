import Layout from "@/components/Layout";
import { useParams, Link } from "react-router-dom";
import { Calendar, User, Share2, ChevronRight } from "lucide-react";

export default function BlogDetail() {
  const { slug } = useParams();

  // Blog posts data (in a real app, this would come from an API)
  const blogPosts: Record<string, any> = {
    "1": {
      id: "1",
      title: "10 Hidden Gems You Must Visit in Paris",
      category: "Travel Guides",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=600&fit=crop",
      author: "Sophie Martin",
      date: "March 15, 2024",
      content: [
        {
          type: "paragraph",
          text: "Paris, the City of Light, is known for its iconic landmarks like the Eiffel Tower and the Louvre Museum. But beyond these famous attractions lies a world of hidden gems waiting to be discovered by curious travelers. Whether you're a first-time visitor or a seasoned explorer, these lesser-known spots will give you an authentic taste of Parisian life."
        },
        {
          type: "heading",
          text: "1. Sainte-Chapelle's Stained Glass"
        },
        {
          type: "paragraph",
          text: "While the Louvre draws crowds by the millions, Sainte-Chapelle offers breathtaking stained glass windows with far fewer tourists. This Gothic masterpiece is home to some of the most stunning stained glass in the world, depicting biblical scenes in extraordinary color and detail."
        },
        {
          type: "heading",
          text: "2. Musée de Montmartre"
        },
        {
          type: "paragraph",
          text: "This charming museum showcases the history and art of the Montmartre district. Housed in a beautiful 17th-century building, it provides insight into the artistic movements that made Montmartre famous during the belle époque period."
        },
        {
          type: "heading",
          text: "3. Canal Saint-Martin"
        },
        {
          type: "paragraph",
          text: "Perfect for a leisurely walk away from the crowds, Canal Saint-Martin is lined with charming cafés, vintage shops, and beautiful bridges. It's where locals come to relax, and you'll find the authentic Paris experience here."
        },
        {
          type: "heading",
          text: "4. Père Lachaise Cemetery"
        },
        {
          type: "paragraph",
          text: "Don't let the name fool you. Père Lachaise is more than just a cemetery—it's an open-air museum filled with ornate tombs, beautiful sculptures, and peaceful pathways. You can pay respects to famous residents like Oscar Wilde and Frédéric Chopin."
        },
        {
          type: "heading",
          text: "Conclusion"
        },
        {
          type: "paragraph",
          text: "Paris has so much more to offer beyond its famous landmarks. By venturing off the beaten path and exploring these hidden gems, you'll discover the true magic of the City of Light. Each corner has a story to tell, and these places are just the beginning of your Parisian adventure."
        }
      ]
    },
    "2": {
      id: "2",
      title: "Bali on a Budget: Travel Smart in 2024",
      category: "Tips",
      image: "/assets/images/indonesia-bali.jpg",
      author: "David Kumar",
      date: "March 10, 2024",
      content: [
        {
          type: "paragraph",
          text: "Bali doesn't have to break the bank! With smart planning and local knowledge, you can experience this tropical paradise on a budget while still enjoying luxury experiences. Here's your complete guide to budget-friendly Bali travel in 2024."
        },
        {
          type: "heading",
          text: "Accommodation Hacks"
        },
        {
          type: "paragraph",
          text: "Skip the expensive resorts and opt for boutique guesthouses or homestays. Many offer stunning views, pools, and breakfast for a fraction of resort prices. Areas like Ubud and Canggu have excellent budget options with great amenities."
        },
        {
          type: "heading",
          text: "Eat Like a Local"
        },
        {
          type: "paragraph",
          text: "Warungs (local eateries) serve delicious authentic Indonesian food for $2-5 per meal. Try nasi goreng, mie goreng, and fresh tropical fruits from local markets. Save fancy restaurants for special occasions."
        },
        {
          type: "heading",
          text: "Transportation Tips"
        },
        {
          type: "paragraph",
          text: "Rent a scooter for $5/day instead of hiring drivers. It's the most economical way to explore the island. Always wear a helmet and get proper insurance. For longer distances, use local buses or share rides with other travelers."
        },
        {
          type: "heading",
          text: "Free & Cheap Activities"
        },
        {
          type: "paragraph",
          text: "Many of Bali's best experiences are free or cheap: beaches, rice terraces, temple visits ($1-2), sunrise hikes, and local markets. Skip expensive tours and explore independently or join free walking tours."
        }
      ]
    },
    "3": {
      id: "3",
      title: "Tokyo's Best Neighborhoods for First-Timers",
      category: "Guides",
      image: "/assets/images/japan-tokyo.jpg",
      author: "Alex Tanaka",
      date: "March 5, 2024",
      content: [
        {
          type: "paragraph",
          text: "Tokyo can be overwhelming for first-time visitors, but choosing the right neighborhoods to explore makes all the difference. This guide will help you navigate Tokyo like a local and discover the best areas for your interests."
        },
        {
          type: "heading",
          text: "Shibuya: Modern Tokyo Energy"
        },
        {
          type: "paragraph",
          text: "Home to the famous Shibuya Crossing, this neighborhood pulses with energy. Perfect for shopping, nightlife, and experiencing modern Japanese youth culture. Don't miss the Hachiko statue and the view from Shibuya Sky."
        },
        {
          type: "heading",
          text: "Asakusa: Traditional Charm"
        },
        {
          type: "paragraph",
          text: "Visit Senso-ji Temple, Tokyo's oldest temple, and stroll through Nakamise shopping street. This area offers a glimpse into old Tokyo with traditional architecture, kimono rentals, and authentic street food."
        },
        {
          type: "heading",
          text: "Harajuku: Fashion & Youth Culture"
        },
        {
          type: "paragraph",
          text: "Explore Takeshita Street for quirky fashion, visit Meiji Shrine for tranquility, and enjoy trendy cafes. This neighborhood perfectly blends traditional and contemporary Tokyo culture."
        },
        {
          type: "heading",
          text: "Shinjuku: Everything in One Place"
        },
        {
          type: "paragraph",
          text: "Tokyo's busiest district offers shopping, dining, entertainment, and nightlife. Visit the Tokyo Metropolitan Government Building for free city views, explore Omoide Yokocho for yakitori, and experience the neon-lit streets at night."
        }
      ]
    },
    "4": {
      id: "4",
      title: "Ultimate New York City Travel Guide",
      category: "Guides",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&h=600&fit=crop",
      author: "Emma Williams",
      date: "February 28, 2024",
      content: [
        {
          type: "paragraph",
          text: "New York City, the city that never sleeps, offers endless possibilities for visitors. From world-class museums to iconic landmarks, diverse neighborhoods to amazing food scenes, this guide covers everything you need to know for an unforgettable NYC experience."
        },
        {
          type: "heading",
          text: "Must-See Attractions"
        },
        {
          type: "paragraph",
          text: "Start with the classics: Statue of Liberty, Empire State Building, Central Park, Times Square, and the 9/11 Memorial. Book tickets in advance to skip lines and save time. Consider a CityPASS for multiple attractions."
        },
        {
          type: "heading",
          text: "World-Class Museums"
        },
        {
          type: "paragraph",
          text: "The Metropolitan Museum of Art, MoMA, Natural History Museum, and the Guggenheim are must-visits. Many museums have suggested donations or free hours. Plan to spend at least half a day at each major museum."
        },
        {
          type: "heading",
          text: "Neighborhood Exploration"
        },
        {
          type: "paragraph",
          text: "Each NYC neighborhood has its own character: SoHo for shopping, Greenwich Village for charm, Brooklyn for hipster culture, Chinatown for authentic food, and Harlem for history and jazz. Take time to explore beyond Manhattan."
        },
        {
          type: "heading",
          text: "Food Scene"
        },
        {
          type: "paragraph",
          text: "From dollar pizza slices to Michelin-starred restaurants, NYC has it all. Don't miss: authentic New York pizza, bagels with lox, pastrami sandwiches, diverse ethnic cuisines, and food halls like Chelsea Market."
        },
        {
          type: "heading",
          text: "Broadway Shows"
        },
        {
          type: "paragraph",
          text: "Experience world-class theater on Broadway. Book tickets in advance or try the TKTS booth for same-day discounts. Popular shows sell out quickly, especially during peak season."
        }
      ]
    }
  };

  const post = blogPosts[slug || "1"] || blogPosts["1"];

  return (
    <Layout>
      {/* Article Header */}
      <section className="relative h-96 md:h-[500px] overflow-hidden bg-gray-800">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-12">
            <div className="mb-4">
              <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Meta Info */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12 pb-12 border-b border-gray-200">
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
              <Share2 className="w-5 h-5 text-primary" />
            </button>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-12">
            {post.content.map((section: any, idx: number) => {
              if (section.type === "paragraph") {
                return (
                  <p key={idx} className="text-gray-700 leading-relaxed mb-6">
                    {section.text}
                  </p>
                );
              } else if (section.type === "heading") {
                return (
                  <h2 key={idx} className="text-2xl font-playfair font-bold text-foreground mt-8 mb-4">
                    {section.text}
                  </h2>
                );
              }
              return null;
            })}
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 mb-12">
            <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">
              Ready to Explore {post.title.includes("Paris") ? "Paris" : post.title.includes("Bali") ? "Bali" : post.title.includes("Tokyo") ? "Tokyo" : post.title.includes("New York") ? "New York" : "the World"}?
            </h3>
            <p className="text-gray-700 mb-6">
              Our travel packages include visits to both famous landmarks
              and hidden gems. Let us plan the perfect adventure for
              you.
            </p>
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              View Travel Packages <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Related Articles */}
          <div className="border-t border-gray-200 pt-12">
            <h3 className="text-2xl font-playfair font-bold text-foreground mb-6">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.values(blogPosts).filter((p: any) => p.id !== post.id).slice(0, 2).map((relatedPost: any) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.id}`}
                  className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors group"
                >
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                    {relatedPost.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {relatedPost.content[0].text.substring(0, 100)}...
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
