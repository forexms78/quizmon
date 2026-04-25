import { describe, it, expect, vi } from 'vitest'
import { drawMonster, getNextGrade } from '../lib/gacha'
import { Monster } from '../lib/types'

const mockMonsters: Monster[] = [
  { id: 1, name: 'CMonA', grade: 'C', image_url: '', description: '' },
  { id: 2, name: 'CMonB', grade: 'C', image_url: '', description: '' },
  { id: 3, name: 'BMon', grade: 'B', image_url: '', description: '' },
]

describe('getNextGrade', () => {
  it('C 다음은 B', () => expect(getNextGrade('C')).toBe('B'))
  it('SS는 SS 유지', () => expect(getNextGrade('SS')).toBe('SS'))
  it('S 다음은 SS', () => expect(getNextGrade('S')).toBe('SS'))
  it('B 다음은 A', () => expect(getNextGrade('B')).toBe('A'))
})

describe('drawMonster', () => {
  it('일반 확률: common 칩은 C 등급 반환', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5)
    const result = drawMonster('common', mockMonsters)
    expect(result.monster.grade).toBe('C')
    expect(result.upgraded).toBe(false)
    vi.restoreAllMocks()
  })

  it('1% 확률 업그레이드: common 칩이 B 반환', () => {
    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0.005)
      .mockReturnValue(0)
    const result = drawMonster('common', mockMonsters)
    expect(result.monster.grade).toBe('B')
    expect(result.upgraded).toBe(true)
    vi.restoreAllMocks()
  })

  it('rare 칩은 B 등급 반환', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5)
    const result = drawMonster('rare', mockMonsters)
    expect(result.monster.grade).toBe('B')
    vi.restoreAllMocks()
  })
})
