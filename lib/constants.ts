import { Grade, Difficulty } from './types'

export const GRADE_COLORS: Record<Grade, string> = {
  C: 'border-gray-300 bg-gray-50',
  B: 'border-blue-400 bg-blue-50',
  A: 'border-purple-500 bg-purple-50',
  S: 'border-orange-500 bg-orange-50',
  SS: 'border-yellow-500 bg-yellow-50',
}

export const GRADE_TEXT_COLORS: Record<Grade, string> = {
  C: 'text-gray-500',
  B: 'text-blue-600',
  A: 'text-purple-600',
  S: 'text-orange-600',
  SS: 'text-yellow-600',
}

export const GRADE_LABELS: Record<Grade, string> = {
  C: 'Common',
  B: 'Rare',
  A: 'Epic',
  S: 'Legendary',
  SS: 'Ultimate',
}

export const DIFFICULTY_GRADE: Record<Difficulty, Grade> = {
  common: 'C',
  rare: 'B',
  epic: 'A',
  legendary: 'S',
}

export const GRADE_ORDER: Grade[] = ['C', 'B', 'A', 'S', 'SS']
