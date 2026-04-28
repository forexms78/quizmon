import { Monster } from '@/lib/types'
import { GRADE_COLORS, GRADE_ICONS } from '@/lib/constants'
import { GradeTag } from './GradeTag'
import Image from 'next/image'

interface Props {
  monster: Monster
  count?: number
  silhouette?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function MonsterCard({ monster, count, silhouette = false, size = 'md' }: Props) {
  const sizeClass = { sm: 'w-24 h-28', md: 'w-32 h-36', lg: 'w-40 h-48' }[size]
  const imgClass = { sm: 'w-14 h-14', md: 'w-16 h-16', lg: 'w-20 h-20' }[size]

  return (
    <div className={`relative flex flex-col items-center rounded-2xl border-2 p-3 bg-white shadow-sm ${GRADE_COLORS[monster.grade]} ${sizeClass}`}>
      {silhouette ? (
        <div className={`${imgClass} rounded-xl bg-gray-200`} />
      ) : (
        <div className={`relative ${imgClass}`}>
          {monster.image_url ? (
            <Image src={monster.image_url} alt={monster.name} fill className="object-contain rounded-xl" />
          ) : (
            <div className={`w-full h-full rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center`}>
              <span className="text-3xl">{GRADE_ICONS[monster.grade]}</span>
            </div>
          )}
        </div>
      )}
      <p className="mt-2 text-xs font-semibold text-gray-800 text-center leading-tight w-full truncate">
        {silhouette ? '???' : monster.name}
      </p>
      <GradeTag grade={monster.grade} />
      {count && count > 1 && (
        <span className="absolute top-1 right-1 bg-gray-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
          {count}
        </span>
      )}
    </div>
  )
}
