"use client"

import { MapPin, Download } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

type CareerPath = "software" | "data"

const careerData = {
  software: {
    title: "Software Engineer",
    description:
      "Software developer with a passion for programming that started at the age of 14. Specializing in building APIs, web applications, and functional solutions.",
    currentRole: "Software Developer",
    currentCompany: "Freelance",
    skills: ["Python", "JavaScript", "TypeScript", "React", "Node.js", "Docker", "Git"],
    work: [
      {
        year: "2024",
        role: "Junior Data Engineer",
        company: "Lortech Solutions",
        description: "Building data pipelines and infrastructure solutions for enterprise clients.",
        tech: ["Python", "SQL", "dbt", "Data Engineering"],
      },
      {
        year: "2022",
        role: "Python Developer",
        company: "Decision Sciences Company",
        description: "Developed Python-based solutions for data analysis and automation tasks.",
        tech: ["Python", "APIs", "Data Science"],
      },
    ],
    awards: [
      {
        year: "2021",
        title: "1st Place - BKI.Hack",
        organization: "Bydgoski Hackathon",
        description: "Won first place competing against 10+ junior groups in a full-stack development challenge.",
      },
    ],
    articles: [
      {
        title: "Building Scalable APIs with Python",
        excerpt: "Best practices for designing RESTful APIs that scale with your application needs.",
        date: "Jan 2025",
        readTime: "7 min",
        url: "https://medium.com/@joachimhodana",
      },
      {
        title: "From REST to gRPC",
        excerpt: "Exploring the benefits of gRPC for microservices communication and when to make the switch.",
        date: "Dec 2024",
        readTime: "8 min",
        url: "https://medium.com/@joachimhodana",
      },
      {
        title: "Winning My First Hackathon",
        excerpt: "Lessons learned from competing and winning 1st place at BKI.Hack in Bydgoszcz.",
        date: "Nov 2024",
        readTime: "5 min",
        url: "https://medium.com/@joachimhodana",
      },
      {
        title: "Modern Web Development with React",
        excerpt: "A comprehensive guide to building modern web applications with React and TypeScript.",
        date: "Oct 2024",
        readTime: "6 min",
        url: "https://medium.com/@joachimhodana",
      },
    ],
  },
  data: {
    title: "Data Engineer",
    description:
      "Data Engineer specializing in Python, building scalable data pipelines, ETL processes, and data infrastructure solutions.",
    currentRole: "Junior Data Engineer",
    currentCompany: "Lortech Solutions",
    skills: ["Python", "SQL", "NoSQL", "dbt", "Apache Airflow", "Docker", "ETL"],
    work: [
      {
        year: "2024",
        role: "Junior Data Engineer",
        company: "Lortech Solutions",
        description:
          "Building and maintaining data pipelines, implementing ETL processes, and optimizing data infrastructure for enterprise clients.",
        tech: ["Python", "SQL", "dbt", "Data Warehousing"],
      },
      {
        year: "2022",
        role: "Python Developer",
        company: "Decision Sciences Company",
        description: "Developed data processing solutions, APIs, and automation scripts for data analysis workflows.",
        tech: ["Python", "APIs", "Data Processing", "Web Scraping"],
      },
    ],
    certificates: [
      {
        year: "2025",
        title: "dbt Developer Certification",
        organization: "dbt Labs",
        description: "Certified in building, testing, and deploying data transformation pipelines using dbt.",
        issued: "Feb 2025",
      },
      {
        year: "2024",
        title: "Snowflake Certification",
        organization: "Snowflake",
        description: "Certified in Snowflake data warehousing and cloud data platform fundamentals.",
        issued: "Dec 2024",
      },
    ],
    articles: [
      {
        title: "Building Scalable Data Pipelines",
        excerpt: "Best practices for designing and implementing robust ETL processes that scale with your data.",
        date: "Jan 2025",
        readTime: "7 min",
        url: "https://medium.com/@joachimhodana",
      },
      {
        title: "Python for Data Engineering",
        excerpt: "Why Python remains the go-to language for data engineering and how to leverage its ecosystem.",
        date: "Dec 2024",
        readTime: "6 min",
        url: "https://medium.com/@joachimhodana",
      },
      {
        title: "dbt Best Practices",
        excerpt: "Essential patterns and practices for building maintainable data transformation workflows with dbt.",
        date: "Nov 2024",
        readTime: "8 min",
        url: "https://medium.com/@joachimhodana",
      },
      {
        title: "Snowflake Performance Optimization",
        excerpt: "Tips and techniques for optimizing query performance and reducing costs in Snowflake.",
        date: "Oct 2024",
        readTime: "9 min",
        url: "https://medium.com/@joachimhodana",
      },
    ],
  },
}

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const [careerPath, setCareerPath] = useState<CareerPath>("data")
  const [isScrolled, setIsScrolled] = useState(false)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  const currentCareer = careerData[careerPath]

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "work", "thoughts", "connect"].map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      {/* Centered version (initial) */}
      <div
        className={`fixed top-8 left-1/2 -translate-x-1/2 z-20 transition-all duration-500 ease-out ${
          isScrolled ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
        }`}
        aria-hidden={isScrolled}
      >
        <div className="flex items-center gap-3 flex-col">
          <div className="text-sm text-muted-foreground font-mono tracking-wider">VIEW MY EXPERIENCE AS</div>
          <div className="flex items-center gap-2 p-1 bg-background/80 backdrop-blur-sm border border-border rounded-full shadow-lg">
            <button
              onClick={() => setCareerPath("software")}
              className={`text-sm font-medium rounded-full px-4 py-2 transition-all duration-300 ${
                careerPath === "software"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Software Engineer
            </button>
            <button
              onClick={() => setCareerPath("data")}
              className={`text-sm font-medium rounded-full px-4 py-2 transition-all duration-300 ${
                careerPath === "data" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Data Engineer
            </button>
          </div>
        </div>
      </div>

      {/* Top-right version (on scroll) */}
      <div
        className={`fixed top-6 right-6 z-20 transition-all duration-500 ease-out ${
          isScrolled ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
        aria-hidden={!isScrolled}
      >
        <div className="flex items-center gap-3 flex-row">
          <div className="text-xs text-muted-foreground font-mono tracking-wider">VIEW AS</div>
          <div className="flex items-center gap-2 p-1 bg-background/80 backdrop-blur-sm border border-border rounded-full shadow-lg scale-90">
            <button
              onClick={() => setCareerPath("software")}
              className={`text-xs font-medium rounded-full px-3 py-1.5 transition-all duration-300 ${
                careerPath === "software"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              SWE
            </button>
            <button
              onClick={() => setCareerPath("data")}
              className={`text-xs font-medium rounded-full px-3 py-1.5 transition-all duration-300 ${
                careerPath === "data" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              DE
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        <header
          id="intro"
          ref={(el) => (sectionsRef.current[0] = el)}
          className="min-h-screen flex items-center opacity-0"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider">PORTFOLIO / 2025</div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  Joachim
                  <br />
                  <span className="text-muted-foreground">Hodana</span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">{currentCareer.description}</p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  {/* <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Available for work
                  </div> */}
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4" />
                    Warsaw, Poland
                  </div>
                  <Link
                    href="/Joachim%20Hodana%20CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-full text-foreground hover:text-muted-foreground hover:border-muted-foreground/50 transition-colors duration-300"
                  >
                    <Download className="size-4" />
                    <span>Download CV</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
                <div className="space-y-2">
                  <div className="text-foreground">{currentCareer.currentRole}</div>
                  <div className="text-muted-foreground">@ {currentCareer.currentCompany}</div>
                  <div className="text-xs text-muted-foreground">Aug 2024 — Present</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
                <div className="flex flex-wrap gap-2">
                  {currentCareer.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section
          id="work"
          ref={(el) => (sectionsRef.current[1] = el)}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Selected Work</h2>
              <div className="text-sm text-muted-foreground font-mono">2022 — 2025</div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {currentCareer.work.map((job, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-2">
                    <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {job.year}
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium">{job.role}</h3>
                      <div className="text-muted-foreground">{job.company}</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
                  </div>

                  <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                    {job.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {"awards" in currentCareer && currentCareer.awards && (
              <div className="space-y-8 sm:space-y-12 pt-12 sm:pt-16 border-t border-border/50">
                <h3 className="text-2xl sm:text-3xl font-light">Awards & Recognition</h3>
                <div className="space-y-6 sm:space-y-8">
                  {currentCareer.awards.map((award, index) => (
                    <div
                      key={index}
                      className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-4 sm:py-6 border-b border-border/30 hover:border-border transition-colors duration-500"
                    >
                      <div className="lg:col-span-2">
                        <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                          {award.year}
                        </div>
                      </div>

                      <div className="lg:col-span-10 space-y-2">
                        <div>
                          <h4 className="text-lg font-medium">{award.title}</h4>
                          <div className="text-muted-foreground">{award.organization}</div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed max-w-2xl">{award.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {"certificates" in currentCareer && currentCareer.certificates && (
              <div className="space-y-8 sm:space-y-12 pt-12 sm:pt-16 border-t border-border/50">
                <h3 className="text-2xl sm:text-3xl font-light">Certifications</h3>
                <div className="space-y-6 sm:space-y-8">
                  {currentCareer.certificates.map((cert, index) => (
                    <div
                      key={index}
                      className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-4 sm:py-6 border-b border-border/30 hover:border-border transition-colors duration-500"
                    >
                      <div className="lg:col-span-2">
                        <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                          {cert.year}
                        </div>
                      </div>

                      <div className="lg:col-span-10 space-y-2">
                        <div>
                          <h4 className="text-lg font-medium">{cert.title}</h4>
                          <div className="text-muted-foreground">{cert.organization}</div>
                          <div className="text-xs text-muted-foreground mt-1">Issued: {cert.issued}</div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed max-w-2xl">{cert.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section
          id="thoughts"
          ref={(el) => (sectionsRef.current[2] = el)}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Recent Thoughts</h2>
              <Link
                href="https://medium.com/@joachimhodana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-2"
              >
                <span>View all on Medium</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {currentCareer.articles.map((post, index) => (
                <Link
                  key={index}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      <span>Read more</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="connect" ref={(el) => (sectionsRef.current[3] = el)} className="py-20 sm:py-32 opacity-0">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">Let's Connect</h2>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Always interested in new opportunities, collaborations, and conversations about data engineering and
                  software development.
                </p>

                <div className="space-y-4">
                  <Link
                    href="mailto:me@joachimhodana.com"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">me@joachimhodana.com</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">FIND ME ON</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    name: "GitHub",
                    handle: "@joachimhodana",
                    url: "https://github.com/joachimhodana",
                    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1200px-Octicons-mark-github.svg.png",
                  },
                  {
                    name: "LinkedIn",
                    handle: "Joachim Hodana",
                    url: "https://www.linkedin.com/in/joachim-hodana/",
                    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/2048px-LinkedIn_icon.svg.png",
                  },
                  {
                    name: "X",
                    handle: "@joachimhodana",
                    url: "https://x.com/joachimhodana",
                    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/X_icon.svg/2048px-X_icon.svg.png",
                  },
                  {
                    name: "Medium",
                    handle: "@joachimhodana",
                    url: "https://medium.com/@joachimhodana",
                    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968906.png",
                  },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <img
                          src={social.icon}
                          alt={`${social.name} icon`}
                          className="size-4 object-contain"
                        />
                        <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                          {social.name}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{social.handle}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} Joachim Hodana. All rights reserved.</div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414 0zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
