export const skillCategories = [
  {
    id: 'languages',
    title: 'Languages',
    icon: '💻',
    skills: ['C', 'C++', 'Python', 'Java', 'SQL (PostgreSQL)', 'JavaScript', 'HTML/CSS'],
  },
  {
    id: 'frameworks',
    title: 'Frameworks & Libraries',
    icon: '🛠️',
    skills: ['React', 'Node.js', 'Flask', 'FastAPI', 'OpenCV', 'NumPy', 'pandas', 'Matplotlib'],
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: '⚙️',
    skills: ['Git', 'Docker', 'Kubernetes', 'Bash', 'PowerShell', 'Linux/UNIX', 'Splunk', 'Veracode', 'Supabase'],
  },
];

export const getAllSkills = () => {
  return skillCategories.flatMap(category => category.skills);
};
