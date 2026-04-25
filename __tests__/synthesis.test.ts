import { describe, it, expect, vi } from 'vitest'
import { synthesize, canSynthesize } from '../lib/synthesis'
import { Monster } from '../lib/types'

const mockMonsters: Monster[] = [
  { id: 1, name: 'CMonA', grade: 'C', image_url: '', description: '' },
  { id: 2, name: 'CMonB', grade: 'C', image_url: '', description: '' },
  { id: 3, name: 'BMon', grade: 'B', image_url: '', description: '' },
]

describe('canSynthesize', () => {
  it('C~S 합성 가능', () => {
    expect(canSynthesize('C')).toBe(true)
    expect(canSynthesize('S')).toBe(true)
    expect(canSynthesize('A')).toBe(true)
  })
  it('SS 합성 불가', () => expect(canSynthesize('SS')).toBe(false))
})

describe('synthesize', () => {
  it('90% 확률: 동급 다른 아이템 반환', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5)
    const result = synthesize('C', 1, mockMonsters)
    expect(result.grade).toBe('C')
    expect(result.id).not.toBe(1)
    vi.restoreAllMocks()
  })

  it('10% 확률: 상위 등급 반환', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.05)
    const result = synthesize('C', 1, mockMonsters)
    expect(result.grade).toBe('B')
    vi.restoreAllMocks()
  })

  it('SS 합성 시 에러', () => {
    expect(() => synthesize('SS', 1, mockMonsters)).toThrow('SS 등급은 합성 불가')
  })
})
