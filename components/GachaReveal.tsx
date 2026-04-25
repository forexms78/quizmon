'use client'
import { useState } from 'react'
import { Monster } from '@/lib/types'
import { GRADE_COLORS } from '@/lib/constants'
import { MonsterCard } from './MonsterCard'

interface Props {
  results: { monster: Monster; upgraded: boolean }[]
  onDone: () => void
}

export function GachaReveal({ results, onDone }: Props) {
  const [revealed, setRevealed] = useState<number[]>([])
  const [animating, setAnimating] = useState(false)

  function revealNext() {
    const nextIdx = revealed.length
    if (nextIdx >= results.length) { onDone(); return }
    setAnimating(true)
    setTimeout(() => {
      setRevealed(prev => [...prev, nextIdx])
      setAnimating(false)
    }, 700)
  }

  const allRevealed = revealed.length >= results.length

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      {animating && (
        <div className={`w-36 h-44 rounded-2xl border-4 flex items-center justify-center
          ${GRADE_COLORS[results[revealed.length]?.monster.grade ?? 'C']} animate-pulse`}>
          <span className="text-4xl">?</span>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-3">
        {revealed.map(i => (
          <div key={i} className="flex flex-col items-center gap-1">
            <MonsterCard monster={results[i].monster} size="md" />
            {results[i].upgraded && (
              <span className="text-xs text-yellow-500 font-bold">UP!</span>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={revealNext}
        disabled={animating}
        className="w-full max-w-xs py-4 rounded-2xl bg-blue-500 text-white font-bold text-base
          disabled:opacity-50 active:scale-95 transition-transform"
      >
        {allRevealed
          ? '인벤토리 보기'
          : animating
          ? '...'
          : `뽑기 (${revealed.length + 1} / ${results.length})`}
      </button>
    </div>
  )
}
