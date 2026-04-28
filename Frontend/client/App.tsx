import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Packages from "./pages/Packages";
import PackageDetail from "./pages/PackageDetail";
import BookingPage from "./pages/BookingPage";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import ManualTripPlanner from "./pages/ManualTripPlanner";
import TripResults from "./pages/TripResults";

// Admin Dashboard Components
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import BookingsManager from "./pages/dashboard/BookingsManager";
import ContactManager from "./pages/dashboard/ContactManager";
import PackageManager from "./pages/dashboard/PackageManager";
import ManualTripsManager from "./pages/dashboard/ManualTripsManager";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/package/:id" element={<PackageDetail />} />
            <Route path="/booking/:id" element={<BookingPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/wishlist" element={<Favorites />} />
            <Route path="/manual-trip" element={<ManualTripPlanner />} />
            <Route path="/custom-trip-planner" element={<ManualTripPlanner />} />
            <Route path="/trip-results" element={<TripResults />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<DashboardLayout />}>
              <Route index element={<DashboardOverview />} />
              <Route path="packages" element={<PackageManager />} />
              <Route path="bookings" element={<BookingsManager />} />
              <Route path="planner" element={<ManualTripsManager />} />
              <Route path="messages" element={<ContactManager />} />
              <Route path="settings" element={<div className="text-white p-6 font-bold text-xl">Settings coming soon...</div>} />
            </Route>

            {/* Catch-all - must be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
