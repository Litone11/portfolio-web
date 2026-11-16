-- Portal privado (/portal): oportunidades — bolsas, empregos, estágios de verão, eventos e apoios.
--
-- Depois de aplicar, regista o dono do portal no SQL Editor (fica fora do repositório):
--   insert into public.portal_owner (user_id)
--   select id from auth.users where email = '<o teu email>';
--
-- A tarefa diária insere com:
--   insert into public.opportunities (title, organization, category, location, amount, deadline, link)
--   values (...)
--   on conflict (link) do nothing;


-- ----- Dono do portal -----

create table public.portal_owner (
  user_id uuid primary key references auth.users (id) on delete cascade
);

-- RLS sem políticas: nenhum pedido pela API lhe chega, só o SQL Editor.
alter table public.portal_owner enable row level security;
revoke all on public.portal_owner from anon, authenticated;

create function public.is_portal_owner()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.portal_owner where user_id = auth.uid()
  );
$$;

revoke execute on function public.is_portal_owner() from public, anon;
grant execute on function public.is_portal_owner() to authenticated;


-- ----- Oportunidades -----

create table public.opportunities (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  organization text,
  category     text not null
               check (category in ('bolsa', 'emprego', 'verao', 'evento', 'apoio')),
  location     text,
  amount       text,
  deadline     date,
  link         text not null unique
               check (link ~* '^https?://'),
  status       text not null default 'nova'
               check (status in ('nova', 'a_candidatar', 'candidatado', 'descartada')),
  notes        text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index opportunities_deadline_idx on public.opportunities (deadline);

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger opportunities_set_updated_at
  before update on public.opportunities
  for each row execute function public.set_updated_at();


-- ----- Row Level Security: só o dono lê e escreve -----

alter table public.opportunities enable row level security;

revoke all on public.opportunities from anon;
grant select, insert, update, delete on public.opportunities to authenticated;

create policy owner_select on public.opportunities
  for select to authenticated
  using ((select public.is_portal_owner()));

create policy owner_insert on public.opportunities
  for insert to authenticated
  with check ((select public.is_portal_owner()));

create policy owner_update on public.opportunities
  for update to authenticated
  using ((select public.is_portal_owner()))
  with check ((select public.is_portal_owner()));

create policy owner_delete on public.opportunities
  for delete to authenticated
  using ((select public.is_portal_owner()));
