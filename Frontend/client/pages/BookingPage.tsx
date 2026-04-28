import Layout from "@/components/Layout";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MapPin, Calendar, Users, ShieldCheck, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

// All package data mirrored here so BookingPage works standalone
const packagesData: Record<string, any> = {
  "1": {
    title: "Parisian Romance",
    destination: "Paris, France",
    price: 2499,
    duration: 7,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=400&fit=crop",
  },
  "2": {
    title: "Bali Serenity",
    destination: "Bali, Indonesia",
    price: 1899,
    duration: 8,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=400&fit=crop",
  },
  "3": {
    title: "Tokyo Explorer",
    destination: "Tokyo, Japan",
    price: 2999,
    duration: 10,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=400&fit=crop",
  },
};

export default function BookingPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  // Prefer state passed from navigation, fallback to static data
  const stateData = location.state as any;
  const pkgData = stateData?.packageData || packagesData[id || "1"] || packagesData["1"];
  const initialTravelers = stateData?.travelers || 1;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });
  const [travelers, setTravelers] = useState(initialTravelers);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const subtotal = pkgData.price * travelers;
  const tax = Math.round(subtotal * 0.15);
  const total = subtotal + tax;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email address";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 1, // Mock user ID since we don't have auth yet
          packageId: parseInt(id || "1"),
          travelers,
          totalPrice: total,
          status: "CONFIRMED",
          travelDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          specialRequests: form.specialRequests,
          packageTitle: pkgData.title,
          destination: pkgData.destination
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsBooked(true);
        toast.success("🎉 Booking Confirmed Successfully!", { duration: 5000 });
      } else {
        throw new Error(data.message || "Booking failed");
      }
    } catch (error: any) {
      console.error("Booking Error:", error);
      toast.error(error.message || "Failed to process booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Success State ---
  if (isBooked) {
    return (
      <Layout>
        <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-xl p-12 max-w-lg w-full text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-3xl font-playfair font-bold text-foreground mb-3">
              Booking Confirmed!
            </h1>
            <p className="text-gray-600 mb-2">
              Thank you, <strong>{form.firstName}</strong>! Your trip to{" "}
              <strong>{pkgData.destination}</strong> is booked.
            </p>
            <p className="text-gray-500 text-sm mb-2">
              A confirmation has been sent to{" "}
              <strong>{form.email}</strong>
            </p>
            <div className="bg-gray-50 rounded-xl p-4 mb-8 text-left space-y-2 border border-gray-200">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Package</span>
                <span className="font-semibold text-foreground">{pkgData.title}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Travelers</span>
                <span className="font-semibold text-foreground">{travelers}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-lg border-t border-gray-200 pt-2">
                <span>Total Paid</span>
                <span className="text-primary">${total.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("/")}
                className="flex-1 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all"
              >
                Go Home
              </button>
              <button
                onClick={() => navigate("/packages")}
                className="flex-1 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Explore More
              </button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  // --- Booking Form ---
  return (
    <Layout>
      <section className="min-h-screen bg-gray-50 section-padding">
        <div className="max-w-6xl mx-auto">
          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-8 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Package
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                <h1 className="text-3xl font-playfair font-bold text-foreground mb-2">
                  Complete Your Booking
                </h1>
                <p className="text-gray-500 mb-8">
                  Fill in your details to confirm this luxury experience
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        className={`w-full border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${
                          errors.firstName ? "border-red-400" : "border-gray-300"
                        }`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        className={`w-full border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${
                          errors.lastName ? "border-red-400" : "border-gray-300"
                        }`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`w-full border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${
                        errors.email ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 (234) 567-890"
                      className={`w-full border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${
                        errors.phone ? "border-red-400" : "border-gray-300"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Travelers */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Number of Travelers
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-lg w-40">
                      <button
                        type="button"
                        onClick={() => setTravelers(Math.max(1, travelers - 1))}
                        className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition-all rounded-l-lg"
                      >
                        −
                      </button>
                      <span className="flex-1 text-center font-bold text-foreground">
                        {travelers}
                      </span>
                      <button
                        type="button"
                        onClick={() => setTravelers(travelers + 1)}
                        className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition-all rounded-r-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Special Requests{" "}
                      <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <textarea
                      name="specialRequests"
                      value={form.specialRequests}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Dietary requirements, accessibility needs, anniversary arrangements..."
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing Booking...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5" />
                        Confirm Booking — ${total.toLocaleString()}
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-400">
                    🔒 Your information is secure and encrypted. By booking you agree to our Terms & Conditions.
                  </p>
                </form>
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* Package Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <img
                    src={pkgData.image}
                    alt={pkgData.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="font-playfair font-bold text-lg text-foreground mb-1">
                      {pkgData.title}
                    </h3>
                    <div className="flex items-center gap-2 text-primary text-sm mb-4">
                      <MapPin className="w-4 h-4" />
                      {pkgData.destination}
                    </div>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-primary" />
                        {pkgData.duration} Days
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-primary" />
                        {travelers} Traveler{travelers > 1 ? "s" : ""}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                  <h4 className="font-semibold text-foreground mb-4">Price Summary</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>
                        ${pkgData.price.toLocaleString()} × {travelers} traveler
                        {travelers > 1 ? "s" : ""}
                      </span>
                      <span>${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax & Fees (15%)</span>
                      <span>${tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-3">
                      <span>Total</span>
                      <span className="text-primary">${total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold text-green-800">Free Cancellation</p>
                      <p className="text-green-700">
                        Cancel up to 30 days before for a full refund
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
