import { Question } from '@/lib/types'

interface Props {
  question: Question
  selected: string | null
  onSelect: (answer: string) => void
  revealed: boolean
}

export function QuizCard({ question, selected, onSelect, revealed }: Props) {
  function optionStyle(opt: string) {
    if (!revealed) {
      return selected === opt
        ? 'border-blue-500 bg-blue-50 text-blue-700'
        : 'border-gray-200 bg-white text-gray-800 hover:border-gray-300'
    }
    if (opt === question.answer) return 'border-green-500 bg-green-50 text-green-700'
    if (opt === selected) return 'border-red-400 bg-red-50 text-red-600'
    return 'border-gray-100 bg-gray-50 text-gray-400'
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-base font-semibold text-gray-900 leading-relaxed">
        {question.content}
      </p>
      <div className="flex flex-col gap-2">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => !revealed && onSelect(opt)}
            className={`w-full px-4 py-3 rounded-2xl border-2 text-left text-sm font-medium transition-colors ${optionStyle(opt)}`}
          >
            {opt}
          </button>
        ))}
      </div>
      {revealed && question.explanation && (
        <div className="bg-blue-50 rounded-2xl p-4 text-sm text-blue-700">
          <span className="font-bold">해설:</span> {question.explanation}
        </div>
      )}
    </div>
  )
}
