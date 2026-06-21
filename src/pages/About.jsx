import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Compass, Repeat, Mic } from 'lucide-react'

const principles = [
  {
    icon: Compass,
    title: 'Patterns over problems',
    text: 'Interviewers reuse a small set of patterns. Recognize them and you can solve unseen problems quickly.',
  },
  {
    icon: Repeat,
    title: 'Spaced repetition',
    text: 'Revisit solved problems after 1, 7, and 30 days. Recall beats re-reading every time.',
  },
  {
    icon: Mic,
    title: 'Think out loud',
    text: 'Communication is graded. Practice narrating your approach, trade-offs, and complexity.',
  },
  {
    icon: BookOpen,
    title: 'Depth in fundamentals',
    text: 'OS, DBMS, and networks separate good candidates from great ones in senior rounds.',
  },
]

export default function About() {
  return (
    <div className="container-page py-14">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">About this platform</h1>
        <p className="mt-4 text-lg text-slate-600">
          <strong>Impact Analytics</strong> is a free, structured study hub that brings together
          every topic a modern software engineering interview tests. Instead of jumping between
          scattered blogs and playlists, you get one organized roadmap — from your first array
          problem to a full system design walkthrough.
        </p>
        <p className="mt-4 text-slate-600">
          Each module distills the essentials: the topics to master, the high-frequency questions to
          rehearse, and the best free resources to go deeper. The content is curated from
          industry-standard references like the Tech Interview Handbook, NeetCode, the System Design
          Primer, and Refactoring Guru.
        </p>
      </div>

      <h2 className="mt-14 text-2xl font-bold text-slate-900">How to use it well</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {principles.map((p) => (
          <div key={p.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <p.icon size={22} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">{p.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{p.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 flex flex-col items-start gap-4 rounded-2xl border border-brand-100 bg-brand-50 p-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Ready to begin?</h3>
          <p className="mt-1 text-slate-600">Browse the modules or follow the guided roadmap.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/modules" className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700">
            Modules <ArrowRight size={16} />
          </Link>
          <Link to="/roadmap" className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-brand-300">
            Roadmap
          </Link>
        </div>
      </div>
    </div>
  )
}
