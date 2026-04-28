export default function WelcomeBanner({ name }) {
  const date = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    month: "long",
    day: "numeric"
  }).format(new Date());

  return (
    <section className="rounded-[2rem] bg-[linear-gradient(135deg,rgba(196,113,79,0.12),rgba(124,154,128,0.18))] p-8">
      <p className="text-sm uppercase tracking-[0.3em] text-warm-brown">Dashboard</p>
      <h1 className="mt-3 font-display text-5xl text-warm-brown">Good morning, {name}</h1>
      <p className="mt-2 text-muted">{date}</p>
    </section>
  );
}
