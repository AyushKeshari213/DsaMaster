import { useEffect, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'
import { oneDark } from '@codemirror/theme-one-dark'
import { Play, RotateCcw, Eye, Loader2, Terminal, FlaskConical } from 'lucide-react'
import { usePyodide } from '../hooks/usePyodide.js'

export default function CodeEditor({ starterCode, solutionCode, testCode, storageKey }) {
  const [code, setCode] = useState(starterCode)
  const [output, setOutput] = useState('')
  const [running, setRunning] = useState(false)
  const { status, run } = usePyodide()

  // Restore any previously saved attempt for this problem.
  useEffect(() => {
    if (!storageKey) return
    const saved = localStorage.getItem(storageKey)
    setCode(saved != null ? saved : starterCode)
    setOutput('')
  }, [storageKey, starterCode])

  const update = (value) => {
    setCode(value)
    if (storageKey) {
      try {
        localStorage.setItem(storageKey, value)
      } catch {
        /* ignore storage errors */
      }
    }
  }

  const handleRun = async () => {
    setRunning(true)
    setOutput('Running…')
    const res = await run(code)
    setOutput(res.output.trim() || (res.ok ? '(ran successfully — no output)' : 'Error'))
    setRunning(false)
  }

  const handleRunTests = async () => {
    setRunning(true)
    setOutput('Running tests…')
    const res = await run(`${code}\n\n${testCode}`)
    setOutput(res.output.trim() || 'No test output.')
    setRunning(false)
  }

  const handleReset = () => {
    update(starterCode)
    setOutput('')
  }

  const handleLoadSolution = () => {
    update(solutionCode)
    setOutput('')
  }

  const loading = status === 'loading' || running

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 px-4 py-2.5">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <Terminal size={15} /> Python IDE
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            <RotateCcw size={14} /> Reset
          </button>
          <button
            onClick={handleLoadSolution}
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            <Eye size={14} /> Load solution
          </button>
          <button
            onClick={handleRun}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-600 px-3.5 py-1.5 text-xs font-semibold text-slate-100 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
            Run
          </button>
          {testCode && (
            <button
              onClick={handleRunTests}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : <FlaskConical size={14} />}
              {status === 'loading' ? 'Loading Python…' : 'Run Tests'}
            </button>
          )}
        </div>
      </div>

      {/* Editor */}
      <CodeMirror
        value={code}
        height="320px"
        theme={oneDark}
        extensions={[python()]}
        onChange={update}
        basicSetup={{ lineNumbers: true, highlightActiveLine: true, tabSize: 4 }}
      />

      {/* Output */}
      <div className="border-t border-slate-700">
        <div className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-400">
          Output
        </div>
        <pre className="max-h-56 overflow-auto px-4 pb-4 font-mono text-sm leading-relaxed text-slate-100">
          {output ? (
            output.split('\n').map((line, i) => {
              const isPass = /\bPASS\b/.test(line) || /tests passed/.test(line)
              const isFail = /\b(FAIL|ERROR)\b/.test(line) || /(Error|Traceback|Exception)/.test(line)
              return (
                <div
                  key={i}
                  className={isPass ? 'text-emerald-400' : isFail ? 'text-rose-400' : undefined}
                >
                  {line || ' '}
                </div>
              )
            })
          ) : (
            <span className="text-slate-500">Run your code to see the output here.</span>
          )}
        </pre>
      </div>

      {status === 'idle' && (
        <p className="border-t border-slate-700 px-4 py-2 text-[11px] text-slate-500">
          The Python runtime (~10MB) loads in your browser the first time you press Run.
        </p>
      )}
    </div>
  )
}
