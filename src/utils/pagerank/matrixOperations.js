/**
 * Matrix Operations for PageRank Visualization
 * Builds the hyperlink matrix H, corrected matrix H', and Google matrix G
 */

/**
 * Build the raw hyperlink matrix H
 * H[i][j] = 1/L_j if there's an edge from j to i, 0 otherwise
 * where L_j is the out-degree of node j
 *
 * @param {Object} graph - { nodes, edges }
 * @returns {Object} - { matrix, nodeIds, nodeIndex }
 */
export function buildHyperlinkMatrix(graph) {
  const n = graph.nodes.length;
  if (n === 0) return { matrix: [], nodeIds: [], nodeIndex: new Map() };

  // Create node index mapping
  const nodeIds = graph.nodes.map(node => node.id);
  const nodeIndex = new Map();
  nodeIds.forEach((id, i) => nodeIndex.set(id, i));

  // Calculate out-degrees
  const outDegree = new Map();
  graph.nodes.forEach(node => outDegree.set(node.id, 0));
  graph.edges.forEach(edge => {
    outDegree.set(edge.source, (outDegree.get(edge.source) || 0) + 1);
  });

  // Initialize H as n x n zero matrix
  const H = Array(n).fill(null).map(() => Array(n).fill(0));

  // Fill in transition probabilities
  graph.edges.forEach(edge => {
    const i = nodeIndex.get(edge.target); // row (destination)
    const j = nodeIndex.get(edge.source); // column (source)
    const degree = outDegree.get(edge.source);
    if (i !== undefined && j !== undefined && degree > 0) {
      H[i][j] = 1 / degree;
    }
  });

  return { matrix: H, nodeIds, nodeIndex };
}

/**
 * Build the corrected hyperlink matrix H'
 * Replaces zero columns (dangling nodes) with uniform distribution 1/n
 *
 * @param {number[][]} H - Original hyperlink matrix
 * @returns {number[][]} - Corrected matrix H'
 */
export function buildCorrectedMatrix(H) {
  const n = H.length;
  if (n === 0) return [];

  const HPrime = H.map(row => [...row]);

  // Find columns that sum to zero (dangling nodes)
  for (let j = 0; j < n; j++) {
    let colSum = 0;
    for (let i = 0; i < n; i++) {
      colSum += H[i][j];
    }

    // If column sums to 0, replace with uniform distribution
    if (colSum === 0) {
      for (let i = 0; i < n; i++) {
        HPrime[i][j] = 1 / n;
      }
    }
  }

  return HPrime;
}

/**
 * Build the Google matrix G
 * G = αH' + (1-α)(1/n)11^T
 *
 * @param {number[][]} HPrime - Corrected hyperlink matrix
 * @param {number} alpha - Damping factor
 * @returns {number[][]} - Google matrix G
 */
export function buildGoogleMatrix(HPrime, alpha = 0.85) {
  const n = HPrime.length;
  if (n === 0) return [];

  const teleport = (1 - alpha) / n;

  const G = HPrime.map(row =>
    row.map(value => alpha * value + teleport)
  );

  return G;
}

/**
 * Convenience function to build all matrices from a graph
 * @param {Object} graph - { nodes, edges }
 * @param {number} alpha - Damping factor
 * @returns {Object} - { H, HPrime, G, nodeIds, nodeIndex }
 */
export function buildAllMatrices(graph, alpha = 0.85) {
  const { matrix: H, nodeIds, nodeIndex } = buildHyperlinkMatrix(graph);
  const HPrime = buildCorrectedMatrix(H);
  const G = buildGoogleMatrix(HPrime, alpha);

  return { H, HPrime, G, nodeIds, nodeIndex };
}

/**
 * Format a number for matrix display
 * @param {number} value - Number to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted string
 */
export function formatMatrixValue(value, decimals = 3) {
  if (value === 0) return '0';
  if (value === 1) return '1';
  return value.toFixed(decimals);
}

/**
 * Check if a matrix is column-stochastic (columns sum to 1)
 * @param {number[][]} matrix - Matrix to check
 * @param {number} tolerance - Tolerance for floating point comparison
 * @returns {boolean}
 */
export function isColumnStochastic(matrix, tolerance = 1e-10) {
  const n = matrix.length;
  if (n === 0) return true;

  for (let j = 0; j < n; j++) {
    let colSum = 0;
    for (let i = 0; i < n; i++) {
      colSum += matrix[i][j];
    }
    if (Math.abs(colSum - 1) > tolerance) {
      return false;
    }
  }
  return true;
}

/**
 * Multiply a matrix by a vector (for verification)
 * @param {number[][]} matrix - n x n matrix
 * @param {number[]} vector - n-dimensional vector
 * @returns {number[]} - Result vector
 */
export function matrixVectorMultiply(matrix, vector) {
  const n = matrix.length;
  const result = Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      result[i] += matrix[i][j] * vector[j];
    }
  }

  return result;
}
