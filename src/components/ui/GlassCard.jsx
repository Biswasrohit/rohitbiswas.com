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
    default: 'dark-panel',
    elevated: 'dark-panel-elevated',
    terminal: 'terminal-chrome',
    solid: 'dark-panel-elevated',
    transparent: 'dark-panel',
  };

  const hoverEffects = hover
    ? 'hover:border-white/15 transition-colors duration-300'
    : '';

  const Component = animate ? motion.div : 'div';
  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.5, ease: 'easeOut' },
  } : {};

  return (
    <Component
      className={`${variants[variant] || variants.default} ${hoverEffects} ${className}`}
      {...animationProps}
      {...props}
    >
      {children}
    </Component>
  );
};

export default GlassCard;
