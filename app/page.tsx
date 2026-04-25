'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getOrCreateUser, getSavedUserId, getUserById } from '@/lib/user'

export default function Home() {
  const router = useRouter()
  const [nickname, setNickname] = useState('')
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const savedId = getSavedUserId()
    if (savedId) {
      getUserById(savedId).then(user => {
        if (user) router.push('/quiz')
        else setChecking(false)
      })
    } else {
      setChecking(false)
    }
  }, [router])

  async function handleStart() {
    if (!nickname.trim()) return
    setLoading(true)
    try {
      await getOrCreateUser(nickname.trim())
      router.push('/quiz')
    } finally {
      setLoading(false)
    }
  }

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 gap-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Quizmon</h1>
        <p className="mt-2 text-gray-500 text-sm">AI 퀴즈를 풀고 몬스터를 수집하세요</p>
      </div>

      <div className="w-full flex flex-col gap-3">
        <input
          type="text"
          placeholder="닉네임 입력"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleStart()}
          className="w-full px-4 py-4 rounded-2xl border border-gray-200 text-base
            focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          maxLength={12}
        />
        <button
          onClick={handleStart}
          disabled={!nickname.trim() || loading}
          className="w-full py-4 rounded-2xl bg-blue-500 text-white font-bold text-base
            disabled:opacity-40 active:scale-95 transition-transform"
        >
          {loading ? '로딩 중...' : '시작하기'}
        </button>
      </div>

      <nav className="flex gap-6 text-sm text-gray-400">
        <a href="/collection" className="hover:text-gray-600">도감</a>
        <a href="/inventory" className="hover:text-gray-600">인벤토리</a>
      </nav>
    </div>
  )
}
