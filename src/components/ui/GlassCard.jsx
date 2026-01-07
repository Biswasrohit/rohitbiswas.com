import { motion } from 'framer-motion';

const GlassCard = ({
  children,
  className = '',
  variant = 'default',
  hover = true,
  animate = true,
  ...props
}) => {
  const variants = {
    default: 'glass-card',
    solid: 'backdrop-blur-xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/50 dark:border-zinc-700/50 rounded-2xl shadow-lg',
    transparent: 'backdrop-blur-md bg-white/30 dark:bg-zinc-900/30 border border-white/20 dark:border-white/10 rounded-2xl',
  };

  const hoverEffects = hover ? 'hover:shadow-xl hover:shadow-olive-500/10 hover:border-olive-500/30 transition-all duration-300' : '';

  const Component = animate ? motion.div : 'div';
  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.5, ease: 'easeOut' },
  } : {};

  return (
    <Component
      className={`${variants[variant]} ${hoverEffects} ${className}`}
      {...animationProps}
      {...props}
    >
      {children}
    </Component>
  );
};

export default GlassCard;
