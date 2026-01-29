import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../ui/GlassCard';

/**
 * EducationalContent component - Explains PageRank concepts
 *
 * @param {Object} props
 * @param {boolean} props.expanded - Whether panel is expanded
 * @param {Function} props.onToggle - Handler for expand/collapse
 */
const EducationalContent = ({ expanded, onToggle }) => {
  return (
    <GlassCard className="p-4" animate={false}>
      {/* Header with toggle */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left"
      >
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
          How PageRank Works
        </h3>
        <motion.svg
          animate={{ rotate: expanded ? 180 : 0 }}
          className="w-5 h-5 text-zinc-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-4">
              {/* Random Surfer */}
              <div className="p-3 bg-olive-50 dark:bg-olive-900/20 rounded-lg border border-olive-200 dark:border-olive-800">
                <h4 className="font-medium text-olive-800 dark:text-olive-300 mb-2 flex items-center gap-2">
                  <span className="text-lg">🏄</span> The Random Surfer Model
                </h4>
                <p className="text-sm text-olive-700 dark:text-olive-300">
                  Imagine a web surfer randomly clicking links. With probability <strong>α</strong> (damping factor),
                  they follow a random link on the current page. With probability <strong>1-α</strong>,
                  they get bored and jump to a completely random page.
                </p>
                <p className="text-sm text-olive-600 dark:text-olive-400 mt-2">
                  PageRank is the fraction of time this surfer spends on each page in the long run.
                </p>
              </div>

              {/* Damping Factor */}
              <div className="p-3 bg-zinc-100/80 dark:bg-zinc-800/80 rounded-lg">
                <h4 className="font-medium text-zinc-800 dark:text-zinc-200 mb-2">
                  Damping Factor (α = 0.85)
                </h4>
                <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                  <li>• <strong>Higher α</strong> → More weight on link structure, slower convergence</li>
                  <li>• <strong>Lower α</strong> → More uniform distribution, faster convergence</li>
                  <li>• <strong>α = 0.85</strong> is the industry standard (used by Google)</li>
                </ul>
              </div>

              {/* Dangling Nodes */}
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
                  <span className="text-lg">⚠️</span> Dangling Nodes
                </h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Nodes with no outgoing links (like dead-end pages). Without special handling,
                  probability would "leak" out of the system.
                </p>
                <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-2">
                  Solution: Treat dangling nodes as linking to all pages equally.
                </p>
              </div>

              {/* Power Iteration */}
              <div className="p-3 bg-zinc-100/80 dark:bg-zinc-800/80 rounded-lg">
                <h4 className="font-medium text-zinc-800 dark:text-zinc-200 mb-2">
                  Power Iteration Method
                </h4>
                <div className="text-sm text-zinc-600 dark:text-zinc-400 space-y-2">
                  <p>The algorithm finds the steady-state distribution by repeatedly multiplying:</p>
                  <p className="font-mono bg-zinc-200 dark:bg-zinc-700 px-2 py-1 rounded inline-block">
                    r<sup>(k+1)</sup> = G × r<sup>(k)</sup>
                  </p>
                  <p>Until convergence (when values stop changing significantly).</p>
                </div>
              </div>

              {/* Mathematical Foundation */}
              <div className="p-3 bg-zinc-100/80 dark:bg-zinc-800/80 rounded-lg">
                <h4 className="font-medium text-zinc-800 dark:text-zinc-200 mb-2">
                  Mathematical Foundation
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  PageRank is the <strong>stationary distribution</strong> of a Markov chain.
                  The Perron-Frobenius theorem guarantees a unique positive solution because
                  the Google matrix G is column-stochastic, irreducible, and aperiodic.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
};

export default EducationalContent;
