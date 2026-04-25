import { Grade, Monster } from './types'
import { getNextGrade } from './gacha'

export function canSynthesize(grade: Grade): boolean {
  return grade !== 'SS'
}

export function synthesize(
  grade: Grade,
  sourceId: number,
  allMonsters: Monster[]
): Monster {
  if (!canSynthesize(grade)) throw new Error('SS 등급은 합성 불가')

  const upgraded = Math.random() < 0.10
  const targetGrade = upgraded ? getNextGrade(grade) : grade
  const pool = allMonsters.filter(
    m => m.grade === targetGrade && m.id !== sourceId
  )
  if (pool.length === 0) {
    const fallback = allMonsters.filter(m => m.grade === targetGrade)
    return fallback[Math.floor(Math.random() * fallback.length)]
  }
  return pool[Math.floor(Math.random() * pool.length)]
}
