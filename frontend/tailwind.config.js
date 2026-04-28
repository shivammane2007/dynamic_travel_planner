export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "var(--color-canvas)",
        surface: "var(--color-surface)",
        "surface-alt": "var(--color-surface-alt)",
        terracotta: "var(--color-terracotta)",
        coral: "var(--color-coral)",
        peach: "var(--color-peach)",
        sage: "var(--color-sage)",
        mint: "var(--color-mint)",
        olive: "var(--color-olive)",
        sand: "var(--color-sand)",
        "warm-brown": "var(--color-warm-brown)",
        charcoal: "var(--color-charcoal)",
        muted: "var(--color-muted)",
        border: "var(--color-border)"
      },
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        body: ["Plus Jakarta Sans", "sans-serif"]
      },
      boxShadow: {
        float: "0 22px 60px rgba(80, 54, 35, 0.14)"
      }
    }
  },
  plugins: []
};
