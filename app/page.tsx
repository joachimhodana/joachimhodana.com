"use client"

import { MapPin, Download } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState, Suspense } from "react"

type CareerPath = "software" | "data"

const careerData = {
  software: {
    title: "Software Engineer",
    description:
      "Fullstack developer specializing in building complete web applications, APIs, and SaaS solutions. Working as a freelancer since 2018, delivering projects for clients across Poland, Russia, USA and UK.",
    currentRole: "Software Engineer",
    currentCompany: "Freelance",
    currentDates: "Aug 2018 — Present",
    skills: [
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "RabbitMQ", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rabbitmq/rabbitmq-original.svg" },
      { name: "gRPC", icon: "https://grpc.io/img/logos/grpc-icon-color.png" },
      { name: "AWS", icon: "https://hawatel.com/_next/image/?url=https%3A%2F%2Fhawatel.com%2Fapi%2Fuploads%2FAmazon_Web_Services_Logo_721eb0a90f.png&w=640&q=75" }
    ],
    work: [
      {
        year: "2018",
        role: "Fullstack Developer",
        company: "Freelance",
        description: "Delivered dozens of projects for international clients across various domains including Web3, financial applications and SaaS applications.",
        tech: ["Python", "Go", "JavaScript", "TypeScript", "React", "Next.js"],
      }
    ],
    awards: [
      {
        year: "2024",
        title: "1st Place - BKI.Hack",
        organization: "Bydgoski Hackathon",
        description: "Won first place competing against 10+ junior groups in a full-stack development challenge.",
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvDbhyJAJuQB874bOXR4wYgaR_3bnRuTMrFw&s",
      },
    ],
    articles: [
      {
        title: "How I Managed to Efficiently Store Google Places in My Database Without Blowing the Budget",
        excerpt: "A practical guide to optimizing Google Places API usage and database storage for cost-effective location data management.",
        date: "Jan 2025",
        readTime: "6 min",
        url: "https://medium.com/@joachimhodana/how-i-managed-to-efficiently-store-google-places-in-my-database-without-blowing-the-budget-7abca28637a8?source=user_profile_page---------2-------------27db4b2773fb----------------------",
      },
    ],
  },
  data: {
    title: "Data Engineer",
    description:
      "Data Engineer specializing in Python, building scalable data pipelines, ETL processes, and data infrastructure solutions from A to Z.",
    currentRole: "Data Engineer",
    currentCompany: "Lortech Solutions",
    currentDates: "Aug 2024 — Present",
    skills: [
      { name: "dbt", icon: "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/3/dbt-icon-sefw4nnptjlk5lk13atgvm.png/dbt-icon-2yxlz1fvy25mvn5scgnlw.png?_a=DATAg1AAZAA0" },
      { name: "AWS", icon: "https://hawatel.com/_next/image/?url=https%3A%2F%2Fhawatel.com%2Fapi%2Fuploads%2FAmazon_Web_Services_Logo_721eb0a90f.png&w=640&q=75" },
      { name: "Snowflake", icon: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/snowflake-color.png" },
      { name: "Apache Airflow", icon: "https://www.apache.org/logos/res/airflow/default.png" },
      { name: "Dagster", icon: "https://docs.dagster.io/images/dagster-primary-mark.svg" },
      { name: "GCP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
    ],
      work: [
        {
          year: "2024-2025",
          role: "Data Engineer",
          company: "Lortech Solutions",
          description:
            "Built complete data pipelines from scratch using dbt+Airflow and Dagster+dbt. Enhanced existing pipelines and worked as a consultant for enterprise clients. Started as Junior Data Engineer and progressed to Mid level after 1.5 year.",
          tech: ["Python", "SQL", "dbt", "Apache Airflow", "Dagster", "Snowflake", "ETL"],
        },
        {
          year: "2022-2023",
          role: "Python Developer",
          company: "Decision Sciences Company",
          description: "Developed scripts and database schemas for AI pricing machine project connecting alternative insurance data for insurance companies.",
          tech: ["Python", "Database Design", "Pandas", "SQL"],
        },
      ],
    certificates: [
      {
        year: "2025",
        title: "SnowPro Core Certification",
        organization: "Snowflake",
        description: "Certified in Snowflake data warehousing and cloud data platform fundamentals.",
        issued: "Aug 2025",
        expires: "Aug 2027",
        credentialId: "156908869",
        url: "https://achieve.snowflake.com/31ea4326-9e88-4148-a8b5-20326f786e50#acc.TX18eKmx",
        icon: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/snowflake-color.png",
      },
      {
        year: "2025",
        title: "dbt Developer",
        organization: "dbt Labs",
        description: "Certified in building, testing, and deploying data transformation pipelines using dbt.",
        issued: "Feb 2025",
        expires: "Feb 2027",
        credentialId: "135541190",
        url: "https://credentials.getdbt.com/75e67339-1260-4bb4-bb4e-efbb9c0bc774#acc.JAWU8EDu",
        icon: "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/3/dbt-icon-sefw4nnptjlk5lk13atgvm.png/dbt-icon-2yxlz1fvy25mvn5scgnlw.png?_a=DATAg1AAZAA0",
      },
    ],
    articles: [],
  },
}

function HomeContent() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const [careerPath, setCareerPath] = useState<CareerPath>("data")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentCareer = careerData[careerPath]

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  // Sync career view from query param ?v=de|swe
  useEffect(() => {
    const variant = searchParams.get("v")
    if (variant === "de") {
      setCareerPath("data")
    } else if (variant === "swe") {
      setCareerPath("software")
    }
  }, [searchParams])

  const updateCareerPath = (next: CareerPath) => {
    if (next === careerPath) return
    
    setIsTransitioning(true)
    setTimeout(() => {
      setCareerPath(next)
      setTimeout(() => setIsTransitioning(false), 50)
    }, 200)
    
    const params = new URLSearchParams(searchParams.toString())
    params.set("v", next === "data" ? "de" : "swe")
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

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
              onClick={() => updateCareerPath("software")}
              className={`text-sm font-medium rounded-full px-4 py-2 transition-all duration-300 ${
                careerPath === "software"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Software Engineer
            </button>
            <button
              onClick={() => updateCareerPath("data")}
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
              onClick={() => updateCareerPath("software")}
              className={`text-xs font-medium rounded-full px-3 py-1.5 transition-all duration-300 ${
                careerPath === "software"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              SWE
            </button>
            <button
              onClick={() => updateCareerPath("data")}
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
                <p className={`text-lg sm:text-xl text-muted-foreground leading-relaxed transition-opacity duration-200 ${
                  isTransitioning ? "opacity-0" : "opacity-100"
                }`}>{currentCareer.description}</p>

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
                <div className={`space-y-2 transition-opacity duration-200 ${
                  isTransitioning ? "opacity-0" : "opacity-100"
                }`}>
                  <div className="text-foreground">{currentCareer.currentRole}</div>
                  <div className="text-muted-foreground">@ {currentCareer.currentCompany}</div>
                  <div className="text-xs text-muted-foreground">{currentCareer.currentDates}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
                <div className={`flex flex-wrap gap-2 transition-opacity duration-200 ${
                  isTransitioning ? "opacity-0" : "opacity-100"
                }`}>
                  {currentCareer.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="flex items-center gap-2 px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      <img
                        src={skill.icon}
                        alt={`${skill.name} icon`}
                        className="w-4 h-4 object-contain"
                      />
                      {skill.name}
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
              <h2 className="text-3xl sm:text-4xl font-light">Work Experience</h2>
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
                        <div className="flex items-center gap-3">
                          <img
                            src={award.icon}
                            alt={`${award.organization} award icon`}
                            className="w-6 h-6 object-contain"
                          />
                          <div>
                            <h4 className="text-lg font-medium">{award.title}</h4>
                            <div className="text-muted-foreground">{award.organization}</div>
                          </div>
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
                    <Link
                      key={index}
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-4 sm:py-6 border-b border-border/30 hover:border-border transition-colors duration-500 cursor-pointer"
                    >
                      <div className="lg:col-span-2">
                        <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                          {cert.year}
                        </div>
                      </div>

                      <div className="lg:col-span-10 space-y-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={cert.icon}
                            alt={`${cert.organization} icon`}
                            className="w-6 h-6 object-contain"
                          />
                          <div>
                            <h4 className="text-lg font-medium">{cert.title}</h4>
                            <div className="text-muted-foreground">{cert.organization}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Issued: {cert.issued} · Expires: {cert.expires}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Credential ID: {cert.credentialId}
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed max-w-2xl">{cert.description}</p>
                      </div>
                    </Link>
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

            {currentCareer.articles && currentCareer.articles.length > 0 ? (
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
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No articles available yet.</p>
              </div>
            )}
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

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  )
}
