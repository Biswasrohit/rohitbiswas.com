import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';

/**
 * ControlPanel component - Algorithm controls and status display
 *
 * @param {Object} props
 * @param {number} props.alpha - Current damping factor
 * @param {string} props.speed - Current animation speed
 * @param {boolean} props.isRunning - Whether animation is running
 * @param {number} props.iteration - Current iteration number
 * @param {number} props.convergenceDelta - Current L1 norm difference
 * @param {boolean} props.isConverged - Whether algorithm has converged
 * @param {Function} props.onAlphaChange - Handler for damping factor change
 * @param {Function} props.onSpeedChange - Handler for speed change
 * @param {Function} props.onStart - Handler for start button
 * @param {Function} props.onPause - Handler for pause button
 * @param {Function} props.onStep - Handler for step button
 * @param {Function} props.onReset - Handler for reset button
 */
const ControlPanel = ({
  alpha,
  speed,
  isRunning,
  iteration,
  convergenceDelta,
  isConverged,
  onAlphaChange,
  onSpeedChange,
  onStart,
  onPause,
  onStep,
  onReset,
}) => {
  return (
    <GlassCard className="p-4" animate={false}>
      <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
        Algorithm Controls
      </h3>

      {/* Status Display */}
      <div className="mb-4 p-3 bg-zinc-100/80 dark:bg-zinc-800/80 rounded-lg space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">Iteration</span>
          <span className="font-mono font-bold text-olive-600 dark:text-olive-400">
            {iteration}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">L1 Norm Δ</span>
          <span className="font-mono text-sm text-zinc-700 dark:text-zinc-300">
            {convergenceDelta.toExponential(2)}
          </span>
        </div>
        {isConverged && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-sm text-green-600 dark:text-green-400 bg-green-100/50 dark:bg-green-900/30 rounded-md py-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Converged!
          </motion.div>
        )}
      </div>

      {/* Damping Factor Slider */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Damping Factor (α): <span className="font-mono text-olive-600 dark:text-olive-400">{alpha.toFixed(2)}</span>
        </label>
        <input
          type="range"
          min="0.5"
          max="0.99"
          step="0.01"
          value={alpha}
          onChange={(e) => onAlphaChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-olive-500"
        />
        <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          <span>0.50</span>
          <span className="text-olive-500">0.85</span>
          <span>0.99</span>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
          Higher α = more weight to link structure, slower convergence
        </p>
      </div>

      {/* Speed Control */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Animation Speed
        </label>
        <div className="flex gap-2">
          {['slow', 'normal', 'fast'].map((s) => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                speed === s
                  ? 'bg-olive-500 text-white shadow-md'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex gap-2">
        <motion.button
          onClick={isRunning ? onPause : onStart}
          disabled={isConverged}
          className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
            isConverged
              ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-400 cursor-not-allowed'
              : 'bg-olive-500 hover:bg-olive-600 text-white shadow-md hover:shadow-lg'
          }`}
          whileTap={!isConverged ? { scale: 0.95 } : {}}
        >
          {isRunning ? (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Pause
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Play
            </>
          )}
        </motion.button>

        <motion.button
          onClick={onStep}
          disabled={isRunning || isConverged}
          className={`py-2.5 px-4 rounded-lg font-medium transition-all duration-200 ${
            isRunning || isConverged
              ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-400 cursor-not-allowed'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-600'
          }`}
          whileTap={!(isRunning || isConverged) ? { scale: 0.95 } : {}}
        >
          Step
        </motion.button>

        <motion.button
          onClick={onReset}
          className="py-2.5 px-4 rounded-lg font-medium transition-all duration-200 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-600"
          whileTap={{ scale: 0.95 }}
        >
          Reset
        </motion.button>
      </div>
    </GlassCard>
  );
};

export default ControlPanel;
