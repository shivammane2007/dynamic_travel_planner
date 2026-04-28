import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { favorites } = useFavorites();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/packages", label: "Packages" },
    { href: "/blog", label: "Travel Guides" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl md:text-3xl font-playfair font-bold"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold">
              LT
            </div>
            <span className="text-primary">LUX</span>
            <span className="text-secondary">Travel</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-1 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive(link.href)
                    ? "bg-primary text-white"
                    : "text-foreground hover:bg-accent/20"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Favorites link with live badge */}
            <Link
              to="/favorites"
              id="nav-favorites-link"
              className={`relative px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                isActive("/favorites")
                  ? "bg-primary text-white"
                  : "text-foreground hover:bg-accent/20"
              }`}
            >
              <Heart
                className="w-4 h-4"
                style={{ fill: favorites.length > 0 ? "currentColor" : "none", color: favorites.length > 0 ? "#ef4444" : "inherit" }}
              />
              Favorites
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                  {favorites.length > 99 ? "99+" : favorites.length}
                </span>
              )}
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              to="/contact"
              className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-accent/20 rounded-lg transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-primary" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive(link.href)
                    ? "bg-primary text-white"
                    : "text-foreground hover:bg-accent/20"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {/* Favorites mobile link */}
            <Link
              to="/favorites"
              id="nav-mobile-favorites-link"
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                isActive("/favorites")
                  ? "bg-primary text-white"
                  : "text-foreground hover:bg-accent/20"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Heart
                className="w-4 h-4"
                style={{ fill: favorites.length > 0 ? "#ef4444" : "none", color: favorites.length > 0 ? "#ef4444" : "inherit" }}
              />
              Favorites
              {favorites.length > 0 && (
                <span className="ml-auto min-w-[20px] h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                  {favorites.length}
                </span>
              )}
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold text-center hover:opacity-90 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Now
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
