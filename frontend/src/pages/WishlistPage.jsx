import { useEffect, useState } from "react";
import api from "../api/axios";
import DestinationCard from "../components/recommendations/DestinationCard";
import PageTransition from "../components/shared/PageTransition";

export default function WishlistPage() {
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    const { data } = await api.get("/wishlist");
    setItems(data.data.map((item) => item.destination));
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleRemove = async (destinationId) => {
    await api.delete(`/wishlist/${destinationId}`);
    loadItems();
  };

  return (
    <PageTransition className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-5xl text-warm-brown">Wishlist</h1>
      {items.length ? (
        <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <DestinationCard key={item.id} destination={item} onSave={handleRemove} actionLabel="Remove" />
          ))}
        </section>
      ) : (
        <div className="mt-10 rounded-[2rem] border border-dashed border-sand bg-white p-12 text-center text-muted">
          Your wishlist is empty.
        </div>
      )}
    </PageTransition>
  );
}
