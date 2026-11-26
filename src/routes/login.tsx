import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthAccess";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Acessar conta — REDE CONECTA" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { session, loading, error: sessionError } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isSignup = mode === "signup";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setError(null);
    if (isSignup && password !== confirmation) {
      setError("As senhas não coincidem.");
      return;
    }
    setSubmitting(true);
    try {
      const credentials = { email: email.trim(), password };
      if (isSignup) {
        const result = await supabase.auth.signUp(credentials);
        if (result.error) {
          if (result.error.code === "weak_password") {
            setError("Escolha uma senha mais forte, seguindo os requisitos de segurança do cadastro.");
          } else if (result.error.code === "user_already_exists") {
            setError("Não foi possível criar a conta. Se já possui cadastro, use Entrar.");
          } else {
            setError("Não foi possível criar a conta. Confira os dados ou tente entrar se já possui cadastro.");
          }
          return;
        }
        if (result.data.session) return;
      }

      const result = await supabase.auth.signInWithPassword(credentials);
      if (result.error) {
        setError(result.error.code === "email_not_confirmed"
          ? "O provedor ainda exige confirmação de e-mail para esta conta. A entrada sem confirmação depende da aplicação da configuração de autenticação do projeto."
          : isSignup
            ? "Não foi possível iniciar a sessão após o cadastro. Tente entrar com seu e-mail e senha."
            : "Não foi possível entrar. Verifique seu e-mail e senha e tente novamente.");
      } else if (!result.data.session) {
        setError("Não foi possível iniciar a sessão. Tente novamente.");
      }
    } catch {
      setError("Não foi possível concluir a solicitação. Verifique sua conexão e tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  function switchMode() {
    setMode(isSignup ? "login" : "signup");
    setPassword("");
    setConfirmation("");
    setError(null);
  }

  if (!loading && session) return <Navigate to="/" replace />;

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-12 text-foreground">
      <section className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
        <h1 className="text-3xl font-semibold">{isSignup ? "Criar conta" : "Entrar"}</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {isSignup ? "Cadastre seu e-mail e uma senha para acessar sua conta." : "Acesse com sua conta para consultar suas organizações autorizadas."}
        </p>
        {loading ? (
          <p role="status" className="mt-6 text-sm text-muted-foreground">Verificando sessão…</p>
        ) : (
          <form onSubmit={submit} className="mt-8 space-y-5" aria-busy={submitting}>
            {sessionError && <p role="alert" className="text-sm text-destructive">{sessionError} Entre novamente para continuar.</p>}
            <div className="space-y-2">
              <Label htmlFor="login-email">E-mail</Label>
              <Input id="login-email" name="email" type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} disabled={submitting} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Senha</Label>
              <Input id="login-password" name="password" type="password" autoComplete={isSignup ? "new-password" : "current-password"} minLength={isSignup ? 6 : undefined} required value={password} onChange={(event) => setPassword(event.target.value)} disabled={submitting} />
              {isSignup && <p className="text-xs text-muted-foreground">Use pelo menos 6 caracteres. O provedor pode exigir uma senha mais forte.</p>}
            </div>
            {isSignup && (
              <div className="space-y-2">
                <Label htmlFor="signup-confirmation">Confirmar senha</Label>
                <Input id="signup-confirmation" name="confirmation" type="password" autoComplete="new-password" minLength={6} required value={confirmation} onChange={(event) => setConfirmation(event.target.value)} disabled={submitting} />
              </div>
            )}
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? (isSignup ? "Criando conta…" : "Entrando…") : (isSignup ? "Criar conta" : "Entrar")}
            </Button>
            <Button type="button" variant="outline" className="w-full" disabled={submitting} onClick={switchMode}>
              {isSignup ? "Já tenho conta — Entrar" : "Não tenho conta — Criar conta"}
            </Button>
          </form>
        )}
      </section>
    </main>
  );
}
