'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/', label: '홈', icon: '⌂' },
  { href: '/quiz', label: '퀴즈', icon: '◆' },
  { href: '/collection', label: '도감', icon: '◉' },
  { href: '/inventory', label: '인벤토리', icon: '▣' },
  { href: '/wrongnotes', label: '오답노트', icon: '✕' },
]

export function BottomNav() {
  const path = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex">
      {NAV.map(n => (
        <Link
          key={n.href}
          href={n.href}
          className={`flex-1 flex flex-col items-center py-3 gap-0.5 text-xs font-medium transition-colors
            ${path === n.href ? 'text-blue-500' : 'text-gray-400'}`}
        >
          <span className="text-base leading-none">{n.icon}</span>
          {n.label}
        </Link>
      ))}
    </nav>
  )
}
