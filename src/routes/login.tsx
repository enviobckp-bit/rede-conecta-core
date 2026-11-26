import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthAccess";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Entrar — REDE CONECTA" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { session, loading, error: sessionError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const result = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (result.error) {
        setError("Não foi possível entrar. Verifique seu e-mail e senha e tente novamente.");
      }
    } catch {
      setError("Não foi possível concluir o login. Verifique sua conexão e tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!loading && session) return <Navigate to="/" replace />;

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-12 text-foreground">
      <section className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
        <h1 className="text-3xl font-semibold">Entrar</h1>
        <p className="mt-3 text-sm text-muted-foreground">Acesse com sua conta para consultar suas organizações autorizadas.</p>
        {loading ? (
          <p role="status" className="mt-6 text-sm text-muted-foreground">Verificando sessão…</p>
        ) : (
          <form onSubmit={submit} className="mt-8 space-y-5">
            {sessionError && <p role="alert" className="text-sm text-destructive">{sessionError} Entre novamente para continuar.</p>}
            <div className="space-y-2">
              <Label htmlFor="login-email">E-mail</Label>
              <Input id="login-email" name="email" type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} disabled={submitting} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Senha</Label>
              <Input id="login-password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} disabled={submitting} />
            </div>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={submitting}>{submitting ? "Entrando…" : "Entrar"}</Button>
          </form>
        )}
      </section>
    </main>
  );
}
