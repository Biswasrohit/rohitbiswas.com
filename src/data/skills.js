export const skillCategories = [
  {
    id: 'languages',
    title: 'Languages',
    icon: '💻',
    skills: ['C', 'C++', 'Python', 'Java', 'SQL', 'JavaScript', 'HTML/CSS'],
  },
  {
    id: 'frameworks',
    title: 'Frameworks',
    icon: '🛠️',
    skills: ['React', 'Node.js', 'Flask', 'FastAPI'],
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: '⚙️',
    skills: ['Git', 'Docker', 'Bash', 'PowerShell', 'Linux/UNIX', 'Splunk', 'Veracode', 'Supabase'],
  },
  {
    id: 'libraries',
    title: 'Libraries',
    icon: '📚',
    skills: ['OpenCV', 'NumPy', 'pandas', 'Matplotlib'],
  },
];

export const getAllSkills = () => {
  return skillCategories.flatMap(category => category.skills);
};
