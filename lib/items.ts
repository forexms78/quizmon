import { supabase } from './supabase'
import { Monster, UserItem } from './types'

export async function getUserItems(userId: string): Promise<UserItem[]> {
  const { data, error } = await supabase
    .from('user_items')
    .select('*, collections(*)')
    .eq('user_id', userId)

  if (error) throw error
  return (data || []).map(item => ({
    ...item,
    monster: item.collections as unknown as Monster,
  }))
}

export async function addItem(userId: string, collectionId: number): Promise<void> {
  const { data: existing } = await supabase
    .from('user_items')
    .select('id, count')
    .eq('user_id', userId)
    .eq('collection_id', collectionId)
    .single()

  if (existing) {
    await supabase
      .from('user_items')
      .update({ count: existing.count + 1 })
      .eq('id', existing.id)
  } else {
    await supabase
      .from('user_items')
      .insert({ user_id: userId, collection_id: collectionId, count: 1 })
  }
}

export async function removeItems(
  userId: string,
  collectionId: number,
  count: number
): Promise<void> {
  const { data } = await supabase
    .from('user_items')
    .select('id, count')
    .eq('user_id', userId)
    .eq('collection_id', collectionId)
    .single()

  if (!data) return

  if (data.count <= count) {
    await supabase.from('user_items').delete().eq('id', data.id)
  } else {
    await supabase
      .from('user_items')
      .update({ count: data.count - count })
      .eq('id', data.id)
  }
}
