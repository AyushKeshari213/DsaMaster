// Registry of DSA practice topics. New topics (linked lists, trees, ...) plug in here.
import { arrays } from './arrays.js'

export const problemTopics = [
  {
    slug: 'arrays',
    title: 'Arrays & Hashing',
    moduleSlug: 'dsa',
    description:
      'The foundation of coding interviews. Master two pointers, sliding window, prefix sums, hashing, and matrix manipulation — all in Python.',
    status: 'available',
    problems: arrays,
  },
  // Upcoming topics will be added here as we progress, one by one.
  { slug: 'strings', title: 'Strings', moduleSlug: 'dsa', description: 'Coming next.', status: 'coming-soon', problems: [] },
  { slug: 'linked-list', title: 'Linked Lists', moduleSlug: 'dsa', description: 'Coming soon.', status: 'coming-soon', problems: [] },
  { slug: 'stack', title: 'Stacks & Queues', moduleSlug: 'dsa', description: 'Coming soon.', status: 'coming-soon', problems: [] },
  { slug: 'trees', title: 'Trees & Tries', moduleSlug: 'dsa', description: 'Coming soon.', status: 'coming-soon', problems: [] },
  { slug: 'graphs', title: 'Graphs', moduleSlug: 'dsa', description: 'Coming soon.', status: 'coming-soon', problems: [] },
  { slug: 'dp', title: 'Dynamic Programming', moduleSlug: 'dsa', description: 'Coming soon.', status: 'coming-soon', problems: [] },
]

export const getTopic = (slug) => problemTopics.find((t) => t.slug === slug)

export const getProblem = (topicSlug, problemSlug) => {
  const topic = getTopic(topicSlug)
  if (!topic) return { topic: null, problem: null }
  const problem = topic.problems.find((p) => p.slug === problemSlug) || null
  return { topic, problem }
}

// Stable unique id used for progress tracking in localStorage.
export const problemId = (topicSlug, problemSlug) => `${topicSlug}/${problemSlug}`
