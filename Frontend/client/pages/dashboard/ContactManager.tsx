import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { Trash2, Mail } from "lucide-react";
import { toast } from "sonner";

export default function ContactManager() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-contacts"],
    queryFn: async () => {
      const res = await fetch("/api/contact");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    refetchInterval: 15000,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
    },
    onSuccess: () => {
      toast.success("Message deleted");
      queryClient.invalidateQueries({ queryKey: ["admin-contacts"] });
    },
    onError: () => toast.error("Failed to delete message"),
  });

  const messages = data?.data || data || [];

  if (isLoading) return <div className="text-foreground p-6">Loading messages...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-foreground">Contact Messages</h3>
      </div>

      <div className="grid gap-4">
        {messages.length === 0 ? (
          <div className="bg-card p-8 text-center rounded-xl text-muted-foreground border border-border shadow-sm">
            No contact messages found.
          </div>
        ) : (
          messages.map((msg: any) => (
            <div key={msg.id} className="bg-card border border-border shadow-sm rounded-xl p-5 flex flex-col md:flex-row gap-4 justify-between items-start">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <h4 className="text-lg font-bold text-foreground">{msg.subject || "No Subject"}</h4>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                    {formatDistanceToNow(new Date(msg.sentAt), { addSuffix: true })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{msg.fullName}</span>
                  <span>•</span>
                  <a href={`mailto:${msg.email}`} className="text-primary hover:underline flex items-center gap-1">
                    <Mail className="w-3 h-3" /> {msg.email}
                  </a>
                </div>
                <p className="text-foreground bg-muted/50 p-4 rounded-lg text-sm leading-relaxed mt-3">
                  {msg.message}
                </p>
              </div>
              <div className="flex-shrink-0 flex gap-2 w-full md:w-auto">
                <button 
                  onClick={() => deleteMutation.mutate(msg.id)}
                  disabled={deleteMutation.isPending}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors text-sm font-semibold"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
