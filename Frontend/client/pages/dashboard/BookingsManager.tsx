import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Eye, Edit2, Trash2 } from "lucide-react";

export default function BookingsManager() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: async () => {
      const res = await fetch("/api/bookings");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    refetchInterval: 15000,
  });

  const bookings = data?.data || data || [];

  if (isLoading) return <div className="text-foreground p-6">Loading bookings...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-foreground">Manage Bookings</h3>
      </div>

      <div className="bg-card rounded-xl overflow-hidden border border-border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-muted-foreground">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-6 py-4 text-left font-semibold text-foreground">Booking ID</th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">Package ID</th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">Travelers</th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">Total Price</th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">Date</th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">Status</th>
                <th className="px-6 py-4 text-center font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-muted-foreground">No bookings found.</td>
                </tr>
              ) : (
                bookings.map((b: any) => (
                  <tr key={b.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 text-foreground font-medium">#{b.id}</td>
                    <td className="px-6 py-4">Pkg: {b.packageId}</td>
                    <td className="px-6 py-4">{b.travelers}</td>
                    <td className="px-6 py-4 font-medium text-green-500 dark:text-green-400">₹{b.totalPrice}</td>
                    <td className="px-6 py-4">{format(new Date(b.bookingDate), "dd MMM yyyy")}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        b.status === "CONFIRMED" ? "bg-green-500/20 text-green-400" :
                        b.status === "CANCELLED" ? "bg-red-500/20 text-red-400" :
                        "bg-yellow-500/20 text-yellow-400"
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button className="p-2 hover:bg-accent/20 rounded-lg transition-colors text-muted-foreground hover:text-foreground" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-accent/20 rounded-lg transition-colors text-primary" title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
