import { useState } from 'react'
import './App.css'

type WorkCard = {
  title: string
  domain: string
  year: string
  summary: string
  impact: string
  filePath?: string
  authors?: string
  venue?: string
  abstract?: string
  projectLink?: string
  doiLink?: string
}

type OngoingWork = {
  title: string
  phase: string
  focus: string
  progress: number
  repoLink?: string
}

type SocialLink = {
  platform: string
  url: string
  handle: string
}

type ResearchMetadata = {
  domain: string
  year: string
  summary: string
  impact: string
  authors: string
  venue: string
  abstract: string
  projectLink?: string
  doiLink?: string
}

const researchMetadataByFile: Record<string, Partial<ResearchMetadata>> = {
  'Bliss Portable Virtual Machine Spec V3.pdf': {
    domain: 'Independent Research',
    year: '2026',
    summary:
      'Specification document for a portable virtual machine design with execution model and compatibility constraints.',
    impact: 'Available as a full paper in the research archive.',
    authors: 'Mayukh et al.',
    venue: 'Technical Research Archive',
    abstract:
      'Defines a portable VM specification focused on deterministic execution, portability, and implementation constraints for practical adoption.'
  },
  'DAOP.pdf': {
    domain: 'Independent Research',
    year: '2026',
    summary:
      'Research manuscript documenting the DAOP framework, methodology, and evaluation approach.',
    impact: 'Available as a full paper in the research archive.',
    authors: 'Mayukh et al.',
    venue: 'Independent Research Manuscript',
    abstract:
      'Introduces DAOP with problem framing, method design, and evaluation outcomes tailored to real-world applicability.'
  }
}

const researchFileModules = import.meta.glob('../public/researches/*.pdf', {
  eager: true,
  import: 'default',
  query: '?url'
}) as Record<string, string>

const getFileNameFromPath = (path: string) => path.split('/').pop() ?? path

const getTitleFromFileName = (fileName: string) =>
  decodeURIComponent(fileName)
    .replace(/\.pdf$/i, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const getYearFromText = (text: string) => {
  const match = text.match(/(19|20)\d{2}/)
  return match ? match[0] : '2026'
}

const researchWorks: WorkCard[] = Object.entries(researchFileModules)
  .map(([modulePath, filePath]) => {
    const fileName = getFileNameFromPath(modulePath)
    const metadata = researchMetadataByFile[fileName] ?? {}
    const fallbackTitle = getTitleFromFileName(fileName)
    const year = metadata.year ?? getYearFromText(fallbackTitle)

    return {
      title: fallbackTitle,
      domain: metadata.domain ?? 'Research Work',
      year,
      summary:
        metadata.summary ??
        `Research document archived as ${fallbackTitle}. Open the PDF to read the full work.`,
      impact:
        metadata.impact ??
        'Included in the portfolio archive and available as a full manuscript.',
      authors: metadata.authors ?? 'Author details to be updated',
      venue: metadata.venue ?? 'Venue information to be updated',
      abstract:
        metadata.abstract ??
        'Abstract to be updated. The full details are available in the PDF.',
      filePath,
      projectLink: metadata.projectLink,
      doiLink: metadata.doiLink
    }
  })
  .sort((a, b) => {
    const yearDiff = Number.parseInt(b.year, 10) - Number.parseInt(a.year, 10)
    return yearDiff !== 0 ? yearDiff : a.title.localeCompare(b.title)
  })

const socialLinks: SocialLink[] = [
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/mayukhchr/',
    handle: 'linkedin.com/in/mayukhchr'
  },
  {
    platform: 'GitHub',
    url: 'https://github.com/MayukhChakrabortyDX',
    handle: 'github.com/MayukhChakrabortyDX'
  }
]

