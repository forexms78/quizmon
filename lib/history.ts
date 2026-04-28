import { supabase } from './supabase'
import { QuizAnswer } from './types'

export async function saveQuizHistory(userId: string, answers: QuizAnswer[]) {
  const rows = answers.map(a => ({
    user_id: userId,
    question_id: a.question.id,
    selected: a.selected ?? '',
    correct: a.correct,
  }))
  const { error } = await supabase.from('quiz_history').insert(rows)
  if (error) console.error('history 저장 실패:', error.message)
}

export async function getWrongHistory(userId: string) {
  const { data, error } = await supabase
    .from('quiz_history')
    .select('*, questions(*)')
    .eq('user_id', userId)
    .eq('correct', false)
    .order('created_at', { ascending: false })
  if (error) return []
  return data ?? []
}

export async function getHistoryStats(userId: string) {
  const { data } = await supabase
    .from('quiz_history')
    .select('correct')
    .eq('user_id', userId)
  if (!data) return { total: 0, correct: 0, wrong: 0 }
  const total = data.length
  const correct = data.filter(d => d.correct).length
  return { total, correct, wrong: total - correct }
}
