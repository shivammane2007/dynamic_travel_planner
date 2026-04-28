import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-white mt-20">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-1">
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-playfair font-bold mb-4"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center font-bold">
                LT
              </div>
              <span>LUX Travel</span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Experience the world's most extraordinary destinations with luxury
              travel packages designed for unforgettable adventures.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair font-bold text-lg mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/packages"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  Packages
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  Travel Guides
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="font-playfair font-bold text-lg mb-6">
              Popular Destinations
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/packages"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  Paris, France
                </Link>
              </li>
              <li>
                <Link
                  to="/packages"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  Bali, Indonesia
                </Link>
              </li>
              <li>
                <Link
                  to="/packages"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  Tokyo, Japan
                </Link>
              </li>
              <li>
                <Link
                  to="/packages"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  New York, USA
                </Link>
              </li>
              <li>
                <Link
                  to="/packages"
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  Dubai, UAE
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-playfair font-bold text-lg mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-white/70">Phone</p>
                  <a
                    href="tel:+1234567890"
                    className="text-white hover:text-primary transition-colors"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-white/70">Email</p>
                  <a
                    href="mailto:hello@luxtravel.com"
                    className="text-white hover:text-primary transition-colors break-all"
                  >
                    hello@luxtravel.com
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-white/70">Office</p>
                  <p className="text-white">123 Travel St, Global City</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
          <p>&copy; {currentYear} LUX Travel. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
