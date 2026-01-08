# Rohit Biswas — Personal Portfolio

A modern, responsive portfolio website built with React and Tailwind CSS, featuring glassmorphism design, smooth animations, and dark/light mode support.

**Live Site:** [rohitbiswas.com](https://rohitbiswas.com)

## Features

- **Glassmorphism Design** — Modern frosted glass aesthetic with olive green accents
- **Dark/Light Mode** — System-aware theme with manual toggle, persisted to localStorage
- **Apple-Style Aurora Animation** — Animated gradient ring effect on the hero section
- **Responsive Layout** — Mobile-first design that looks great on all devices
- **Smooth Animations** — Framer Motion powered transitions and scroll animations
- **Project Filtering** — Filter projects by category (Web, AI/ML, Robotics, Hardware, Systems)
- **Working Contact Form** — EmailJS integration with auto-reply functionality
- **Single Page Navigation** — Smooth scroll between sections

## Tech Stack

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Contact Form:** EmailJS
- **Icons:** Heroicons (inline SVG)
- **Fonts:** Poppins (Google Fonts)

## Sections

| Section | Description |
|---------|-------------|
| Hero | Profile photo with aurora animation, CTAs, social links |
| About | Bio and personal introduction |
| Skills | Categorized technical skills (Languages, Frameworks, Tools) |
| Experience | Work history in timeline layout |
| Education | Academic background |
| Projects | Filterable project cards with images and links |
| Contact | EmailJS-powered contact form |

## Getting Started

```bash
# Clone the repository
git clone https://github.com/Biswasrohit/personal-website.git

# Navigate into the directory
cd personal-website

# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to view the site locally.

## Environment Variables

Create a `.env` file in the root directory for EmailJS integration:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_TEMPLATE_ID_AUTOREPLY=your_autoreply_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Project Structure

```
.
├── public/
│   └── assets/           # Images, resume PDF, favicon
├── src/
│   ├── components/
│   │   ├── sections/     # Page sections (Hero, About, Skills, etc.)
│   │   ├── ui/           # Reusable UI components
│   │   └── effects/      # Animation components
│   ├── context/          # React context (ThemeContext)
│   ├── data/             # Static data (projects, skills, experience)
│   ├── hooks/            # Custom hooks (useTheme)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css         # Tailwind config and custom styles
├── index.html
├── vite.config.js
└── package.json
```

## Customization

### Colors
Edit the olive color palette in `src/index.css`:
```css
@theme {
  --color-olive-500: #6B8E23;
  /* ... other shades */
}
```

### Content
Update your information in the data files:
- `src/data/projects.js` — Project entries
- `src/data/skills.js` — Skill categories
- `src/data/experience.js` — Work experience
- `src/data/education.js` — Education history

## License

MIT License - Rohit Biswas 2025

---

Built with React, Tailwind CSS, and Framer Motion
