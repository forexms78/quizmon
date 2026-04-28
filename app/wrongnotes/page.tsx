'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSavedUserId } from '@/lib/user'
import { getWrongHistory, getHistoryStats } from '@/lib/history'
import { BottomNav } from '@/components/BottomNav'

interface WrongEntry {
  id: number
  selected: string
  created_at: string
  questions: {
    content: string
    answer: string
    explanation: string
    difficulty: string
  }
}

export default function WrongNotesPage() {
  const router = useRouter()
  const [entries, setEntries] = useState<WrongEntry[]>([])
  const [stats, setStats] = useState({ total: 0, correct: 0, wrong: 0 })
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<number | null>(null)

  useEffect(() => {
    const userId = getSavedUserId()
    if (!userId) { router.push('/'); return }
    Promise.all([
      getWrongHistory(userId),
      getHistoryStats(userId),
    ]).then(([history, s]) => {
      setEntries(history as WrongEntry[])
      setStats(s)
      setLoading(false)
    })
  }, [router])

  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen px-4 py-6 pb-20 gap-4">
      <div className="flex items-center justify-between px-2">
        <h1 className="text-xl font-extrabold text-gray-900">오답노트</h1>
        <span className="text-sm text-gray-400">{entries.length}개</span>
      </div>

      <div className="grid grid-cols-3 gap-3 px-2">
        <div className="bg-blue-50 rounded-2xl p-3 text-center">
          <p className="text-2xl font-extrabold text-blue-600">{stats.total}</p>
          <p className="text-xs text-gray-500 mt-0.5">총 풀이</p>
        </div>
        <div className="bg-green-50 rounded-2xl p-3 text-center">
          <p className="text-2xl font-extrabold text-green-600">{stats.correct}</p>
          <p className="text-xs text-gray-500 mt-0.5">정답</p>
        </div>
        <div className="bg-orange-50 rounded-2xl p-3 text-center">
          <p className="text-2xl font-extrabold text-orange-600">{accuracy}%</p>
          <p className="text-xs text-gray-500 mt-0.5">정답률</p>
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-4 text-gray-400 py-20">
          <p className="text-sm">틀린 문제가 없습니다</p>
          <button onClick={() => router.push('/quiz')}
            className="px-6 py-3 rounded-2xl bg-blue-500 text-white font-bold text-sm">
            퀴즈 풀기
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 px-2">
          {entries.map((entry) => (
            <div key={entry.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => setExpanded(expanded === entry.id ? null : entry.id)}
                className="w-full px-4 py-3 text-left flex items-start gap-3"
              >
                <span className="w-5 h-5 rounded-full bg-red-400 flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5">✗</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 leading-snug">{entry.questions.content}</p>
                  <p className="text-xs text-gray-400 mt-1 capitalize">{entry.questions.difficulty}</p>
                </div>
                <span className="text-gray-300 text-xs shrink-0">{expanded === entry.id ? '▲' : '▼'}</span>
              </button>

              {expanded === entry.id && (
                <div className="px-4 pb-4 flex flex-col gap-2 border-t border-gray-50 pt-3">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-red-500 font-medium">내 답: {entry.selected}</p>
                    <p className="text-xs text-green-600 font-medium">정답: {entry.questions.answer}</p>
                  </div>
                  {entry.questions.explanation && (
                    <div className="bg-blue-50 rounded-xl px-3 py-2 text-xs text-blue-700 leading-relaxed">
                      {entry.questions.explanation}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <BottomNav />
    </div>
  )
}
