import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { education } from '../../data/education';

const Education = () => {
  return (
    <section id="education" style={{ background: '#060606' }} className="section-container">
      <SectionHeader
        title="Education"
        subtitle="My academic background and qualifications"
        index="04 · education"
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
            <div className="dark-panel-elevated p-6 hover:border-white/15 transition-colors duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <p className="font-mono text-xs text-white/30 mb-2">$ edu --degree</p>
                  <h3
                    className="text-xl font-bold text-white mb-1"
                    style={{ fontFamily: "'Syne', system-ui, sans-serif" }}
                  >
                    {item.degree}
                  </h3>
                  <p className="font-mono text-sm text-[#38bdf8]/70">
                    {item.institution}
                  </p>
                </div>

                <div className="text-left md:text-right">
                  <p className="font-mono text-xs text-white/44">
                    {item.period}
                  </p>
                  <p className="font-mono text-xs text-white/28 mt-0.5">
                    {item.location}
                  </p>
                  {item.current && (
                    <span
                      className="inline-block mt-2 px-2 py-0.5 font-mono text-xs rounded-sm"
                      style={{
                        background: 'rgba(56,189,248,0.10)',
                        border: '1px solid rgba(56,189,248,0.30)',
                        color: '#38bdf8',
                      }}
                    >
                      Current
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;
