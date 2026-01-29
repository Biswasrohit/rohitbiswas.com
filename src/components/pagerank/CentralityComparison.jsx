import { useMemo } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';

/**
 * CentralityComparison component - Toggle between different centrality metrics
 *
 * @param {Object} props
 * @param {string} props.mode - Current centrality mode
 * @param {Function} props.onModeChange - Handler for mode change
 * @param {Array} props.nodes - Graph nodes
 * @param {Map} props.pageRank - PageRank values
 * @param {Map} props.inDegree - In-degree centrality values
 * @param {Map} props.eigenvector - Eigenvector centrality values
 */
const CentralityComparison = ({
  mode,
  onModeChange,
  nodes,
  pageRank,
  inDegree,
  eigenvector,
}) => {
  const modes = [
    {
      id: 'pagerank',
      label: 'PageRank',
      description: 'Link-based importance with damping',
    },
    {
      id: 'indegree',
      label: 'In-Degree',
      description: 'Count of incoming links',
    },
    {
      id: 'eigenvector',
      label: 'Eigenvector',
      description: 'Influence from connected nodes',
    },
  ];

  // Get ranking for each metric
  const getRanking = (values) => {
    if (!values || values.size === 0) return [];
    return [...nodes]
      .map(node => ({ id: node.id, label: node.label, value: values.get(node.id) || 0 }))
      .sort((a, b) => b.value - a.value)
      .map((node, index) => ({ ...node, rank: index + 1 }));
  };

  const rankings = useMemo(() => ({
    pagerank: getRanking(pageRank),
    indegree: getRanking(inDegree),
    eigenvector: getRanking(eigenvector),
  }), [pageRank, inDegree, eigenvector, nodes]);

  // Check if rankings differ
  const rankingsDiffer = useMemo(() => {
    if (nodes.length < 2) return false;

    const prRanks = rankings.pagerank.map(n => n.id);
    const idRanks = rankings.indegree.map(n => n.id);
    const evRanks = rankings.eigenvector.map(n => n.id);

    return JSON.stringify(prRanks) !== JSON.stringify(idRanks) ||
           JSON.stringify(prRanks) !== JSON.stringify(evRanks);
  }, [rankings, nodes]);

  return (
    <GlassCard className="p-4" animate={false}>
      <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
        Centrality Comparison
      </h3>

      {/* Mode toggles */}
      <div className="space-y-2 mb-4">
        {modes.map((m) => (
          <motion.button
            key={m.id}
            onClick={() => onModeChange(m.id)}
            className={`w-full text-left p-2 rounded-lg transition-all duration-200 ${
              mode === m.id
                ? 'bg-olive-500/20 border-2 border-olive-500'
                : 'bg-zinc-100/80 dark:bg-zinc-800/80 border-2 border-transparent hover:border-zinc-300 dark:hover:border-zinc-600'
            }`}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <span className={`font-medium text-sm ${
                mode === m.id
                  ? 'text-olive-700 dark:text-olive-300'
                  : 'text-zinc-700 dark:text-zinc-300'
              }`}>
                {m.label}
              </span>
              {mode === m.id && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 rounded-full bg-olive-500"
                />
              )}
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              {m.description}
            </p>
          </motion.button>
        ))}
      </div>

      {/* Ranking comparison */}
      {nodes.length > 0 && (
        <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-700">
          <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-2">
            Top node rankings:
          </p>
          <div className="grid grid-cols-3 gap-2 text-xs">
            {modes.map((m) => (
              <div key={m.id} className="text-center">
                <p className={`font-medium mb-1 ${
                  mode === m.id ? 'text-olive-600 dark:text-olive-400' : 'text-zinc-500'
                }`}>
                  {m.label}
                </p>
                <div className="space-y-0.5">
                  {rankings[m.id].slice(0, 3).map((node, i) => (
                    <p key={node.id} className="text-zinc-600 dark:text-zinc-400">
                      {i + 1}. {node.label}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {rankingsDiffer && (
            <p className="text-xs text-olive-600 dark:text-olive-400 mt-3 text-center">
              Rankings differ between metrics!
            </p>
          )}
        </div>
      )}
    </GlassCard>
  );
};

export default CentralityComparison;
