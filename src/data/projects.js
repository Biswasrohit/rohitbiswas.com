export const projects = [
  {
    id: 9,
    title: "ContractPilot",
    description:
      "AI-powered legal document reviewer that extracts clauses from PDFs/Word/scanned docs, runs parallel analysis across 6 concurrent AI workers, and delivers plain-English risk scores with an interactive PDF viewer. Full-stack system with Next.js frontend, Python FastAPI orchestration, Convex real-time streaming, and agentic AI pipeline with RAG retrieval over 21K+ legal clauses.",
    tags: ["Next.js", "Python", "FastAPI", "Convex"],
    categories: ["web", "ai"],
    github: "https://github.com/Biswasrohit/contractpilot",
    demo: null,
    featured: true,
    award: "DevFest 2026 Winner, YC Interview",
    image: "/assets/contractpilot.png",
  },
  {
    id: 8,
    title: "PageRank Visualizer",
    description:
      "Interactive visualization of Google's PageRank algorithm featuring graph editing, power iteration animation, and centrality comparisons. Built to accompany my Applied Linear Algebra research paper.",
    tags: [
      "React",
      "React Flow",
      "Framer Motion",
      "Linear Algebra",
      "Graph Theory",
    ],
    categories: ["web", "ai"],
    github: "https://github.com/Biswasrohit",
    demo: "/pagerank",
    featured: true,
    award: null,
    image: "/assets/pagerank-preview.png",
  },
  {
    id: 1,
    title: "PlanYourDates",
    description:
      "A shareable date planning platform that allows users to create beautiful itineraries with timeline builders, budget tracking, and real-time collaboration. No signup required.",
    tags: [
      "React",
      "Vite",
      "Firebase",
      "Firestore",
      "Tailwind CSS",
      "Framer Motion",
    ],
    categories: ["web"],
    github: null,
    demo: "https://planyourdates.netlify.app/",
    featured: true,
    award: null,
    image: "/assets/planyourdates.png",
  },
  {
    id: 2,
    title: "Stemme.Study",
    description:
      "Real-time speech therapy application with React/Express stack and bidirectional WebSocket streaming, achieving sub-500ms end-to-end latency. Architected RESTful API pipeline chaining Web Speech API, Gemini, and ElevenLabs TTS with session persistence and live transcription feedback.",
    tags: [
      "React",
      "Node.js",
      "Express",
      "WebSockets",
      "Gemini API",
      "ElevenLabs",
    ],
    categories: ["web", "ai"],
    github: "https://github.com/Biswasrohit/DivHacks-Stem.me",
    demo: null,
    featured: true,
    award: "MLH Award - DivHacks 2025",
    image: "/assets/stemme-study.png",
  },
  {
    id: 3,
    title: "AutoDump",
    description:
      "Autonomous rover with OpenCV ArUco marker detection for vision-based docking (±2cm accuracy) and ultrasonic proximity sensing for obstacle avoidance. Python state machine orchestrating servo-controlled dump mechanism via Arduino/ROBOTIS serial integration.",
    tags: ["Raspberry Pi", "OpenCV", "Python", "C++", "Arduino"],
    categories: ["robotics", "hardware"],
    github: "https://github.com/Biswasrohit/MakeCU-AutoDump",
    demo: null,
    featured: true,
    award: "3rd Place - MakeCU",
    image: "/assets/autodump.jpg",
  },
  {
    id: 4,
    title: "R2D3",
    description:
      "A proof-of-concept solar tracker that automatically orients a photovoltaic panel in two axes to maximize sunlight exposure. Built with Arduino Uno, hobby servos, and custom PLA-printed parts.",
    tags: ["C++", "Arduino", "SolidWorks", "TinkerCAD"],
    categories: ["hardware", "robotics"],
    github: "https://github.com/Biswasrohit/r2d3",
    demo: null,
    featured: true,
    award: null,
    image: "/assets/r2d3.jpg",
  },
  {
    id: 5,
    title: "HTTP/1.0 Web Server",
    description:
      "Multithreaded C web server with concurrent connection handling, request parsing, MIME routing, path traversal protection, and persistent TCP connection pooling for dynamic database lookups.",
    tags: ["C", "POSIX Sockets", "HTTP/1.0", "Networking"],
    categories: ["systems", "web"],
    github:
      "https://gist.github.com/Biswasrohit/b87f5f3a4041454c60f66a19a16701c2",
    demo: null,
    featured: true,
    award: null,
    image: "/assets/http-server.png",
  },
  {
    id: 6,
    title: "HobbyHub",
    description:
      "A community chat platform for hobby enthusiasts to connect and share, built with Vite React and Supabase.",
    tags: ["React", "Vite", "Supabase", "JavaScript"],
    categories: ["web"],
    github: "https://github.com/Biswasrohit/HobbyHubv2",
    demo: "https://hobbyhubv2.netlify.app/",
    featured: false,
    award: null,
    image: "/assets/hobbyhub.jpg",
  },
  {
    id: 7,
    title: "Crewmate Creator",
    description:
      "An interactive character creator inspired by Among Us, facilitating unique character creations using Supabase and advanced routing.",
    tags: ["React", "JavaScript", "Supabase", "CSS"],
    categories: ["web", "game"],
    github: "https://github.com/Biswasrohit/CrewmateCreator",
    demo: "https://github.com/Biswasrohit/CrewmateCreator",
    featured: false,
    award: null,
    image: "/assets/crewmatecreator.jpg",
  },
];

export const projectCategories = [
  { id: "all", label: "All" },
  { id: "web", label: "Web Dev" },
  { id: "ai", label: "AI/ML" },
  { id: "robotics", label: "Robotics" },
  { id: "hardware", label: "Hardware" },
  { id: "systems", label: "Systems" },
];

export const filterProjects = (projects, categoryId) => {
  if (categoryId === "all") return projects;
  return projects.filter((project) => project.categories.includes(categoryId));
};

export const getAllTags = (projects) => {
  const tags = projects.flatMap((project) => project.tags);
  return [...new Set(tags)];
};
