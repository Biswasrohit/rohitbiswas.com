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
          className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
            activeCategory === category.id
              ? 'bg-olive-500 text-white shadow-lg shadow-olive-500/25'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {category.label}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default ProjectFilter;
