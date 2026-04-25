'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Monster, UserItem, Grade } from '@/lib/types'
import { getUserItems } from '@/lib/items'
import { getSavedUserId } from '@/lib/user'
import { supabase } from '@/lib/supabase'
import { MonsterCard } from '@/components/MonsterCard'
import { SynthesisModal } from '@/components/SynthesisModal'
import { GRADE_ORDER } from '@/lib/constants'

export default function InventoryPage() {
  const router = useRouter()
  const [items, setItems] = useState<UserItem[]>([])
  const [allMonsters, setAllMonsters] = useState<Monster[]>([])
  const [selected, setSelected] = useState<UserItem | null>(null)
  const [filter, setFilter] = useState<Grade | 'ALL'>('ALL')
  const [loading, setLoading] = useState(true)

  const userId = getSavedUserId()

  useEffect(() => {
    if (!userId) { router.push('/'); return }
    async function load() {
      const [itemsData, { data: monsters }] = await Promise.all([
        getUserItems(userId!),
        supabase.from('collections').select('*'),
      ])
      setItems(itemsData)
      setAllMonsters((monsters as Monster[]) || [])
      setLoading(false)
    }
    load()
  }, [userId, router])

  async function reload() {
    if (!userId) return
    const updated = await getUserItems(userId)
    setItems(updated)
    setSelected(null)
  }

  const filtered = filter === 'ALL'
    ? items
    : items.filter(i => i.monster?.grade === filter)

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen px-4 py-6 gap-4">
      <div className="flex items-center justify-between px-2">
        <h1 className="text-xl font-extrabold text-gray-900">인벤토리</h1>
        <span className="text-sm text-gray-400">{items.length}종 보유</span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 px-2">
        {(['ALL', ...GRADE_ORDER] as const).map(g => (
          <button key={g} onClick={() => setFilter(g)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap
              ${filter === g ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
            {g}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-4 text-gray-400 py-20">
          <p className="text-sm">아직 수집한 몬스터가 없습니다</p>
          <button onClick={() => router.push('/quiz')}
            className="px-6 py-3 rounded-2xl bg-blue-500 text-white font-bold text-sm">
            퀴즈 풀기
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 px-2">
          {filtered.map(item => item.monster && (
            <div key={item.id} onClick={() => item.count >= 3 && setSelected(item)}
              className={item.count >= 3 ? 'cursor-pointer' : ''}>
              <MonsterCard monster={item.monster} count={item.count} size="sm" />
              {item.count >= 3 && (
                <p className="text-center text-xs text-blue-500 font-bold mt-1">합성 가능</p>
              )}
            </div>
          ))}
        </div>
      )}

      {selected && userId && (
        <SynthesisModal
          item={selected}
          allMonsters={allMonsters}
          userId={userId}
          onClose={() => setSelected(null)}
          onSuccess={reload}
        />
      )}
    </div>
  )
}
