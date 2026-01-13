// Knowledge base containing information about Marv
// Replace placeholder values with actual information

export const knowledgeBase = {
  personal: {
    name: "David Irvine",
    nickname: "Marv",
    role: "Mid-Level Web Developer",
    location: "Glasgow, UK (open to work UK-wide, including relocation)",
    summary: "Passionate web developer with 2 years of professional experience plus 2 years of freelance work building web applications. Focused on creating clean, efficient, and user-friendly solutions.",
    website: "https://marv-dev.com"
  },

  skills: {
    core: ["React", "Next.js", "JavaScript", "TypeScript", "PHP", "Node.js", "Express.js"],
    styling: ["SASS", "Tailwind CSS", "Framer Motion", "GSAP"],
    platforms: ["WordPress", "Shopify", "Webflow", "Framer", "Storyblok CMS", "Contentful CMS"],
    tools: ["Git/GitHub", "Figma", "Claude Code + MCP", "Jest", "Playwright"],
    other: ["MongoDB", "Firebase", "SEO tools (Screaming Frog, SEMrush, Google Analytics)"]
  },

  experience: [
    {
      company: "Studio East (Design/Marketing Agency)",
      role: "Web Developer (Remote)",
      period: "October 2023 - November 2025",
      highlights: [
        "Built and maintained websites and web apps using React/Next.js/Express.js, WordPress, and Shopify",
        "Developed RESTful APIs with Node.js and Express to integrate WordPress and headless CMS platforms with React frontends",
        "Built reusable React animation library (Framer Motion/GSAP) adopted across all agency projects",
        "Owned stack selection - matched technology to client requirements (Webflow, Next.js, WordPress)",
        "Maintained Lighthouse scores of 95+ across performance, accessibility, and SEO",
        "Pioneered AI-augmented development pipeline cutting project timelines by 70%"
      ]
    },
    {
      company: "Freelance",
      role: "Web Developer",
      period: "January 2021 - October 2023",
      highlights: [
        "Built and maintained websites for small businesses and e-commerce clients using WordPress, Shopify, React, and Next.js",
        "Handled both direct client work and agency subcontracting",
        "Partnered with designers and copywriters to translate Figma designs into pixel-perfect, responsive sites",
        "Managed projects end-to-end: client communication, design implementation, CMS configuration, and deployment"
      ]
    },
    {
      company: "International Schools (Korea, Vietnam, Thailand, Taiwan, Japan)",
      role: "IT Teacher",
      period: "May 2012 - February 2023",
      highlights: [
        "Taught IT at international schools across five countries",
        "Developed curriculum for web development and digital literacy",
        "Managed school technology infrastructure and supported staff with technical needs"
      ]
    }
  ],

  projects: [
    {
      name: "Technyra",
      description: "Corporate website built using Claude Code and Figma's MCP server. Features custom email API with Cloudflare Turnstile protection, Framer Motion and GSAP animations.",
      technologies: ["Next.js 15", "Tailwind CSS", "Figma MCP", "Cloudflare", "Firebase Hosting"],
      link: "https://technyra.tech",
      year: "2025"
    },
    {
      name: "Koppla",
      description: "Responsive corporate website for a Spanish development house. Built using Claude Code and Figma's MCP server. Exported to static HTML/CSS/JS with PHP mail integration.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "Figma MCP", "Next.js"],
      link: "https://kopplatechnology.com/",
      year: "2025"
    },
    {
      name: "TrailerView",
      description: "Full-stack entertainment app built with Next.js and powered by the TMDB API. Features NextAuth authentication, MongoDB storage for bookmarks, and movie/TV search.",
      technologies: ["Next.js", "MongoDB", "Tailwind CSS", "Node.js", "NextAuth", "Material UI"],
      link: "https://trailerview-davidirvine-tw.vercel.app/",
      github: "https://github.com/DavidIrvine-TW/trailerview",
      year: "2023"
    },
    {
      name: "Vapester",
      description: "Custom (from scratch) vape store Shopify 2.0 theme. Multipage with product collections, advanced filtering, AJAX cart, and Leaflet.js store locator.",
      technologies: ["HTML", "CSS", "JavaScript", "Shopify Liquid", "Leaflet.js"],
      link: "https://marvdev-newstore.myshopify.com",
      github: "https://github.com/DavidIrvine-TW/vapester",
      year: "2023"
    },
    {
      name: "Kanban Task Manager",
      description: "Full-stack task management app built with React and Redux. Firebase authentication and storage, drag and drop with React DnD, and light/dark mode.",
      technologies: ["React", "Redux", "Firebase", "Tailwind CSS", "React DnD", "Vite"],
      link: "https://davidirvine-tw.github.io/tsk_mngr_app/",
      github: "https://github.com/DavidIrvine-TW/tsk_mngr_app",
      year: "2023"
    },
    {
      name: "Photosnap",
      description: "Photo-sharing blog style static website from a Figma design. Built with React and Tailwind CSS featuring CSS Grid galleries and smooth page transitions.",
      technologies: ["React", "Tailwind CSS", "Figma", "Vite", "CSS Grid"],
      link: "https://davidirvine-tw.github.io/photosnap-website/",
      github: "https://github.com/DavidIrvine-TW/photosnap-website",
      year: "2023"
    },
    {
      name: "Portfolio Chatbot",
      description: "AI-powered chatbot that answers questions about my professional background",
      technologies: ["React", "TypeScript", "Node.js", "Express", "Hugging Face"],
      link: "https://chat.marv-dev.com",
      year: "2025"
    }
  ],

  education: [
    {
      degree: "Postgraduate Certificate in Education (PGCE)",
      institution: "Nottingham University",
      year: "2018"
    },
    {
      degree: "Bachelor of Science in Multimedia Engineering (Hons)",
      institution: "Glasgow Caledonian University",
      year: "2012"
    }
  ],

  certifications: [
    "AWS Certified Developer",
    "Meta Front-End Developer Certificate"
  ],

  interests: [
    "Open source contribution",
    "Learning new technologies",
    "Building side projects",
    "Tech community involvement"
  ],

  contact: {
    email: "davidirvineakamarv@gmail.com",
    github: "https://github.com/DavidIrvine-TW",
    linkedin: "https://www.linkedin.com/in/davidirvinewebdev/",
    portfolio: "https://marv-dev.com/"
  }
};