const featuredWorks: WorkCard[] = [
  {
    title: 'The Bliss Platform',
    domain: 'Platform Engineering',
    year: '2026',
    summary:
      'Bliss 4i is the fourth iteration of the Bliss Platform, where Bliss evolves from a simple runtime into a broader ecosystem of compilers, package managers, and standard libraries.',
    impact: 'Defines the ecosystem direction and implementation baseline for future Bliss releases.',
    projectLink: 'https://github.com/bliss-platform/bliss-4i'
  },
  {
    title: 'bolt search',
    domain: 'Search and Discovery',
    year: '2026',
    summary:
      'A Windows desktop app for finding files and folders quickly using filter pipelines.',
    impact: 'Comes with day-to-day usage documentation for practical workflow adoption.',
    projectLink: 'https://github.com/MayukhChakrabortyDX/bolt-search'
  },
  {
    title: 'essential computers',
    domain: 'Systems and Computing',
    year: '2026',
    summary:
      'A Minecraft mod that brings realistic computers into the game by emulating a custom-architecture virtual machine.',
    impact: 'Connects low-level architecture ideas with an interactive sandbox environment.',
    projectLink: 'https://github.com/MayukhChakrabortyDX/essential-computers'
  }
]

const ongoingWorks: OngoingWork[] = [
  {
    title: 'Bliss 4i',
    phase: 'Active Development',
    focus:
      'Transitioning Bliss from a runtime into a full ecosystem with compilers, package managers, and standard libraries.',
    progress: 71,
    repoLink: 'https://github.com/bliss-platform/bliss-4i'
  },
  {
    title: 'Bolt Search',
    phase: 'Iteration',
    focus:
      'Improving the Windows filter-pipeline workflow for fast file and folder discovery in day-to-day use.',
    progress: 64,
    repoLink: 'https://github.com/MayukhChakrabortyDX/bolt-search'
  },
  {
    title: 'Essential Computers',
    phase: 'Build and Expansion',
    focus:
      'Expanding the custom-architecture VM that powers realistic in-game computers in Minecraft.',
    progress: 58,
    repoLink: 'https://github.com/MayukhChakrabortyDX/essential-computers'
  }
]

const skillsBySection = {
  'System Design': [
    'Scalable system architecture and component decomposition',
    'API and service boundary design',
    'Reliability, observability, and performance planning',
    'Trade-off analysis for maintainable long-term systems'
  ],
  'Web Development': [
    'React as the primary framework for production builds',
    'Svelte for lightweight and rapid interface development',
    'Modern frontend patterns across framework ecosystems',
    'Tooling, build optimization, and deployment workflows'
  ],
  'UI Development': [
    'Responsive interfaces for desktop and mobile',
    'Design system thinking and reusable component architecture',
    'Accessible UI patterns and interaction design',
    'Visual polish, motion, and user-centric micro-interactions'
  ]
}

type SkillSection = keyof typeof skillsBySection

