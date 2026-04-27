import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { fadeUp, staggerContainer } from "../../animations/variants";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(224,122,95,0.28),transparent_36%),radial-gradient(circle_at_right,rgba(124,154,128,0.18),transparent_30%),linear-gradient(135deg,#faf8f5_0%,#f5f0e8_55%,#ede8df_100%)]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <motion.div 
          variants={staggerContainer} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          className="gpu space-y-6"
        >
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.35em] text-warm-brown">
            Luxury travel intelligence
          </motion.p>
          <motion.h1 variants={fadeUp} className="max-w-3xl font-display text-[clamp(3.2rem,8vw,6.8rem)] leading-[0.92] text-warm-brown">
            Discover Your Perfect Journey
          </motion.h1>
          <motion.p variants={fadeUp} className="max-w-xl text-base leading-7 text-muted sm:text-lg">
            A weighted recommendation engine for travelers who want more than a list. Shape your trip by theme, budget, and duration, then move straight into booking.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <Link to="/signup">
              <Button className="bg-terracotta text-white hover:bg-coral">Start Planning</Button>
            </Link>
            <Link to="/preferences">
              <Button className="border border-sand bg-transparent text-warm-brown hover:bg-surface">Explore Destinations</Button>
            </Link>
          </motion.div>
        </motion.div>
        <div className="grid gap-5 sm:grid-cols-2">
          {[
            ["Personalized Scoring", "Theme, subcategory, and budget weighting produce a ranked short list."],
            ["Premium Discovery", "Warm editorial styling and fast page motion keep the experience polished."],
            ["Protected Planner", "Wishlist and trip history stay linked to your signed-in profile."],
            ["Operationally Simple", "React frontend with a pure Java backend and explicit API contracts."]
          ].map(([title, text]) => (
            <motion.div
              key={title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="gpu rounded-[2rem] border border-white/60 bg-white/55 p-6 shadow-float backdrop-blur-md transition-colors duration-300 hover:bg-white/80"
            >
              <p className="font-display text-3xl text-warm-brown">{title}</p>
              <p className="mt-3 text-sm leading-6 text-muted">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
