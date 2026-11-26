import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface AuthState {
  session: Session | null;
  loading: boolean;
  error: string | null;
}

type Organization = { id: string; name: string; slug: string };
type Membership = { organization_id: string };

const AuthContext = createContext<AuthState | undefined>(undefined);
const OrganizationContext = createContext<Organization | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Autenticação indisponível.");
  return context;
}

export function useOrganization() {
  const context = useContext(OrganizationContext);
  if (!context) throw new Error("Nenhuma organização autorizada selecionada.");
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [state, setState] = useState<AuthState>({ session: null, loading: true, error: null });

  useEffect(() => {
    let active = true;
    let revision = 0;
    let previousUserId: string | undefined;

    function applySession(session: Session | null) {
      if (!active) return;
      const userId = session?.user.id;
      if (previousUserId !== userId) {
        queryClient.clear();
        previousUserId = userId;
      }
      setState({ session, loading: false, error: null });
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      revision += 1;
      applySession(session);
    });

    const initialRevision = revision;
    void supabase.auth.getSession().then(({ data, error }) => {
      if (!active || revision !== initialRevision) return;
      if (error) {
        setState({ session: null, loading: false, error: "Não foi possível verificar sua sessão." });
        return;
      }
      applySession(data.session);
    }).catch(() => {
      if (active && revision === initialRevision) {
        setState({ session: null, loading: false, error: "Não foi possível verificar sua sessão." });
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [queryClient]);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

function AccessMessage({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5 text-foreground">
      <div className="w-full max-w-md space-y-5 rounded-xl border border-border bg-card p-8 text-center" aria-live="polite">
        {children}
      </div>
    </div>
  );
}

export function AuthGate({ children }: { children: ReactNode }) {
  const { session, loading, error } = useAuth();
  const pathname = useLocation({ select: (location) => location.pathname });
  const isLogin = pathname.replace(/\/+$/, "") === "/login";

  if (isLogin) return <Outlet />;
  if (loading) return <AccessMessage><p className="text-muted-foreground">Verificando sessão…</p></AccessMessage>;
  if (error) {
    return (
      <AccessMessage>
        <p role="alert" className="text-destructive">{error}</p>
        <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
      </AccessMessage>
    );
  }
  if (!session) return <Navigate to="/login" replace />;
  return <ProfileAccess key={session.user.id} session={session}>{children}</ProfileAccess>;
}

function ProfileAccess({ session, children }: { session: Session; children: ReactNode }) {
  const [signingOut, setSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState<string | null>(null);
  const profile = useQuery({
    queryKey: ["authenticated-profile", session.user.id],
    queryFn: async ({ signal }) => {
      const client: SupabaseClient = supabase;
      const result = await client
        .from("profiles")
        .upsert({ user_id: session.user.id }, { onConflict: "user_id" })
        .select("user_id")
        .abortSignal(signal)
        .single();
      if (result.error) throw result.error;
      if (!result.data || result.data.user_id !== session.user.id) {
        throw new Error("Perfil não disponível para a sessão atual.");
      }
      return { user_id: session.user.id };
    },
    retry: 1,
    staleTime: Infinity,
  });

  async function signOut() {
    setSigningOut(true);
    setSignOutError(null);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch {
      setSignOutError("Não foi possível sair da conta. Tente novamente.");
    } finally {
      setSigningOut(false);
    }
  }

  if (profile.isPending) {
    return <AccessMessage><p className="text-muted-foreground">Preparando seu perfil…</p></AccessMessage>;
  }
  if (profile.isError) {
    return (
      <AccessMessage>
        <h1 className="text-2xl font-semibold">Não foi possível preparar seu perfil</h1>
        <p role="alert" className="text-muted-foreground">Sua sessão está autenticada, mas o perfil ainda não pôde ser salvo. Tente novamente sem refazer o cadastro.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button disabled={profile.isFetching || signingOut} onClick={() => void profile.refetch()}>Tentar novamente</Button>
          <Button variant="outline" disabled={signingOut} onClick={() => void signOut()}>{signingOut ? "Saindo…" : "Sair da conta"}</Button>
        </div>
        {signOutError && <p role="alert" className="text-sm text-destructive">{signOutError}</p>}
      </AccessMessage>
    );
  }

  return <OrganizationAccess session={session}>{children}</OrganizationAccess>;
}

function OrganizationAccess({ session, children }: { session: Session; children: ReactNode }) {
  const [selectedId, setSelectedId] = useState("");
  const [signingOut, setSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const organizations = useQuery({
    queryKey: ["authorized-organizations", session.user.id],
    queryFn: async ({ signal }): Promise<Organization[]> => {
      const client: SupabaseClient = supabase;
      const memberships = await client
        .from("organization_memberships")
        .select("organization_id")
        .eq("user_id", session.user.id)
        .eq("status", "active")
        .abortSignal(signal)
        .returns<Membership[]>();
      if (memberships.error) throw memberships.error;
      const ids = [...new Set((memberships.data ?? []).map((membership) => membership.organization_id))];
      if (ids.length === 0) return [];
      const result = await client
        .from("organizations")
        .select("id, name, slug")
        .in("id", ids)
        .order("name")
        .abortSignal(signal)
        .returns<Organization[]>();
      if (result.error) throw result.error;
      return result.data ?? [];
    },
    retry: 1,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchInterval: 60000,
  });

  async function signOut() {
    setSigningOut(true);
    setSignOutError(null);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      queryClient.clear();
    } catch {
      setSignOutError("Não foi possível sair da conta. Tente novamente.");
    } finally {
      setSigningOut(false);
    }
  }

  const exitButton = <Button variant="outline" disabled={signingOut} onClick={() => void signOut()}>{signingOut ? "Saindo…" : "Sair da conta"}</Button>;
  const exitError = signOutError ? <p role="alert" className="text-sm text-destructive">{signOutError}</p> : null;

  if (organizations.isPending) {
    return <AccessMessage><p className="text-muted-foreground">Carregando organizações autorizadas…</p></AccessMessage>;
  }
  if (organizations.isError) {
    return (
      <AccessMessage>
        <h1 className="text-2xl font-semibold">Não foi possível verificar seu acesso</h1>
        <p role="alert" className="text-muted-foreground">A consulta às organizações falhou. Nenhum dado interno será exibido até a verificação ser concluída.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button disabled={organizations.isFetching} onClick={() => void organizations.refetch()}>Tentar novamente</Button>
          {exitButton}
        </div>
        {exitError}
      </AccessMessage>
    );
  }

  const organization = organizations.data.find((item) => item.id === selectedId) ?? organizations.data[0];
  if (!organization) {
    return (
      <AccessMessage>
        <h1 className="text-2xl font-semibold">Sem organização disponível</h1>
        <p className="text-muted-foreground">Sua conta não possui uma organização acessível com vínculo ativo. Solicite a verificação do acesso ao responsável pela organização.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button disabled={organizations.isFetching} onClick={() => void organizations.refetch()}>Verificar novamente</Button>
          {exitButton}
        </div>
        {exitError}
      </AccessMessage>
    );
  }

  return (
    <OrganizationContext.Provider key={organization.id} value={organization}>
      <div className="border-b border-border bg-background px-5 py-3 text-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <label className="flex flex-wrap items-center gap-3 text-sm font-medium">
            Organização
            <select
              className="max-w-full rounded-md border border-input bg-background px-3 py-2 text-foreground"
              value={organization.id}
              onChange={(event) => setSelectedId(event.target.value)}
            >
              {organizations.data.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </label>
          {exitButton}
          {exitError}
        </div>
      </div>
      {children}
    </OrganizationContext.Provider>
  );
}
