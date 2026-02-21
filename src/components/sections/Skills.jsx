import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import SkillBadge from '../ui/SkillBadge';
import { skillCategories } from '../../data/skills';

const tabConfig = {
  languages: { file: 'languages.ts', tokenType: 'keyword' },
  frameworks: { file: 'frameworks.ts', tokenType: 'fn' },
  infrastructure: { file: 'infra.ts', tokenType: 'number' },
  specialties: { file: 'specialties.ts', tokenType: 'type' },
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState(skillCategories[0]?.id || 'languages');
  const activeCategory = skillCategories.find((c) => c.id === activeTab);

  return (
    <section id="skills" className="section-container" style={{ background: '#060606' }}>
      <SectionHeader
        title="Skills & Technologies"
        subtitle="The tools and technologies I use to bring ideas to life"
        index="02 · skills"
      />

      <motion.div
        className="dark-panel overflow-hidden max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
      >
        {/* Tab bar */}
        <div className="flex border-b border-white/8 bg-[#0d0d0d]">
          {skillCategories.map((category) => {
            const config = tabConfig[category.id] || { file: `${category.id}.ts`, tokenType: 'fn' };
            const isActive = activeTab === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-5 py-3 font-mono text-sm transition-colors duration-200 relative ${
                  isActive
                    ? 'text-white bg-black'
                    : 'text-white/40 hover:text-white/60 hover:bg-white/3'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#38bdf8]" />
                )}
                <span className="text-white/20 mr-1.5">
                  {category.id === 'languages' ? '◆' : category.id === 'frameworks' ? '◇' : category.id === 'infrastructure' ? '○' : '▸'}
                </span>
                {config.file}
              </button>
            );
          })}
        </div>

        {/* Panel body */}
        <div className="p-6 min-h-[160px]">
          <AnimatePresence mode="wait">
            {activeCategory && (
              <motion.div
                key={activeCategory.id}
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {activeCategory.skills.map((skill, skillIndex) => (
                  <SkillBadge
                    key={skill}
                    skill={skill}
                    index={skillIndex}
                    tokenType={tabConfig[activeCategory.id]?.tokenType || 'fn'}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
