# CrackTheInterview

A free, modern, single-page web app that brings together **every module needed to crack a software engineering interview** — DSA, System Design, Low-Level Design, CS fundamentals (OS, DBMS, Networks), Frontend, Behavioral, and Aptitude.

Built with **React + Vite + Tailwind CSS** and **react-router**.

## Features

- **10 focused modules**, each with topics, high-frequency questions, and curated free resources.
- **8-week structured roadmap** that sequences topics from fundamentals to design rounds.
- **Search & filter** modules by difficulty.
- Fully responsive, accessible, animated UI.

## Modules included

| Module | Focus |
| --- | --- |
| Data Structures & Algorithms | Patterns, paradigms, problem solving |
| System Design (HLD) | Scalability, building blocks, case studies |
| Low Level Design & OOP | SOLID, design patterns, modelling |
| OOP & Language Concepts | Memory, runtime, language internals |
| Databases & SQL | Queries, design, transactions, indexing |
| Operating Systems | Concurrency, memory, scheduling |
| Computer Networks | OSI/TCP-IP, HTTP, DNS, TLS |
| Behavioral & HR | STAR method, leadership, communication |
| Frontend & Web | JS internals, browser, frameworks |
| Aptitude & Puzzles | Quant, logical reasoning, puzzles |

## Getting started

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# build for production
npm run build

# preview the production build
npm run preview
```

The dev server runs at `http://localhost:5173`.

## Project structure

```
src/
  components/   # Navbar, Footer, ModuleCard, icons
  data/         # modules.js (content) + roadmap.js
  pages/        # Home, Modules, ModuleDetail, Roadmap, About, NotFound
  App.jsx       # routes
  main.jsx      # entry
```

## Customizing content

All module content lives in `src/data/modules.js`. Add or edit a module object (slug, topics, patterns, resources) and it automatically appears across the catalog, detail pages, and roadmap.
