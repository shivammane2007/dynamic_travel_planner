import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { Activity, MessageSquare, ClipboardList, MapPin } from "lucide-react";

export default function RecentActivity() {
  const { data: activities, isLoading } = useQuery({
    queryKey: ["dashboard-activities"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/activities");
      if (!res.ok) throw new Error("Failed to fetch activities");
      return res.json();
    },
    refetchInterval: 15000,
  });

  if (isLoading) {
    return <div className="bg-card rounded-xl p-6 h-[400px] animate-pulse border border-border" />;
  }

  const feed = activities?.data || activities || [];

  const getIcon = (type: string) => {
    switch (type) {
      case "Booking": return <ClipboardList className="w-4 h-4 text-primary" />;
      case "Message": return <MessageSquare className="w-4 h-4 text-green-400" />;
      case "ManualTrip": return <MapPin className="w-4 h-4 text-purple-400" />;
      default: return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case "Booking": return "bg-primary/20";
      case "Message": return "bg-green-500/20";
      case "ManualTrip": return "bg-purple-500/20";
      default: return "bg-muted";
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border h-[400px] flex flex-col">
      <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
        <Activity className="w-5 h-5 text-primary" />
        Recent Activity
      </h3>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {feed.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-4">No recent activities.</p>
        ) : (
          feed.map((item: any, i: number) => (
            <div key={i} className="flex gap-4 items-start">
              <div className={`mt-1 p-2 rounded-full ${getBgColor(item.type)}`}>
                {getIcon(item.type)}
              </div>
              <div>
                <p className="text-foreground text-sm font-medium">{item.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDistanceToNow(new Date(item.date), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
