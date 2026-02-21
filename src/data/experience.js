export const experience = [
  {
    id: 1,
    role: 'Software Engineer Intern',
    company: 'Mutual of Omaha',
    location: 'Omaha, NE',
    period: 'Jun 2026 - Aug 2026',
    current: false,
    description: [
      'Incoming Software Engineer Intern',
    ],
    technologies: [],
  },
  {
    id: 2,
    role: 'Systems Engineer',
    company: 'Columbia Technology Ventures',
    location: 'New York, NY',
    period: 'Oct 2025 - Present',
    current: true,
    description: [
      'Developed automated provisioning system serving 100+ machines using Python, Bash, and PowerShell with scheduled validation jobs and idempotent rollback logic, cutting manual setup time by 40%',
      'Built event-driven monitoring service processing 500+ daily events with automated alert routing via REST APIs and structured JSON logging, reducing incident response time by 60%',
    ],
    technologies: ['Python', 'Bash', 'PowerShell', 'REST APIs'],
  },
  {
    id: 3,
    role: 'Cybersecurity Intern',
    company: 'NYCHA',
    location: 'New York, NY',
    period: 'Jun 2025 - Aug 2025',
    current: false,
    description: [
      'Built reusable SPL query library for Splunk ES that standardized triage workflows across 20+ incident types, cutting mean investigation time by 40% and adopted as team-wide tooling',
      'Developed vulnerability tracking pipeline across 50+ external web applications using Veracode DAST, driving 30% reduction in open findings within 6 weeks',
    ],
    technologies: ['Splunk', 'Veracode', 'DAST', 'Security'],
  },
  {
    id: 4,
    role: 'IT Engineer',
    company: 'Fordham University',
    location: 'Bronx, NY',
    period: 'May 2023 - Jun 2025',
    current: false,
    description: [
      'Built Python and PowerShell automation framework for enterprise software deployment across 200+ workstations, reducing deployment time by 70%',
      'Designed and integrated REST API layer connecting Crowdstrike, LANDESK, and PowerFAIDS platforms via containerized microservices for real-time cross-platform data synchronization',
    ],
    technologies: ['Python', 'PowerShell', 'REST APIs', 'Docker'],
  },
];
