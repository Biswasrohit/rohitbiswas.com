import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';

/**
 * Custom node component for PageRank visualization
 * Node size and color intensity scale with rank value
 *
 * @param {Object} props - React Flow node props
 * @param {Object} props.data - Node data including label, rank, normalizedRank, isDangling
 * @param {boolean} props.selected - Whether the node is selected
 */
const PageRankNode = memo(({ data, selected }) => {
  const { label, rank = 0, normalizedRank = 0, isDangling = false } = data;

  // Scale node size based on normalized rank (40-90px diameter)
  const minSize = 40;
  const maxSize = 90;
  const size = minSize + normalizedRank * (maxSize - minSize);

  // Color intensity based on rank (more saturated = higher rank)
  const baseOpacity = 0.4;
  const maxOpacity = 1;
  const opacity = baseOpacity + normalizedRank * (maxOpacity - baseOpacity);

  // Highlight dangling nodes with a different border style
  const borderStyle = isDangling
    ? '3px dashed rgb(234 179 8)' // yellow-500 dashed for dangling
    : '3px solid rgb(107 142 35)'; // olive-500 solid for normal

  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ scale: 0 }}
      animate={{
        scale: 1,
        width: size,
        height: size,
      }}
      transition={{
        scale: { type: 'spring', stiffness: 300, damping: 20 },
        width: { type: 'spring', stiffness: 200, damping: 25 },
        height: { type: 'spring', stiffness: 200, damping: 25 },
      }}
    >
      {/* Input handles - for incoming edges */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-olive-600 !border-2 !border-white dark:!border-zinc-800"
        id="target-top"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-olive-600 !border-2 !border-white dark:!border-zinc-800"
        id="target-left"
      />

      {/* Main node circle */}
      <motion.div
        className={`
          rounded-full flex flex-col items-center justify-center
          shadow-lg cursor-pointer
          ${selected ? 'ring-4 ring-olive-400 ring-offset-2 dark:ring-offset-zinc-900' : ''}
        `}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: `rgba(107, 142, 35, ${opacity})`,
          border: borderStyle,
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Node label */}
        <span className="font-bold text-white text-sm drop-shadow-md">
          {label}
        </span>

        {/* Rank value */}
        <span className="text-xs text-white/90 font-mono drop-shadow-md">
          {rank.toFixed(3)}
        </span>
      </motion.div>

      {/* Output handles - for outgoing edges */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-olive-600 !border-2 !border-white dark:!border-zinc-800"
        id="source-bottom"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-olive-600 !border-2 !border-white dark:!border-zinc-800"
        id="source-right"
      />

      {/* Dangling node indicator */}
      {isDangling && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
        >
          <span className="text-xs bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 px-2 py-0.5 rounded-full border border-yellow-500/30">
            dangling
          </span>
        </motion.div>
      )}
    </motion.div>
  );
});

PageRankNode.displayName = 'PageRankNode';

export default PageRankNode;
