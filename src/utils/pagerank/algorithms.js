/**
 * PageRank Algorithm Implementation
 * Based on: G = αH' + (1-α)(1/n)11^T
 *
 * Reference: PageRank & Markov Chains paper by Rohit Biswas
 */

/**
 * Compute PageRank using power iteration
 * @param {Object} graph - { nodes: [{id, ...}], edges: [{source, target}] }
 * @param {number} alpha - Damping factor (0.5-0.99, default 0.85)
 * @param {number} epsilon - Convergence threshold (default 1e-6)
 * @param {number} maxIterations - Maximum iterations (default 100)
 * @returns {Object} - { ranks, iterations, history, converged, convergenceDelta }
 */
export function computePageRank(graph, alpha = 0.85, epsilon = 1e-6, maxIterations = 100) {
  const n = graph.nodes.length;
  if (n === 0) return { ranks: new Map(), iterations: 0, history: [], converged: true, convergenceDelta: 0 };

  // Build adjacency structures
  const outDegree = new Map();
  const inLinks = new Map();

  graph.nodes.forEach(node => {
    outDegree.set(node.id, 0);
    inLinks.set(node.id, []);
  });

  graph.edges.forEach(edge => {
    outDegree.set(edge.source, (outDegree.get(edge.source) || 0) + 1);
    if (inLinks.has(edge.target)) {
      inLinks.get(edge.target).push(edge.source);
    }
  });

  // Identify dangling nodes (no outgoing edges)
  const danglingNodes = graph.nodes
    .filter(node => outDegree.get(node.id) === 0)
    .map(node => node.id);

  // Initialize ranks uniformly: r⁰ = (1/n, ..., 1/n)
  let ranks = new Map();
  const initialRank = 1 / n;
  graph.nodes.forEach(node => ranks.set(node.id, initialRank));

  const history = [{ iteration: 0, ranks: new Map(ranks), convergenceDelta: 1 }];

  // Power iteration: r^(k+1) = G × r^k
  for (let iter = 1; iter <= maxIterations; iter++) {
    const newRanks = new Map();

    // Calculate dangling node contribution (they distribute to all nodes)
    let danglingSum = 0;
    danglingNodes.forEach(nodeId => {
      danglingSum += ranks.get(nodeId) || 0;
    });

    // Calculate new ranks for each node
    graph.nodes.forEach(node => {
      let rank = 0;

      // Sum contributions from incoming links
      // r_i = α * Σ(r_j / L_j) for all j that link to i
      const incoming = inLinks.get(node.id) || [];
      incoming.forEach(sourceId => {
        const sourceOutDegree = outDegree.get(sourceId);
        if (sourceOutDegree > 0) {
          rank += (ranks.get(sourceId) || 0) / sourceOutDegree;
        }
      });

      // Apply damping factor and handle dangling nodes
      // G = αH' + (1-α)(1/n)11^T
      // The dangling contribution is distributed uniformly
      rank = alpha * (rank + danglingSum / n) + (1 - alpha) / n;
      newRanks.set(node.id, rank);
    });

    // Check convergence using L1 norm: ||r^(k+1) - r^k||₁
    let diff = 0;
    graph.nodes.forEach(node => {
      diff += Math.abs((newRanks.get(node.id) || 0) - (ranks.get(node.id) || 0));
    });

    ranks = newRanks;
    history.push({ iteration: iter, ranks: new Map(ranks), convergenceDelta: diff });

    if (diff < epsilon) {
      return { ranks, iterations: iter, history, converged: true, convergenceDelta: diff };
    }
  }

  return {
    ranks,
    iterations: maxIterations,
    history,
    converged: false,
    convergenceDelta: history[history.length - 1].convergenceDelta
  };
}

/**
 * Generator function for step-by-step PageRank computation
 * Yields each iteration for animation purposes
 * @param {Object} graph - { nodes: [{id}], edges: [{source, target}] }
 * @param {number} alpha - Damping factor
 * @param {number} epsilon - Convergence threshold
 */
