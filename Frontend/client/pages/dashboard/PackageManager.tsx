import { useQuery } from "@tanstack/react-query";
import { Plus, Edit2, Trash2, Eye } from "lucide-react";

export default function PackageManager() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-packages"],
    queryFn: async () => {
      const res = await fetch("/api/packages");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const packages = data?.data || data || [];

  if (isLoading) return <div className="text-foreground p-6">Loading packages...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-foreground">Manage Packages</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm">
          <Plus className="w-4 h-4" /> Add Package
        </button>
      </div>

      <div className="bg-card rounded-xl overflow-hidden border border-border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-muted-foreground">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-6 py-4 text-left font-semibold text-foreground">Package Title</th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">Location</th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">Duration</th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">Price</th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">Rating</th>
                <th className="px-6 py-4 text-center font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {packages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">No packages found.</td>
                </tr>
              ) : (
                packages.map((pkg: any) => (
                  <tr key={pkg.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{pkg.title}</td>
                    <td className="px-6 py-4">{pkg.city}, {pkg.country}</td>
                    <td className="px-6 py-4">{pkg.durationDays} Days</td>
                    <td className="px-6 py-4 font-medium text-primary">₹{pkg.pricePerPerson}</td>
                    <td className="px-6 py-4">{pkg.rating} ⭐</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button className="p-2 hover:bg-accent/20 rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-accent/20 rounded-lg transition-colors text-primary">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-red-500">
                          <Trash2 className="w-4 h-4" />
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
