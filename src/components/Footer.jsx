import { Link } from 'react-router-dom'
import { Github, Heart } from 'lucide-react'
import { LogoMark } from './Logo.jsx'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="container-page grid gap-8 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <LogoMark size={30} />
            <span className="flex flex-col leading-none">
              <span className="text-base font-extrabold text-slate-900">IMPACT</span>
              <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.32em] text-slate-500">Analytics</span>
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-slate-500">
            A free, structured roadmap to crack any software engineering interview — from DSA to system design.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-900">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            <li><Link to="/modules" className="hover:text-brand-600">All Modules</Link></li>
            <li><Link to="/practice" className="hover:text-brand-600">Practice (Python)</Link></li>
            <li><Link to="/roadmap" className="hover:text-brand-600">8-Week Roadmap</Link></li>
            <li><Link to="/about" className="hover:text-brand-600">About</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-900">Resources</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            <li><a href="https://neetcode.io/practice" target="_blank" rel="noreferrer" className="hover:text-brand-600">NeetCode 150</a></li>
            <li><a href="https://www.techinterviewhandbook.org/" target="_blank" rel="noreferrer" className="hover:text-brand-600">Tech Interview Handbook</a></li>
            <li><a href="https://github.com/donnemartin/system-design-primer" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-brand-600"><Github size={14}/> System Design Primer</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-5">
        <p className="container-page flex items-center justify-center gap-1 text-center text-xs text-slate-400">
          Built with <Heart size={12} className="text-rose-500" /> for engineers preparing to level up.
        </p>
      </div>
    </footer>
  )
}
