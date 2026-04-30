import { supabase } from './supabase'
import { QuizAnswer } from './types'

const DIFFICULTY_RATING: Record<string, number> = {
  common: 1000,
  rare: 1300,
  epic: 1600,
  legendary: 1900,
}

function expectedScore(playerRating: number, questionRating: number): number {
  return 1 / (1 + Math.pow(10, (questionRating - playerRating) / 400))
}

function kFactor(gamesPlayed: number): number {
  if (gamesPlayed < 10) return 40
  if (gamesPlayed < 30) return 30
  return 20
}

export function calcRatingDelta(
  answers: QuizAnswer[],
  currentRating: number,
  gamesPlayed: number
): number {
  const K = kFactor(gamesPlayed)
  const perQuestion = K / answers.length

  const total = answers.reduce((sum, a) => {
    const dr = DIFFICULTY_RATING[a.question.difficulty] ?? DIFFICULTY_RATING.common
    const expected = expectedScore(currentRating, dr)
    const actual = a.correct ? 1 : 0
    return sum + perQuestion * (actual - expected)
  }, 0)

  return Math.round(total)
}

export function ratingColor(rating: number): string {
  if (rating >= 2000) return 'gold'
  if (rating >= 1800) return 'purple'
  if (rating >= 1600) return 'blue'
  if (rating >= 1400) return 'green'
  if (rating >= 1200) return 'yellow'
  if (rating >= 1000) return 'orange'
  return 'red'
}

export async function getRating(userId: string): Promise<{ rating: number; gamesPlayed: number }> {
  const { data } = await supabase
    .from('ratings')
    .select('rating, games_played')
    .eq('user_id', userId)
    .single()
  return { rating: data?.rating ?? 1200, gamesPlayed: data?.games_played ?? 0 }
}

export async function updateRating(
  userId: string,
  answers: QuizAnswer[]
): Promise<{ before: number; after: number; delta: number }> {
  const { rating: before, gamesPlayed } = await getRating(userId)
  const delta = calcRatingDelta(answers, before, gamesPlayed)
  const after = Math.max(0, before + delta)

  await supabase.from('ratings').upsert({
    user_id: userId,
    rating: after,
    games_played: gamesPlayed + 1,
    updated_at: new Date().toISOString(),
  })

  return { before, after, delta }
}
