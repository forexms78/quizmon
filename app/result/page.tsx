'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { QuizAnswer } from '@/lib/types'
import { drawMonster } from '@/lib/gacha'
import { addItem } from '@/lib/items'
import { getSavedUserId } from '@/lib/user'
import { supabase } from '@/lib/supabase'
import { Monster } from '@/lib/types'
import { GachaReveal } from '@/components/GachaReveal'
import { saveQuizHistory } from '@/lib/history'

export default function ResultPage() {
  const router = useRouter()
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [gachaResults, setGachaResults] = useState<{ monster: Monster; upgraded: boolean }[]>([])
  const [phase, setPhase] = useState<'summary' | 'gacha'>('summary')
  const [allMonsters, setAllMonsters] = useState<Monster[]>([])

  useEffect(() => {
    const userId = getSavedUserId()
    if (!userId) { router.push('/'); return }

    const raw = localStorage.getItem('quizmon_result')
    if (!raw) { router.push('/'); return }
    const parsed: QuizAnswer[] = JSON.parse(raw)
    setAnswers(parsed)
    saveQuizHistory(userId, parsed)

    supabase.from('collections').select('*').then(({ data }) => {
      setAllMonsters((data as Monster[]) || [])
    })
  }, [router])

  async function startGacha() {
    const userId = getSavedUserId()!
    const chips = answers.filter(a => a.correct).map(a => a.question.difficulty)
    const results = chips.map(d => drawMonster(d, allMonsters))

    for (const r of results) {
      await addItem(userId, r.monster.id)
    }

    setGachaResults(results)
    setPhase('gacha')
  }

  const score = answers.filter(a => a.correct).length

  if (phase === 'gacha') {
    return (
      <div className="flex flex-col min-h-screen px-6 py-8 gap-4">
        <h2 className="text-xl font-extrabold text-gray-900 text-center">데이터 칩 뽑기</h2>
        <GachaReveal
          results={gachaResults}
          onDone={() => router.push('/inventory')}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center min-h-screen px-6 py-12 gap-8">
      <div className="text-center">
        <p className="text-gray-400 text-sm">퀴즈 결과</p>
        <h2 className="text-6xl font-extrabold text-gray-900 mt-2">
          {score}
          <span className="text-2xl text-gray-400"> / 10</span>
        </h2>
      </div>

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
        {score > 0 ? (
          <button
            onClick={startGacha}
            disabled={allMonsters.length === 0}
            className="w-full py-4 rounded-2xl bg-blue-500 text-white font-bold text-base
              active:scale-95 transition-transform disabled:opacity-40"
          >
            {score}개 데이터 칩 뽑기
          </button>
        ) : (
          <p className="text-center text-gray-400 text-sm">정답이 없어 칩을 획득하지 못했습니다.</p>
        )}
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