function App() {
  const [activeSkillSection, setActiveSkillSection] =
    useState<SkillSection>('System Design')

  return (
    <div className="portfolio-page">
      <header className="top-rail">
        <p className="brand">Mayukh Portfolio</p>
        <nav aria-label="Main sections">
          <a href="#research">Research</a>
          <a href="#best">Best Work</a>
          <a href="#ongoing">Ongoing</a>
          <a href="#skills">Skills</a>
          <a href="#socials">Socials</a>
        </nav>
      </header>

      <section className="hero-section" id="home">
        <h1>Building practical systems, products, and research in computer science.</h1>
        <p className="hero-copy">
          I am an engineer and researcher specializing in computer science,
          currently studying ECE at UIT-BU (1st year).
        </p>
        <p className="hero-note">
          11 years of coding. This portfolio is a curated selection of my best
          projects and research works from a much larger body of work.
        </p>
        <div className="metrics" aria-label="Portfolio highlights">
          <article>
            <h2>{researchWorks.length}</h2>
            <p>Research Works</p>
          </article>
          <article>
            <h2>{featuredWorks.length}</h2>
            <p>Best Works</p>
          </article>
          <article>
            <h2>{ongoingWorks.length}</h2>
            <p>Ongoing Projects</p>
          </article>
        </div>
      </section>

      <main className="content">
        <section className="content-section" id="research">
          <div className="section-header">
            <p>Independent Research</p>
            <h2>Research Works</h2>
          </div>
          <div className="card-grid">
            {researchWorks.map((work) => (
              <article className="work-card" key={work.title}>
                <div className="card-head">
                  <span>{work.domain}</span>
                  <span>{work.year}</span>
                </div>
                <h3>{work.title}</h3>
                <p className="research-preview">{work.summary}</p>
                <details className="research-details">
                  <summary>View details</summary>
                  <div
                    className="research-meta"
                    aria-label={`Metadata for ${work.title}`}
                  >
                    <p>
                      <strong>Authors:</strong> {work.authors}
                    </p>
                    <p>
                      <strong>Abstract:</strong> {work.abstract}
                    </p>
                  </div>
                </details>
                <small>{work.impact}</small>
                <div className="research-links">
                  {work.filePath ? (
                    <a
                      className="research-link"
                      href={work.filePath}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open PDF
                    </a>
                  ) : null}
                  {work.projectLink ? (
                    <a
                      className="research-link"
                      href={work.projectLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Project Link
                    </a>
                  ) : null}
                  {work.doiLink ? (
                    <a
                      className="research-link"
                      href={work.doiLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      DOI
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section" id="best">
          <div className="section-header">
            <p>Live Repositories</p>
            <h2>Projects</h2>
          </div>
          <div className="card-grid">
            {featuredWorks.map((work) => (
              <article className="work-card" key={work.title}>
                <div className="card-head">
                  <span>{work.domain}</span>
                  <span>{work.year}</span>
                </div>
                <h3>{work.title}</h3>
                <p>{work.summary}</p>
                <small>{work.impact}</small>
                {work.projectLink ? (
                  <a
                    className="research-link"
                    href={work.projectLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Repository
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="content-section" id="ongoing">
          <div className="section-header">
            <p>In Progress</p>
            <h2>Ongoing Works</h2>
          </div>
          <div className="timeline">
            {ongoingWorks.map((work) => (
              <article className="timeline-item" key={work.title}>
                <div className="timeline-top">
                  <h3>{work.title}</h3>
                  <span>{work.phase}</span>
                </div>
                <p>{work.focus}</p>
                <div
                  className="progress-track"
                  role="presentation"
                  aria-hidden="true"
                >
                  <div
                    className="progress-fill"
                    style={{ width: `${work.progress}%` }}
                  />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section" id="skills">
          <div className="section-header">
            <p>Section-Wise Capability View</p>
            <h2>Skills</h2>
          </div>
          <div className="skills-layout">
            <div className="skill-tabs" role="tablist" aria-label="Skill sections">
              {(Object.keys(skillsBySection) as SkillSection[]).map((section) => (
                <button
                  type="button"
                  key={section}
                  className={
                    section === activeSkillSection ? 'skill-tab active' : 'skill-tab'
                  }
                  onClick={() => setActiveSkillSection(section)}
                >
                  {section}
                </button>
              ))}
            </div>
            <article className="skill-panel" aria-live="polite">
              <h3>{activeSkillSection}</h3>
              <ul>
                {skillsBySection[activeSkillSection].map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="content-section" id="socials">
          <div className="section-header">
            <p>Connect</p>
            <h2>Socials</h2>
          </div>
          <div className="card-grid social-grid">
            {socialLinks.map((social) => (
              <article className="work-card" key={social.platform}>
                <div className="card-head">
                  <span>{social.platform}</span>
                  <span>Profile</span>
                </div>
                <h3>{social.platform}</h3>
                <p>{social.handle}</p>
                <a
                  className="research-link"
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open {social.platform}
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Built with React and intent. Updated April 2026.</p>
      </footer>
    </div>
  )
}

export default App
