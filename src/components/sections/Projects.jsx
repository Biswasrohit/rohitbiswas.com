import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import ProjectCard from '../ui/ProjectCard';
import ProjectFilter from '../ui/ProjectFilter';
import { projects, projectCategories, filterProjects } from '../../data/projects';

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = filterProjects(projects, activeCategory);

  return (
    <section id="projects" className="section-container">
      <SectionHeader
        title="Projects"
        subtitle="A selection of projects I've built, from web apps to robots"
      />

      <ProjectFilter
        categories={projectCategories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <motion.p
          className="text-center text-zinc-500 dark:text-zinc-400 py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No projects found in this category.
        </motion.p>
      )}
    </section>
  );
};

export default Projects;
