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
        <h3 className="font-semibold font-display text-white/85">
          Example Graphs
        </h3>
        <p className="text-xs text-white/50">
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
                ? 'bg-arc-cyan/15 border-2 border-arc-cyan text-white'
                : 'bg-surface-2/80 border-2 border-transparent hover:border-arc-cyan/50 text-white/70'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="font-medium text-sm">{preset.name}</div>
            <div className="text-xs text-white/50 mt-0.5 line-clamp-2">
              {preset.description}
            </div>
          </motion.button>
        ))}

        {/* Clear button */}
        <motion.button
          onClick={onClear}
          className="p-3 rounded-lg transition-all duration-200 bg-surface-2/80 border-2 border-dashed border-border-default hover:border-border-bright text-white/50"
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
