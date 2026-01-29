import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../ui/GlassCard';

/**
 * RankDisplay component - Shows current PageRank values in a sorted table
 *
 * @param {Object} props
 * @param {Array} props.nodes - Graph nodes
 * @param {Map} props.ranks - Current PageRank values
 * @param {Array} props.danglingNodes - List of dangling node IDs
 */
const RankDisplay = ({ nodes, ranks, danglingNodes = [] }) => {
  // Sort nodes by rank (descending)
  const sortedNodes = useMemo(() => {
    return [...nodes]
      .map(node => ({
        ...node,
        rank: ranks.get(node.id) || 0,
        isDangling: danglingNodes.includes(node.id),
      }))
      .sort((a, b) => b.rank - a.rank);
  }, [nodes, ranks, danglingNodes]);

  // Calculate max rank for bar visualization
  const maxRank = useMemo(() => {
    if (ranks.size === 0) return 1;
    return Math.max(...Array.from(ranks.values()), 0.001);
  }, [ranks]);

  if (nodes.length === 0) {
    return (
      <GlassCard className="p-4" animate={false}>
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
          PageRank Values
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center py-4">
          Add nodes to see rankings
        </p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-4" animate={false}>
      <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
        PageRank Values
      </h3>

      <div className="space-y-2 max-h-[200px] overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {sortedNodes.map((node, index) => (
            <motion.div
              key={node.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
              className="relative"
            >
              {/* Rank bar background */}
              <div className="absolute inset-0 rounded-md overflow-hidden">
                <motion.div
                  className="h-full bg-olive-500/20"
                  initial={{ width: 0 }}
                  animate={{ width: `${(node.rank / maxRank) * 100}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>

              {/* Content */}
              <div className="relative flex items-center justify-between p-2 rounded-md">
                <div className="flex items-center gap-2">
                  {/* Rank position */}
                  <span className="w-5 h-5 flex items-center justify-center text-xs font-bold text-olive-600 dark:text-olive-400 bg-olive-100 dark:bg-olive-900/50 rounded-full">
                    {index + 1}
                  </span>

                  {/* Node label */}
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">
                    {node.label}
                  </span>

                  {/* Dangling indicator */}
                  {node.isDangling && (
                    <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-1.5 py-0.5 rounded">
                      dangling
                    </span>
                  )}
                </div>

                {/* Rank value */}
                <span className="font-mono text-sm text-zinc-700 dark:text-zinc-300">
                  {node.rank.toFixed(4)}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Sum verification */}
      <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-700">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-500 dark:text-zinc-400">Sum</span>
          <span className="font-mono text-zinc-600 dark:text-zinc-300">
            {Array.from(ranks.values()).reduce((a, b) => a + b, 0).toFixed(4)}
          </span>
        </div>
      </div>
    </GlassCard>
  );
};

export default RankDisplay;
