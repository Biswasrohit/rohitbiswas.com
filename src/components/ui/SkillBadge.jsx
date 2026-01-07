import { motion } from 'framer-motion';

const SkillBadge = ({ skill, index = 0, className = '' }) => {
  return (
    <motion.span
      className={`skill-badge cursor-default ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.05, backgroundColor: 'rgba(107, 142, 35, 0.3)' }}
    >
      {skill}
    </motion.span>
  );
};

export default SkillBadge;
