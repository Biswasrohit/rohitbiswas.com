import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import GlassCard from '../ui/GlassCard';
import { education } from '../../data/education';

const Education = () => {
  return (
    <section id="education" className="section-container bg-zinc-100/50 dark:bg-zinc-900/50">
      <SectionHeader
        title="Education"
        subtitle="My academic background and qualifications"
      />

      <div className="max-w-3xl mx-auto space-y-6">
        {education.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <GlassCard className="p-6" animate={false}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-olive-500/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-olive-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                        {item.degree}
                      </h3>
                      <p className="text-olive-600 dark:text-olive-400 font-medium">
                        {item.institution}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-left md:text-right">
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    {item.period}
                  </p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">
                    {item.location}
                  </p>
                  {item.current && (
                    <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-olive-500/10 text-olive-600 dark:text-olive-400 rounded-full">
                      Current
                    </span>
                  )}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;
