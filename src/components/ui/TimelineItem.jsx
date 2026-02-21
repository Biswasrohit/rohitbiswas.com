import { motion } from 'framer-motion';

const TimelineItem = ({ item, index = 0, isLast = false }) => {
  const { role, company, location, period, description, technologies, current } = item;

  return (
    <div className="relative flex gap-6 pb-12">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[11px] top-8 bottom-0 w-px bg-white/8" />
      )}

      {/* Timeline dot */}
      <motion.div
        className={`relative z-10 flex-shrink-0 w-6 h-6 rounded-full border-2 ${
          current
            ? 'bg-[#38bdf8] border-[#38bdf8]/30'
            : 'bg-white/15 border-white/10'
        }`}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        {current && (
          <motion.div
            className="absolute inset-0 rounded-full bg-[#38bdf8]"
            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity }}
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
        <div className="dark-panel p-6 hover:border-white/15 transition-colors duration-300">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
            <div>
              <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Syne', system-ui, sans-serif" }}>
                {role}
              </h3>
              <p className="font-mono text-sm text-[#38bdf8]/70">
                {company}
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-xs text-white/44">
                {period}
              </p>
              <p className="font-mono text-xs text-white/28">
                {location}
              </p>
            </div>
          </div>

          {/* Description */}
          <ul className="space-y-2 mb-4">
            {description.map((point, i) => (
              <li key={i} className="flex gap-2 text-sm text-white/60">
                <span className="text-[#38bdf8]/60 flex-shrink-0 mt-0.5 font-mono text-xs">//</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs font-mono"
                style={{
                  background: 'rgba(245,158,11,0.08)',
                  border: '1px solid rgba(245,158,11,0.25)',
                  color: '#f59e0b',
                  borderRadius: '4px',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TimelineItem;
