import Layout from "@/components/Layout";
import BlogCard from "@/components/BlogCard";
import { useState, useEffect } from "react";

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        if (res.ok) {
          const data = await res.json();
          const mappedBlogs = (data.data || data).map((b: any) => ({
            id: b.id.toString(),
            title: b.title,
            excerpt: b.content.substring(0, 100) + "...",
            image: b.imageUrl,
            author: b.author,
            date: new Date(b.createdAt).toLocaleDateString(),
            category: b.category
          }));
          setBlogPosts(mappedBlogs);
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

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
            {loading ? (
              <div className="col-span-full text-center py-12 text-gray-500">Loading blogs...</div>
            ) : (
              blogPosts.map((post) => (
                <BlogCard key={post.id} {...post} />
              ))
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
