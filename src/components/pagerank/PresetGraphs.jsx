import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { presetList } from '../../data/presetGraphs';

/**
 * PresetGraphs component - Horizontal row of preset graph selectors
 *
 * @param {Object} props
 * @param {string} props.selectedPreset - Currently selected preset ID
 * @param {Function} props.onSelect - Handler for preset selection
 * @param {Function} props.onClear - Handler for clearing the graph
 */
const PresetGraphs = ({ selectedPreset, onSelect, onClear }) => {
  return (
    <GlassCard className="p-4" animate={false}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
          Example Graphs
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Click canvas to add nodes, drag handles to create edges
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {presetList.map((preset) => (
          <motion.button
            key={preset.id}
            onClick={() => onSelect(preset.id)}
            className={`text-left p-3 rounded-lg transition-all duration-200 ${
              selectedPreset === preset.id
                ? 'bg-olive-500/20 border-2 border-olive-500 text-olive-700 dark:text-olive-300'
                : 'bg-zinc-100/80 dark:bg-zinc-800/80 border-2 border-transparent hover:border-olive-300 dark:hover:border-olive-700 text-zinc-700 dark:text-zinc-300'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="font-medium text-sm">{preset.name}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-2">
              {preset.description}
            </div>
          </motion.button>
        ))}

        {/* Clear button */}
        <motion.button
          onClick={onClear}
          className="p-3 rounded-lg transition-all duration-200 bg-zinc-100/80 dark:bg-zinc-800/80 border-2 border-dashed border-zinc-300 dark:border-zinc-600 hover:border-zinc-400 dark:hover:border-zinc-500 text-zinc-600 dark:text-zinc-400"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="font-medium text-sm">Clear Graph</div>
          <div className="text-xs mt-0.5">Empty canvas</div>
        </motion.button>
      </div>
    </GlassCard>
  );
};

export default PresetGraphs;
