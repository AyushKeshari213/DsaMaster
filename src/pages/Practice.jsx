import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Lock, Code2 } from 'lucide-react'
import { problemTopics, problemId } from '../data/problems/index.js'
import { useProgress } from '../hooks/useProgress.js'

export default function Practice() {
  const { countSolved } = useProgress()

  const totalSolved = problemTopics.reduce(
    (acc, t) => acc + countSolved(t.problems.map((p) => problemId(t.slug, p.slug))),
    0,
  )
  const totalProblems = problemTopics.reduce((acc, t) => acc + t.problems.length, 0)

  return (
    <div className="container-page py-14">
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
          <Code2 size={14} /> Python only
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900">Practice Problems</h1>
        <p className="mt-3 text-slate-600">
          Work through curated interview problems topic by topic. Every solution is written in
          clean, idiomatic <strong>Python</strong> with an explained approach and complexity.
          Your progress is saved automatically in this browser.
        </p>
      </div>

      <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
        <CheckCircle2 className="text-emerald-500" size={22} />
        <span className="text-sm font-semibold text-slate-700">
          {totalSolved} / {totalProblems} solved
        </span>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {problemTopics.map((topic) => {
          const ids = topic.problems.map((p) => problemId(topic.slug, p.slug))
          const solved = countSolved(ids)
          const total = topic.problems.length
          const pct = total ? Math.round((solved / total) * 100) : 0
          const available = topic.status === 'available'

          const card = (
            <div
              className={`flex h-full flex-col rounded-2xl border p-6 shadow-sm transition ${
                available
                  ? 'border-slate-200 bg-white hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg'
                  : 'border-dashed border-slate-200 bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">{topic.title}</h3>
                {available ? (
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                    {total} problems
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-500">
                    <Lock size={12} /> Soon
                  </span>
                )}
              </div>
              <p className="mt-2 flex-1 text-sm text-slate-500">{topic.description}</p>

              {available && (
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                    <span>{solved} solved</span>
                    <span>{pct}%</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-brand-500 transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                    Start solving <ArrowRight size={16} />
                  </span>
                </div>
              )}
            </div>
          )

          return available ? (
            <Link key={topic.slug} to={`/practice/${topic.slug}`}>
              {card}
            </Link>
          ) : (
            <div key={topic.slug}>{card}</div>
          )
        })}
      </div>
    </div>
  )
}
