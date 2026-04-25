import { Grade } from '@/lib/types'
import { GRADE_TEXT_COLORS, GRADE_LABELS } from '@/lib/constants'

export function GradeTag({ grade }: { grade: Grade }) {
  return (
    <span className={`text-xs font-bold ${GRADE_TEXT_COLORS[grade]}`}>
      {grade} · {GRADE_LABELS[grade]}
    </span>
  )
}
