import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import ModuleIcon from './ModuleIcon.jsx'

export default function ModuleCard({ module }) {
  return (
    <Link
      to={`/modules/${module.slug}`}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
    >
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${module.color} text-white`}>
        <ModuleIcon name={module.icon} size={24} />
      </div>
      <h3 className="mt-4 text-lg font-bold text-slate-900">{module.title}</h3>
      <p className="mt-1 text-sm text-slate-500">{module.summary}</p>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
        <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-600">
          {module.difficulty}
        </span>
        <span className="inline-flex items-center gap-1 text-slate-400">
          <Clock size={13} /> ~{module.estimatedHours}h
        </span>
        <span className="text-slate-300">·</span>
        <span className="text-slate-400">{module.topics.length} topics</span>
      </div>

      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
        Explore module
        <ArrowRight size={16} className="transition group-hover:translate-x-1" />
      </span>
    </Link>
  )
}
