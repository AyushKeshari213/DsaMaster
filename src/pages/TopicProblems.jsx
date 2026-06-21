import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ChevronRight, CheckCircle2, Circle } from 'lucide-react'
import { getTopic, problemId } from '../data/problems/index.js'
import { useProgress } from '../hooks/useProgress.js'
import DifficultyBadge from '../components/DifficultyBadge.jsx'

export default function TopicProblems() {
  const { topic: topicSlug } = useParams()
  const topic = getTopic(topicSlug)
  const { isSolved, toggle, countSolved } = useProgress()

  if (!topic || topic.status !== 'available') {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Topic not available yet</h1>
        <Link to="/practice" className="mt-4 inline-flex items-center gap-1 text-brand-600">
          <ArrowLeft size={16} /> Back to practice
        </Link>
      </div>
    )
  }

  const ids = topic.problems.map((p) => problemId(topic.slug, p.slug))
  const solved = countSolved(ids)
  const total = topic.problems.length
  const pct = total ? Math.round((solved / total) * 100) : 0

  return (
    <div className="container-page py-14">
      <Link to="/practice" className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-brand-600">
        <ArrowLeft size={16} /> All topics
      </Link>

      <div className="mt-5 flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{topic.title}</h1>
          <p className="mt-2 max-w-xl text-sm text-slate-600">{topic.description}</p>
        </div>
        <div className="sm:w-56">
          <div className="flex items-center justify-between text-sm font-medium text-slate-600">
            <span>{solved} / {total} solved</span>
            <span>{pct}%</span>
          </div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {topic.problems.map((p, i) => {
          const id = problemId(topic.slug, p.slug)
          const done = isSolved(id)
          return (
            <div
              key={p.slug}
              className={`flex items-center gap-4 border-b border-slate-100 px-5 py-4 transition last:border-0 ${
                done ? 'bg-emerald-50/40' : 'hover:bg-slate-50'
              }`}
            >
              <button
                onClick={() => toggle(id)}
                className="shrink-0"
                aria-label={done ? 'Mark as unsolved' : 'Mark as solved'}
                title={done ? 'Mark as unsolved' : 'Mark as solved'}
              >
                {done ? (
                  <CheckCircle2 className="text-emerald-500" size={22} />
                ) : (
                  <Circle className="text-slate-300 hover:text-brand-400" size={22} />
                )}
              </button>

              <span className="w-6 shrink-0 text-sm font-semibold text-slate-400">{i + 1}</span>

              <Link to={`/practice/${topic.slug}/${p.slug}`} className="flex flex-1 items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className={`truncate font-semibold ${done ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                    {p.title}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">{p.pattern}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <DifficultyBadge level={p.difficulty} />
                  <ChevronRight size={18} className="text-slate-300" />
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
