import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import DestinationCard from "../components/recommendations/DestinationCard";
import PageTransition from "../components/shared/PageTransition";

export default function RecommendationsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const preferences = state?.preferences;

  useEffect(() => {
    if (!preferences) {
      navigate("/preferences", { replace: true });
      return;
    }

    let active = true;
    const payload = {
      theme: preferences.theme,
      subcategory: preferences.subcategory,
      budget: preferences.dailyBudget,
      country: preferences.countryPreference,
      durationDays: preferences.durationDays
    };

    api.post("/recommend", payload).then((response) => {
      if (active) {
        setDestinations(response.data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [navigate, preferences]);

  const handleSave = async (destinationId) => {
    await api.post("/wishlist", { destinationId });
  };

  const handleBook = async (destinationId) => {
    await api.post("/trips", { destinationId, durationDays: preferences.durationDays });
    navigate("/trips");
  };

  if (!preferences) return null;

  return (
    <PageTransition className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-border bg-surface p-6">
        <p className="text-sm uppercase tracking-[0.28em] text-warm-brown">Selected Preferences</p>
        <p className="mt-2 text-muted">{preferences.theme} • {preferences.subcategory} • {preferences.durationDays} days</p>
      </div>
      {loading ? (
        <div className="py-16 text-center text-muted">Scoring destinations...</div>
      ) : destinations.length ? (
        <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {destinations.map((item) => (
            <DestinationCard key={item.id} destination={item} onSave={handleSave} onBook={handleBook} />
          ))}
        </section>
      ) : (
        <div className="mt-10 rounded-[2rem] border border-dashed border-sand bg-white p-12 text-center text-muted">
          No destinations match your preferences.
        </div>
      )}
    </PageTransition>
  );
}
