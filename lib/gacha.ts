import { Difficulty, Grade, Monster } from './types'
import { GRADE_ORDER, DIFFICULTY_GRADE } from './constants'

export function getNextGrade(grade: Grade): Grade {
  const idx = GRADE_ORDER.indexOf(grade)
  return idx < GRADE_ORDER.length - 1 ? GRADE_ORDER[idx + 1] : grade
}

export function drawMonster(
  difficulty: Difficulty,
  allMonsters: Monster[]
): { monster: Monster; upgraded: boolean } {
  const baseGrade = DIFFICULTY_GRADE[difficulty]
  const upgraded = baseGrade !== 'SS' && Math.random() < 0.01
  const targetGrade = upgraded ? getNextGrade(baseGrade) : baseGrade
  const pool = allMonsters.filter(m => m.grade === targetGrade)
  if (pool.length === 0) {
    const fallback = allMonsters.filter(m => m.grade === baseGrade)
    return { monster: fallback[Math.floor(Math.random() * fallback.length)], upgraded: false }
  }
  return { monster: pool[Math.floor(Math.random() * pool.length)], upgraded }
}

export function drawMultiple(
  difficulties: Difficulty[],
  allMonsters: Monster[]
): { monster: Monster; upgraded: boolean }[] {
  return difficulties.map(d => drawMonster(d, allMonsters))
}
