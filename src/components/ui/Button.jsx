import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  download,
  onClick,
  disabled = false,
  icon,
  ...props
}) => {
  const variants = {
    primary: 'btn-glow',
    outline: 'btn-ghost-dark',
    ghost: 'text-white/50 hover:text-white/80 font-mono text-sm',
    secondary: 'dark-panel text-white/70 hover:text-white font-mono text-sm',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const baseStyles = `
    inline-flex items-center justify-center gap-2
    rounded-md font-medium
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        download={download}
        className={combinedClassName}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        {...props}
      >
        {icon && <span className="w-5 h-5">{icon}</span>}
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button;
