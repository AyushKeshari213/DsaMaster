import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowLeftCircle, ArrowRightCircle, CheckCircle2, Circle, Code2, ExternalLink, Lightbulb, ListOrdered, Timer } from 'lucide-react'
import { getTopic, getProblem, problemId } from '../data/problems/index.js'
import { useProgress } from '../hooks/useProgress.js'
import DifficultyBadge from '../components/DifficultyBadge.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import CodeEditor from '../components/CodeEditor.jsx'

// Turn an example input like "nums = [2,7,11,15], target = 9" into call args "[2,7,11,15], 9".
function buildCallArgs(input) {
  if (!input) return ''
  const parts = input.split(/,\s*(?=[A-Za-z_]\w*\s*=)/)
  return parts.map((p) => p.split('=').slice(1).join('=').trim()).filter(Boolean).join(', ')
}

// Build a starter stub: keep imports + the primary function signature, blank the body, add a demo call.
function buildStarter(solution, example) {
  const lines = solution.split('\n')
  const defIdx = lines.findIndex((l) => l.startsWith('def '))
  const fnMatch = solution.match(/def\s+(\w+)\s*\(/)
  const fnName = fnMatch ? fnMatch[1] : null
  const imports = defIdx > 0 ? lines.slice(0, defIdx).filter((l) => l.trim()).join('\n') : ''
  const signature = defIdx >= 0 ? lines[defIdx] : 'def solution():'
  const head = imports ? imports + '\n\n' : ''
  const args = example ? buildCallArgs(example.input) : ''
  const demo = fnName ? `\n\n# --- Try it: edit the args and press Run ---\nprint(${fnName}(${args}))` : ''
  return `${head}${signature}\n    # Write your solution here\n    pass${demo}`
}

function buildSolutionWithDemo(solution, example) {
  const fnMatch = solution.match(/def\s+(\w+)\s*\(/)
  const fnName = fnMatch ? fnMatch[1] : null
  const args = example ? buildCallArgs(example.input) : ''
  const demo = fnName ? `\n\n# --- Run the reference solution ---\nprint(${fnName}(${args}))` : ''
  return `${solution}${demo}`
}

// Generate a Python test harness that runs the user's function against every example.
// Handles both value-returning and in-place (mutating) solutions, and matches example
// variable names to parameter names (normalizing camelCase -> snake_case).
function buildTestHarness(solution, examples) {
  const fnName = solution.match(/def\s+(\w+)\s*\(/)?.[1]
  if (!fnName || !examples || examples.length === 0) return null
  const tests = examples.map((ex) => ({
    assigns: ex.input.split(/,\s*(?=[A-Za-z_]\w*\s*=)/).join('\n'),
    expected: ex.output,
  }))
  const testsJson = JSON.stringify(tests)
  return [
    'import ast, copy, inspect, json',
    '',
    'def __norm(name):',
    '    out = ""',
    '    for ch in name:',
    '        out += ("_" + ch.lower()) if ch.isupper() else ch',
    '    return out',
    '',
    `__fn = ${fnName}`,
    '__params = list(inspect.signature(__fn).parameters.keys())',
    `__tests = json.loads(r'''${testsJson}''')`,
    '__passed = 0',
    'for __i, __t in enumerate(__tests, 1):',
    '    __ns = {}',
    '    try:',
    '        exec(__t["assigns"], {}, __ns)',
    '    except Exception as e:',
    '        print(f"Test {__i}: ERROR parsing input ({e})")',
    '        continue',
    '    __lookup = {__norm(k): v for k, v in __ns.items()}',
    '    __args = [copy.deepcopy(__lookup[__norm(p)]) for p in __params if __norm(p) in __lookup]',
    '    try:',
    '        __ret = __fn(*__args)',
    '    except Exception as e:',
    '        print(f"Test {__i}: ERROR ({e})")',
    '        continue',
    '    __actual = __ret if __ret is not None else (__args[0] if __args else None)',
    '    try:',
    '        __exp = ast.literal_eval(__t["expected"])',
    '    except Exception:',
    '        __exp = __t["expected"]',
    '    if __actual == __exp:',
    '        __passed += 1',
    '        print(f"Test {__i}: PASS  ->  {__actual}")',
    '    else:',
    '        print(f"Test {__i}: FAIL  expected {__exp}, got {__actual}")',
    'print("")',
    'print(f"{__passed}/{len(__tests)} tests passed")',
  ].join('\n')
}

export default function ProblemSolution() {
  const { topic: topicSlug, slug } = useParams()
  const topic = getTopic(topicSlug)
  const { problem } = getProblem(topicSlug, slug)
  const { isSolved, toggle } = useProgress()

  if (!topic || !problem) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Problem not found</h1>
        <Link to="/practice" className="mt-4 inline-flex items-center gap-1 text-brand-600">
          <ArrowLeft size={16} /> Back to practice
        </Link>
      </div>
    )
  }

  const id = problemId(topicSlug, slug)
  const done = isSolved(id)
  const index = topic.problems.findIndex((p) => p.slug === slug)
  const prev = index > 0 ? topic.problems[index - 1] : null
  const next = index < topic.problems.length - 1 ? topic.problems[index + 1] : null

  const example = problem.examples?.[0]
  const starterCode = buildStarter(problem.solution, example)
  const solutionCode = buildSolutionWithDemo(problem.solution, example)
  const testCode = buildTestHarness(problem.solution, problem.examples)

  return (
    <div className="container-page py-14">
      <Link to={`/practice/${topicSlug}`} className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-brand-600">
        <ArrowLeft size={16} /> {topic.title}
      </Link>

      {/* Header */}
      <div className="mt-5 flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{problem.title}</h1>
            <DifficultyBadge level={problem.difficulty} />
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-600">{problem.pattern}</span>
            {problem.leetcode && (
              <a
                href={`https://leetcode.com/problems/${problem.slug}/`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-medium text-brand-600 hover:text-brand-700"
              >
                LeetCode #{problem.leetcode} <ExternalLink size={13} />
              </a>
            )}
          </div>
        </div>
        <button
          onClick={() => toggle(id)}
          className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
            done
              ? 'bg-emerald-500 text-white hover:bg-emerald-600'
              : 'border border-slate-300 bg-white text-slate-700 hover:border-brand-300 hover:text-brand-600'
          }`}
        >
          {done ? <CheckCircle2 size={18} /> : <Circle size={18} />}
          {done ? 'Solved' : 'Mark as solved'}
        </button>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-5">
        {/* Left: problem */}
        <div className="lg:col-span-3 space-y-8">
          <section>
            <h2 className="text-lg font-bold text-slate-900">Problem</h2>
            <p className="mt-3 leading-relaxed text-slate-600">{problem.statement}</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">Examples</h2>
            <div className="mt-3 space-y-3">
              {problem.examples.map((ex, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm">
                  <p><span className="font-semibold text-slate-500">Input:</span> {ex.input}</p>
                  <p className="mt-1"><span className="font-semibold text-slate-500">Output:</span> {ex.output}</p>
                  {ex.explanation && (
                    <p className="mt-1 font-sans text-slate-500"><span className="font-semibold">Explanation:</span> {ex.explanation}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <Lightbulb size={18} className="text-amber-500" /> Approach
            </h2>
            <ol className="mt-3 space-y-2">
              {problem.approach.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-600">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-600">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* Right: solution */}
        <div className="lg:col-span-2 space-y-6">
          <section>
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <ListOrdered size={18} className="text-brand-600" /> Python Solution
            </h2>
            <div className="mt-3">
              <CodeBlock code={problem.solution} label="Python" />
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Timer size={16} className="text-slate-500" /> Complexity
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs font-medium text-slate-400">Time</p>
                <p className="mt-1 font-mono text-sm font-bold text-slate-800">{problem.complexity.time}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs font-medium text-slate-400">Space</p>
                <p className="mt-1 font-mono text-sm font-bold text-slate-800">{problem.complexity.space}</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* In-browser IDE */}
      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <Code2 size={18} className="text-emerald-600" /> Solve it yourself
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Write your solution in Python, then press <strong>Run Tests</strong> to check it against the example
          cases. Your code is saved automatically for this problem.
        </p>
        <div className="mt-4">
          <CodeEditor
            key={id}
            starterCode={starterCode}
            solutionCode={solutionCode}
            testCode={testCode}
            storageKey={`cti-code/${id}`}
          />
        </div>
      </section>

      {/* Prev / Next */}
      <div className="mt-12 flex items-center justify-between gap-4 border-t border-slate-200 pt-6">
        {prev ? (
          <Link to={`/practice/${topicSlug}/${prev.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-brand-600">
            <ArrowLeftCircle size={20} /> {prev.title}
          </Link>
        ) : <span />}
        {next ? (
          <Link to={`/practice/${topicSlug}/${next.slug}`} className="inline-flex items-center gap-2 text-right text-sm font-semibold text-slate-600 transition hover:text-brand-600">
            {next.title} <ArrowRightCircle size={20} />
          </Link>
        ) : (
          <Link to={`/practice/${topicSlug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
            Back to list <ArrowRight size={18} />
          </Link>
        )}
      </div>
    </div>
  )
}
