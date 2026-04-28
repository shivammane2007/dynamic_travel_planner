import { motion } from "framer-motion";
import HeroSection from "../components/home/HeroSection";
import PageTransition from "../components/shared/PageTransition";

export default function LandingPage() {
  return (
    <PageTransition>
      <HeroSection />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-20 sm:px-6 md:grid-cols-3 lg:px-8">
        {[
          ["Why Choose Us", "Weighted ranking logic keeps recommendations explainable instead of vague."],
          ["Popular Destinations", "Adventure, beach, culture, and luxury inventory can all be ranked through the same engine."],
          ["Testimonials", "The interface is designed to feel editorial, warm, and product-grade."]
        ].map(([title, text]) => (
          <motion.div 
            key={title} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="gpu rounded-[2rem] border border-border bg-surface p-8 transition-colors duration-300 hover:bg-white"
          >
            <h2 className="font-display text-4xl text-warm-brown">{title}</h2>
            <p className="mt-4 text-sm leading-6 text-muted">{text}</p>
          </motion.div>
        ))}
      </section>
    </PageTransition>
  );
}
