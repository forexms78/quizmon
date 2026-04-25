export type Grade = 'C' | 'B' | 'A' | 'S' | 'SS'
export type Difficulty = 'common' | 'rare' | 'epic' | 'legendary'
export type QuestionType = 'multiple' | 'ox'

export interface Monster {
  id: number
  name: string
  grade: Grade
  image_url: string
  description: string
}

export interface Question {
  id: number
  content: string
  options: string[]
  answer: string
  difficulty: Difficulty
  type: QuestionType
  explanation: string
}

export interface User {
  id: string
  nickname: string
  created_at: string
}

export interface UserItem {
  id: number
  user_id: string
  collection_id: number
  count: number
  monster?: Monster
}

export interface QuizAnswer {
  question: Question
  selected: string | null
  correct: boolean
}

export interface GachaResult {
  monster: Monster
  difficulty: Difficulty
  upgraded: boolean
}
