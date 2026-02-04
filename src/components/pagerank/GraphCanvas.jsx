import { useCallback, useEffect, useRef } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useReactFlow,
  MarkerType,
  ConnectionMode,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import PageRankNode from './PageRankNode';

/**
 * Node types for React Flow
 */
const nodeTypes = {
  pagerank: PageRankNode,
};

/**
 * Default edge style
 */
const defaultEdgeOptions = {
  type: 'default',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: '#6B8E23',
    width: 20,
    height: 20,
  },
  style: {
    stroke: '#6B8E23',
    strokeWidth: 2,
  },
  animated: false,
};

/**
 * GraphCanvas component - Renders the interactive graph using React Flow.
 * Uses useNodesState/useEdgesState for proper internal state management
 * (dimensions, selections, etc.) while syncing with parent props.
 */
const GraphCanvas = ({
  nodes,
  edges,
  ranks,
  danglingNodes = [],
  onNodesChange: onNodesChangeProp,
  onAddNode,
  onAddEdge,
  onDeleteNode,
  onDeleteEdge,
}) => {
  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition } = useReactFlow();

  // React Flow's own state management — handles dimensions, selections, etc.
  const [rfNodes, setRfNodes, onRfNodesChange] = useNodesState([]);
  const [rfEdges, setRfEdges, onRfEdgesChange] = useEdgesState([]);

  // Track node structure to distinguish data-only updates from structural changes
  const prevNodeIdsRef = useRef('');

  // Sync graph nodes + ranks from props into React Flow state
  useEffect(() => {
    const currentIds = nodes.map(n => n.id).sort().join(',');
    const structureChanged = currentIds !== prevNodeIdsRef.current;
    prevNodeIdsRef.current = currentIds;

    const maxRank = ranks.size > 0 ? Math.max(...Array.from(ranks.values()), 0.001) : 1;

    if (structureChanged) {
      // Full rebuild when nodes are added/removed/loaded
      setRfNodes(nodes.map(node => ({
        id: node.id,
        type: 'pagerank',
        position: node.position,
        data: {
          label: node.label || node.id,
          rank: ranks.get(node.id) || 0,
          normalizedRank: (ranks.get(node.id) || 0) / maxRank,
          isDangling: danglingNodes.includes(node.id),
        },
        draggable: true,
      })));
    } else {
      // Only update data (preserves dragged positions and measured dimensions)
      setRfNodes(prev => prev.map(node => ({
        ...node,
        data: {
          ...node.data,
          rank: ranks.get(node.id) || 0,
          normalizedRank: (ranks.get(node.id) || 0) / maxRank,
          isDangling: danglingNodes.includes(node.id),
        },
      })));
    }
  }, [nodes, ranks, danglingNodes, setRfNodes]);

  // Sync edges from props into React Flow state
  useEffect(() => {
    setRfEdges(edges.map(edge => ({
      id: `${edge.source}->${edge.target}`,
      source: edge.source,
      target: edge.target,
      ...defaultEdgeOptions,
    })));
  }, [edges, setRfEdges]);

  // Handle all node changes (dimensions, position, selection, etc.)
  const handleNodesChange = useCallback((changes) => {
    // Let React Flow apply all changes internally (critical for dimensions!)
    onRfNodesChange(changes);

    // Forward position changes to parent for state sync
    if (onNodesChangeProp) {
      const positionChanges = changes.filter(c => c.type === 'position' && c.position);
      if (positionChanges.length > 0) {
        onNodesChangeProp(positionChanges);
      }
    }
  }, [onRfNodesChange, onNodesChangeProp]);

  // Handle edge changes (selection, removal, etc.)
  const handleEdgesChange = useCallback((changes) => {
    onRfEdgesChange(changes);
  }, [onRfEdgesChange]);

  // Handle new connection (edge creation)
  const handleConnect = useCallback((connection) => {
    if (onAddEdge && connection.source && connection.target) {
      onAddEdge(connection.source, connection.target);
    }
  }, [onAddEdge]);

  // Handle pane click (add node)
  const handlePaneClick = useCallback((event) => {
    if (onAddNode) {
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      onAddNode(position);
    }
  }, [onAddNode, screenToFlowPosition]);

  // Handle node deletion
  const handleNodesDelete = useCallback((deletedNodes) => {
    if (onDeleteNode) {
      deletedNodes.forEach(node => onDeleteNode(node.id));
    }
  }, [onDeleteNode]);

  // Handle edge deletion
  const handleEdgesDelete = useCallback((deletedEdges) => {
    if (onDeleteEdge) {
      deletedEdges.forEach(edge => {
        const [source, target] = edge.id.split('->');
        onDeleteEdge(source, target);
      });
    }
  }, [onDeleteEdge]);

  return (
    <div ref={reactFlowWrapper} className="relative w-full h-full">
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        nodeTypes={nodeTypes}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={handleConnect}
        onPaneClick={handlePaneClick}
        onNodesDelete={handleNodesDelete}
        onEdgesDelete={handleEdgesDelete}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3}
        maxZoom={2}
        deleteKeyCode={['Backspace', 'Delete']}
        className="bg-zinc-100/50 dark:bg-zinc-900/50 rounded-xl"
      >
        <Background
          color="#6B8E23"
          variant="dots"
          gap={20}
          size={1}
          className="opacity-30"
        />
        <Controls
          className="!bg-white/80 dark:!bg-zinc-800/80 !border-zinc-200 dark:!border-zinc-700 !rounded-lg !shadow-lg"
          showZoom={true}
          showFitView={true}
          showInteractive={false}
        />
        <MiniMap
          nodeColor={(node) => {
            const rank = node.data?.normalizedRank || 0;
            const opacity = 0.4 + rank * 0.6;
            return `rgba(107, 142, 35, ${opacity})`;
          }}
          maskColor="rgba(107, 142, 35, 0.1)"
          className="!bg-white/80 dark:!bg-zinc-800/80 !border-zinc-200 dark:!border-zinc-700 !rounded-lg"
          pannable
          zoomable
        />
      </ReactFlow>

      {/* Instructions overlay */}
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center text-zinc-500 dark:text-zinc-400">
            <p className="text-lg font-medium mb-2">Click anywhere to add nodes</p>
            <p className="text-sm">Drag from node handles to create edges</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GraphCanvas;
