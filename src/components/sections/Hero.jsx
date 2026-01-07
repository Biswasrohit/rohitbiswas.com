import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { useTheme } from '../../hooks/useTheme';

const Hero = () => {
  const { isDark } = useTheme();

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(9,9,11,0.5) 100%)'
            : 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(250,250,249,0.7) 100%)',
        }}
      />

      <div className="relative z-10 section-container flex flex-col items-center text-center pt-20">
        {/* Profile Image with Aurora Ring */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Aurora Ring Container - centered on profile pic */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Main aurora ring */}
            <motion.div
              className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px]"
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
                  filter: 'blur(50px)',
                  opacity: isDark ? 0.7 : 0.5,
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
                  filter: 'blur(35px)',
                  opacity: isDark ? 0.8 : 0.6,
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
                  filter: 'blur(15px)',
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
              <div className="absolute inset-[32%] rounded-full bg-zinc-50 dark:bg-zinc-950" />
            </motion.div>
          </div>

          {/* Profile Picture */}
          <div className="relative z-10 w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white dark:border-zinc-800 shadow-2xl">
            <img
              src="/assets/profile-pic.png"
              alt="Rohit Biswas"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Decorative ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-olive-500/30 z-20"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        {/* Name */}
        <motion.h1
          className="relative z-20 text-4xl md:text-6xl lg:text-7xl font-bold text-zinc-900 dark:text-zinc-100 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Rohit <span className="text-gradient">Biswas</span>
        </motion.h1>

        {/* Title */}
        <motion.p
          className="relative z-20 text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Software Developer & CS Student at Columbia
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="relative z-20 flex flex-col sm:flex-row gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            href="/assets/Rohit Biswas Resume.pdf"
            download="Rohit_Biswas_Resume.pdf"
            variant="primary"
            size="lg"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          >
            Download Resume
          </Button>
          <Button
            onClick={scrollToContact}
            variant="outline"
            size="lg"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
          >
            Get in Touch
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="relative z-20 flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <a
            href="https://github.com/Biswasrohit"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-olive-500 hover:text-white transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" clipRule="evenodd"/>
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/rohitbiswas3"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-olive-500 hover:text-white transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            href="mailto:info.biswasrohit@gmail.com"
            className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-olive-500 hover:text-white transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, duration: 1.5, repeat: Infinity }}
        >
          <svg className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
