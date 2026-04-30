'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { QuizAnswer } from '@/lib/types'
import { drawMonster } from '@/lib/gacha'
import { addItem } from '@/lib/items'
import { getSavedUserId } from '@/lib/user'
import { supabase } from '@/lib/supabase'
import { Monster } from '@/lib/types'
import { saveQuizHistory } from '@/lib/history'
import { updateRating } from '@/lib/rating'

export default function ResultPage() {
  const router = useRouter()
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [ratingBefore, setRatingBefore] = useState<number | null>(null)
  const [ratingAfter, setRatingAfter] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)
  const [gachaReady, setGachaReady] = useState(false)

  useEffect(() => {
    const userId = getSavedUserId()
    if (!userId) { router.push('/'); return }

    const raw = localStorage.getItem('quizmon_result')
    if (!raw) { router.push('/'); return }
    const parsed: QuizAnswer[] = JSON.parse(raw)
    setAnswers(parsed)
    saveQuizHistory(userId, parsed)

    updateRating(userId, parsed).then(({ before, after }) => {
      setRatingBefore(before)
      setRatingAfter(after)
    })

    // 가챠 백그라운드 처리
    supabase.from('collections').select('*').then(async ({ data }) => {
      const monsters = (data as Monster[]) || []
      const chips = parsed.filter(a => a.correct).map(a => a.question.difficulty)
      for (const d of chips) {
        const result = drawMonster(d, monsters)
        await addItem(userId, result.monster.id)
      }
      setGachaReady(true)
    })
  }, [router])

  function copyBadge() {
    const userId = getSavedUserId()!
    const badgeUrl = `https://img.shields.io/endpoint?url=${window.location.origin}/api/badge/${userId}`
    const markdown = `![Quizmon Rating](${badgeUrl})`
    navigator.clipboard.writeText(markdown)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const score = answers.filter(a => a.correct).length
  const ratingDelta = ratingAfter !== null && ratingBefore !== null ? ratingAfter - ratingBefore : null

  return (
    <div className="flex flex-col items-center min-h-screen px-6 py-12 gap-8">
      <div className="text-center">
        <p className="text-gray-400 text-sm">퀴즈 결과</p>
        <h2 className="text-6xl font-extrabold text-gray-900 mt-2">
          {score}
          <span className="text-2xl text-gray-400"> / 10</span>
        </h2>
      </div>

      {ratingAfter !== null && ratingBefore !== null ? (
        <div className="w-full bg-gray-50 rounded-2xl px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 mb-1">레이팅</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-gray-900">{ratingAfter}</span>
              {ratingDelta !== null && (
                <span className={`text-sm font-bold ${ratingDelta >= 0 ? 'text-green-500' : 'text-red-400'}`}>
                  {ratingDelta >= 0 ? '+' : ''}{ratingDelta}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-1">{ratingBefore} → {ratingAfter}</p>
          </div>
          <button
            onClick={copyBadge}
            className="px-3 py-2 rounded-xl bg-gray-800 text-white text-xs font-bold active:scale-95 transition-transform"
          >
            {copied ? '복사됨!' : 'GitHub 뱃지 복사'}
          </button>
        </div>
      ) : (
        <div className="w-full bg-gray-50 rounded-2xl px-5 py-4 flex items-center gap-3">
          <div className="w-5 h-5 rounded-full border-2 border-gray-300 border-t-gray-600 animate-spin" />
          <span className="text-sm text-gray-400">레이팅 계산 중...</span>
        </div>
      )}

      <div className="w-full flex flex-col gap-2">
        {answers.map((a, i) => (
          <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-2xl ${a.correct ? 'bg-green-50' : 'bg-red-50'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${a.correct ? 'bg-green-500' : 'bg-red-400'}`}>
              {a.correct ? '✓' : '✗'}
            </span>
            <p className="text-sm text-gray-700 truncate flex-1">{a.question.content}</p>
            <span className="text-xs text-gray-400 capitalize shrink-0">{a.question.difficulty}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto w-full flex flex-col gap-3">
        <button
          onClick={() => router.push('/inventory')}
          disabled={!gachaReady}
          className="w-full py-4 rounded-2xl bg-blue-500 text-white font-bold text-base
            active:scale-95 transition-transform disabled:opacity-40"
        >
          {gachaReady ? `인벤토리 보기 (${score}개 획득)` : '처리 중...'}
        </button>
        <button
          onClick={() => router.push('/quiz')}
          className="w-full py-4 rounded-2xl bg-gray-100 text-gray-600 font-bold text-base"
        >
          다시 도전
        </button>
      </div>
    </div>
  )
}
