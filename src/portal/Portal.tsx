// Private portal at /portal — loaded lazily from main.tsx, never part of the public bundle
import { useState, useEffect, FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import Opportunities from "./Opportunities";
import "./portal.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError("Email ou password errados.");
    setBusy(false);
  };

  return (
    <form className="pt-login" onSubmit={submit}>
      <div className="pt-label">§ ENTRAR</div>
      <label className="pt-field">
        <span>Email</span>
        <input type="email" autoComplete="username" required value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label className="pt-field">
        <span>Password</span>
        <input type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      {error && <p className="pt-error" role="alert">{error}</p>}
      <button className="pt-btn" type="submit" disabled={busy}>{busy ? "A ENTRAR…" : "ENTRAR →"}</button>
    </form>
  );
}

export default function Portal() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    document.title = "Portal · Luís Martins";
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="root inverted accent-blue portal">
      <header className="pt-head">
        <a href="/" className="pt-mono">LM</a>
        <span className="pt-label">PORTAL</span>
        {session && (
          <button className="pt-link-btn" onClick={() => supabase?.auth.signOut()}>
            {session.user.email} · SAIR
          </button>
        )}
      </header>

      <main className="pt-main">
        {!supabase ? (
          <p className="pt-error">Falta configurar VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY.</p>
        ) : !ready ? null : session ? (
          <Opportunities />
        ) : (
          <Login />
        )}
      </main>
    </div>
  );
}
