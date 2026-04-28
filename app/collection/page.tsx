'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { getUserItems } from '@/lib/items'
import { getSavedUserId } from '@/lib/user'
import { Monster, Grade, UserItem } from '@/lib/types'
import { MonsterCard } from '@/components/MonsterCard'
import { BottomNav } from '@/components/BottomNav'
import { GRADE_ORDER } from '@/lib/constants'

export default function CollectionPage() {
  const [allMonsters, setAllMonsters] = useState<Monster[]>([])
  const [userItems, setUserItems] = useState<UserItem[]>([])
  const [filter, setFilter] = useState<Grade | 'ALL'>('ALL')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('collections').select('*').order('id')
      setAllMonsters((data as Monster[]) || [])

      const userId = getSavedUserId()
      if (userId) {
        const items = await getUserItems(userId)
        setUserItems(items)
      }
      setLoading(false)
    }
    load()
  }, [])

  const ownedIds = new Set(userItems.map(i => i.collection_id))
  const filtered = filter === 'ALL'
    ? allMonsters
    : allMonsters.filter(m => m.grade === filter)
  const ownedCount = allMonsters.filter(m => ownedIds.has(m.id)).length

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen px-4 py-6 pb-20 gap-4">
      <div className="flex items-center justify-between px-2">
        <h1 className="text-xl font-extrabold text-gray-900">도감</h1>
        <span className="text-sm text-gray-400">{ownedCount} / {allMonsters.length}</span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 px-2">
        {(['ALL', ...GRADE_ORDER] as const).map(g => (
          <button
            key={g}
            onClick={() => setFilter(g)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors
              ${filter === g ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'}`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 px-2">
        {filtered.map(monster => (
          <MonsterCard
            key={monster.id}
            monster={monster}
            silhouette={!ownedIds.has(monster.id)}
            size="sm"
          />
        ))}
      </div>
      <BottomNav />
    </div>
  )
}
