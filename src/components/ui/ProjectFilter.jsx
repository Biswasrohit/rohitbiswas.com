import { motion } from 'framer-motion';

const ProjectFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-3 mb-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {categories.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-2 rounded-sm font-mono text-sm transition-colors duration-200 ${
            activeCategory === category.id
              ? 'bg-white/8 border border-white/20 text-white shadow-[0_0_12px_rgba(56,189,248,0.2)]'
              : 'bg-transparent border border-white/8 text-white/40 hover:border-white/20 hover:text-white/70'
          }`}
          whileTap={{ scale: 0.95 }}
        >
          {category.label}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default ProjectFilter;
