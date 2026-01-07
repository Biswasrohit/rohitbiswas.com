import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const AnimatedBackground = ({ children, className = '' }) => {
  const { isDark } = useTheme();

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-30"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(107,142,35,0.4) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(107,142,35,0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(107,142,35,0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(107,142,35,0.25) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-10"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(107,142,35,0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(107,142,35,0.2) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground;
