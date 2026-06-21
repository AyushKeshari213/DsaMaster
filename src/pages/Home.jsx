import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Sparkles, Target, Trophy, Map } from 'lucide-react'
import { modules } from '../data/modules.js'
import ModuleCard from '../components/ModuleCard.jsx'

const stats = [
  { value: '10', label: 'Focused Modules' },
  { value: '440+', label: 'Hours of Content' },
  { value: '8', label: 'Week Roadmap' },
  { value: '100%', label: 'Free Forever' },
]

const features = [
  {
    icon: Target,
    title: 'Pattern-based learning',
    text: 'Stop grinding random problems. Learn the recurring patterns that unlock entire categories of questions.',
  },
  {
    icon: Map,
    title: 'Structured roadmap',
    text: 'An 8-week plan that sequences topics the way real candidates should learn them.',
  },
  {
    icon: Trophy,
    title: 'End-to-end coverage',
    text: 'DSA, system design, LLD, CS fundamentals, and behavioral — everything an interview tests.',
  },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-brand-50">
        <div className="container-page grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-semibold text-brand-700">
              <Sparkles size={14} /> Python-first interview prep
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Crack <span className="text-brand-600">any</span> tech interview.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600">
              One platform with every module you need — Data Structures &amp; Algorithms, System
              Design, Low-Level Design, CS fundamentals, and behavioral rounds. Every solution is
              written in clean <strong>Python</strong>. Learn the patterns, solve the problems, get the offer.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/practice"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
              >
                Start Solving in Python <ArrowRight size={18} />
              </Link>
              <Link
                to="/modules"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-600"
              >
                Explore Modules
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
              {['100% Python solutions', 'Progress tracking', 'Beginner to advanced'].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-500" /> {t}
                </span>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-up">
            <div className="grid grid-cols-2 gap-4">
              {modules.slice(0, 4).map((m, i) => (
                <Link
                  key={m.slug}
                  to={`/modules/${m.slug}`}
                  className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md ${
                    i % 2 ? 'translate-y-6' : ''
                  }`}
                >
                  <div className={`mb-3 h-10 w-10 rounded-lg bg-gradient-to-br ${m.color}`} />
                  <p className="text-sm font-bold text-slate-900">{m.short}</p>
                  <p className="mt-1 text-xs text-slate-500">{m.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-200 bg-white">
        <div className="container-page grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-extrabold text-brand-600">{s.value}</p>
              <p className="mt-1 text-sm text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container-page py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            A smarter way to prepare
          </h2>
          <p className="mt-3 text-slate-600">
            Built around how top engineers actually study — patterns, structure, and depth.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <f.icon size={24} />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modules preview */}
      <section className="container-page pb-20">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Explore the modules</h2>
            <p className="mt-2 text-slate-600">Everything you need, organized by topic.</p>
          </div>
          <Link to="/modules" className="hidden items-center gap-1 text-sm font-semibold text-brand-600 sm:inline-flex">
            View all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modules.slice(0, 6).map((m) => (
            <ModuleCard key={m.slug} module={m} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-24">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-indigo-700 px-8 py-14 text-center shadow-lg">
          <h2 className="text-3xl font-extrabold text-white">Ready to land your dream offer?</h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-100">
            Follow the structured roadmap and work through each module. Consistency beats intensity.
          </p>
          <Link
            to="/roadmap"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
          >
            Start the Roadmap <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
