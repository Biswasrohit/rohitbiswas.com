import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { buildAllMatrices, formatMatrixValue } from '../../utils/pagerank/matrixOperations';

/**
 * MatrixDisplay component - Shows the Google matrix G
 *
 * @param {Object} props
 * @param {Array} props.nodes - Graph nodes
 * @param {Array} props.edges - Graph edges
 * @param {number} props.alpha - Damping factor
 * @param {boolean} props.expanded - Whether panel is expanded
 * @param {Function} props.onToggle - Handler for expand/collapse
 */
const MatrixDisplay = ({ nodes, edges, alpha, expanded, onToggle }) => {
  // Build matrices
  const { H, HPrime, G, nodeIds } = useMemo(() => {
    if (nodes.length === 0) {
      return { H: [], HPrime: [], G: [], nodeIds: [] };
    }
    return buildAllMatrices({ nodes, edges }, alpha);
  }, [nodes, edges, alpha]);

  // Get color for matrix cell based on value
  const getCellColor = (value) => {
    if (value === 0) return 'bg-surface-2';
    const intensity = Math.min(value * 2, 1); // Scale for visibility
    return `bg-arc-cyan/${Math.round(intensity * 60 + 10)}`;
  };

  return (
    <GlassCard className="p-4" animate={false}>
      {/* Header with toggle */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left"
      >
        <h3 className="font-semibold font-display text-white/85">
          Google Matrix (G)
        </h3>
        <motion.svg
          animate={{ rotate: expanded ? 180 : 0 }}
          className="w-5 h-5 text-white/35"
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
            <div className="mt-4">
              {/* Formula */}
              <div className="mb-4 p-3 bg-surface-2/80 rounded-lg">
                <p className="text-sm font-mono text-white/70">
                  G = αH' + (1-α)(1/n)11<sup>T</sup>
                </p>
                <p className="text-xs text-white/50 mt-1">
                  α = {alpha.toFixed(2)}, n = {nodes.length}
                </p>
              </div>

              {nodes.length === 0 ? (
                <p className="text-sm text-white/50 text-center py-4">
                  Add nodes to see the matrix
                </p>
              ) : nodes.length > 8 ? (
                <p className="text-sm text-white/50 text-center py-4">
                  Matrix too large to display (max 8 nodes)
                </p>
              ) : (
                <div className="overflow-x-auto">
                  {/* Matrix table */}
                  <table className="w-full text-xs">
                    <thead>
                      <tr>
                        <th className="p-1 text-white/50"></th>
                        {nodeIds.map(id => (
                          <th key={id} className="p-1 text-center text-white/50 font-medium">
                            {nodes.find(n => n.id === id)?.label || id}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {G.map((row, i) => (
                        <tr key={nodeIds[i]}>
                          <td className="p-1 text-white/50 font-medium">
                            {nodes.find(n => n.id === nodeIds[i])?.label || nodeIds[i]}
                          </td>
                          {row.map((value, j) => (
                            <td
                              key={`${i}-${j}`}
                              className={`p-1 text-center font-mono ${getCellColor(value)} rounded`}
                            >
                              <span className={value > 0 ? 'text-white/80' : 'text-white/25'}>
                                {formatMatrixValue(value, 2)}
                              </span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Legend */}
              <div className="mt-4 text-xs text-white/50">
                <p className="mb-1"><strong>Reading the matrix:</strong></p>
                <p>G[i][j] = probability of going from node j to node i</p>
                <p className="mt-1">Columns sum to 1 (stochastic matrix)</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
};

export default MatrixDisplay;
