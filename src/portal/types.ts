export type Category = "bolsa" | "emprego" | "verao" | "evento" | "apoio";
export type Status = "nova" | "a_candidatar" | "candidatado" | "descartada";

// Mirrors public.opportunities (supabase/migrations)
export interface Opportunity {
  id: string;
  title: string;
  organization: string | null;
  category: Category;
  location: string | null;
  amount: string | null;
  deadline: string | null; // YYYY-MM-DD
  link: string;
  status: Status;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  bolsa:   "Bolsa",
  emprego: "Emprego",
  verao:   "Verão",
  evento:  "Evento",
  apoio:   "Apoio",
};

export const STATUS_LABELS: Record<Status, string> = {
  nova:         "Nova",
  a_candidatar: "A candidatar",
  candidatado:  "Candidatado",
  descartada:   "Descartada",
};
