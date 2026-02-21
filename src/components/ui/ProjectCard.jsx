import { motion } from 'framer-motion';

const ProjectCard = ({ project, index = 0 }) => {
  const { title, description, tags, github, demo, award, image } = project;

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="h-full flex flex-col group dark-panel hover:border-white/15 transition-colors duration-300 overflow-hidden">
        {/* Project Image */}
        {image ? (
          <div className="relative h-48 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            {/* Color tint */}
            <div className="absolute inset-0 bg-[#38bdf8]/5 mix-blend-overlay" />
            {award && (
              <div className="absolute top-3 right-3 px-3 py-1 font-mono text-xs rounded-sm"
                style={{
                  background: 'rgba(0,0,0,0.75)',
                  border: '1px solid rgba(56,189,248,0.5)',
                  color: '#38bdf8',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {award}
              </div>
            )}
          </div>
        ) : (
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#0a0a0a] to-[#111] flex items-center justify-center">
            <span className="font-mono text-white/10 text-6xl">&gt;_</span>
            {award && (
              <div className="absolute top-3 right-3 px-3 py-1 font-mono text-xs rounded-sm"
                style={{
                  background: 'rgba(0,0,0,0.75)',
                  border: '1px solid rgba(56,189,248,0.5)',
                  color: '#38bdf8',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {award}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col p-6">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#38bdf8] transition-colors duration-200" style={{ fontFamily: "'Syne', system-ui, sans-serif" }}>
            {title}
          </h3>

          <p className="text-white/60 text-sm mb-4 flex-1">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 4).map((tag, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-xs font-mono"
                style={{
                  background: 'rgba(56,189,248,0.08)',
                  border: '1px solid rgba(56,189,248,0.2)',
                  color: 'rgba(56,189,248,0.7)',
                  borderRadius: '4px',
                }}
              >
                {tag}
              </span>
            ))}
            {tags.length > 4 && (
              <span className="px-2 py-0.5 text-xs font-mono text-white/30">
                +{tags.length - 4}
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex gap-3">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-dark text-xs px-3 py-1.5"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" clipRule="evenodd"/>
                </svg>
                Code
              </a>
            )}
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow text-xs px-3 py-1.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