// Convert knowledge base to a formatted string for the AI prompt
export function getKnowledgeBasePrompt(): string {
  const kb = knowledgeBase;

  return `
You are a helpful assistant representing ${kb.personal.name} (also known as "${kb.personal.nickname}"), a ${kb.personal.role} based in ${kb.personal.location}.

ABOUT ${kb.personal.name.toUpperCase()}:
${kb.personal.summary}
Note: ${kb.personal.name} also goes by the nickname "${kb.personal.nickname}" - the portfolio site marv-dev.com uses this nickname.

TECHNICAL SKILLS:
- Core: ${kb.skills.core.join(", ")}
- Styling & Animation: ${kb.skills.styling.join(", ")}
- Platforms: ${kb.skills.platforms.join(", ")}
- Tools: ${kb.skills.tools.join(", ")}
- Other: ${kb.skills.other.join(", ")}

WORK EXPERIENCE:
${kb.experience.map(exp => `
${exp.role} at ${exp.company} (${exp.period})
${exp.highlights.map(h => `- ${h}`).join("\n")}
`).join("\n")}

PROJECTS:
${kb.projects.map(proj => `
${proj.name} (${proj.year}): ${proj.description}
Technologies: ${proj.technologies.join(", ")}
Live: ${proj.link}${proj.github ? `\nGitHub: ${proj.github}` : ''}
`).join("\n")}

EDUCATION:
${kb.education.map(edu => `${edu.degree} - ${edu.institution} (${edu.year})`).join("\n")}

CERTIFICATIONS:
${kb.certifications.join(", ")}

INTERESTS:
${kb.interests.join(", ")}

CONTACT:
- Email: ${kb.contact.email}
- GitHub: ${kb.contact.github}
- LinkedIn: ${kb.contact.linkedin}
- Portfolio: ${kb.contact.portfolio}

INSTRUCTIONS:
- Answer questions about ${kb.personal.name}'s background, skills, and experience
- Refer to him as "David" or "David Irvine" (not "Marv" unless explaining the nickname)
- Be friendly and professional
- If asked about something not in the knowledge base, politely say you don't have that information
- Keep responses concise but informative
- Encourage visitors to reach out via the contact information provided
`.trim();
}
