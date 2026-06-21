const styles = {
  Easy: 'bg-emerald-50 text-emerald-600',
  Medium: 'bg-amber-50 text-amber-600',
  Hard: 'bg-rose-50 text-rose-600',
}

export default function DifficultyBadge({ level }) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles[level] || 'bg-slate-100 text-slate-600'}`}>
      {level}
    </span>
  )
}
