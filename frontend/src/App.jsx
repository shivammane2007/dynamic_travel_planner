import { lazy, Suspense, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/layout/Navbar";

gsap.registerPlugin(ScrollTrigger);
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/shared/ProtectedRoute";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const PreferencePage = lazy(() => import("./pages/PreferencePage"));
const RecommendationsPage = lazy(() => import("./pages/RecommendationsPage"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));
const TripHistoryPage = lazy(() => import("./pages/TripHistoryPage"));

export default function App() {
  const location = useLocation();

  useEffect(() => {
    // Highly optimized Lenis setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync GSAP ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const chromeHidden = ["/login", "/signup"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-canvas text-charcoal">
      {!chromeHidden && <Navbar />}
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-muted">Loading travel studio...</div>}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/preferences" element={<ProtectedRoute><PreferencePage /></ProtectedRoute>} />
            <Route path="/recommendations" element={<ProtectedRoute><RecommendationsPage /></ProtectedRoute>} />
            <Route path="/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
            <Route path="/trips" element={<ProtectedRoute><TripHistoryPage /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
      {!chromeHidden && <Footer />}
    </div>
  );
}
