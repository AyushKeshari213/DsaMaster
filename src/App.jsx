import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Home from './pages/Home.jsx'
import Modules from './pages/Modules.jsx'
import ModuleDetail from './pages/ModuleDetail.jsx'
import Roadmap from './pages/Roadmap.jsx'
import About from './pages/About.jsx'
import Practice from './pages/Practice.jsx'
import TopicProblems from './pages/TopicProblems.jsx'
import ProblemSolution from './pages/ProblemSolution.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/modules/:slug" element={<ModuleDetail />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/practice/:topic" element={<TopicProblems />} />
          <Route path="/practice/:topic/:slug" element={<ProblemSolution />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
