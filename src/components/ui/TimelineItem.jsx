import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

const TimelineItem = ({ item, index = 0, isLast = false }) => {
  const { role, company, location, period, description, technologies, current } = item;

  return (
    <div className="relative flex gap-6 pb-12">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[11px] top-8 bottom-0 w-0.5 bg-gradient-to-b from-olive-500 to-zinc-200 dark:to-zinc-800" />
      )}

      {/* Timeline dot */}
      <motion.div
        className={`relative z-10 flex-shrink-0 w-6 h-6 rounded-full border-4 ${
          current
            ? 'bg-olive-500 border-olive-200 dark:border-olive-900'
            : 'bg-zinc-200 dark:bg-zinc-700 border-zinc-100 dark:border-zinc-800'
        }`}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        {current && (
          <motion.div
            className="absolute inset-0 rounded-full bg-olive-500"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Content card */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <GlassCard className="p-6" animate={false}>
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {role}
              </h3>
              <p className="text-olive-600 dark:text-olive-400 font-medium">
                {company}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {period}
              </p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500">
                {location}
              </p>
            </div>
          </div>

          {/* Description */}
          <ul className="space-y-2 mb-4">
            {description.map((point, i) => (
              <li key={i} className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <span className="text-olive-500 flex-shrink-0 mt-1">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs font-medium bg-olive-500/10 text-olive-600 dark:text-olive-400 rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default TimelineItem;
