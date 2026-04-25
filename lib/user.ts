import { supabase } from './supabase'
import { User } from './types'

const STORAGE_KEY = 'quizmon_user_id'

export async function getOrCreateUser(nickname: string): Promise<User> {
  const { data: existing } = await supabase
    .from('users')
    .select('*')
    .eq('nickname', nickname)
    .single()

  if (existing) {
    localStorage.setItem(STORAGE_KEY, existing.id)
    return existing
  }

  const { data, error } = await supabase
    .from('users')
    .insert({ nickname })
    .select()
    .single()

  if (error) throw error
  localStorage.setItem(STORAGE_KEY, data.id)
  return data
}

export function getSavedUserId(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(STORAGE_KEY)
}

export async function getUserById(id: string): Promise<User | null> {
  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()
  return data
}
