import { Link } from "react-router-dom";
import PageTransition from "../components/shared/PageTransition";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import { useAuth } from "../hooks/useAuth";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <PageTransition className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <WelcomeBanner name={user?.name || "Traveler"} />
      <section className="mt-8 grid gap-6 md:grid-cols-3">
        <Link to="/preferences" className="rounded-[2rem] border border-border bg-surface p-6">
          <h2 className="font-display text-3xl text-warm-brown">Quick Search</h2>
          <p className="mt-3 text-sm leading-6 text-muted">Start a new recommendation run using budget, trip length, and theme.</p>
        </Link>
        <Link to="/wishlist" className="rounded-[2rem] border border-border bg-white p-6">
          <h2 className="font-display text-3xl text-warm-brown">Wishlist Preview</h2>
          <p className="mt-3 text-sm leading-6 text-muted">Review the destinations you have saved for later.</p>
        </Link>
        <Link to="/trips" className="rounded-[2rem] border border-border bg-white p-6">
          <h2 className="font-display text-3xl text-warm-brown">Recent Trips</h2>
          <p className="mt-3 text-sm leading-6 text-muted">See planned and completed trips in one place.</p>
        </Link>
      </section>
    </PageTransition>
  );
}
