export const projects = [
  {
    id: 1,
    title: 'PlanYourDates',
    description: 'A shareable date planning platform that allows users to create beautiful itineraries with timeline builders, budget tracking, and real-time collaboration. No signup required.',
    tags: ['React', 'Vite', 'Firebase', 'Firestore', 'Tailwind CSS', 'Framer Motion'],
    categories: ['web'],
    github: null,
    demo: 'https://planyourdates.netlify.app/',
    featured: true,
    award: null,
    image: '/assets/planyourdates.png',
  },
  {
    id: 2,
    title: 'Stemme.Study',
    description: 'A full-stack AI companion that assists children with speech disorders through real-time speech-to-text, text-to-speech, and generative dialogue using Python, React, Gemini API, and ElevenLabs.',
    tags: ['Python', 'React', 'Node.js', 'Express.js', 'Gemini API', 'ElevenLabs', 'Vite'],
    categories: ['web', 'ai'],
    github: 'https://github.com/Biswasrohit/DivHacks-Stem.me',
    demo: null,
    featured: true,
    award: 'MLH Award - DivHacks 2025',
    image: '/assets/stemme-study.png',
  },
  {
    id: 3,
    title: 'AutoDump',
    description: 'An autonomous self-emptying trash rover that vision-docks to bins using ArUco markers and ultrasonic sensing, then servo-dumps into a central can.',
    tags: ['Raspberry Pi', 'OpenCV', 'Python', 'C++', 'Arduino'],
    categories: ['robotics', 'hardware'],
    github: 'https://github.com/Biswasrohit/MakeCU-AutoDump',
    demo: null,
    featured: true,
    award: 'Winner - MakeCU',
    image: '/assets/autodump.jpg',
  },
  {
    id: 4,
    title: 'R2D3',
    description: 'A proof-of-concept solar tracker that automatically orients a photovoltaic panel in two axes to maximize sunlight exposure. Built with Arduino Uno, hobby servos, and custom PLA-printed parts.',
    tags: ['C++', 'Arduino', 'SolidWorks', 'TinkerCAD'],
    categories: ['hardware', 'robotics'],
    github: 'https://github.com/Biswasrohit/r2d3',
    demo: null,
    featured: true,
    award: null,
    image: '/assets/r2d3.jpg',
  },
  {
    id: 5,
    title: 'HTTP/1.0 Web Server',
    description: 'A C-based HTTP/1.0 web server that serves static HTML/image files and a dynamic lookup endpoint backed by a persistent TCP mdb-lookup service.',
    tags: ['C', 'POSIX Sockets', 'HTTP/1.0', 'Networking'],
    categories: ['systems', 'web'],
    github: 'https://gist.github.com/Biswasrohit/b87f5f3a4041454c60f66a19a16701c2',
    demo: null,
    featured: true,
    award: null,
    image: '/assets/http-server.png',
  },
  {
    id: 6,
    title: 'HobbyHub',
    description: 'A community chat platform for hobby enthusiasts to connect and share, built with Vite React and Supabase.',
    tags: ['React', 'Vite', 'Supabase', 'JavaScript'],
    categories: ['web'],
    github: 'https://github.com/Biswasrohit/HobbyHub',
    demo: 'https://github.com/Biswasrohit/HobbyHub',
    featured: false,
    award: null,
    image: '/assets/hobbyhub.jpg',
  },
  {
    id: 7,
    title: 'Crewmate Creator',
    description: 'An interactive character creator inspired by Among Us, facilitating unique character creations using Supabase and advanced routing.',
    tags: ['React', 'JavaScript', 'Supabase', 'CSS'],
    categories: ['web', 'game'],
    github: 'https://github.com/Biswasrohit/CrewmateCreator',
    demo: 'https://github.com/Biswasrohit/CrewmateCreator',
    featured: false,
    award: null,
    image: '/assets/crewmatecreator.jpg',
  },
];

export const projectCategories = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web Dev' },
  { id: 'ai', label: 'AI/ML' },
  { id: 'robotics', label: 'Robotics' },
  { id: 'hardware', label: 'Hardware' },
  { id: 'systems', label: 'Systems' },
];

export const filterProjects = (projects, categoryId) => {
  if (categoryId === 'all') return projects;
  return projects.filter(project => project.categories.includes(categoryId));
};

export const getAllTags = (projects) => {
  const tags = projects.flatMap(project => project.tags);
  return [...new Set(tags)];
};
