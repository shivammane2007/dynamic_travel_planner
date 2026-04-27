import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../components/shared/PageTransition";
import { formatCurrency } from "../utils/formatters";
import { themeOptions } from "../utils/constants";

export default function PreferencePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    theme: "adventure",
    subcategory: "trekking",
    dailyBudget: 15000,
    durationDays: 7,
    countryPreference: ""
  });

  const subcategories = useMemo(() => themeOptions[form.theme] || [], [form.theme]);

  const handleThemeChange = (theme) => {
    setForm((current) => ({
      ...current,
      theme,
      subcategory: themeOptions[theme][0]
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/recommendations", { state: { preferences: form } });
  };

  return (
    <PageTransition className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-border bg-white p-8 shadow-float">
        <p className="text-sm uppercase tracking-[0.28em] text-warm-brown">Travel Preferences</p>
        <h1 className="mt-3 font-display text-5xl text-warm-brown">Shape the trip before the shortlist</h1>
        <form onSubmit={handleSubmit} className="mt-10 space-y-8">
          <div>
            <p className="mb-4 text-sm font-medium text-muted">Travel Theme</p>
            <div className="flex flex-wrap gap-3">
              {Object.keys(themeOptions).map((theme) => (
                <button
                  key={theme}
                  type="button"
                  onClick={() => handleThemeChange(theme)}
                  className={`rounded-full px-5 py-3 text-sm capitalize transition ${form.theme === theme ? "bg-terracotta text-white" : "border border-sand bg-surface text-warm-brown"}`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm text-muted">Subcategory</span>
              <select className="w-full rounded-2xl border border-border bg-canvas px-4 py-3" value={form.subcategory} onChange={(event) => setForm({ ...form, subcategory: event.target.value })}>
                {subcategories.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-sm text-muted">Duration (days)</span>
              <input className="w-full rounded-2xl border border-border bg-canvas px-4 py-3" type="number" min="1" max="30" value={form.durationDays} onChange={(event) => setForm({ ...form, durationDays: Number(event.target.value) })} />
            </label>
          </div>
          <label className="block space-y-2">
            <span className="text-sm text-muted">Daily Budget {formatCurrency(form.dailyBudget)}</span>
            <input className="w-full accent-[var(--color-terracotta)]" type="range" min="0" max="50000" step="500" value={form.dailyBudget} onChange={(event) => setForm({ ...form, dailyBudget: Number(event.target.value) })} />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-muted">Country Preference</span>
            <input className="w-full rounded-2xl border border-border bg-canvas px-4 py-3" placeholder="Optional" value={form.countryPreference} onChange={(event) => setForm({ ...form, countryPreference: event.target.value })} />
          </label>
          <button className="rounded-full bg-terracotta px-6 py-3 text-white transition hover:bg-coral">Get Recommendations</button>
        </form>
      </div>
    </PageTransition>
  );
}
