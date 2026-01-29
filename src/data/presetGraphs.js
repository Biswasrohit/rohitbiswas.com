/**
 * Preset graph configurations for PageRank visualization
 * Each graph demonstrates different PageRank concepts
 */

export const presetGraphs = {
  paperExample: {
    id: 'paperExample',
    name: 'Paper Example',
    description: '4-node graph from the research paper. Node 4 is a dangling node.',
    nodes: [
      { id: '1', label: '1', position: { x: 100, y: 100 } },
      { id: '2', label: '2', position: { x: 300, y: 100 } },
      { id: '3', label: '3', position: { x: 200, y: 280 } },
      { id: '4', label: '4', position: { x: 400, y: 280 } },
    ],
    edges: [
      { source: '1', target: '2' },
      { source: '1', target: '3' },
      { source: '2', target: '3' },
      { source: '3', target: '1' },
      { source: '4', target: '3' },
    ],
    expectedRanks: {
      '1': 0.373,
      '2': 0.196,
      '3': 0.394,
      '4': 0.038,
    },
  },

  simpleCycle: {
    id: 'simpleCycle',
    name: 'Simple Cycle',
    description: 'A 3-node cycle where all nodes should have equal PageRank.',
    nodes: [
      { id: 'A', label: 'A', position: { x: 200, y: 80 } },
      { id: 'B', label: 'B', position: { x: 100, y: 250 } },
      { id: 'C', label: 'C', position: { x: 300, y: 250 } },
    ],
    edges: [
      { source: 'A', target: 'B' },
      { source: 'B', target: 'C' },
      { source: 'C', target: 'A' },
    ],
    expectedRanks: {
      'A': 0.333,
      'B': 0.333,
      'C': 0.333,
    },
  },

  starGraph: {
    id: 'starGraph',
    name: 'Star Graph',
    description: 'Hub-and-spoke structure. The hub receives links from all spokes.',
    nodes: [
      { id: 'hub', label: 'Hub', position: { x: 220, y: 180 } },
      { id: '1', label: '1', position: { x: 80, y: 80 } },
      { id: '2', label: '2', position: { x: 360, y: 80 } },
      { id: '3', label: '3', position: { x: 80, y: 280 } },
      { id: '4', label: '4', position: { x: 360, y: 280 } },
    ],
    edges: [
      { source: '1', target: 'hub' },
      { source: '2', target: 'hub' },
      { source: '3', target: 'hub' },
      { source: '4', target: 'hub' },
    ],
    expectedRanks: {
      'hub': 0.458,
      '1': 0.136,
      '2': 0.136,
      '3': 0.136,
      '4': 0.136,
    },
  },

  rankSink: {
    id: 'rankSink',
    name: 'Rank Sink',
    description: 'Linear chain with a dangling end. Shows why teleportation is needed.',
    nodes: [
      { id: 'A', label: 'A', position: { x: 80, y: 180 } },
      { id: 'B', label: 'B', position: { x: 200, y: 180 } },
      { id: 'C', label: 'C', position: { x: 320, y: 180 } },
      { id: 'D', label: 'D (sink)', position: { x: 440, y: 180 } },
    ],
    edges: [
      { source: 'A', target: 'B' },
      { source: 'B', target: 'C' },
      { source: 'C', target: 'D' },
      // D has no outgoing edges - it's a rank sink / dangling node
    ],
    expectedRanks: {
      'A': 0.146,
      'B': 0.197,
      'C': 0.268,
      'D': 0.389,
    },
  },
};

/**
 * Get list of all preset graphs for display
 */
export const presetList = Object.values(presetGraphs);

/**
 * Get a preset graph by ID
 * @param {string} presetId - The preset identifier
 * @returns {Object|null} - The preset graph or null if not found
 */
export function getPresetGraph(presetId) {
  return presetGraphs[presetId] || null;
}

/**
 * Create an empty graph for custom editing
 */
export const emptyGraph = {
  id: 'empty',
  name: 'Custom',
  description: 'Start with a blank canvas and create your own graph.',
  nodes: [],
  edges: [],
};
