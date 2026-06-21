# Tony Portfolio — CLAUDE.md

## Build/Run Commands

```bash
npm run dev     # Start dev server (http://localhost:3000)
npm run build   # Static export to ./out
npm run start   # Preview static export
npm run lint    # ESLint check
```

## Project Structure

```
├── .github/workflows/deploy.yml  # GitHub Actions → GitHub Pages
├── .planning/                     # GSD project management
├── public/                        # Static assets (images, icons)
├── src/
│   ├── app/
│   │   ├── globals.css           # Tailwind v4 + theme tokens
│   │   ├── layout.tsx            # Root layout (font, metadata)
│   │   ├── page.tsx              # Home page (single-page portfolio)
│   │   └── ...
│   ├── components/
│   │   └── ui/                   # shadcn/ui components (button, card, etc.)
│   └── lib/
│       └── utils.ts              # cn() utility for class merging
├── content/                       # MDX files (blog posts, research projects)
├── next.config.ts                 # Static export for GitHub Pages
├── tailwind.config.ts             # Theme customization
└── tsconfig.json                  # TypeScript strict mode
```

## Tech Stack

- **Framework:** Next.js 16 (static export)
- **Styling:** Tailwind CSS v4 + tw-animate-css
- **UI:** shadcn/ui (base components — button, card, sheet, etc.)
- **Icons:** lucide-react
- **Language:** TypeScript (strict mode)
- **Deploy:** GitHub Pages via GitHub Actions

## Code Style

- TypeScript strict mode — avoid `any`, use `unknown` for external input
- Use `interface` for object shapes, `type` for unions/intersections
- React components as functions with explicit prop interfaces
- No `React.FC` — just function components with typed props
- CSS: Tailwind utility classes + CSS custom properties for theme
- Immutability with spread operator
- Async/await with try-catch for error handling

## Design Tokens

- **Font body:** Inter (CSS var: `--font-geist-sans`)
- **Font mono:** Geist Mono (CSS var: `--font-geist-mono`)
- **Accent color:** Cyan/teal tones (via CSS custom properties in globals.css)
- **Dark mode:** Default, toggle via `.dark` class on `<html>`
- **Shadcn radius:** `0.625rem` base

## Conventions

- Blog posts: MDX files in `/content/blog/` with frontmatter (title, date, tags, excerpt)
- Research projects: MDX files in `/content/research/` with frontmatter + status
- Component imports: `@/components/...` (alias configured)
- Git: Conventional commits (feat:, fix:, chore:, docs:, style:)

## Content Updates

To add a new blog post:
1. Create `content/blog/<slug>.mdx` with frontmatter
2. Rebuild — Next.js picks it up at build time

To add a new research project:
1. Create `content/research/<slug>.mdx` with frontmatter + status
2. Rebuild and deploy

## Deployment

Push to `main` → GitHub Actions automatically:
1. `npm ci` → `npm run build`
2. Uploads `./out/` as GitHub Pages artifact
3. Deploys to `https://tonyhyge.github.io/Tony-portfolio/`

Manual trigger: GitHub repo → Actions → "Deploy to GitHub Pages" → Run workflow
