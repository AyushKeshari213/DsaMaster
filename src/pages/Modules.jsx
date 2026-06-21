import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { modules } from '../data/modules.js'
import ModuleCard from '../components/ModuleCard.jsx'

const difficulties = ['All', 'Core', 'Intermediate', 'Advanced', 'Specialized', 'Essential']

export default function Modules() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')

  const filtered = useMemo(() => {
    return modules.filter((m) => {
      const matchesQuery =
        m.title.toLowerCase().includes(query.toLowerCase()) ||
        m.summary.toLowerCase().includes(query.toLowerCase())
      const matchesFilter = filter === 'All' || m.difficulty === filter
      return matchesQuery && matchesFilter
    })
  }, [query, filter])

  return (
    <div className="container-page py-14">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Interview Modules</h1>
        <p className="mt-3 text-slate-600">
          Ten focused modules covering everything from algorithms to behavioral rounds. Pick a track
          and dive in.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search modules..."
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => setFilter(d)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                filter === d
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-slate-500">No modules match your search.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => (
            <ModuleCard key={m.slug} module={m} />
          ))}
        </div>
      )}
    </div>
  )
}
