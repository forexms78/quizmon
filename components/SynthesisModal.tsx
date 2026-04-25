'use client'
import { useState } from 'react'
import { Monster, UserItem } from '@/lib/types'
import { synthesize, canSynthesize } from '@/lib/synthesis'
import { addItem, removeItems } from '@/lib/items'
import { MonsterCard } from './MonsterCard'

interface Props {
  item: UserItem
  allMonsters: Monster[]
  userId: string
  onClose: () => void
  onSuccess: (result: Monster) => void
}

export function SynthesisModal({ item, allMonsters, userId, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Monster | null>(null)

  if (!item.monster) return null
  const grade = item.monster.grade

  async function handleSynthesize() {
    if (!item.monster) return
    setLoading(true)
    const synthesized = synthesize(grade, item.collection_id, allMonsters)
    await removeItems(userId, item.collection_id, 3)
    await addItem(userId, synthesized.id)
    setResult(synthesized)
    setLoading(false)
    onSuccess(synthesized)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50" onClick={onClose}>
      <div
        className="w-full max-w-md mx-auto bg-white rounded-t-3xl p-6 flex flex-col gap-5"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-lg font-extrabold text-gray-900">합성하기</h3>

        {result ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-500 text-sm">합성 결과!</p>
            <MonsterCard monster={result} size="lg" />
            <button onClick={onClose}
              className="w-full py-4 rounded-2xl bg-blue-500 text-white font-bold">
              확인
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4">
              <MonsterCard monster={item.monster} size="sm" />
              <div>
                <p className="font-bold text-gray-900">{item.monster.name}</p>
                <p className="text-sm text-gray-400">{grade}등급 × 3개 소모</p>
                <p className="text-xs text-gray-400 mt-1">
                  상위 등급 10% / 동급 다른 종 90%
                  {grade === 'S' ? ' (SS 획득 불가)' : ''}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={onClose}
                className="flex-1 py-4 rounded-2xl bg-gray-100 text-gray-600 font-bold">
                취소
              </button>
              <button
                onClick={handleSynthesize}
                disabled={loading || !canSynthesize(grade) || item.count < 3}
                className="flex-1 py-4 rounded-2xl bg-blue-500 text-white font-bold disabled:opacity-40"
              >
                {loading ? '합성 중...' : '합성'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
