'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Question, QuizAnswer, Difficulty } from '@/lib/types'
import { getSavedUserId } from '@/lib/user'
import { QuizCard } from '@/components/QuizCard'
import { ProgressBar } from '@/components/ProgressBar'

const QUIZ_DISTRIBUTION: { difficulty: Difficulty; count: number }[] = [
  { difficulty: 'common', count: 4 },
  { difficulty: 'rare', count: 3 },
  { difficulty: 'epic', count: 2 },
  { difficulty: 'legendary', count: 1 },
]

async function fetchQuestions(): Promise<Question[]> {
  const result: Question[] = []
  for (const { difficulty, count } of QUIZ_DISTRIBUTION) {
    const { data } = await supabase
      .from('questions')
      .select('*')
      .eq('difficulty', difficulty)
    if (!data) continue
    const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, count)
    result.push(...shuffled)
  }
  return result.sort(() => Math.random() - 0.5)
}

export default function QuizPage() {
  const router = useRouter()
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!getSavedUserId()) { router.push('/'); return }
    fetchQuestions().then(qs => { setQuestions(qs); setLoading(false) })
  }, [router])

  function handleSelect(opt: string) {
    setSelected(opt)
    setRevealed(true)
  }

  function handleNext() {
    if (!selected || !questions[current]) return
    const answer: QuizAnswer = {
      question: questions[current],
      selected,
      correct: selected === questions[current].answer,
    }
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)
    setSelected(null)
    setRevealed(false)

    if (current + 1 >= questions.length) {
      localStorage.setItem('quizmon_result', JSON.stringify(newAnswers))
      router.push('/result')
    } else {
      setCurrent(c => c + 1)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const q = questions[current]

  return (
    <div className="flex flex-col min-h-screen px-6 py-8 gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm text-gray-400">
          <span>{current + 1} / {questions.length}</span>
          <span className="capitalize font-medium text-blue-500">{q?.difficulty}</span>
        </div>
        <ProgressBar current={current + 1} total={questions.length} />
      </div>

      {q && (
        <QuizCard
          question={q}
          selected={selected}
          onSelect={handleSelect}
          revealed={revealed}
        />
      )}

      <div className="mt-auto">
        <button
          onClick={handleNext}
          disabled={!revealed}
          className="w-full py-4 rounded-2xl bg-blue-500 text-white font-bold text-base
            disabled:opacity-30 active:scale-95 transition-transform"
        >
          {current + 1 >= questions.length ? '결과 보기' : '다음 문제'}
        </button>
      </div>
    </div>
  )
}
