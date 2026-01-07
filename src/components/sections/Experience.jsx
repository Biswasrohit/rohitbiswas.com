import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import TimelineItem from '../ui/TimelineItem';
import { experience } from '../../data/experience';

const Experience = () => {
  return (
    <section id="experience" className="section-container">
      <SectionHeader
        title="Work Experience"
        subtitle="My professional journey and the impact I've made"
      />

      <div className="max-w-3xl mx-auto">
        {experience.map((item, index) => (
          <TimelineItem
            key={item.id}
            item={item}
            index={index}
            isLast={index === experience.length - 1}
          />
        ))}
      </div>
    </section>
  );
};

export default Experience;
