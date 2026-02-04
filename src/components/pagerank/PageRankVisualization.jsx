import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ReactFlowProvider, useNodesState, useEdgesState, applyNodeChanges } from '@xyflow/react';
import GraphCanvas from './GraphCanvas';
import ControlPanel from './ControlPanel';
import PresetGraphs from './PresetGraphs';
import RankDisplay from './RankDisplay';
import MatrixDisplay from './MatrixDisplay';
import EducationalContent from './EducationalContent';
import CentralityComparison from './CentralityComparison';
import { usePageRank } from './hooks/usePageRank';
import { presetGraphs } from '../../data/presetGraphs';
import GlassCard from '../ui/GlassCard';

/**
 * Inner component that uses React Flow hooks (must be inside ReactFlowProvider)
 */
const PageRankVisualizationInner = ({ embedded = false }) => {
  // Graph state
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [nodeIdCounter, setNodeIdCounter] = useState(0);

  // Centrality comparison mode
  const [centralityMode, setCentralityMode] = useState('pagerank');

  // Expandable panels
  const [showMatrix, setShowMatrix] = useState(false);
  const [showEducational, setShowEducational] = useState(true);

  // PageRank computation
  const {
    ranks,
    iteration,
    convergenceDelta,
    isConverged,
    isRunning,
    alpha,
    speed,
    danglingNodes,
    inDegreeCentrality,
    eigenvectorCentrality,
    getRanksForMode,
    start,
    pause,
    step,
    reset,
    setAlpha,
    setSpeed,
  } = usePageRank(nodes, edges);

  // Get ranks based on centrality mode
  const currentRanks = getRanksForMode(centralityMode);

  // Load initial preset
  useEffect(() => {
    loadPreset('paperExample');
  }, []);

  // Load a preset graph
  const loadPreset = useCallback((presetId) => {
    const preset = presetGraphs[presetId];
    if (preset) {
      setNodes([...preset.nodes]);
      setEdges([...preset.edges]);
      setNodeIdCounter(preset.nodes.length);
      setSelectedPreset(presetId);
    }
  }, []);

  // Clear the graph
  const clearGraph = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setNodeIdCounter(0);
    setSelectedPreset(null);
  }, []);

  // Add a new node
  const addNode = useCallback((position) => {
    const newId = `node-${nodeIdCounter + 1}`;
    const newNode = {
      id: newId,
      label: `${nodeIdCounter + 1}`,
      position,
    };
    setNodes(prev => [...prev, newNode]);
    setNodeIdCounter(prev => prev + 1);
    setSelectedPreset(null);
    return newId;
  }, [nodeIdCounter]);

  // Add an edge
  const addEdge = useCallback((source, target) => {
    if (source === target) return false;
    const exists = edges.some(e => e.source === source && e.target === target);
    if (exists) return false;

    setEdges(prev => [...prev, { source, target }]);
    setSelectedPreset(null);
    return true;
  }, [edges]);

  // Delete a node
  const deleteNode = useCallback((nodeId) => {
    setNodes(prev => prev.filter(n => n.id !== nodeId));
    setEdges(prev => prev.filter(e => e.source !== nodeId && e.target !== nodeId));
    setSelectedPreset(null);
  }, []);

  // Delete an edge
  const deleteEdge = useCallback((source, target) => {
    setEdges(prev => prev.filter(e => !(e.source === source && e.target === target)));
    setSelectedPreset(null);
  }, []);

  // Handle node position changes from React Flow
  const onNodesChange = useCallback((changes) => {
    setNodes(prev => {
      const updated = [...prev];
      changes.forEach(change => {
        if (change.type === 'position' && change.position) {
          const nodeIndex = updated.findIndex(n => n.id === change.id);
          if (nodeIndex !== -1) {
            updated[nodeIndex] = { ...updated[nodeIndex], position: change.position };
          }
        }
      });
      return updated;
    });
  }, []);

  return (
    <div className={`${embedded ? '' : 'min-h-screen'} bg-zinc-50 dark:bg-zinc-950`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            PageRank Algorithm Visualizer
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl mx-auto">
            Explore how Google's foundational algorithm ranks web pages using Markov chains and power iteration
          </p>
        </motion.div>

        {/* Row 1: Graph Canvas + Algorithm Controls */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Graph Canvas - Takes 2 columns */}
          <div className="lg:col-span-2">
            <GlassCard className="p-2" animate={false}>
              <div className="h-[400px] lg:h-[500px]">
                <GraphCanvas
                  nodes={nodes}
                  edges={edges}
                  ranks={currentRanks}
                  danglingNodes={danglingNodes}
                  onNodesChange={onNodesChange}
                  onAddNode={addNode}
                  onAddEdge={addEdge}
                  onDeleteNode={deleteNode}
                  onDeleteEdge={deleteEdge}
                />
              </div>
            </GlassCard>
          </div>

          {/* Algorithm Controls - Right column */}
          <div className="space-y-4">
            <ControlPanel
              alpha={alpha}
              speed={speed}
              isRunning={isRunning}
              iteration={iteration}
              convergenceDelta={convergenceDelta}
              isConverged={isConverged}
              onAlphaChange={setAlpha}
              onSpeedChange={setSpeed}
              onStart={start}
              onPause={pause}
              onStep={step}
              onReset={reset}
            />

            <PresetGraphs
              selectedPreset={selectedPreset}
              onSelect={loadPreset}
              onClear={clearGraph}
            />
          </div>
        </div>

        {/* Row 2: Rankings + Centrality */}
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RankDisplay
            nodes={nodes}
            ranks={currentRanks}
            danglingNodes={danglingNodes}
          />

          <CentralityComparison
            mode={centralityMode}
            onModeChange={setCentralityMode}
            nodes={nodes}
            pageRank={ranks}
            inDegree={inDegreeCentrality}
            eigenvector={eigenvectorCentrality}
          />

          <MatrixDisplay
            nodes={nodes}
            edges={edges}
            alpha={alpha}
            expanded={showMatrix}
            onToggle={() => setShowMatrix(!showMatrix)}
          />
        </div>

        {/* Row 3: Educational Content */}
        <div className="mt-6">
          <EducationalContent
            expanded={showEducational}
            onToggle={() => setShowEducational(!showEducational)}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * PageRankVisualization - Main exported component with ReactFlowProvider
 */
const PageRankVisualization = ({ embedded = false }) => {
  return (
    <ReactFlowProvider>
      <PageRankVisualizationInner embedded={embedded} />
    </ReactFlowProvider>
  );
};

export default PageRankVisualization;
