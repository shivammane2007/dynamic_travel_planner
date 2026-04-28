import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
}

export default function BlogCard({
  id,
  title,
  excerpt,
  image,
  author,
  date,
  category,
}: BlogCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <Link
      to={`/blog/${id}`}
      className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col border border-transparent hover:border-primary/20"
    >
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
        {!imageError ? (
          <>
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                <ImageIcon className="w-12 h-12 text-gray-400 animate-pulse" />
              </div>
            )}
            <img
              src={image}
              alt={title}
              className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${imageLoading ? "opacity-0" : "opacity-100"
                }`}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/40 to-secondary/40">
            <ImageIcon className="w-16 h-16 text-white/80 mb-2" />
            <p className="text-white font-semibold text-center px-4 text-sm">{category}</p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg">
            {category}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-playfair font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
          {excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200 text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4 text-primary" />
              <span className="font-medium">{author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{date}</span>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-2 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
}
