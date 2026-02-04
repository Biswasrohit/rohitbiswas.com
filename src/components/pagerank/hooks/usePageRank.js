import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  pageRankGenerator,
  computeInDegreeCentrality,
  computeEigenvectorCentrality,
  getDanglingNodes,
} from '../../../utils/pagerank/algorithms';

/**
 * Speed settings for animation (milliseconds between iterations)
 */
const SPEED_MAP = {
  slow: 1000,
  normal: 500,
  fast: 100,
};

/**
 * Custom hook for managing PageRank computation and animation
 *
 * @param {Array} nodes - Graph nodes
 * @param {Array} edges - Graph edges
 * @returns {Object} - PageRank state and control functions
 */
export function usePageRank(nodes, edges) {
  // Algorithm parameters
  const [alpha, setAlpha] = useState(0.85);
  const [speed, setSpeed] = useState('normal');

  // Computation state
  const [ranks, setRanks] = useState(new Map());
  const [iteration, setIteration] = useState(0);
  const [convergenceDelta, setConvergenceDelta] = useState(1);
  const [isConverged, setIsConverged] = useState(false);

  // Animation state
  const [isRunning, setIsRunning] = useState(false);

  // Centrality comparisons
  const [inDegreeCentrality, setInDegreeCentrality] = useState(new Map());
  const [eigenvectorCentrality, setEigenvectorCentrality] = useState(new Map());

  // Dangling nodes
  const [danglingNodes, setDanglingNodes] = useState([]);

  // Refs for animation control
  const generatorRef = useRef(null);
  const intervalRef = useRef(null);

  // Keep refs to current nodes/edges for use inside interval callbacks
  const nodesRef = useRef(nodes);
  const edgesRef = useRef(edges);
  const alphaRef = useRef(alpha);
  nodesRef.current = nodes;
  edgesRef.current = edges;
  alphaRef.current = alpha;

  // Stable keys for detecting structural changes (not position changes)
  const nodeIdsKey = useMemo(
    () => nodes.map(n => n.id).sort().join(','),
    [nodes]
  );
  const edgesKey = useMemo(
    () => edges.map(e => `${e.source}->${e.target}`).sort().join(','),
    [edges]
  );

  /**
   * Initialize/reset ranks when graph STRUCTURE or alpha changes.
   * Position-only changes (dragging) do NOT trigger reset.
   */
  useEffect(() => {
    const n = nodes.length;

    // Initialize uniform ranks
    const initialRanks = new Map();
    const uniformRank = n > 0 ? 1 / n : 0;
    nodes.forEach(node => initialRanks.set(node.id, uniformRank));

    setRanks(initialRanks);
    setIteration(0);
    setConvergenceDelta(1);
    setIsConverged(false);
    setIsRunning(false);

    // Reset generator
    generatorRef.current = null;

    // Clear interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Compute alternative centralities
    const graph = { nodes, edges };
    setInDegreeCentrality(computeInDegreeCentrality(graph));
    setEigenvectorCentrality(computeEigenvectorCentrality(graph));
    setDanglingNodes(getDanglingNodes(graph));

  }, [nodeIdsKey, edgesKey, alpha]);

  /**
   * Animation loop effect
   */
  useEffect(() => {
    if (isRunning && !isConverged) {
      intervalRef.current = setInterval(() => {
        if (!generatorRef.current) {
          generatorRef.current = pageRankGenerator(
            { nodes: nodesRef.current, edges: edgesRef.current },
            alphaRef.current
          );
          // Skip initial state since we already have it
          generatorRef.current.next();
        }

        const result = generatorRef.current.next();

        if (result.done || result.value.converged) {
          setIsRunning(false);
          setIsConverged(true);
          if (result.value) {
            setRanks(result.value.ranks);
            setIteration(result.value.iteration);
            setConvergenceDelta(result.value.convergenceDelta);
          }
        } else {
          setRanks(result.value.ranks);
          setIteration(result.value.iteration);
          setConvergenceDelta(result.value.convergenceDelta);
        }
      }, SPEED_MAP[speed]);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }
  }, [isRunning, isConverged, speed]);

  /**
   * Start the animation
   */
  const start = useCallback(() => {
    if (isConverged) return;

    if (!generatorRef.current) {
      generatorRef.current = pageRankGenerator(
        { nodes: nodesRef.current, edges: edgesRef.current },
        alphaRef.current
      );
      // Skip initial state
      generatorRef.current.next();
    }

    setIsRunning(true);
  }, [isConverged]);

  /**
   * Pause the animation
   */
  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  /**
   * Step through one iteration
   */
  const step = useCallback(() => {
    if (isConverged) return;

    if (!generatorRef.current) {
      generatorRef.current = pageRankGenerator(
        { nodes: nodesRef.current, edges: edgesRef.current },
        alphaRef.current
      );
      // Skip initial state
      generatorRef.current.next();
    }

    const result = generatorRef.current.next();

    if (result.done || result.value.converged) {
      setIsConverged(true);
      if (result.value) {
        setRanks(result.value.ranks);
        setIteration(result.value.iteration);
        setConvergenceDelta(result.value.convergenceDelta);
      }
    } else {
      setRanks(result.value.ranks);
      setIteration(result.value.iteration);
      setConvergenceDelta(result.value.convergenceDelta);
    }
  }, [isConverged]);

  /**
   * Reset to initial state
   */
  const reset = useCallback(() => {
    setIsRunning(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    generatorRef.current = null;

    const n = nodesRef.current.length;
    const initialRanks = new Map();
    const uniformRank = n > 0 ? 1 / n : 0;
    nodesRef.current.forEach(node => initialRanks.set(node.id, uniformRank));

    setRanks(initialRanks);
    setIteration(0);
    setConvergenceDelta(1);
    setIsConverged(false);
  }, []);

  /**
   * Update damping factor (triggers reset via effect)
   */
  const updateAlpha = useCallback((newAlpha) => {
    setAlpha(newAlpha);
  }, []);

  /**
   * Update animation speed
   */
  const updateSpeed = useCallback((newSpeed) => {
    setSpeed(newSpeed);
  }, []);

  /**
   * Get ranks for a specific centrality mode
   */
  const getRanksForMode = useCallback((mode) => {
    switch (mode) {
      case 'pagerank':
        return ranks;
      case 'indegree':
        return inDegreeCentrality;
      case 'eigenvector':
        return eigenvectorCentrality;
      default:
        return ranks;
    }
  }, [ranks, inDegreeCentrality, eigenvectorCentrality]);

  return {
    // State
    ranks,
    iteration,
    convergenceDelta,
    isConverged,
    isRunning,
    alpha,
    speed,
    danglingNodes,

    // Alternative centralities
    inDegreeCentrality,
    eigenvectorCentrality,
    getRanksForMode,

    // Controls
    start,
    pause,
    step,
    reset,

    // Settings
    setAlpha: updateAlpha,
    setSpeed: updateSpeed,
  };
}

export default usePageRank;
