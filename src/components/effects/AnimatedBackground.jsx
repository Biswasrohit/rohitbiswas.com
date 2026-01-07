import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const AnimatedBackground = ({ className = '' }) => {
  const { isDark } = useTheme();

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Base dark/light background */}
      <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-950" />

      {/* Aurora container - positioned to align with profile picture */}
      <div className="absolute inset-0 flex items-start justify-center pt-[10vh] md:pt-[12vh]">
        {/* Main aurora ring */}
        <motion.div
          className="relative w-[600px] h-[600px] md:w-[800px] md:h-[800px]"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: isDark
                ? 'conic-gradient(from 0deg, #6B8E23, #4a6b1a, #8fbc3b, #3d5a14, #a8c256, #2d4410, #6B8E23)'
                : 'conic-gradient(from 0deg, #6B8E23, #8fbc3b, #b7c089, #9da865, #d3d9b5, #6B8E23)',
              filter: 'blur(60px)',
              opacity: isDark ? 0.6 : 0.4,
            }}
            animate={{
              scale: [1, 1.05, 0.95, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Middle ring with more definition */}
          <motion.div
            className="absolute inset-[15%] rounded-full"
            style={{
              background: isDark
                ? 'conic-gradient(from 180deg, #4a6b1a, #6B8E23, #8fbc3b, #6B8E23, #3d5a14, #6B8E23, #4a6b1a)'
                : 'conic-gradient(from 180deg, #9da865, #6B8E23, #b7c089, #8fbc3b, #d3d9b5, #6B8E23, #9da865)',
              filter: 'blur(40px)',
              opacity: isDark ? 0.7 : 0.5,
            }}
            animate={{
              scale: [0.95, 1.02, 0.98, 0.95],
              rotate: [0, -30, 30, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Inner dark cutout to create ring effect */}
          <motion.div
            className="absolute inset-[30%] rounded-full bg-zinc-50 dark:bg-zinc-950"
            style={{
              filter: 'blur(20px)',
            }}
            animate={{
              scale: [1, 1.05, 0.95, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Sharp inner edge */}
          <div
            className="absolute inset-[32%] rounded-full bg-zinc-50 dark:bg-zinc-950"
          />
        </motion.div>

        {/* Secondary floating orbs for depth */}
        <motion.div
          className="absolute w-32 h-32 rounded-full"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(107,142,35,0.4) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(107,142,35,0.3) 0%, transparent 70%)',
            filter: 'blur(30px)',
            top: '20%',
            right: '25%',
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.3, 0.8, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute w-24 h-24 rounded-full"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(143,188,59,0.3) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(143,188,59,0.25) 0%, transparent 70%)',
            filter: 'blur(25px)',
            bottom: '25%',
            left: '20%',
          }}
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 30, -20, 0],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Subtle accent orb */}
        <motion.div
          className="absolute w-40 h-40 rounded-full"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(168,194,86,0.2) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(168,194,86,0.15) 0%, transparent 70%)',
            filter: 'blur(35px)',
            top: '60%',
            right: '15%',
          }}
          animate={{
            x: [0, 30, -50, 0],
            y: [0, -30, 40, 0],
            scale: [1.2, 1, 1.1, 1.2],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Noise texture overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette effect */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(9,9,11,0.4) 100%)'
            : 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(250,250,249,0.6) 100%)',
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
