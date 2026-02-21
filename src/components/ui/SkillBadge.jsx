import { motion } from 'framer-motion';

const tokenColors = {
  keyword: { bg: 'rgba(129,140,248,0.08)', border: 'rgba(129,140,248,0.3)', text: '#818cf8' },
  fn:      { bg: 'rgba(56,189,248,0.08)',  border: 'rgba(56,189,248,0.3)',  text: '#38bdf8' },
  string:  { bg: 'rgba(132,204,22,0.08)',  border: 'rgba(132,204,22,0.3)',  text: '#84cc16' },
  number:  { bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.3)',  text: '#f59e0b' },
  type:    { bg: 'rgba(217,70,239,0.08)',  border: 'rgba(217,70,239,0.3)',  text: '#d946ef' },
};

const SkillBadge = ({ skill, index = 0, tokenType = 'fn', className = '' }) => {
  const colors = tokenColors[tokenType] || tokenColors.fn;

  return (
    <motion.span
      className={`cursor-default font-mono text-sm px-3 py-1.5 rounded-md ${className}`}
      style={{
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        color: colors.text,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{
        scale: 1.05,
        backgroundColor: colors.bg.replace('0.08', '0.18'),
        borderColor: colors.border.replace('0.3', '0.5'),
      }}
    >
      {skill}
    </motion.span>
  );
};

export default SkillBadge;
