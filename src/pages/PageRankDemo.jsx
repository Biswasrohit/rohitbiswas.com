import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageRankVisualization from '../components/pagerank/PageRankVisualization';
import GlassCard from '../components/ui/GlassCard';
import { useTheme } from '../hooks/useTheme';

/**
 * PageRankDemo page - Full-page demo with navigation, PDF download, and explanation
 */
const PageRankDemo = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-nav border-b border-zinc-200/50 dark:border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Back to portfolio */}
          <Link
            to="/"
            className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-olive-500 dark:hover:text-olive-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Back to Portfolio</span>
          </Link>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-olive-500 dark:hover:text-olive-400 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Download PDF */}
            <a
              href="/assets/PageRank_MarkovChains_RohitBiswas.pdf"
              download
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="hidden sm:inline">Paper (PDF)</span>
            </a>

            {/* GitHub link */}
            <a
              href="https://github.com/Biswasrohit"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-olive-500 text-white hover:bg-olive-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Main Visualization */}
      <PageRankVisualization embedded />

      {/* Brief Explanation Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <GlassCard className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              What is PageRank?
            </h2>

            <div className="prose prose-zinc dark:prose-invert max-w-none space-y-4">
              <p className="text-zinc-600 dark:text-zinc-400">
                PageRank is the algorithm that revolutionized web search. Developed by Larry Page and
                Sergey Brin at Stanford in 1996, it was the foundation of Google's search engine and
                fundamentally changed how we find information online.
              </p>

              <p className="text-zinc-600 dark:text-zinc-400">
                The key insight is elegantly simple: <strong className="text-zinc-800 dark:text-zinc-200">a page is important if important pages link to it</strong>.
                This circular definition is solved using linear algebra—specifically, finding the
                stationary distribution of a Markov chain represented by the web's link structure.
              </p>

              <p className="text-zinc-600 dark:text-zinc-400">
                The "random surfer" model provides intuition: imagine someone randomly clicking links
                on the web. The PageRank of a page is the probability of finding this surfer on that
                page at any given time. The damping factor (α = 0.85) accounts for the surfer occasionally
                jumping to a random page instead of following links.
              </p>

              <div className="bg-olive-50 dark:bg-olive-900/20 border border-olive-200 dark:border-olive-800 rounded-lg p-4 mt-6">
                <h3 className="font-semibold text-olive-800 dark:text-olive-300 mb-2">
                  About This Project
                </h3>
                <p className="text-sm text-olive-700 dark:text-olive-400">
                  This interactive visualization was built as part of my research paper for MATH 2010
                  (Applied Linear Algebra). It demonstrates the mathematical concepts behind PageRank
                  including power iteration, Markov chains, and the Perron-Frobenius theorem.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/assets/PageRank_MarkovChains_RohitBiswas.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-olive-500 text-white hover:bg-olive-600 transition-colors font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Full Paper
              </a>

              <Link
                to="/#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-olive-500 hover:text-olive-500 transition-colors font-medium"
              >
                View More Projects
              </Link>
            </div>
          </motion.div>
        </GlassCard>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
          <p>Built with React, React Flow, and Framer Motion</p>
          <p className="mt-1">
            © {new Date().getFullYear()} Rohit Biswas •
            <Link to="/" className="ml-1 hover:text-olive-500 transition-colors">
              rohitbiswas.com
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PageRankDemo;
