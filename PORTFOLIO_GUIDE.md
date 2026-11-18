# Swiss Kinetic Radial Portfolio Engine

An ultra-luxury, full-viewport (`100vh`, `overflow-hidden`) interactive portfolio website inspired by Swiss editorial graphic design, kinetic motion typography, and 60fps radial physics.

---

## ✦ Visual & Interaction Hierarchy

1. **Top Hero Section (Upper 40% Viewport)**
   - **Swiss Kinetic Typography:** Layered `PORTFOLIO` title featuring bold, pitch-black geometric display lettering overlaid on two interactive mouse-parallax wireframe outline layers.
   - **Central Coral Pillar:** Vibrant architectural pillar (`#EB5038`) positioned behind the title letters.
   - **Metadata Row:** High-precision technical tracking with designer name, role, and micro-grid crosshairs (`+`).
   - **Top Indicators:** Stacked `WELCOME TO MY` branding and minimalist eye-reticle emblem button.

2. **Interactive Radial Project Carousel (Lower 60% Viewport)**
   - **Radial Curvature:** Cards fan out along a continuous circular arc calculated through trigonometry.
   - **Tangential Rotation:** Each card dynamically tilts to remain tangent to the curve as it glides from left to right.
   - **Continuous Turntable Motion:** Seamless auto-glide loop with infinite card wrapping.
   - **Physics & Momentum:** Mouse wheel scrubbing and touch/mouse click-and-drag with velocity tracking and momentum flick.
   - **Hover Elevation:** Hovering over any card pauses auto-glide, elevates the card (`scale: 1.08`, `translateY: -22px`), brings it to the top `z-index`, and reveals a floating pill badge with `"VIEW CASE STUDY ↗"`.

3. **Bottom-Center Anchor Dial ("ME")**
   - Semi-circular matte light-gray hub rising from bottom-center.
   - Upward triangle (`▲`), `ME` label, and circular curved text along the compass rim.
   - Clicking `"ME"` or pressing <kbd>A</kbd> opens the **About / Creative Dossier Drawer**.

4. **Case Study & Project Overlay**
   - Clicking any project card opens the slide-up case study overlay.
   - Includes direct buttons to **"View on GitHub"**, **"Open Live Experience"**, architecture breakdown, and tech stack badges.
   - Keyboard navigation: <kbd>←</kbd> and <kbd>→</kbd> navigate projects inside the modal; <kbd>Esc</kbd> closes it.

---

## ✦ How to Customize Projects & GitHub Links

All project data is cleanly organized in `src/data/projects.js`. You can swap in your own published GitHub repositories, upcoming projects, images, and links in seconds:

```javascript
// src/data/projects.js
export const projects = [
  {
    id: "your-project-id",
    title: "YOUR PROJECT TITLE",
    category: "AI / WEB3 / MOBILE",
    status: "published", // Use 'published' for GitHub repos, or 'upcoming' for lab projects
    badge: "PUBLISHED ON GITHUB",
    accentColor: "#EB5038",
    githubUrl: "https://github.com/your-username/your-repo",
    liveUrl: "https://your-live-demo.com",
    year: "2026",
    tagline: "One-line punchy Swiss editorial subtitle.",
    description: "Full in-depth architecture and technical overview.",
    techStack: ["React", "Tailwind CSS", "Framer Motion", "Python"],
    visualTheme: "coral-mark", // 'cosmic-eye' | 'coral-mark' | 'monochrome-portrait' | 'polestar-spec' | 'casino-royale' | 'spatial-vision' | 'neural-mesh' | 'audio-synth'
    metrics: "120 FPS • 1.2k GitHub Stars"
  },
  // Add as many projects as you like!
];
```

### Customizing Your Personal Info
In the same file (`src/data/projects.js`), edit `designerProfile`:
```javascript
export const designerProfile = {
  name: "YOUR NAME",
  role: "MULTIMEDIA DESIGNER",
  location: "YOUR CITY / REMOTE",
  github: "https://github.com/your-username",
  email: "your.email@domain.com",
  bio: "Your personal design philosophy and creative vision...",
};
```

---

## ✦ Running & Building the Project

### Development Server
```bash
bun run dev
# or
npm run dev
```
Open [http://localhost:3004/](http://localhost:3004/) in your browser.

### Production Build
```bash
bun run build
# or
npm run build
```
Creates an optimized, production-ready static build inside the `dist/` directory, ready to deploy to **GitHub Pages**, **Vercel**, **Netlify**, or **Cloudflare Pages**.
