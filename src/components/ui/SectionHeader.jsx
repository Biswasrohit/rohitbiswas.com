import { motion } from 'framer-motion';

const SectionHeader = ({
  title,
  subtitle,
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
      <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
        {title}
        <motion.span
          className="block h-1 w-20 bg-gradient-to-r from-olive-500 to-olive-600 rounded-full mt-4 mx-auto"
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ marginLeft: align === 'left' ? 0 : align === 'right' ? 'auto' : 'auto', marginRight: align === 'right' ? 0 : align === 'left' ? 'auto' : 'auto' }}
        />
      </h2>
      {subtitle && (
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
