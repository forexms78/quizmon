import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://vgfyuarcckccxyokjfqg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnZnl1YXJjY2tjY3h5b2tqZnFnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzMxNDI5MSwiZXhwIjoyMDkyODkwMjkxfQ.hLuUAqTG3bz14IvzG9BECd72r0boqonyemn86vjUCBU'
)

// Supabase management API로 SQL 실행 (service role은 DDL 불가 → REST API 우회)
// 대신 quiz_history 테이블이 존재하는지 확인
const { error } = await supabase.from('quiz_history').select('id').limit(1)
if (error?.code === '42P01') {
  console.log('quiz_history 테이블 없음 → Supabase SQL Editor에서 아래 SQL 실행 필요')
  console.log(`
CREATE TABLE public.quiz_history (
  id serial primary key,
  user_id uuid references public.users(id) on delete cascade,
  question_id integer references public.questions(id),
  selected text not null,
  correct boolean not null,
  created_at timestamptz default now()
);
ALTER TABLE public.quiz_history enable row level security;
CREATE POLICY "public insert quiz_history" ON public.quiz_history FOR INSERT WITH CHECK (true);
CREATE POLICY "public read quiz_history" ON public.quiz_history FOR SELECT USING (true);
  `)
} else {
  console.log('quiz_history 테이블 이미 존재')
}
