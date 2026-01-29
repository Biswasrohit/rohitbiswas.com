import { useState, useEffect, useCallback, useRef } from 'react';
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
  const [history, setHistory] = useState([]);

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

  /**
   * Initialize/reset ranks when graph or alpha changes
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
    setHistory([{ iteration: 0, ranks: new Map(initialRanks), convergenceDelta: 1 }]);
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

  }, [nodes, edges, alpha]);

  /**
   * Animation loop effect
   */
  useEffect(() => {
    if (isRunning && !isConverged) {
      intervalRef.current = setInterval(() => {
        if (!generatorRef.current) {
          generatorRef.current = pageRankGenerator({ nodes, edges }, alpha);
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
            setHistory(prev => [...prev, result.value]);
          }
        } else {
          setRanks(result.value.ranks);
          setIteration(result.value.iteration);
          setConvergenceDelta(result.value.convergenceDelta);
          setHistory(prev => [...prev, result.value]);
        }
      }, SPEED_MAP[speed]);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isRunning, isConverged, speed, nodes, edges, alpha]);

  /**
   * Start the animation
   */
  const start = useCallback(() => {
    if (isConverged) return;

    if (!generatorRef.current) {
      generatorRef.current = pageRankGenerator({ nodes, edges }, alpha);
      // Skip initial state
      generatorRef.current.next();
    }

    setIsRunning(true);
  }, [nodes, edges, alpha, isConverged]);

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
      generatorRef.current = pageRankGenerator({ nodes, edges }, alpha);
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
        setHistory(prev => [...prev, result.value]);
      }
    } else {
      setRanks(result.value.ranks);
      setIteration(result.value.iteration);
      setConvergenceDelta(result.value.convergenceDelta);
      setHistory(prev => [...prev, result.value]);
    }
  }, [nodes, edges, alpha, isConverged]);

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

    const n = nodes.length;
    const initialRanks = new Map();
    const uniformRank = n > 0 ? 1 / n : 0;
    nodes.forEach(node => initialRanks.set(node.id, uniformRank));

    setRanks(initialRanks);
    setIteration(0);
    setConvergenceDelta(1);
    setIsConverged(false);
    setHistory([{ iteration: 0, ranks: new Map(initialRanks), convergenceDelta: 1 }]);
  }, [nodes]);

  /**
   * Update damping factor (triggers reset)
   */
  const updateAlpha = useCallback((newAlpha) => {
    setAlpha(newAlpha);
    // Reset will be triggered by the useEffect
  }, []);

  /**
   * Update animation speed
   */
  const updateSpeed = useCallback((newSpeed) => {
    setSpeed(newSpeed);
  }, []);

  /**
   * Run to convergence instantly (no animation)
   */
  const runToConvergence = useCallback(() => {
    const gen = pageRankGenerator({ nodes, edges }, alpha);
    let result = gen.next();
    const newHistory = [];

    while (!result.done && !result.value.converged) {
      newHistory.push(result.value);
      result = gen.next();
    }

    if (result.value) {
      newHistory.push(result.value);
      setRanks(result.value.ranks);
      setIteration(result.value.iteration);
      setConvergenceDelta(result.value.convergenceDelta);
      setIsConverged(true);
      setHistory(newHistory);
    }
  }, [nodes, edges, alpha]);

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
    history,
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
    runToConvergence,

    // Settings
    setAlpha: updateAlpha,
    setSpeed: updateSpeed,
  };
}

export default usePageRank;
