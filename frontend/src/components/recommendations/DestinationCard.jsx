import { memo } from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import { formatCurrency } from "../../utils/formatters";

const DestinationCard = memo(({ destination, onSave, onBook, actionLabel = "Save" }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="gpu group overflow-hidden rounded-[2rem] border border-border bg-white shadow-float transition-all duration-500 hover:-translate-y-2"
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={destination.imageUrl} 
          alt={destination.name} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
          loading="lazy" 
        />
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-3xl text-warm-brown">{destination.name}</h3>
            <p className="text-sm text-muted">{destination.city}, {destination.country}</p>
          </div>
          {typeof destination.score === "number" && (
            <div className="rounded-full bg-[linear-gradient(135deg,#c4714f,#e07a5f)] px-4 py-2 text-sm font-semibold text-white">
              {destination.score}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.24em] text-muted">
          <span>{destination.theme}</span>
          <span>{destination.subcategory}</span>
          <span>{destination.rating} rating</span>
        </div>
        <p className="text-sm leading-6 text-muted">{destination.highlight}</p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-charcoal">{formatCurrency(destination.costPerDay)}/day</p>
          <div className="flex gap-2">
            {onSave && <Button onClick={() => onSave(destination.id)} className="border border-sand text-warm-brown hover:bg-surface">{actionLabel}</Button>}
            {onBook && <Button onClick={() => onBook(destination.id)} className="bg-terracotta text-white hover:bg-coral">Book Now</Button>}
          </div>
        </div>
      </div>
    </motion.article>
  );
});

export default DestinationCard;
