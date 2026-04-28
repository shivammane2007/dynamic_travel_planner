import Layout from "@/components/Layout";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 section-padding">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
            Get in Touch
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Have questions about our packages? Need a custom itinerary? We're
            here to help!
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-playfair font-bold text-foreground mb-8">
              Contact Information
            </h2>

            <div className="space-y-8">
              {/* Phone */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                  <a
                    href="tel:+1234567890"
                    className="text-primary hover:underline font-medium"
                  >
                    +1 (234) 567-890
                  </a>
                  <p className="text-sm text-gray-600">
                    Available Mon-Fri, 9am-6pm EST
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Email</h3>
                  <a
                    href="mailto:hello@luxtravel.com"
                    className="text-primary hover:underline font-medium break-all"
                  >
                    hello@luxtravel.com
                  </a>
                  <p className="text-sm text-gray-600">
                    We respond within 24 hours
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Office</h3>
                  <p className="text-gray-700 font-medium">123 Travel Street</p>
                  <p className="text-gray-600">Global City, GC 12345</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Business Hours
                  </h3>
                  <p className="text-gray-700 font-medium">
                    Monday - Friday: 9am - 6pm
                  </p>
                  <p className="text-gray-600">Saturday: 10am - 4pm (EST)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-xl p-8 md:p-12">
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-8">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Inquiry about packages"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your travel dreams..."
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Send Message
                </button>
              </form>

              <p className="text-sm text-gray-600 mt-6">
                We'll get back to you as soon as possible. For urgent matters,
                please call us directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-playfair font-bold text-foreground text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "How far in advance should I book a package?",
                a: "We recommend booking at least 3 months in advance to secure the best rates and accommodate your preferences. Early bookings also qualify for our early bird discount.",
              },
              {
                q: "Can I customize my travel package?",
                a: "Absolutely! We offer fully customizable packages. Contact us to discuss your specific requirements and we'll create the perfect itinerary for you.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, bank transfers, and digital payment methods. A 30% deposit is required to confirm your booking.",
              },
              {
                q: "What is your cancellation policy?",
                a: "Our flexible cancellation policy allows free cancellation up to 45 days before departure. Cancellations within 45 days may incur fees.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-3 text-lg">
                  {faq.q}
                </h3>
                <p className="text-gray-700">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
