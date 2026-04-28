import { Car, Train, Plane, Bus, Clock } from "lucide-react";

interface Suggestion {
  mode: string;
  distance: string;
  duration: string;
  recommendedText: string;
}

interface TravelSuggestionsProps {
  suggestions: Suggestion[];
  bestOption: string;
}

export function TravelSuggestions({ suggestions, bestOption }: TravelSuggestionsProps) {
  const getIcon = (mode: string) => {
    switch(mode.toLowerCase()) {
      case 'car': return <Car className="h-6 w-6 text-blue-500" />;
      case 'train': return <Train className="h-6 w-6 text-orange-500" />;
      case 'flight': return <Plane className="h-6 w-6 text-sky-500" />;
      case 'bus': return <Bus className="h-6 w-6 text-green-500" />;
      default: return <Car className="h-6 w-6" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {suggestions.map((s, idx) => (
        <div 
          key={idx} 
          className={`bg-white rounded-xl p-5 border relative ${
            bestOption.includes(s.mode) 
              ? "border-red-500 shadow-md ring-1 ring-red-500/20" 
              : "border-slate-100 shadow-sm"
          }`}
        >
          {bestOption.includes(s.mode) && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Best Option
            </span>
          )}
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-slate-50 rounded-lg">
              {getIcon(s.mode)}
            </div>
            <div>
              <div className="font-bold text-slate-900">{s.mode}</div>
              <div className="text-xs text-slate-500 font-medium">{s.distance}</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Clock className="h-4 w-4 text-slate-400" />
              {s.duration}
            </div>
            <div className="text-sm font-medium text-slate-800">
              {s.recommendedText}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
