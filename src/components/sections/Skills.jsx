import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import GlassCard from '../ui/GlassCard';
import SkillBadge from '../ui/SkillBadge';
import { skillCategories } from '../../data/skills';

const Skills = () => {
  return (
    <section id="skills" className="section-container bg-zinc-100/50 dark:bg-zinc-900/50">
      <SectionHeader
        title="Skills & Technologies"
        subtitle="The tools and technologies I use to bring ideas to life"
      />

      <div className="grid md:grid-cols-2 gap-6">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          >
            <GlassCard className="p-6 h-full" animate={false}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  {category.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBadge
                    key={skill}
                    skill={skill}
                    index={skillIndex}
                  />
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
