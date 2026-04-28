import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { MapPin, ArrowRight } from "lucide-react";

export default function ManualTripsManager() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-manual-trips"],
    queryFn: async () => {
      const res = await fetch("/api/planner");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    refetchInterval: 15000,
  });

  const trips = data?.data || data || [];

  if (isLoading) return <div className="text-foreground p-6">Loading manual trips...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-foreground">Manual Trip Requests</h3>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {trips.length === 0 ? (
          <div className="col-span-full bg-card p-8 text-center rounded-xl text-muted-foreground border border-border shadow-sm">
            No manual trips planned yet.
          </div>
        ) : (
          trips.map((trip: any) => (
            <div key={trip.id} className="bg-card border border-border shadow-sm rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-0" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-lg font-bold text-foreground">
                    <span className="bg-muted px-3 py-1 rounded-lg border border-border">{trip.sourceCity}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg border border-primary/20">{trip.destinationCity}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-muted-foreground mb-1">Travelers</p>
                    <p className="font-semibold text-foreground">{trip.travelers} People</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Date</p>
                    <p className="font-semibold text-foreground">{format(new Date(trip.tripDate), "MMM dd, yyyy")}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Budget</p>
                    <p className="font-semibold text-foreground">{trip.budget}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Transport</p>
                    <p className="font-semibold text-foreground">{trip.travelMode}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex justify-end">
                  <button className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> View AI Generated Plan
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
