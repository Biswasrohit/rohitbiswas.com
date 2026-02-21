import { motion } from 'framer-motion';

const SectionHeader = ({
  title,
  subtitle,
  index = '',
  align = 'center',
  className = ''
}) => {
  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <motion.div
      className={`mb-12 ${alignments[align]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      {index && (
        <p className="font-mono text-xs text-[#38bdf8]/60 mb-3 uppercase tracking-widest">
          // {index}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Syne', system-ui, sans-serif", letterSpacing: '-0.03em' }}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-white/50 max-w-2xl" style={{ marginLeft: align === 'center' ? 'auto' : undefined, marginRight: align === 'center' ? 'auto' : undefined }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
