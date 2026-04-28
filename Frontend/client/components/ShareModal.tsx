import { useEffect, useRef } from "react";
import { X, Copy, Mail } from "lucide-react";
import { toast } from "sonner";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  url: string;
}

export default function ShareModal({
  isOpen,
  onClose,
  title,
  description,
  url,
}: ShareModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!", { duration: 2000 });
    } catch {
      // Fallback
      const el = document.createElement("input");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      toast.success("Link copied!", { duration: 2000 });
    }
    onClose();
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description);

  const shareLinks = [
    {
      id: "whatsapp",
      label: "WhatsApp",
      color: "bg-[#25D366] hover:bg-[#20bd5a]",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      id: "telegram",
      label: "Telegram",
      color: "bg-[#0088cc] hover:bg-[#007ab8]",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      id: "facebook",
      label: "Facebook",
      color: "bg-[#1877F2] hover:bg-[#166fe5]",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      id: "twitter",
      label: "Twitter / X",
      color: "bg-black hover:bg-gray-800",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      id: "email",
      label: "Email",
      color: "bg-gray-600 hover:bg-gray-700",
      icon: <Mail className="w-5 h-5" />,
      href: `mailto:?subject=${encodedTitle}&body=${encodedDesc}%0A%0A${encodedUrl}`,
    },
  ];

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Modal */}
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        style={{
          animation: "shareModalIn 0.25s cubic-bezier(0.34,1.56,0.64,1) both",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h3 className="text-lg font-playfair font-bold text-foreground">
            Share This Package
          </h3>
          <button
            onClick={onClose}
            id="share-modal-close"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Package info preview */}
        <div className="mx-6 mb-4 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
          <p className="font-semibold text-foreground text-sm truncate">{title}</p>
          <p className="text-xs text-gray-500 truncate mt-0.5">{url}</p>
        </div>

        {/* Social buttons */}
        <div className="px-6 pb-4 grid grid-cols-3 sm:grid-cols-5 gap-3">
          {shareLinks.map((s) => (
            <a
              key={s.id}
              id={`share-${s.id}`}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className={`flex flex-col items-center gap-2 py-3 px-2 rounded-xl text-white transition-all duration-200 hover:scale-105 active:scale-95 ${s.color}`}
            >
              {s.icon}
              <span className="text-xs font-medium">{s.label}</span>
            </a>
          ))}
        </div>

        {/* Copy Link */}
        <div className="px-6 pb-6">
          <button
            id="share-copy-link"
            onClick={copyLink}
            className="w-full flex items-center justify-center gap-2 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-200 active:scale-95"
          >
            <Copy className="w-4 h-4" />
            Copy Link
          </button>
        </div>
      </div>

      <style>{`
        @keyframes shareModalIn {
          from { opacity: 0; transform: translateY(24px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
