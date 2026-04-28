import { Users, Package, ClipboardList, DollarSign, MapPin, MessageSquare, Heart } from "lucide-react";

interface StatsProps {
  stats: any;
  isLoading: boolean;
}

export default function StatsCards({ stats, isLoading }: StatsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  const cards = [
    { label: "Total Revenue", value: formatCurrency(stats?.totalRevenue), icon: DollarSign, color: "from-green-500 to-green-700" },
    { label: "Total Bookings", value: stats?.totalBookings || 0, icon: ClipboardList, color: "from-primary to-blue-700" },
    { label: "Total Users", value: stats?.totalUsers || 0, icon: Users, color: "from-purple-500 to-purple-700" },
    { label: "Total Packages", value: stats?.totalPackages || 0, icon: Package, color: "from-orange-500 to-orange-700" },
    { label: "Pending Bookings", value: stats?.pendingBookings || 0, icon: ClipboardList, color: "from-yellow-500 to-yellow-700" },
    { label: "Total Favorites", value: stats?.totalFavorites || 0, icon: Heart, color: "from-pink-500 to-pink-700" },
    { label: "Manual Trips", value: stats?.totalManualTrips || 0, icon: MapPin, color: "from-indigo-500 to-indigo-700" },
    { label: "Contact Inquiries", value: stats?.totalContactMessages || 0, icon: MessageSquare, color: "from-teal-500 to-teal-700" },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-6 h-32 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`relative overflow-hidden bg-gradient-to-br ${card.color} rounded-xl p-6 text-white shadow-lg`}
          >
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl" />
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-white/80 text-sm font-medium">{card.label}</p>
                <p className="text-3xl font-bold mt-2">{card.value}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
