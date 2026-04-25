-- users
create table public.users (
  id uuid primary key default gen_random_uuid(),
  nickname text unique not null,
  created_at timestamptz default now()
);

-- questions
create table public.questions (
  id serial primary key,
  content text not null,
  options jsonb not null,
  answer text not null,
  difficulty text not null check (difficulty in ('common','rare','epic','legendary')),
  type text not null check (type in ('multiple','ox')),
  explanation text default ''
);

-- collections (몬스터 마스터)
create table public.collections (
  id serial primary key,
  name text unique not null,
  grade text not null check (grade in ('C','B','A','S','SS')),
  image_url text default '',
  description text default ''
);

-- user_items
create table public.user_items (
  id serial primary key,
  user_id uuid references public.users(id) on delete cascade,
  collection_id integer references public.collections(id),
  count integer default 1,
  created_at timestamptz default now(),
  unique(user_id, collection_id)
);

-- RLS 활성화
alter table public.users enable row level security;
alter table public.questions enable row level security;
alter table public.collections enable row level security;
alter table public.user_items enable row level security;

-- 공개 읽기/쓰기 정책 (닉네임 기반 비인증)
create policy "public read questions" on public.questions for select using (true);
create policy "public read collections" on public.collections for select using (true);
create policy "public read users" on public.users for select using (true);
create policy "public insert users" on public.users for insert with check (true);
create policy "public read user_items" on public.user_items for select using (true);
create policy "public insert user_items" on public.user_items for insert with check (true);
create policy "public update user_items" on public.user_items for update using (true);
create policy "public delete user_items" on public.user_items for delete using (true);
