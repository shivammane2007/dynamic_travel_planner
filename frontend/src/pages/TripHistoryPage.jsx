import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";
import PageTransition from "../components/shared/PageTransition";
import { formatCurrency } from "../utils/formatters";

export default function TripHistoryPage() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    api.get("/trips").then(({ data }) => setTrips(data.data));
  }, []);

  return (
    <PageTransition className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-5xl text-warm-brown">Trip History</h1>
      <div className="mt-8 overflow-hidden rounded-[2rem] border border-border bg-white">
        <div className="hidden grid-cols-6 gap-4 border-b border-border bg-surface px-6 py-4 text-xs uppercase tracking-[0.22em] text-muted md:grid">
          <span>Destination</span>
          <span>Country</span>
          <span>Duration</span>
          <span>Total Cost</span>
          <span>Date</span>
          <span>Status</span>
        </div>
        {trips.length ? trips.map((trip) => (
          <motion.div 
            key={trip.id} 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="gpu grid gap-3 border-b border-border px-6 py-5 md:grid-cols-6 transition-colors hover:bg-surface/50"
          >
            <span className="font-medium text-charcoal">{trip.destination.name}</span>
            <span className="text-muted">{trip.destination.country}</span>
            <span className="text-muted">{trip.durationDays} days</span>
            <span className="text-muted">{formatCurrency(trip.totalCost)}</span>
            <span className="text-muted">{trip.tripDate}</span>
            <span className="text-sage">{trip.status}</span>
          </motion.div>
        )) : (
          <div className="px-6 py-12 text-center text-muted">No trips booked yet.</div>
        )}
      </div>
    </PageTransition>
  );
}
