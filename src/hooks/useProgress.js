import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'cti-progress-v1'

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function write(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    /* ignore quota / privacy errors */
  }
}

// Shared in-memory cache so multiple components stay in sync within a session.
let cache = read()
const listeners = new Set()

function broadcast() {
  for (const l of listeners) l(cache)
}

export function useProgress() {
  const [solved, setSolved] = useState(cache)

  useEffect(() => {
    const listener = (data) => setSolved({ ...data })
    listeners.add(listener)
    return () => listeners.delete(listener)
  }, [])

  const toggle = useCallback((id) => {
    cache = { ...cache, [id]: !cache[id] }
    if (!cache[id]) delete cache[id]
    write(cache)
    broadcast()
  }, [])

  const isSolved = useCallback((id) => Boolean(solved[id]), [solved])

  const countSolved = useCallback(
    (ids) => ids.reduce((acc, id) => acc + (solved[id] ? 1 : 0), 0),
    [solved],
  )

  return { solved, toggle, isSolved, countSolved }
}
