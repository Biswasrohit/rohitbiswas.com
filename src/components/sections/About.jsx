import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import GlassCard from '../ui/GlassCard';

const About = () => {
  const highlights = [
    { label: 'Years Coding', value: '4+' },
    { label: 'Projects Built', value: '10+' },
    { label: 'Hackathon Wins', value: '2' },
  ];

  return (
    <section id="about" className="section-container">
      <SectionHeader
        title="About Me"
        subtitle="Get to know a bit more about my background and what drives me"
      />

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Image Side */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div className="w-full aspect-square max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/assets/about-pic.png"
                alt="Rohit Biswas"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-2xl bg-olive-500/20" />
            <div className="absolute -z-20 -bottom-8 -right-8 w-full h-full rounded-2xl bg-olive-500/10" />
          </div>
        </motion.div>

        {/* Content Side */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="space-y-4 text-zinc-600 dark:text-zinc-400">
            <p className="text-lg leading-relaxed">
              I'm a <span className="text-olive-500 font-semibold">Computer Science student at Columbia University</span> with a background in Engineering Physics from Fordham University. My passion lies at the intersection of software development, hardware engineering, and cybersecurity.
            </p>
            <p className="text-lg leading-relaxed">
              With experience ranging from building autonomous robots to developing full-stack web applications, I thrive on solving complex problems and creating innovative solutions. I've won hackathons, contributed to enterprise IT systems, and worked on cybersecurity incident response.
            </p>
            <p className="text-lg leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, participating in hackathons, or working on personal projects that push the boundaries of what's possible.
            </p>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            {highlights.map((item, index) => (
              <GlassCard
                key={index}
                className="p-4 text-center"
                animate={false}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <p className="text-2xl md:text-3xl font-bold text-olive-500">
                    {item.value}
                  </p>
                  <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
                    {item.label}
                  </p>
                </motion.div>
              </GlassCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
