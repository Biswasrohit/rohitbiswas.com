import { useState, useCallback } from 'react';
import { presetGraphs, emptyGraph } from '../../../data/presetGraphs';

/**
 * Custom hook for managing graph state (nodes and edges)
 * Provides operations for adding, removing, and modifying graph elements
 *
 * @param {Object} initialGraph - Optional initial graph configuration
 * @returns {Object} - Graph state and manipulation functions
 */
export function useGraphState(initialGraph = null) {
  const [nodes, setNodes] = useState(initialGraph?.nodes || []);
  const [edges, setEdges] = useState(initialGraph?.edges || []);
  const [nodeIdCounter, setNodeIdCounter] = useState(
    initialGraph?.nodes?.length || 0
  );
  const [selectedPreset, setSelectedPreset] = useState(null);

  /**
   * Add a new node to the graph
   * @param {Object} position - { x, y } position for the node
   * @param {string} customLabel - Optional custom label
   * @returns {string} - The ID of the new node
   */
  const addNode = useCallback((position, customLabel = null) => {
    const newId = `node-${nodeIdCounter + 1}`;
    const newNode = {
      id: newId,
      label: customLabel || `${nodeIdCounter + 1}`,
      position: position || { x: Math.random() * 300 + 50, y: Math.random() * 200 + 50 },
    };

    setNodes(prev => [...prev, newNode]);
    setNodeIdCounter(prev => prev + 1);
    setSelectedPreset(null); // Clear preset selection when manually editing

    return newId;
  }, [nodeIdCounter]);

  /**
   * Add an edge between two nodes
   * @param {string} source - Source node ID
   * @param {string} target - Target node ID
   * @returns {boolean} - Whether the edge was added
   */
  const addEdge = useCallback((source, target) => {
    // Prevent self-loops and duplicate edges
    if (source === target) return false;

    const exists = edges.some(
      e => e.source === source && e.target === target
    );

    if (exists) return false;

    // Verify both nodes exist
    const sourceExists = nodes.some(n => n.id === source);
    const targetExists = nodes.some(n => n.id === target);

    if (!sourceExists || !targetExists) return false;

    setEdges(prev => [...prev, { source, target }]);
    setSelectedPreset(null);

    return true;
  }, [edges, nodes]);

  /**
   * Remove a node and all connected edges
   * @param {string} nodeId - ID of the node to remove
   */
  const removeNode = useCallback((nodeId) => {
    setNodes(prev => prev.filter(n => n.id !== nodeId));
    setEdges(prev => prev.filter(
      e => e.source !== nodeId && e.target !== nodeId
    ));
    setSelectedPreset(null);
  }, []);

  /**
   * Remove an edge between two nodes
   * @param {string} source - Source node ID
   * @param {string} target - Target node ID
   */
  const removeEdge = useCallback((source, target) => {
    setEdges(prev => prev.filter(
      e => !(e.source === source && e.target === target)
    ));
    setSelectedPreset(null);
  }, []);

  /**
   * Update a node's position
   * @param {string} nodeId - ID of the node to update
   * @param {Object} position - New { x, y } position
   */
  const updateNodePosition = useCallback((nodeId, position) => {
    setNodes(prev => prev.map(node =>
      node.id === nodeId ? { ...node, position } : node
    ));
  }, []);

  /**
   * Update a node's label
   * @param {string} nodeId - ID of the node to update
   * @param {string} label - New label
   */
  const updateNodeLabel = useCallback((nodeId, label) => {
    setNodes(prev => prev.map(node =>
      node.id === nodeId ? { ...node, label } : node
    ));
    setSelectedPreset(null);
  }, []);

  /**
   * Load a preset graph configuration
   * @param {string} presetId - ID of the preset to load
   */
  const loadPreset = useCallback((presetId) => {
    const preset = presetGraphs[presetId];
    if (preset) {
      setNodes([...preset.nodes]);
      setEdges([...preset.edges]);
      setNodeIdCounter(preset.nodes.length);
      setSelectedPreset(presetId);
    }
  }, []);

  /**
   * Clear the graph (reset to empty)
   */
  const clearGraph = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setNodeIdCounter(0);
    setSelectedPreset(null);
  }, []);

  /**
   * Export current graph as JSON
   * @returns {Object} - Graph configuration object
   */
  const exportGraph = useCallback(() => {
    return {
      nodes: [...nodes],
      edges: [...edges],
    };
  }, [nodes, edges]);

  /**
   * Import a graph from JSON
   * @param {Object} graphData - { nodes, edges } configuration
   */
  const importGraph = useCallback((graphData) => {
    if (graphData?.nodes && graphData?.edges) {
      setNodes([...graphData.nodes]);
      setEdges([...graphData.edges]);
      setNodeIdCounter(graphData.nodes.length);
      setSelectedPreset(null);
    }
  }, []);

  /**
   * Get graph as object for algorithm consumption
   */
  const getGraph = useCallback(() => ({
    nodes: [...nodes],
    edges: [...edges],
  }), [nodes, edges]);

  return {
    // State
    nodes,
    edges,
    selectedPreset,

    // Node operations
    addNode,
    removeNode,
    updateNodePosition,
    updateNodeLabel,

    // Edge operations
    addEdge,
    removeEdge,

    // Graph operations
    loadPreset,
    clearGraph,
    exportGraph,
    importGraph,
    getGraph,

    // For React Flow
    setNodes,
    setEdges,
  };
}

export default useGraphState;
