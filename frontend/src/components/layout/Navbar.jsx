import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 border-b border-border/80 bg-canvas/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="font-display text-3xl text-warm-brown">
          Dynamic Travel Planner
        </Link>
        <nav className="hidden gap-6 text-sm text-muted md:flex">
          <NavLink to="/" className="hover:text-charcoal">Home</NavLink>
          <NavLink to="/dashboard" className="hover:text-charcoal">Dashboard</NavLink>
          <NavLink to="/preferences" className="hover:text-charcoal">Plan</NavLink>
          <NavLink to="/wishlist" className="hover:text-charcoal">Wishlist</NavLink>
          <NavLink to="/trips" className="hover:text-charcoal">Trips</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden text-sm text-muted sm:inline">{user.name}</span>
              <button onClick={handleLogout} className="rounded-full border border-sand px-4 py-2 text-sm text-warm-brown transition hover:bg-surface">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-full border border-sand px-4 py-2 text-sm text-warm-brown transition hover:bg-surface">Login</Link>
              <Link to="/signup" className="rounded-full bg-terracotta px-4 py-2 text-sm text-white transition hover:bg-coral">Start Planning</Link>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}
