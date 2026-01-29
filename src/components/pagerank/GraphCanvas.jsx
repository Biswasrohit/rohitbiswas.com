import { useCallback, useMemo, useRef } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useReactFlow,
  MarkerType,
  ConnectionMode,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
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
 * GraphCanvas component - Renders the interactive graph using React Flow
 *
 * @param {Object} props
 * @param {Array} props.nodes - Graph nodes
 * @param {Array} props.edges - Graph edges
 * @param {Map} props.ranks - Current PageRank values
 * @param {Array} props.danglingNodes - List of dangling node IDs
 * @param {Function} props.onNodesChange - Handler for node changes
 * @param {Function} props.onEdgesChange - Handler for edge changes
 * @param {Function} props.onAddNode - Handler for adding a node
 * @param {Function} props.onAddEdge - Handler for adding an edge
 * @param {Function} props.onDeleteNode - Handler for deleting a node
 * @param {Function} props.onDeleteEdge - Handler for deleting an edge
 */
const GraphCanvas = ({
  nodes,
  edges,
  ranks,
  danglingNodes = [],
  onNodesChange,
  onEdgesChange,
  onAddNode,
  onAddEdge,
  onDeleteNode,
  onDeleteEdge,
}) => {
  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition } = useReactFlow();

  // Calculate max rank for normalization
  const maxRank = useMemo(() => {
    if (ranks.size === 0) return 1;
    return Math.max(...Array.from(ranks.values()), 0.001);
  }, [ranks]);

  // Transform nodes for React Flow with rank data
  const flowNodes = useMemo(() => {
    return nodes.map(node => ({
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
    }));
  }, [nodes, ranks, maxRank, danglingNodes]);

  // Transform edges for React Flow
  const flowEdges = useMemo(() => {
    return edges.map(edge => ({
      id: `${edge.source}->${edge.target}`,
      source: edge.source,
      target: edge.target,
      ...defaultEdgeOptions,
    }));
  }, [edges]);

  // Handle node position changes (dragging)
  const handleNodesChange = useCallback((changes) => {
    if (onNodesChange) {
      onNodesChange(changes);
    }
  }, [onNodesChange]);

  // Handle edge changes
  const handleEdgesChange = useCallback((changes) => {
    if (onEdgesChange) {
      onEdgesChange(changes);
    }
  }, [onEdgesChange]);

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
        // Parse source and target from edge id
        const [source, target] = edge.id.split('->');
        onDeleteEdge(source, target);
      });
    }
  }, [onDeleteEdge]);

  return (
    <div ref={reactFlowWrapper} className="w-full h-full">
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
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
