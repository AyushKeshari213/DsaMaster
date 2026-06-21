import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays } from 'lucide-react'
import { roadmap } from '../data/roadmap.js'
import { getModule } from '../data/modules.js'

export default function Roadmap() {
  return (
    <div className="container-page py-14">
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
          <CalendarDays size={14} /> 8-Week Plan
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900">
          The Interview Roadmap
        </h1>
        <p className="mt-3 text-slate-600">
          A sequenced plan that builds from fundamentals to design and polish. Adjust the pace to your
          timeline — the order is what matters.
        </p>
      </div>

      <div className="relative mt-12">
        <div className="absolute left-4 top-0 hidden h-full w-px bg-slate-200 sm:block" />
        <div className="space-y-8">
          {roadmap.map((phase, i) => (
            <div key={phase.phase} className="relative sm:pl-14">
              <span className="absolute left-0 top-1 hidden h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white sm:flex">
                {i + 1}
              </span>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                      {phase.phase}
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-slate-900">{phase.title}</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {phase.focus.map((slug) => {
                      const m = getModule(slug)
                      if (!m) return null
                      return (
                        <Link
                          key={slug}
                          to={`/modules/${slug}`}
                          className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-brand-50 hover:text-brand-700"
                        >
                          {m.short}
                        </Link>
                      )
                    })}
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {phase.goals.map((g) => (
                    <li key={g} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-2xl bg-slate-900 p-8 text-center">
        <h2 className="text-2xl font-bold text-white">Pick your first module</h2>
        <p className="mx-auto mt-2 max-w-md text-slate-300">
          Start with Data Structures &amp; Algorithms — the foundation everything else builds on.
        </p>
        <Link
          to="/modules/dsa"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Begin with DSA <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  )
}
