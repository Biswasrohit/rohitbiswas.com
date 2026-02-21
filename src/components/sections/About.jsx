import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';

const terminalLines = [
  { type: 'command', text: '$ cat about.txt' },
  { type: 'blank' },
  { key: 'name', value: '"Rohit Biswas"', tokenType: 'string' },
  { key: 'role', value: '"Software Engineer · CS Student"', tokenType: 'string' },
  { key: 'location', value: '"New York, NY"', tokenType: 'string' },
  { key: 'school', value: '"Columbia University (B.S. CS, May 2027)"', tokenType: 'string' },
  { key: 'prev', value: '"Fordham University (B.S. Engineering Physics)"', tokenType: 'string' },
  { type: 'blank' },
  { key: 'passion', value: '["software dev", "hardware", "cybersecurity"]', tokenType: 'array' },
  { key: 'wins', value: '["DevFest 2026 Winner (YC Interview)", "MLH Award @ DivHacks", "3rd Place @ MakeCU"]', tokenType: 'array' },
  { key: 'stats', value: '{ projects: "10+", years_coding: "4+", hackathon_wins: 3 }', tokenType: 'object' },
  { type: 'blank' },
  { key: 'bio', value: '"""', tokenType: 'string', multiStart: true },
  { type: 'bio', text: '  CS student at Columbia with a background in Engineering Physics.' },
  { type: 'bio', text: '  Builds robots, web apps, and CI/CD pipelines.' },
  { type: 'bio', text: '  Passionate about the intersection of software and hardware.' },
  { type: 'bioEnd', text: '"""' },
];

const highlights = [
  { label: 'Years Coding', value: '4+' },
  { label: 'Projects Built', value: '10+' },
  { label: 'Hackathon Wins', value: '3' },
];

const About = () => {
  return (
    <section id="about" className="section-container">
      <SectionHeader
        title="About Me"
        subtitle="Get to know a bit more about my background and what drives me"
        index="01 · about"
      />

      {/* Terminal Window */}
      <motion.div
        className="terminal-chrome max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
      >
        {/* Title bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="font-mono text-xs text-white/30 ml-2">rohit@columbia:~$ whoami</span>
        </div>

        {/* Terminal body with profile pic */}
        <div className="flex flex-col md:flex-row gap-6 p-6">
          {/* Terminal output */}
          <div className="flex-1 font-mono text-sm leading-relaxed space-y-1">
            {terminalLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                {line.type === 'command' && (
                  <span className="text-white/60">{line.text}</span>
                )}
                {line.type === 'blank' && <div className="h-3" />}
                {line.key && (
                  <div className="flex">
                    <span className="text-[#38bdf8]/60 mr-1">&gt;</span>
                    <span className="token-keyword mr-2">{line.key}:</span>
                    <span className={line.tokenType === 'string' ? 'token-string' : line.tokenType === 'array' ? 'token-fn' : 'token-number'}>
                      {line.value}
                    </span>
                  </div>
                )}
                {line.type === 'bio' && (
                  <div className="flex">
                    <span className="text-[#38bdf8]/60 mr-1">&gt;</span>
                    <span className="token-string">{line.text}</span>
                  </div>
                )}
                {line.type === 'bioEnd' && (
                  <div className="flex">
                    <span className="text-[#38bdf8]/60 mr-1">&gt;</span>
                    <span className="token-string">{line.text}</span>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Blinking cursor */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="flex items-center mt-2"
            >
              <span className="text-[#38bdf8]/60 mr-1">&gt;</span>
              <span className="inline-block w-2 h-4 bg-[#38bdf8] animate-cursor-blink" />
            </motion.div>
          </div>

          {/* Profile picture */}
          <motion.div
            className="hidden md:flex flex-col items-center justify-center gap-3"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative">
              <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-[#38bdf8]/30"
                style={{ boxShadow: '0 0 30px rgba(56,189,248,0.15)' }}
              >
                <img
                  src="/assets/about-pic.png"
                  alt="Rohit Biswas"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full border border-[#38bdf8]/20 animate-glow-pulse pointer-events-none" />
            </div>
            <span className="font-mono text-xs text-white/30">profile.png</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mt-10">
        {highlights.map((item, index) => (
          <motion.div
            key={index}
            className="dark-panel p-5 text-center hover:border-[#38bdf8]/20 transition-colors duration-300"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <p className="text-2xl md:text-3xl font-bold text-gradient-cyber inline-block">
              {item.value}
            </p>
            <p className="font-mono text-xs text-white/44 mt-1">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default About;
