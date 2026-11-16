import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import { CATEGORY_LABELS, STATUS_LABELS, type Category, type Opportunity, type Status } from "./types";

interface Filters {
  category: Category | "all";
  status: Status | "active" | "all";
  deadline: "all" | "7" | "30" | "none";
  showPast: boolean;
}

const DEFAULT_FILTERS: Filters = { category: "all", status: "active", deadline: "all", showPast: false };
const URGENT_DAYS = 3;

const pad = (n: number) => String(n).padStart(2, "0");
const isoDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

function parseDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

// Whole days from today to the deadline, in local time (negative = already closed)
function daysLeft(deadline: string) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((parseDate(deadline).getTime() - today.getTime()) / 86_400_000);
}

function relative(days: number) {
  if (days < 0) return "fechou";
  if (days === 0) return "hoje";
  if (days === 1) return "amanhã";
  return `${days} dias`;
}

// Links are written by an automated task: only ever render http(s) (the DB enforces it too)
const safeUrl = (url: string) => (/^https?:\/\//i.test(url) ? url : undefined);

function Deadline({ value }: { value: string | null }) {
  if (!value) return <span className="pt-dim">sem prazo</span>;
  const days = daysLeft(value);
  return (
    <span className="pt-deadline">
      <span>{parseDate(value).toLocaleDateString("pt-PT", { day: "2-digit", month: "short", year: "numeric" })}</span>
      <span className="pt-rel">{relative(days)}</span>
    </span>
  );
}

export default function Opportunities() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [rows, setRows] = useState<Opportunity[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;
    const today = new Date();

    let q = supabase
      .from("opportunities")
      .select("*")
      .order("deadline", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (filters.category !== "all") q = q.eq("category", filters.category);
    if (filters.status === "active") q = q.neq("status", "descartada");
    else if (filters.status !== "all") q = q.eq("status", filters.status);

    if (filters.deadline === "none") {
      q = q.is("deadline", null);
    } else {
      if (filters.deadline !== "all") q = q.lte("deadline", isoDate(addDays(today, Number(filters.deadline))));
      if (!filters.showPast) q = q.or(`deadline.is.null,deadline.gte.${isoDate(today)}`);
    }

    q.then(({ data, error }) => {
      if (cancelled) return;
      if (error) setError(`Não foi possível carregar: ${error.message}`);
      else { setError(null); setRows(data as Opportunity[]); }
    });
    return () => { cancelled = true; };
  }, [filters]);

  // Optimistic: show the change at once, roll back if the update fails
  const save = async (id: string, patch: Partial<Pick<Opportunity, "status" | "notes">>) => {
    if (!supabase || !rows) return;
    const prev = rows.find(r => r.id === id);
    setRows(rs => rs && rs.map(r => (r.id === id ? { ...r, ...patch } : r)));
    const { data, error } = await supabase.from("opportunities").update(patch).eq("id", id).select().single();
    if (error) {
      setRows(rs => rs && rs.map(r => (r.id === id && prev ? prev : r)));
      setError(`Não foi possível gravar: ${error.message}`);
      return;
    }
    setError(null);
    setRows(rs => rs && rs.map(r => (r.id === id ? (data as Opportunity) : r)));
  };

  const set = <K extends keyof Filters>(k: K, v: Filters[K]) => setFilters(f => ({ ...f, [k]: v }));
  const urgent = rows?.filter(r => r.deadline && daysLeft(r.deadline) >= 0 && daysLeft(r.deadline) < URGENT_DAYS).length ?? 0;

  return (
    <section className="pt-opps">
      <header className="pt-opps-head">
        <h1>Oportunidades</h1>
        <span className="pt-count">
          [ {rows?.length ?? "…"} ]{urgent > 0 && <span className="pt-urgent-count"> · {urgent} a fechar</span>}
        </span>
      </header>

      <div className="pt-filters">
        <label>
          <span>Categoria</span>
          <select value={filters.category} onChange={e => set("category", e.target.value as Filters["category"])}>
            <option value="all">Todas</option>
            {Object.entries(CATEGORY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </label>
        <label>
          <span>Estado</span>
          <select value={filters.status} onChange={e => set("status", e.target.value as Filters["status"])}>
            <option value="active">Ativas</option>
            {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            <option value="all">Todas</option>
          </select>
        </label>
        <label>
          <span>Prazo</span>
          <select value={filters.deadline} onChange={e => set("deadline", e.target.value as Filters["deadline"])}>
            <option value="all">Todos</option>
            <option value="7">≤ 7 dias</option>
            <option value="30">≤ 30 dias</option>
            <option value="none">Sem prazo</option>
          </select>
        </label>
        <label className="pt-check">
          <input
            type="checkbox"
            checked={filters.showPast}
            disabled={filters.deadline === "none"}
            onChange={e => set("showPast", e.target.checked)}
          />
          <span>Mostrar prazos passados</span>
        </label>
      </div>

      {error && <p className="pt-error" role="alert">{error}</p>}

      {rows && rows.length === 0 && <p className="pt-empty">Nada com estes filtros.</p>}

      {rows && rows.length > 0 && (
        <table className="pt-table">
          <thead>
            <tr>
              <th>Prazo</th>
              <th>Oportunidade</th>
              <th>Categoria</th>
              <th>Estado</th>
              <th>Notas</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => {
              const days = r.deadline ? daysLeft(r.deadline) : null;
              const tone = days === null ? "" : days < 0 ? "past" : days < URGENT_DAYS ? "urgent" : "";
              const href = safeUrl(r.link);
              return (
                <tr key={r.id} className={`pt-row ${tone} ${r.status === "descartada" ? "discarded" : ""}`}>
                  <td data-label="Prazo"><Deadline value={r.deadline} /></td>
                  <td data-label="Oportunidade">
                    {href
                      ? <a className="pt-title" href={href} target="_blank" rel="noreferrer noopener">{r.title} ↗</a>
                      : <span className="pt-title">{r.title}</span>}
                    <span className="pt-meta">
                      {[r.organization, r.location, r.amount].filter(Boolean).join(" · ")}
                    </span>
                  </td>
                  <td data-label="Categoria"><span className="tag">{CATEGORY_LABELS[r.category] ?? r.category}</span></td>
                  <td data-label="Estado">
                    <select
                      className="pt-status"
                      value={r.status}
                      onChange={e => save(r.id, { status: e.target.value as Status })}
                      aria-label={`Estado de ${r.title}`}
                    >
                      {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                  </td>
                  <td data-label="Notas">
                    {/* Remounts after each successful save (new updated_at) so it shows the stored value */}
                    <textarea
                      key={`${r.id}:${r.updated_at}`}
                      className="pt-notes"
                      rows={2}
                      placeholder="Notas…"
                      defaultValue={r.notes ?? ""}
                      aria-label={`Notas de ${r.title}`}
                      onBlur={e => {
                        const v = e.target.value.trim() || null;
                        if (v !== r.notes) save(r.id, { notes: v });
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </section>
  );
}
