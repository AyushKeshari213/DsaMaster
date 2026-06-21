import { useRef, useState } from 'react'

const PYODIDE_VERSION = 'v0.26.2'
const PYODIDE_BASE = `https://cdn.jsdelivr.net/pyodide/${PYODIDE_VERSION}/full/`

// Single shared loader so the ~10MB runtime downloads only once per session.
let pyodidePromise = null

// Python wrapper that compiles + runs the user's code and prints clean errors
// (a friendly SyntaxError with a caret, or a traceback limited to the user's code).
const RUNNER = `
import traceback as __tb

__src = __USER_SRC
try:
    __obj = compile(__src, "<your code>", "exec")
except SyntaxError as __e:
    print(f"SyntaxError: {__e.msg} (line {__e.lineno})")
    __line = (__e.text or "").rstrip("\\n")
    if __line:
        print("    " + __line)
        if __e.offset:
            print("    " + " " * (__e.offset - 1) + "^")
else:
    try:
        exec(__obj, {"__name__": "__main__"})
    except SystemExit:
        pass
    except BaseException as __e:
        __trace = __e.__traceback__.tb_next if __e.__traceback__ else None
        __tb.print_exception(type(__e), __e, __trace)
`

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve()
    const script = document.createElement('script')
    script.src = src
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load the Python runtime.'))
    document.head.appendChild(script)
  })
}

async function getPyodide() {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      await loadScript(PYODIDE_BASE + 'pyodide.js')
      // loadPyodide is attached to window by the script above.
      return window.loadPyodide({ indexURL: PYODIDE_BASE })
    })()
  }
  return pyodidePromise
}

export function usePyodide() {
  const [status, setStatus] = useState('idle') // idle | loading | ready | error
  const pyRef = useRef(null)

  const ensureLoaded = async () => {
    if (pyRef.current) return pyRef.current
    setStatus('loading')
    try {
      const py = await getPyodide()
      pyRef.current = py
      setStatus('ready')
      return py
    } catch (err) {
      setStatus('error')
      throw err
    }
  }

  const run = async (code) => {
    let output = ''
    let py
    try {
      py = await ensureLoaded()
    } catch {
      return { ok: false, output: 'Could not load the Python runtime. Check your connection and try again.' }
    }

    py.setStdout({ batched: (s) => { output += s + '\n' } })
    py.setStderr({ batched: (s) => { output += s + '\n' } })

    // Pass the user's source via globals to avoid escaping issues, then compile/exec
    // it ourselves so we can surface a clean error (no Pyodide internal frames).
    py.globals.set('__USER_SRC', code)
    try {
      await py.runPythonAsync(RUNNER)
      return { ok: true, output }
    } catch (err) {
      const message = (err && err.message) ? err.message : String(err)
      return { ok: false, output: output + message }
    } finally {
      py.globals.delete('__USER_SRC')
    }
  }

  return { status, run, ensureLoaded }
}
