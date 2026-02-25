import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

/**
 * Custom node component for PageRank visualization.
 * Uses CSS transitions instead of framer-motion to avoid breaking
 * React Flow's internal node dimension measurement (which needs
 * stable initial sizes for fitView and layout to work).
 */
const PageRankNode = memo(({ data, selected }) => {
  const { label, rank = 0, normalizedRank = 0, isDangling = false } = data;

  // Scale node size based on normalized rank (50-90px diameter)
  const size = 50 + normalizedRank * 40;

  // Color intensity based on rank
  const opacity = 0.4 + normalizedRank * 0.6;

  // Highlight dangling nodes with a different border style
  const borderStyle = isDangling
    ? '3px dashed rgb(234 179 8)'
    : '3px solid rgb(56 189 248)';

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: size,
        height: size,
        transition: 'width 0.4s ease, height 0.4s ease',
      }}
    >
      {/* Target handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-arc-cyan !border-2 !border-surface-2"
        id="target-top"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="!w-2.5 !h-2.5 !bg-arc-cyan !border-2 !border-surface-2"
        id="target-left"
      />

      {/* Main node circle */}
      <div
        className={`
          rounded-full flex flex-col items-center justify-center
          shadow-lg cursor-pointer
          ${selected ? 'ring-4 ring-arc-cyan/50 ring-offset-2 ring-offset-surface-1' : ''}
        `}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: `rgba(56, 189, 248, ${opacity})`,
          border: borderStyle,
          transition: 'background-color 0.4s ease, border 0.3s ease',
        }}
      >
        <span className="font-bold text-white text-sm drop-shadow-md leading-tight">
          {label}
        </span>
        <span className="text-[10px] text-white/90 font-mono drop-shadow-md leading-tight">
          {rank.toFixed(3)}
        </span>
      </div>

      {/* Source handles */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2.5 !h-2.5 !bg-arc-cyan !border-2 !border-surface-2"
        id="source-bottom"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!w-2.5 !h-2.5 !bg-arc-cyan !border-2 !border-surface-2"
        id="source-right"
      />

      {/* Dangling node indicator */}
      {isDangling && (
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded-full border border-yellow-500/30">
            dangling
          </span>
        </div>
      )}
    </div>
  );
});

PageRankNode.displayName = 'PageRankNode';

export default PageRankNode;
