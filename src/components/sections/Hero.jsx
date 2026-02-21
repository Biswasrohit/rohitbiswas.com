import { motion } from 'framer-motion';
import AnimatedBackground from '../effects/AnimatedBackground';
import { useTypewriter } from '../../hooks/useTypewriter';

const Hero = () => {
  const typedText = useTypewriter(
    ['Software Engineer', 'CS @ Columbia', 'Full Stack Builder', 'Hackathon Winner'],
    75,
    2200
  );

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient orb background */}
      <AnimatedBackground />

      <div className="relative z-10 section-container flex flex-col items-center text-center pt-20">
        {/* Pill badge */}
        <motion.div
          className="mb-8 px-4 py-2 rounded-full border border-white/12 bg-white/4 font-mono text-xs text-white/50 tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          // columbia university &middot; cs + systems
        </motion.div>

        {/* Large display name */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6"
          style={{ fontFamily: "'Syne', system-ui, sans-serif", letterSpacing: '-0.03em', lineHeight: 1.05 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          ROHIT{' '}
          <span className="text-gradient-cyber">BISWAS</span>
        </motion.h1>

        {/* Typewriter subtitle */}
        <motion.div
          className="font-mono text-lg md:text-xl text-white/70 mb-10 h-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <span className="text-[#38bdf8]/60 mr-2">&gt;</span>
          {typedText}
          <span className="inline-block w-0.5 h-5 bg-[#38bdf8] ml-1 align-middle animate-cursor-blink" />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <a
            href="/assets/Rohit Biswas Resume.pdf"
            download="Rohit_Biswas_Resume.pdf"
            className="btn-glow"
          >
            <span className="text-white/40 mr-1">$</span> download resume
          </a>
          <button
            onClick={scrollToContact}
            className="btn-ghost-dark"
          >
            <span className="text-white/30 mr-1">//</span> get in touch
          </button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          {[
            {
              href: 'https://github.com/Biswasrohit',
              label: 'GitHub',
              icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" clipRule="evenodd"/>
                </svg>
              ),
            },
            {
              href: 'https://linkedin.com/in/rohitbiswas3',
              label: 'LinkedIn',
              icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              ),
            },
            {
              href: 'mailto:info.biswasrohit@gmail.com',
              label: 'Email',
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ),
            },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('mailto') ? undefined : '_blank'}
              rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="p-3 rounded-full border border-white/10 text-white/40 hover:text-white/90 hover:bg-[#38bdf8]/10 hover:border-[#38bdf8]/30 transition-colors duration-200"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-white/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        >
          scroll()
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
