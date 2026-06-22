// Central content store for all interview-prep modules.
// Each module powers both the catalog card and its detail page.

export const modules = [
  {
    slug: 'dsa',
    title: 'Data Structures & Algorithms',
    short: 'DSA',
    icon: 'Binary',
    color: 'from-blue-500 to-indigo-600',
    tagline: 'The backbone of every coding interview.',
    summary:
      'Master patterns over memorization. Learn the core data structures, algorithmic paradigms, and the recurring problem patterns that 80% of interview questions are built from — every solution written in Python.',
    difficulty: 'Core',
    estimatedHours: 120,
    practiceTopic: 'arrays',
    topics: [
      {
        name: 'Arrays & Strings',
        points: [
          'Two pointers, sliding window, prefix sums',
          'In-place manipulation and Kadane’s algorithm',
          'Hashing for O(1) lookups',
        ],
      },
      {
        name: 'Linked Lists',
        points: ['Fast/slow pointers', 'Reversal & cycle detection', 'Merge & partition patterns'],
      },
      {
        name: 'Stacks & Queues',
        points: ['Monotonic stack', 'Next greater element', 'Queue via stacks & deque tricks'],
      },
      {
        name: 'Trees & Tries',
        points: ['DFS/BFS traversals', 'BST operations & balancing', 'Trie for prefix problems'],
      },
      {
        name: 'Graphs',
        points: ['BFS/DFS, topological sort', 'Dijkstra, Bellman-Ford, Union-Find', 'Cycle detection in directed/undirected graphs'],
      },
      {
        name: 'Dynamic Programming',
        points: ['1D/2D DP, knapsack', 'LIS, LCS, edit distance', 'Memoization vs tabulation'],
      },
      {
        name: 'Recursion & Backtracking',
        points: ['Subsets, permutations, combinations', 'N-Queens, Sudoku solver', 'Pruning the search space'],
      },
      {
        name: 'Greedy & Heaps',
        points: ['Interval scheduling', 'Top-K with priority queues', 'Exchange argument proofs'],
      },
    ],
    patterns: [
      'Sliding Window',
      'Two Pointers',
      'Fast & Slow Pointers',
      'Merge Intervals',
      'Cyclic Sort',
      'Tree BFS/DFS',
      'Topological Sort',
      'Binary Search on Answer',
      '0/1 Knapsack',
      'Backtracking',
    ],
    resources: [
      { label: 'NeetCode 150', url: 'https://neetcode.io/practice' },
      { label: 'LeetCode', url: 'https://leetcode.com/' },
      { label: 'Tech Interview Handbook – Algorithms', url: 'https://www.techinterviewhandbook.org/algorithms/study-cheatsheet/' },
      { label: 'VisuAlgo (visualizations)', url: 'https://visualgo.net/en' },
    ],
  },
  {
    slug: 'system-design',
    title: 'System Design (HLD)',
    short: 'System Design',
    icon: 'Network',
    color: 'from-emerald-500 to-teal-600',
    tagline: 'Design systems that scale to millions.',
    summary:
      'High-level design for senior and mid-level rounds. Learn to reason about trade-offs, estimate capacity, and communicate architecture clearly under time pressure.',
    difficulty: 'Advanced',
    estimatedHours: 80,
    topics: [
      {
        name: 'Fundamentals',
        points: ['Scalability, availability, reliability', 'Latency vs throughput', 'CAP theorem & PACELC'],
        lessons: [
          {
            term: 'Scalability',
            definition:
              "A system is scalable if it can handle increased load by adding resources, with performance growing in proportion to the resources added. A performance problem means the system is slow for a single user; a scalability problem means it's fast for one user but degrades under heavy load.",
            points: [
              'Vertical scaling (scale up): add more CPU/RAM to one machine — simple, but has a hard ceiling and is a single point of failure.',
              'Horizontal scaling (scale out): add more machines behind a load balancer — near-unlimited, but adds coordination complexity.',
              'Horizontal scaling requires stateless services: keep session/user state in Redis or a database so any server can handle any request.',
            ],
          },
          {
            term: 'Availability',
            definition:
              'The percentage of time a system is operational and able to respond to requests, usually expressed in "nines". It answers the question: "Is the system up right now?" High availability comes from redundancy, failover, and health checks.',
            points: [
              '99% = "two nines" ≈ 3.65 days of downtime/year; 99.9% ≈ 8.76 hours; 99.99% ≈ 52.6 minutes; 99.999% ≈ 5.26 minutes.',
              'Each extra nine gets exponentially harder and more expensive to achieve.',
              'Patterns: active-passive failover (standby takes over on heartbeat loss) and active-active (both nodes serve traffic).',
            ],
          },
          {
            term: 'Reliability',
            definition:
              'The probability that a system performs correctly during a given period — it answers "When the system is up, does it behave correctly?" Reliability is distinct from availability: a system can be available (always responding) yet unreliable (returning wrong answers).',
            points: [
              'Availability = uptime; Reliability = correctness. You want both, but they need different solutions.',
              'Availability is improved with redundancy and failover; reliability with testing, idempotency, data validation, and circuit breakers.',
              'A reliable system stays correct even under failures, retries, and concurrent access.',
            ],
          },
          {
            term: 'Latency vs Throughput',
            definition:
              'Latency is how long a single request takes (measured in milliseconds). Throughput is how many requests the system handles per unit time (requests/second, QPS). They are related but independent — aim for maximal throughput at an acceptable latency.',
            points: [
              'You can have high throughput with high latency (batch systems) or low latency with low throughput (single-threaded server).',
              'Measure latency with percentiles (p50, p95, p99), not just averages — tail latency is what users feel.',
              'Rough costs: same-datacenter call ≈ 1ms; cross-region call ≈ 100-150ms. Topology decisions follow from this.',
            ],
          },
          {
            term: 'CAP Theorem',
            definition:
              'Proved by Gilbert & Lynch (2002): during a network partition, a distributed data store must choose between Consistency (every read returns the most recent write — i.e. linearizability) and Availability (every request to a non-failed node gets a non-error response). Partition tolerance is not optional — networks always partition — so the real choice during a partition is C or A.',
            points: [
              'CP systems (e.g. ZooKeeper, etcd, Spanner) reject requests during a partition to avoid stale data — pick for banking, inventory, locks.',
              'AP systems (e.g. Cassandra, DynamoDB, Riak) keep serving possibly-stale data — pick for feeds, shopping carts, content.',
              '"Pick 2 of 3" is a myth: CAP only constrains behavior during a partition, and it applies per-operation on replicated data, not to the whole system.',
            ],
          },
          {
            term: 'PACELC',
            definition:
              'Daniel Abadi\'s 2010 extension of CAP (pronounced "pass-elk"): if there is a Partition (P), trade off Availability and Consistency (A/C); Else (E), in normal operation, trade off Latency and Consistency (L/C). It captures the everyday trade-off CAP ignores — stronger consistency forces replica coordination, which costs latency.',
            points: [
              'Four classifications: PA/EL, PA/EC, PC/EL, PC/EC.',
              'Most internet-scale systems are PA/EL (e.g. Cassandra, Dynamo): available under partition, low-latency otherwise.',
              'Most financial systems are PC/EC (e.g. Spanner): consistent always, accepting higher latency.',
              'The ELC half matters most day-to-day, since partitions are rare and the system is usually in "E" mode.',
            ],
          },
        ],
      },
      {
        name: 'Building Blocks',
        points: ['Load balancers & reverse proxies', 'Caching (CDN, Redis, write-through/back)', 'Message queues (Kafka, SQS)'],
      },
      {
        name: 'Databases',
        points: ['SQL vs NoSQL trade-offs', 'Sharding, replication, partitioning', 'Indexing & consistency models'],
      },
      {
        name: 'Communication',
        points: ['REST, gRPC, GraphQL', 'WebSockets & long polling', 'Idempotency & retries'],
      },
      {
        name: 'Scaling Patterns',
        points: ['Horizontal vs vertical scaling', 'Rate limiting & backpressure', 'Consistent hashing'],
      },
      {
        name: 'Observability',
        points: ['Logging, metrics, tracing', 'Health checks & circuit breakers', 'SLA/SLO/SLI'],
      },
    ],
    patterns: [
      'Design a URL Shortener',
      'Design a Rate Limiter',
      'Design Twitter/News Feed',
      'Design a Chat System (WhatsApp)',
      'Design YouTube/Netflix',
      'Design a Web Crawler',
      'Design Uber/Lyft',
      'Design a Notification System',
    ],
    resources: [
      { label: 'Tech Interview Handbook – System Design', url: 'https://www.techinterviewhandbook.org/system-design/' },
      { label: 'System Design Primer (GitHub)', url: 'https://github.com/donnemartin/system-design-primer' },
      { label: 'ByteByteGo', url: 'https://bytebytego.com/' },
      { label: 'High Scalability', url: 'http://highscalability.com/' },
    ],
  },
  {
    slug: 'lld',
    title: 'Low Level Design & OOP',
    short: 'LLD',
    icon: 'Boxes',
    color: 'from-orange-500 to-amber-600',
    tagline: 'Clean, extensible, object-oriented code.',
    summary:
      'Translate requirements into well-structured classes. Master SOLID principles, design patterns, and modelling real-world systems with maintainable abstractions.',
    difficulty: 'Intermediate',
    estimatedHours: 50,
    topics: [
      {
        name: 'OOP Pillars',
        points: ['Encapsulation, abstraction', 'Inheritance vs composition', 'Polymorphism in practice'],
        lessons: [
          {
            term: 'Encapsulation',
            definition:
              'Bundling data (state) and the methods that operate on it into a single unit (a class), while restricting direct access to the internal state. Callers interact only through a controlled public interface, so the object protects its own invariants.',
            points: [
              'Hide fields with access modifiers (private/protected) and expose behavior via methods/getters/setters.',
              'Lets you change the internal implementation without breaking callers — reduces coupling.',
              'Keeps invalid states unreachable by validating inside setters/methods.',
            ],
          },
          {
            term: 'Abstraction',
            definition:
              'Exposing only the essential features of an object while hiding the underlying complexity. You model "what" something does, not "how" it does it, usually through abstract classes or interfaces.',
            points: [
              'Encapsulation hides data; abstraction hides implementation complexity behind a simpler contract.',
              'Program to an interface (e.g. a PaymentGateway) so concrete implementations can be swapped freely.',
              'Reduces cognitive load: callers depend on a small, stable surface.',
            ],
          },
          {
            term: 'Inheritance',
            definition:
              'A mechanism where a child class derives state and behavior from a parent class, modeling an "is-a" relationship (a Dog is an Animal). It promotes code reuse and lets subclasses extend or override base behavior.',
            points: [
              'Use only for genuine "is-a" relationships, not just to reuse code.',
              'Deep hierarchies become rigid and fragile (the "fragile base class" problem).',
              'Overriding lets a subclass replace a base method while keeping the same interface.',
            ],
          },
          {
            term: 'Inheritance vs Composition',
            definition:
              'Composition builds objects by combining other objects ("has-a"), delegating work to them, instead of inheriting from a base class. The principle "favor composition over inheritance" leads to more flexible, loosely-coupled designs.',
            points: [
              'Inheritance = "is-a" (Car is a Vehicle); Composition = "has-a" (Car has an Engine).',
              'Composition can be changed at runtime by swapping the contained object; inheritance is fixed at compile time.',
              'Prefer composition when you only need behavior reuse, to avoid tight coupling to a base class.',
            ],
          },
          {
            term: 'Polymorphism',
            definition:
              'The ability of different types to be treated through a common interface, where the same call resolves to type-specific behavior. "One interface, many implementations."',
            points: [
              'Runtime (dynamic) polymorphism: method overriding resolved via dynamic dispatch (virtual methods/vtables).',
              'Compile-time (static) polymorphism: method overloading and generics/templates.',
              'Enables open/closed design — add new types without changing the code that uses the common interface.',
            ],
          },
        ],
      },
      {
        name: 'SOLID Principles',
        points: ['Single responsibility & open/closed', 'Liskov substitution', 'Interface segregation & dependency inversion'],
      },
      {
        name: 'Design Patterns',
        points: ['Creational: Factory, Builder, Singleton', 'Structural: Adapter, Decorator, Facade', 'Behavioral: Strategy, Observer, State'],
      },
      {
        name: 'Modelling Practice',
        points: ['UML class & sequence diagrams', 'Identifying entities & relationships', 'Concurrency-safe design'],
      },
    ],
    patterns: [
      'Design a Parking Lot',
      'Design an Elevator System',
      'Design a Vending Machine',
      'Design a Splitwise',
      'Design a Tic-Tac-Toe / Chess',
      'Design a Logging Framework',
      'Design BookMyShow',
    ],
    resources: [
      { label: 'Refactoring Guru – Design Patterns', url: 'https://refactoring.guru/design-patterns' },
      { label: 'Low Level Design Primer (GitHub)', url: 'https://github.com/prasadgujar/low-level-design-primer' },
      { label: 'Grokking the OOD Interview', url: 'https://www.educative.io/courses/grokking-the-object-oriented-design-interview' },
    ],
  },
  {
    slug: 'oops',
    title: 'OOP & Language Concepts',
    short: 'OOP',
    icon: 'Code2',
    color: 'from-fuchsia-500 to-pink-600',
    tagline: 'Core programming language theory.',
    summary:
      'Conceptual questions that show up in every round — memory management, language internals, and the theory behind the code you write daily.',
    difficulty: 'Core',
    estimatedHours: 25,
    topics: [
      {
        name: 'Object-Oriented Concepts',
        points: ['Classes, objects, constructors', 'Static vs instance members', 'Abstract classes vs interfaces'],
      },
      {
        name: 'Memory & Runtime',
        points: ['Stack vs heap', 'Garbage collection', 'Pass by value vs reference'],
      },
      {
        name: 'Language Internals',
        points: ['Compilation vs interpretation', 'Generics / templates', 'Exception handling models'],
      },
    ],
    patterns: [
      'Difference between overloading & overriding',
      'Explain virtual functions / vtables',
      'How does garbage collection work?',
      'Deep copy vs shallow copy',
      'What is immutability and why use it?',
    ],
    resources: [
      { label: 'GeeksforGeeks – OOP', url: 'https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/' },
      { label: 'InterviewBit – OOP', url: 'https://www.interviewbit.com/oops-interview-questions/' },
    ],
  },
  {
    slug: 'dbms',
    title: 'Databases & SQL',
    short: 'DBMS',
    icon: 'Database',
    color: 'from-cyan-500 to-blue-600',
    tagline: 'Model, query, and optimize data.',
    summary:
      'From writing efficient SQL to understanding transactions and indexing. A must-know for backend, data, and full-stack roles.',
    difficulty: 'Core',
    estimatedHours: 35,
    topics: [
      {
        name: 'SQL Mastery',
        points: ['Joins, subqueries, CTEs', 'Window functions & aggregations', 'Group by, having, ranking'],
      },
      {
        name: 'Database Design',
        points: ['Normalization (1NF–BCNF)', 'ER modelling & keys', 'Denormalization trade-offs'],
      },
      {
        name: 'Transactions',
        points: ['ACID properties', 'Isolation levels & locking', 'Deadlocks & concurrency control'],
      },
      {
        name: 'Performance',
        points: ['Indexing (B-Tree, hash)', 'Query plans & EXPLAIN', 'Caching & read replicas'],
      },
    ],
    patterns: [
      'Write a query for Nth highest salary',
      'Explain ACID with examples',
      'When would you denormalize?',
      'Clustered vs non-clustered index',
      'Optimistic vs pessimistic locking',
    ],
    resources: [
      { label: 'SQLZoo', url: 'https://sqlzoo.net/' },
      { label: 'LeetCode Database', url: 'https://leetcode.com/studyplan/top-sql-50/' },
      { label: 'Use The Index, Luke', url: 'https://use-the-index-luke.com/' },
    ],
  },
  {
    slug: 'os',
    title: 'Operating Systems',
    short: 'OS',
    icon: 'Cpu',
    color: 'from-violet-500 to-purple-600',
    tagline: 'How software talks to hardware.',
    summary:
      'Concurrency, memory, and scheduling fundamentals frequently tested at product-based companies and core engineering roles.',
    difficulty: 'Core',
    estimatedHours: 30,
    topics: [
      {
        name: 'Processes & Threads',
        points: ['Process lifecycle & context switching', 'Threads vs processes', 'IPC mechanisms'],
      },
      {
        name: 'Concurrency',
        points: ['Mutex, semaphore, monitors', 'Deadlock: detection & prevention', 'Producer-consumer & readers-writers'],
      },
      {
        name: 'Memory Management',
        points: ['Paging & segmentation', 'Virtual memory & TLB', 'Page replacement algorithms'],
      },
      {
        name: 'Scheduling',
        points: ['FCFS, SJF, round-robin', 'Priority scheduling', 'CPU vs I/O bound processes'],
      },
    ],
    patterns: [
      'Explain the difference between a process and a thread',
      'How does a deadlock occur and how to prevent it?',
      'What is virtual memory?',
      'Compare scheduling algorithms',
      'Explain the dining philosophers problem',
    ],
    resources: [
      { label: 'OSTEP (free book)', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/' },
      { label: 'GeeksforGeeks – OS', url: 'https://www.geeksforgeeks.org/operating-systems/' },
    ],
  },
  {
    slug: 'networks',
    title: 'Computer Networks',
    short: 'Networks',
    icon: 'Globe',
    color: 'from-sky-500 to-cyan-600',
    tagline: 'What happens when you hit enter on a URL.',
    summary:
      'The protocols and layers powering the internet. Essential for backend, infra, and full-stack interviews.',
    difficulty: 'Core',
    estimatedHours: 25,
    topics: [
      {
        name: 'OSI & TCP/IP',
        points: ['7 layers & their roles', 'Encapsulation', 'TCP/IP model mapping'],
      },
      {
        name: 'Transport Layer',
        points: ['TCP vs UDP', '3-way handshake', 'Flow & congestion control'],
      },
      {
        name: 'Application Layer',
        points: ['HTTP/HTTPS & HTTP/2,3', 'DNS resolution', 'TLS/SSL handshake'],
      },
      {
        name: 'Networking Basics',
        points: ['IP addressing & subnetting', 'NAT, DHCP, ARP', 'Routing & switching'],
      },
    ],
    patterns: [
      'What happens when you type a URL and hit enter?',
      'TCP vs UDP – when to use which?',
      'Explain the TLS handshake',
      'How does DNS resolution work?',
      'What is the difference between HTTP and HTTPS?',
    ],
    resources: [
      { label: 'Computer Networking: A Top-Down Approach', url: 'https://gaia.cs.umass.edu/kurose_ross/index.php' },
      { label: 'High Performance Browser Networking', url: 'https://hpbn.co/' },
    ],
  },
  {
    slug: 'behavioral',
    title: 'Behavioral & HR',
    short: 'Behavioral',
    icon: 'Users',
    color: 'from-rose-500 to-red-600',
    tagline: 'Tell your story like a senior engineer.',
    summary:
      'Technical skill gets you in the room; communication gets you the offer. Structure your experiences and answer leadership questions with confidence.',
    difficulty: 'Essential',
    estimatedHours: 15,
    topics: [
      {
        name: 'The STAR Method',
        points: ['Situation, Task, Action, Result', 'Quantify your impact', 'Keep answers under 2 minutes'],
      },
      {
        name: 'Common Themes',
        points: ['Conflict & disagreement', 'Failure & learning', 'Leadership & ownership'],
      },
      {
        name: 'Company Values',
        points: ['Amazon Leadership Principles', 'Researching company culture', 'Asking great questions'],
      },
      {
        name: 'Communication',
        points: ['Clarifying ambiguous questions', 'Thinking out loud', 'Handling stress gracefully'],
      },
    ],
    patterns: [
      'Tell me about yourself',
      'Describe a time you faced a conflict',
      'Tell me about a project you’re proud of',
      'A time you failed and what you learned',
      'Why do you want to work here?',
    ],
    resources: [
      { label: 'Tech Interview Handbook – Behavioral', url: 'https://www.techinterviewhandbook.org/behavioral-interview/' },
      { label: 'Amazon Leadership Principles', url: 'https://www.amazon.jobs/content/en/our-workplace/leadership-principles' },
    ],
  },
  {
    slug: 'frontend',
    title: 'Frontend & Web',
    short: 'Frontend',
    icon: 'Layout',
    color: 'from-pink-500 to-rose-600',
    tagline: 'Build fast, accessible interfaces.',
    summary:
      'For frontend and full-stack roles: JavaScript internals, browser behavior, framework concepts, and performance optimization.',
    difficulty: 'Specialized',
    estimatedHours: 40,
    topics: [
      {
        name: 'JavaScript Core',
        points: ['Closures, hoisting, this', 'Event loop & microtasks', 'Promises & async/await'],
      },
      {
        name: 'Browser & DOM',
        points: ['Rendering & reflow/repaint', 'Event delegation & bubbling', 'Storage: cookies, local, session'],
      },
      {
        name: 'Frameworks',
        points: ['React reconciliation & hooks', 'State management', 'Component design patterns'],
      },
      {
        name: 'Performance & Web',
        points: ['Critical rendering path', 'Lazy loading & code splitting', 'Accessibility (a11y) & SEO'],
      },
    ],
    patterns: [
      'Explain the JavaScript event loop',
      'Difference between debounce and throttle',
      'How does React’s virtual DOM work?',
      'Implement a custom hook / debounce',
      'CORS – what and why?',
    ],
    resources: [
      { label: 'JavaScript.info', url: 'https://javascript.info/' },
      { label: 'Frontend Interview Handbook', url: 'https://www.frontendinterviewhandbook.com/' },
      { label: 'GreatFrontEnd', url: 'https://www.greatfrontend.com/' },
    ],
  },
  {
    slug: 'aptitude',
    title: 'Aptitude & Puzzles',
    short: 'Aptitude',
    icon: 'Brain',
    color: 'from-lime-500 to-green-600',
    tagline: 'Ace the screening rounds.',
    summary:
      'Quantitative aptitude, logical reasoning, and classic puzzles that appear in early screening rounds and consulting interviews.',
    difficulty: 'Essential',
    estimatedHours: 20,
    topics: [
      {
        name: 'Quantitative',
        points: ['Percentages, ratios, averages', 'Time, speed & work', 'Probability & permutations'],
      },
      {
        name: 'Logical Reasoning',
        points: ['Series & pattern recognition', 'Blood relations & seating', 'Syllogisms'],
      },
      {
        name: 'Puzzles',
        points: ['Weighing & measuring puzzles', 'River crossing & bridge', 'Estimation (Fermi) problems'],
      },
    ],
    patterns: [
      '100 prisoners and light bulbs',
      'Cross the bridge in 17 minutes',
      'Weigh 8 balls to find the heavy one',
      'How many golf balls fit in a bus?',
      'Probability of two people sharing a birthday',
    ],
    resources: [
      { label: 'IndiaBix Aptitude', url: 'https://www.indiabix.com/aptitude/questions-and-answers/' },
      { label: 'GeeksforGeeks Puzzles', url: 'https://www.geeksforgeeks.org/puzzles/' },
    ],
  },
]

export const getModule = (slug) => modules.find((m) => m.slug === slug)
