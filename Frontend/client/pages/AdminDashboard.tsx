import { useState } from "react";
import {
  BarChart3,
  Package,
  MapPin,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Plus,
  Edit2,
  Trash2,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";

type AdminTab =
  | "overview"
  | "destinations"
  | "packages"
  | "blog"
  | "bookings"
  | "settings";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const destinations = [
    { id: 1, name: "Paris, France", packages: 12, status: "Active" },
    { id: 2, name: "Bali, Indonesia", packages: 15, status: "Active" },
    { id: 3, name: "Tokyo, Japan", packages: 10, status: "Active" },
  ];

  const packages = [
    {
      id: 1,
      title: "Parisian Romance",
      destination: "Paris",
      bookings: 45,
      revenue: "$112,455",
    },
    {
      id: 2,
      title: "Bali Escape",
      destination: "Bali",
      bookings: 67,
      revenue: "$120,633",
    },
    {
      id: 3,
      title: "Tokyo Adventure",
      destination: "Tokyo",
      bookings: 32,
      revenue: "$70,368",
    },
  ];

  const bookings = [
    {
      id: 1,
      customer: "John Doe",
      package: "Parisian Romance",
      date: "2024-03-15",
      status: "Confirmed",
    },
    {
      id: 2,
      customer: "Jane Smith",
      package: "Bali Escape",
      date: "2024-03-10",
      status: "Pending",
    },
    {
      id: 3,
      customer: "Mike Johnson",
      package: "Tokyo Adventure",
      date: "2024-03-05",
      status: "Confirmed",
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "10 Hidden Gems in Paris",
      author: "Sophie Martin",
      status: "Published",
    },
    {
      id: 2,
      title: "Bali Budget Guide",
      author: "David Kumar",
      status: "Draft",
    },
    {
      id: 3,
      title: "Tokyo Neighborhoods",
      author: "Alex Tanaka",
      status: "Published",
    },
  ];

  const menuItems = [
    {
      id: "overview",
      icon: BarChart3,
      label: "Overview",
    },
    {
      id: "destinations",
      icon: MapPin,
      label: "Destinations",
    },
    {
      id: "packages",
      icon: Package,
      label: "Packages",
    },
    {
      id: "blog",
      icon: FileText,
      label: "Blog Posts",
    },
    {
      id: "bookings",
      icon: MessageSquare,
      label: "Bookings",
    },
    {
      id: "settings",
      icon: Settings,
      label: "Settings",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transform transition-transform duration-300 z-40 md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-700">
            <h1 className="text-2xl font-playfair font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              LUX Travel Admin
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as AdminTab);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-700">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition-all w-full"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Back to Site</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-white hover:bg-gray-700 p-2 rounded-lg"
          >
            {sidebarOpen ? <X /> : <Menu />}
          </button>
          <h2 className="text-2xl font-bold text-white">
            {menuItems.find((m) => m.id === activeTab)?.label || "Dashboard"}
          </h2>
          <div className="text-gray-400">Admin Panel</div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-900 p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  {
                    label: "Total Bookings",
                    value: "144",
                    color: "from-primary",
                  },
                  {
                    label: "Revenue",
                    value: "$303,456",
                    color: "from-secondary",
                  },
                  { label: "Destinations", value: "50+", color: "from-accent" },
                  {
                    label: "Happy Travelers",
                    value: "10K+",
                    color: "from-blue-500",
                  },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className={`bg-gradient-to-br ${stat.color} to-gray-800 rounded-lg p-6 text-white`}
                  >
                    <p className="text-gray-300 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Recent Bookings
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-gray-300">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="px-4 py-3 text-left">Customer</th>
                        <th className="px-4 py-3 text-left">Package</th>
                        <th className="px-4 py-3 text-left">Date</th>
                        <th className="px-4 py-3 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr
                          key={booking.id}
                          className="border-b border-gray-700"
                        >
                          <td className="px-4 py-3">{booking.customer}</td>
                          <td className="px-4 py-3">{booking.package}</td>
                          <td className="px-4 py-3">{booking.date}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                booking.status === "Confirmed"
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                              }`}
                            >
                              {booking.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "destinations" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">
                  Manage Destinations
                </h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity">
                  <Plus className="w-5 h-5" />
                  Add Destination
                </button>
              </div>

              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <table className="w-full text-sm text-gray-300">
                  <thead>
                    <tr className="border-b border-gray-700 bg-gray-700">
                      <th className="px-6 py-4 text-left">Destination</th>
                      <th className="px-6 py-4 text-left">Packages</th>
                      <th className="px-6 py-4 text-left">Status</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {destinations.map((dest) => (
                      <tr key={dest.id} className="border-b border-gray-700">
                        <td className="px-6 py-4">{dest.name}</td>
                        <td className="px-6 py-4">{dest.packages}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                            {dest.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button className="p-2 hover:bg-gray-700 rounded transition-colors">
                              <Edit2 className="w-4 h-4 text-blue-400" />
                            </button>
                            <button className="p-2 hover:bg-gray-700 rounded transition-colors">
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "packages" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">
                  Manage Packages
                </h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity">
                  <Plus className="w-5 h-5" />
                  Add Package
                </button>
              </div>

              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <table className="w-full text-sm text-gray-300">
                  <thead>
                    <tr className="border-b border-gray-700 bg-gray-700">
                      <th className="px-6 py-4 text-left">Package</th>
                      <th className="px-6 py-4 text-left">Destination</th>
                      <th className="px-6 py-4 text-left">Bookings</th>
                      <th className="px-6 py-4 text-left">Revenue</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packages.map((pkg) => (
                      <tr key={pkg.id} className="border-b border-gray-700">
                        <td className="px-6 py-4">{pkg.title}</td>
                        <td className="px-6 py-4">{pkg.destination}</td>
                        <td className="px-6 py-4">{pkg.bookings}</td>
                        <td className="px-6 py-4 text-green-400 font-semibold">
                          {pkg.revenue}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button className="p-2 hover:bg-gray-700 rounded transition-colors">
                              <Eye className="w-4 h-4 text-gray-400" />
                            </button>
                            <button className="p-2 hover:bg-gray-700 rounded transition-colors">
                              <Edit2 className="w-4 h-4 text-blue-400" />
                            </button>
                            <button className="p-2 hover:bg-gray-700 rounded transition-colors">
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "blog" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Manage Blog</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity">
                  <Plus className="w-5 h-5" />
                  New Post
                </button>
              </div>

              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <table className="w-full text-sm text-gray-300">
                  <thead>
                    <tr className="border-b border-gray-700 bg-gray-700">
                      <th className="px-6 py-4 text-left">Title</th>
                      <th className="px-6 py-4 text-left">Author</th>
                      <th className="px-6 py-4 text-left">Status</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogPosts.map((post) => (
                      <tr key={post.id} className="border-b border-gray-700">
                        <td className="px-6 py-4">{post.title}</td>
                        <td className="px-6 py-4">{post.author}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              post.status === "Published"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-gray-500/20 text-gray-400"
                            }`}
                          >
                            {post.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button className="p-2 hover:bg-gray-700 rounded transition-colors">
                              <Eye className="w-4 h-4 text-gray-400" />
                            </button>
                            <button className="p-2 hover:bg-gray-700 rounded transition-colors">
                              <Edit2 className="w-4 h-4 text-blue-400" />
                            </button>
                            <button className="p-2 hover:bg-gray-700 rounded transition-colors">
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "bookings" && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">All Bookings</h3>

              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <table className="w-full text-sm text-gray-300">
                  <thead>
                    <tr className="border-b border-gray-700 bg-gray-700">
                      <th className="px-6 py-4 text-left">Customer</th>
                      <th className="px-6 py-4 text-left">Package</th>
                      <th className="px-6 py-4 text-left">Date</th>
                      <th className="px-6 py-4 text-left">Status</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-gray-700">
                        <td className="px-6 py-4">{booking.customer}</td>
                        <td className="px-6 py-4">{booking.package}</td>
                        <td className="px-6 py-4">{booking.date}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              booking.status === "Confirmed"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button className="p-2 hover:bg-gray-700 rounded transition-colors">
                              <Eye className="w-4 h-4 text-gray-400" />
                            </button>
                            <button className="p-2 hover:bg-gray-700 rounded transition-colors">
                              <Edit2 className="w-4 h-4 text-blue-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6 max-w-2xl">
              <h3 className="text-xl font-bold text-white">Settings</h3>

              <div className="bg-gray-800 rounded-lg p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Site Title
                  </label>
                  <input
                    type="text"
                    defaultValue="LUX Travel"
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Site Description
                  </label>
                  <textarea
                    defaultValue="Experience unforgettable journeys with luxury travel packages"
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    defaultValue="hello@luxtravel.com"
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    defaultValue="+1 (234) 567-890"
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