export function* pageRankGenerator(graph, alpha = 0.85, epsilon = 1e-6) {
  const n = graph.nodes.length;
  if (n === 0) {
    yield { iteration: 0, ranks: new Map(), convergenceDelta: 0, converged: true };
    return;
  }

  // Build adjacency structures
  const outDegree = new Map();
  const inLinks = new Map();

  graph.nodes.forEach(node => {
    outDegree.set(node.id, 0);
    inLinks.set(node.id, []);
  });

  graph.edges.forEach(edge => {
    outDegree.set(edge.source, (outDegree.get(edge.source) || 0) + 1);
    if (inLinks.has(edge.target)) {
      inLinks.get(edge.target).push(edge.source);
    }
  });

  // Identify dangling nodes
  const danglingNodes = graph.nodes
    .filter(node => outDegree.get(node.id) === 0)
    .map(node => node.id);

  // Initialize ranks uniformly
  let ranks = new Map();
  const initialRank = 1 / n;
  graph.nodes.forEach(node => ranks.set(node.id, initialRank));

  // Yield initial state
  yield { iteration: 0, ranks: new Map(ranks), convergenceDelta: 1, converged: false };

  let iteration = 1;
  while (true) {
    const newRanks = new Map();

    // Dangling node contribution
    let danglingSum = 0;
    danglingNodes.forEach(nodeId => {
      danglingSum += ranks.get(nodeId) || 0;
    });

    // Calculate new ranks
    graph.nodes.forEach(node => {
      let rank = 0;

      const incoming = inLinks.get(node.id) || [];
      incoming.forEach(sourceId => {
        const sourceOutDegree = outDegree.get(sourceId);
        if (sourceOutDegree > 0) {
          rank += (ranks.get(sourceId) || 0) / sourceOutDegree;
        }
      });

      rank = alpha * (rank + danglingSum / n) + (1 - alpha) / n;
      newRanks.set(node.id, rank);
    });

    // Calculate L1 norm difference
    let diff = 0;
    graph.nodes.forEach(node => {
      diff += Math.abs((newRanks.get(node.id) || 0) - (ranks.get(node.id) || 0));
    });

    ranks = newRanks;
    const converged = diff < epsilon;

    yield { iteration, ranks: new Map(ranks), convergenceDelta: diff, converged };

    if (converged) {
      return;
    }

    iteration++;
  }
}

/**
 * Compute in-degree centrality (normalized)
 * @param {Object} graph - { nodes, edges }
 * @returns {Map} - nodeId -> normalized in-degree
 */
export function computeInDegreeCentrality(graph) {
  const inDegree = new Map();
  graph.nodes.forEach(node => inDegree.set(node.id, 0));

  graph.edges.forEach(edge => {
    if (inDegree.has(edge.target)) {
      inDegree.set(edge.target, inDegree.get(edge.target) + 1);
    }
  });

  // Normalize by maximum in-degree
  const maxDegree = Math.max(...inDegree.values(), 1);
  const normalized = new Map();
  inDegree.forEach((value, key) => {
    normalized.set(key, value / maxDegree);
  });

  return normalized;
}

/**
 * Compute eigenvector centrality using power iteration
 * @param {Object} graph - { nodes, edges }
 * @param {number} maxIterations - Maximum iterations
 * @param {number} epsilon - Convergence threshold
 * @returns {Map} - nodeId -> eigenvector centrality
 */
export function computeEigenvectorCentrality(graph, maxIterations = 100, epsilon = 1e-6) {
  const n = graph.nodes.length;
  if (n === 0) return new Map();

  // Build adjacency list (incoming links for each node)
  const inLinks = new Map();
  graph.nodes.forEach(node => inLinks.set(node.id, []));

  graph.edges.forEach(edge => {
    if (inLinks.has(edge.target)) {
      inLinks.get(edge.target).push(edge.source);
    }
  });

  // Initialize centrality uniformly
  let centrality = new Map();
  graph.nodes.forEach(node => centrality.set(node.id, 1 / n));

  // Power iteration on adjacency matrix
  for (let iter = 0; iter < maxIterations; iter++) {
    const newCentrality = new Map();
    let sum = 0;

    // x_{i}^{(k+1)} = Σ A_{ij} * x_{j}^{(k)}
    graph.nodes.forEach(node => {
      let value = 0;
      const incoming = inLinks.get(node.id) || [];
      incoming.forEach(sourceId => {
        value += centrality.get(sourceId) || 0;
      });
      newCentrality.set(node.id, value);
      sum += value * value;
    });

    // Normalize to unit length
    const norm = Math.sqrt(sum) || 1;
    let diff = 0;
    graph.nodes.forEach(node => {
      const normalizedValue = newCentrality.get(node.id) / norm;
      diff += Math.abs(normalizedValue - (centrality.get(node.id) || 0));
      newCentrality.set(node.id, normalizedValue);
    });

    centrality = newCentrality;

    if (diff < epsilon) break;
  }

  // Normalize to [0, 1] range for display
  const maxValue = Math.max(...centrality.values(), 0.001);
  const normalized = new Map();
  centrality.forEach((value, key) => {
    normalized.set(key, value / maxValue);
  });

  return normalized;
}

/**
 * Get dangling nodes (nodes with no outgoing edges)
 * @param {Object} graph - { nodes, edges }
 * @returns {string[]} - Array of dangling node IDs
 */
export function getDanglingNodes(graph) {
  const outDegree = new Map();
  graph.nodes.forEach(node => outDegree.set(node.id, 0));

  graph.edges.forEach(edge => {
    outDegree.set(edge.source, (outDegree.get(edge.source) || 0) + 1);
  });

  return graph.nodes
    .filter(node => outDegree.get(node.id) === 0)
    .map(node => node.id);
}
