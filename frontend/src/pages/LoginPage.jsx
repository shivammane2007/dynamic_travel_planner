import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.post("/auth/login", form);
      login(data);
      navigate(location.state?.from || "/dashboard");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,rgba(224,122,95,0.18),transparent_30%),linear-gradient(135deg,#faf8f5_0%,#ede8df_100%)] px-4">
      <motion.form
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-[2rem] border border-white/70 bg-white/70 p-8 shadow-float backdrop-blur-xl"
      >
        <h1 className="font-display text-5xl text-warm-brown">Welcome back</h1>
        <p className="mt-2 text-sm text-muted">Log in to continue planning.</p>
        <div className="mt-8 space-y-4">
          <input className="w-full rounded-2xl border border-border bg-canvas px-4 py-3 outline-none" placeholder="Email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
          <input className="w-full rounded-2xl border border-border bg-canvas px-4 py-3 outline-none" placeholder="Password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
        </div>
        {error && <p className="mt-4 text-sm text-terracotta">{error}</p>}
        <button className="mt-6 w-full rounded-full bg-terracotta px-5 py-3 text-white transition hover:bg-coral">Login</button>
        <p className="mt-4 text-sm text-muted">No account? <Link to="/signup" className="text-warm-brown">Create one</Link></p>
      </motion.form>
    </section>
  );
}
