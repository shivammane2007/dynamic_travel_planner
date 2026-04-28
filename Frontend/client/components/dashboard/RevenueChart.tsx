import { useQuery } from "@tanstack/react-query";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function RevenueChart() {
  const { data: trends, isLoading } = useQuery({
    queryKey: ["dashboard-revenue"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/revenue");
      if (!res.ok) throw new Error("Failed to fetch revenue");
      return res.json();
    },
    refetchInterval: 15000,
  });

  if (isLoading) {
    return <div className="bg-card rounded-xl p-6 h-[400px] animate-pulse border border-border" />;
  }

  const chartData = trends?.data || trends || [];

  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border h-[400px] flex flex-col">
      <h3 className="text-lg font-bold text-foreground mb-6">Revenue Trends</h3>
      
      {chartData.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          No revenue data available yet.
        </div>
      ) : (
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem', color: 'hsl(var(--foreground))' }}
                itemStyle={{ color: 'hsl(var(--primary))' }}
                formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Revenue']}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
