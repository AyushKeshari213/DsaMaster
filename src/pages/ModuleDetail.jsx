import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Clock, ExternalLink, ListChecks, CheckCircle2, Lightbulb, ChevronDown } from 'lucide-react'
import { getModule, modules } from '../data/modules.js'
import ModuleIcon from '../components/ModuleIcon.jsx'

function LessonAccordion({ lesson }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-slate-50"
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-slate-900">{lesson.term}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="border-t border-slate-100 px-4 py-4">
          <p className="text-sm leading-relaxed text-slate-600">{lesson.definition}</p>
          {lesson.points && (
            <ul className="mt-3 space-y-2">
              {lesson.points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-500" />
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default function ModuleDetail() {
  const { slug } = useParams()
  const module = getModule(slug)

  if (!module) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Module not found</h1>
        <Link to="/modules" className="mt-4 inline-flex items-center gap-1 text-brand-600">
          <ArrowLeft size={16} /> Back to modules
        </Link>
      </div>
    )
  }

  const index = modules.findIndex((m) => m.slug === slug)
  const next = modules[(index + 1) % modules.length]

  return (
    <div>
      {/* Header */}
      <div className={`bg-gradient-to-br ${module.color}`}>
        <div className="container-page py-14 text-white">
          <Link to="/modules" className="inline-flex items-center gap-1 text-sm font-medium text-white/80 transition hover:text-white">
            <ArrowLeft size={16} /> All modules
          </Link>
          <div className="mt-6 flex items-start gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              <ModuleIcon name={module.icon} size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold sm:text-4xl">{module.title}</h1>
              <p className="mt-2 max-w-2xl text-white/85">{module.summary}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <span className="rounded-full bg-white/15 px-3 py-1 font-medium">{module.difficulty}</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 font-medium">
                  <Clock size={14} /> ~{module.estimatedHours} hours
                </span>
                <span className="rounded-full bg-white/15 px-3 py-1 font-medium">{module.topics.length} topics</span>
              </div>
              {module.practiceTopic && (
                <Link
                  to={`/practice/${module.practiceTopic}`}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-white/90"
                >
                  Solve Python problems <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container-page grid gap-10 py-14 lg:grid-cols-3">
        {/* Main column */}
        <div className="lg:col-span-2">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
            <ListChecks className="text-brand-600" size={22} /> What you'll learn
          </h2>
          <div className="mt-6 space-y-5">
            {module.topics.map((t, i) => (
              <div key={t.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-600">
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">{t.name}</h3>
                </div>

                {t.lessons ? (
                  <div className="mt-5 space-y-3">
                    {t.lessons.map((lesson) => (
                      <LessonAccordion key={lesson.term} lesson={lesson} />
                    ))}
                  </div>
                ) : (
                  <ul className="mt-4 space-y-2 pl-1">
                    {t.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="flex items-center gap-2 text-base font-bold text-slate-900">
              <Lightbulb size={18} className="text-amber-500" /> Must-know questions
            </h3>
            <ul className="mt-4 space-y-2.5">
              {module.patterns.map((p) => (
                <li key={p} className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900">Curated resources</h3>
            <ul className="mt-4 space-y-2.5">
              {module.resources.map((r) => (
                <li key={r.url}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
                  >
                    {r.label}
                    <ExternalLink size={14} className="text-slate-400 transition group-hover:text-brand-600" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <Link
            to={`/modules/${next.slug}`}
            className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-200 hover:shadow-md"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Next module</p>
              <p className="mt-1 font-bold text-slate-900">{next.short}</p>
            </div>
            <ArrowRight size={20} className="text-brand-600" />
          </Link>
        </aside>
      </div>
    </div>
  )
}
