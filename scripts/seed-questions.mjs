import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const supabase = createClient(
  'https://vgfyuarcckccxyokjfqg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnZnl1YXJjY2tjY3h5b2tqZnFnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzMxNDI5MSwiZXhwIjoyMDkyODkwMjkxfQ.hLuUAqTG3bz14IvzG9BECd72r0boqonyemn86vjUCBU'
)

// Supabase REST API로 SQL 직접 실행
const sql1 = readFileSync('/Users/bellboi/code/quizmon/supabase/seed-questions.sql', 'utf-8')
const sql2 = readFileSync('/Users/bellboi/code/quizmon/supabase/seed-questions-extra.sql', 'utf-8')

async function runSQL(sql) {
  const res = await fetch('https://vgfyuarcckccxyokjfqg.supabase.co/rest/v1/rpc/exec_sql', {
    method: 'POST',
    headers: {
      'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnZnl1YXJjY2tjY3h5b2tqZnFnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzMxNDI5MSwiZXhwIjoyMDkyODkwMjkxfQ.hLuUAqTG3bz14IvzG9BECd72r0boqonyemn86vjUCBU',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnZnl1YXJjY2tjY3h5b2tqZnFnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzMxNDI5MSwiZXhwIjoyMDkyODkwMjkxfQ.hLuUAqTG3bz14IvzG9BECd72r0boqonyemn86vjUCBU',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: sql })
  })
  return res
}

// supabase-js로 직접 insert 방식으로 처리
// SQL 파일 파싱 대신, questions 데이터를 직접 배열로 삽입
const { count } = await supabase.from('questions').select('*', { count: 'exact', head: true })
console.log(`현재 questions 수: ${count}`)
if (count > 0) {
  console.log('이미 데이터가 있습니다. 종료합니다.')
  process.exit(0)
}
