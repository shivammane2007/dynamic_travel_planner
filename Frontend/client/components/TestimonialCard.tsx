import { Star } from "lucide-react";

interface TestimonialCardProps {
  author: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

export default function TestimonialCard({
  author,
  role,
  image,
  content,
  rating,
}: TestimonialCardProps) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-accent text-accent" />
        ))}
      </div>

      {/* Testimonial */}
      <p className="text-gray-700 mb-6 italic leading-relaxed">"{content}"</p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <img
          src={image}
          alt={author}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <h4 className="font-playfair font-bold text-foreground">{author}</h4>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
    </div>
  );
}
