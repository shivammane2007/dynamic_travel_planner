import { useQuery } from "@tanstack/react-query";
import StatsCards from "../../components/dashboard/StatsCards";
import RevenueChart from "../../components/dashboard/RevenueChart";
import RecentActivity from "../../components/dashboard/RecentActivity";

export default function DashboardOverview() {
  // Poll stats every 15 seconds
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/stats");
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    },
    refetchInterval: 15000,
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Stats Overview */}
      <StatsCards stats={stats?.data || stats} isLoading={statsLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>

        {/* Live Feed */}
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
