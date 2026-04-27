export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-3xl text-warm-brown">Dynamic Travel Planner</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
            Editorial planning tools, tailored destination ranking, and premium travel discovery without the agency overhead.
          </p>
        </div>
        <div className="text-sm text-muted">
          <p className="mb-3 font-semibold uppercase tracking-[0.2em] text-warm-brown">Explore</p>
          <p>Recommendations</p>
          <p>Wishlist</p>
          <p>Trip history</p>
        </div>
        <div className="text-sm text-muted">
          <p className="mb-3 font-semibold uppercase tracking-[0.2em] text-warm-brown">Status</p>
          <p>Frontend on `http://localhost:5173`</p>
          <p>Backend on `http://localhost:8080`</p>
        </div>
      </div>
    </footer>
  );
}
