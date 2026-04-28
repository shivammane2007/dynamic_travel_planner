interface ItineraryItem {
  day: number;
  title: string;
  activities: string[];
}

interface ItineraryTimelineProps {
  itinerary: ItineraryItem[];
}

export function ItineraryTimeline({ itinerary }: ItineraryTimelineProps) {
  return (
    <div className="space-y-6">
      {itinerary.map((item, idx) => (
        <div key={idx} className="relative pl-8 md:pl-0">
          
          {/* Timeline Line (Desktop) */}
          <div className="hidden md:block absolute left-[120px] top-0 bottom-0 w-px bg-red-100" />
          
          {/* Timeline Line (Mobile) */}
          <div className="md:hidden absolute left-3 top-0 bottom-0 w-px bg-red-100" />

          <div className="flex flex-col md:flex-row gap-4 md:gap-12 relative z-10">
            {/* Day Bubble */}
            <div className="md:w-[90px] flex-shrink-0 pt-2">
              <div className="bg-red-50 text-red-600 font-bold text-sm px-4 py-2 rounded-full inline-block border border-red-100 absolute -left-2 md:relative md:left-0 shadow-sm">
                Day {item.day}
              </div>
            </div>

            {/* Content Card */}
            <div className="flex-1 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-slate-900 mb-4">{item.title}</h3>
              <ul className="space-y-4">
                {item.activities.map((activity, actIdx) => (
                  <li key={actIdx} className="flex items-start gap-3 text-slate-600">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                    <span className="leading-relaxed">{activity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
