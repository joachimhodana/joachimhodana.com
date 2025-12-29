"use client"

import { MapPin, Download } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState, Suspense } from "react"

type CareerPath = "software" | "data" | "ml"

// Toggle to quickly show/hide the ML tab in the UI
const SHOW_ML = false

const careerData = {
  software: {
    title: "Software Engineer",
    description:
      "Fullstack developer specializing in building complete web applications, APIs, and SaaS solutions. Working as a freelancer since 2018, delivering projects for clients across Poland, Eastern Europe, USA and UK.",
    currentRole: "Software Engineer",
    currentCompany: "Freelance",
    currentDates: "Aug 2018 — Present",
    showDownloadCV: true,
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
        date: "Oct 2024",
        readTime: "4 min",
        url: "https://medium.com/@joachimhodana/how-i-managed-to-efficiently-store-google-places-in-my-database-without-blowing-the-budget-7abca28637a8?source=user_profile_page---------2-------------27db4b2773fb----------------------",
      },
    ],
    projects: [
      {
        title: "Harvide",
        description: "Launch-ready MVPs for founders. We ship complete products in 21 days - from idea to deployed MVP with authentication, billing, and infrastructure.",
        url: "https://www.harvide.com/",
        articleUrl: null,
        thumbnail: null,
        icon: "https://www.harvide.com/favicon.ico",
        year: "2024",
      },
      {
        title: "waitset",
        description: "Smart no-code waitlist builder - build complete waitlist solutions from A to Z.",
        url: "https://waitset.com",
        articleUrl: null,
        thumbnail: null,
        icon: "https://waitset.com/waitset-logo-bg.png",
        year: "2024",
      },
      {
        title: "rtTranslator",
        description: "Simple overlay for Windows that listens for background sound and translates it to text displayed on screen.",
        url: "https://github.com/joachimhodana/rtTranslator",
        articleUrl: null,
        thumbnail: null,
        icon: null,
        year: "2024",
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
    showDownloadCV: true,
    skills: [
      { name: "dbt", icon: "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/3/dbt-icon-sefw4nnptjlk5lk13atgvm.png/dbt-icon-2yxlz1fvy25mvn5scgnlw.png?_a=DATAg1AAZAA0" },
      { name: "AWS", icon: "https://hawatel.com/_next/image/?url=https%3A%2F%2Fhawatel.com%2Fapi%2Fuploads%2FAmazon_Web_Services_Logo_721eb0a90f.png&w=640&q=75" },
      { name: "Snowflake", icon: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/snowflake-color.png" },
      { name: "Apache Airflow", icon: "https://www.apache.org/logos/res/airflow/default.png" },
      { name: "Apache Spark", icon: "https://www.apache.org/logos/res/spark/default.png" },
      { name: "Dagster", icon: "https://docs.dagster.io/images/dagster-primary-mark.svg" },
      { name: "GCP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
      { name: "Sifflet", icon: "https://cdn.brandfetch.io/idPxt-fTQE/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1761785380373" }
    ],
      work: [
        {
          year: "2024-2025",
          role: "Data Engineer",
          company: "Lortech Solutions",
          description:
            "Built complete data pipelines from scratch using dbt+Airflow and Dagster+dbt. Enhanced existing pipelines and worked as a consultant for enterprise clients.",
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
    articles: [
      {
        title: "Automating Salesforce dbt Models: Dynamic Metadata-Driven Modeling",
        excerpt: "Learn how to build automated, metadata-driven dbt models for Salesforce data that scale with your organization's growth.",
        date: "Oct 2025",
        readTime: "4 min",
        url: "https://medium.com/@joachimhodana/automating-salesforce-dbt-models-dynamic-metadata-driven-modeling-df3fe2498da2",
      },
      {
        title: "The Hidden Cost of Wide Tables in Snowflake",
        excerpt: "Understanding the performance and cost implications of wide tables in Snowflake and how to optimize your data warehouse design.",
        date: "Jan 2025",
        readTime: "5 min",
        url: "https://medium.com/@joachimhodana/the-hidden-cost-of-wide-tables-in-snowflake-ab4757902c57",
      },
    ],
    projects: [
      {
        title: "unstar",
        description: "Expand SELECT * to explicit columns in dbt projects.",
        url: "https://github.com/joachimhodana/unstar",
        articleUrl: null,
        thumbnail: null,
        icon: null,
        year: "2024",
      },
    ],
  },
  ml: {
    title: "Machine Learning",
    description:
      "Practical ML focused on model prototyping, training, and deployment, integrated with modern data platforms.",
    currentRole: "Data Engineer",
    currentCompany: "Lortech Solutions",
    currentDates: "Aug 2024 — Present",
    showDownloadCV: false,
    skills: [
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
      { name: "AWS", icon: "https://hawatel.com/_next/image/?url=https%3A%2F%2Fhawatel.com%2Fapi%2Fuploads%2FAmazon_Web_Services_Logo_721eb0a90f.png&w=640&q=75" },
      { name: "Jupyter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
      { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
    ],
    work: [
      {
        year: "2024-2025",
        role: "Data Engineer",
        company: "Lortech Solutions",
        description:
          "Built complete data pipelines from scratch using dbt+Airflow and Dagster+dbt. Enhanced existing pipelines and worked as a consultant for enterprise clients.",
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
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentCareer = careerData[careerPath]

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  // Sync career view from query param ?v=de|swe|ml
  useEffect(() => {
    const variant = searchParams.get("v")
    if (variant === "de") {
      setCareerPath("data")
    } else if (variant === "swe") {
      setCareerPath("software")
    } else if (variant === "ml") {
      setCareerPath(SHOW_ML ? "ml" : "data")
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
    params.set("v", next === "data" ? "de" : next === "software" ? "swe" : "ml")
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input, textarea, or contenteditable
      const target = e.target as HTMLElement
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return
      }

      // Only trigger if no modifier keys are pressed
      if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) {
        return
      }

      if (e.key === "s" || e.key === "S") {
        e.preventDefault()
        updateCareerPath("software")
      } else if (e.key === "d" || e.key === "D") {
        e.preventDefault()
        updateCareerPath("data")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [careerPath])

  // ASCII background animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = 0
    let height = 0
    let particlesArray: Particle[] = []
    let animationFrameId: number

    const numberOfParticles = 400
    const fontSize = 14
    const fontFamily = "ui-monospace, 'Courier New', monospace"
    const symbols = "010101{};<>?|/\\+=~[]".split("")

    let mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 150,
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.x
      mouse.y = e.y
    }

    window.addEventListener("mousemove", handleMouseMove)

    function getFlowFieldAngle(x: number, y: number, time: number) {
      const scale = 0.005
      return (Math.cos(x * scale) + Math.sin(y * scale + time)) * Math.PI
    }

    class Particle {
      x: number = 0
      y: number = 0
      size: number = 10
      speedX: number = 0
      speedY: number = 0
      char: string = "0"
      opacity: number = 0
      fadeIn: boolean = true
      color: string = "rgb(100, 100, 100)"
      life: number = 0

      constructor() {
        this.reset()
        this.life = Math.random() * 100
      }

      reset() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.size = Math.floor(Math.random() * fontSize + 10)
        this.speedX = 0
        this.speedY = 0
        this.char = symbols[Math.floor(Math.random() * symbols.length)]
        this.opacity = 0
        this.fadeIn = true

        const shade = Math.floor(Math.random() * 55 + 50)
        this.color = `rgb(${shade}, ${shade}, ${shade})`
      }

      update(time: number) {
        const angle = getFlowFieldAngle(this.x, this.y, time)

        this.speedX += Math.cos(angle) * 0.1
        this.speedY += Math.sin(angle) * 0.1

        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance
            const forceDirectionY = dy / distance
            const force = (mouse.radius - distance) / mouse.radius
            this.speedX -= forceDirectionX * force * 2
            this.speedY -= forceDirectionY * force * 2

            if (Math.random() > 0.9) {
              this.char = symbols[Math.floor(Math.random() * symbols.length)]
              this.color = "rgb(255, 255, 255)"
            }
          }
        }

        this.speedX *= 0.95
        this.speedY *= 0.95

        this.x += this.speedX + 1
        this.y += this.speedY

        if (this.fadeIn) {
          this.opacity += 0.02
          if (this.opacity >= 0.3) this.fadeIn = false
        } else {
          this.opacity -= 0.003
        }

        if (this.opacity <= 0 || this.x > width || this.x < 0 || this.y > height || this.y < 0) {
          if (Math.random() > 0.5) {
            this.reset()
            this.x = -20
          } else {
            this.reset()
          }
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color
        context.globalAlpha = this.opacity
        context.font = `${this.size}px ${fontFamily}`
        context.fillText(this.char, this.x, this.y)
        context.globalAlpha = 1
      }
    }

    function init() {
      if (!canvas || !ctx) return

      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight

      particlesArray = []
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle())
      }
    }

    function animate() {
      if (!ctx) return
      
      // No background fill - fully transparent
      ctx.clearRect(0, 0, width, height)

      const time = Date.now() * 0.0005

      particlesArray.forEach((particle) => {
        particle.update(time)
        particle.draw(ctx)
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    function handleResize() {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      init()
    }

    window.addEventListener("resize", handleResize)
    init()
    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "work", "projects", "thoughts", "connect"].map((section) => (
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
          <div className="flex items-center p-1 bg-background/80 backdrop-blur-sm border border-border rounded shadow-lg">
            <button
              onClick={() => updateCareerPath("software")}
              className={`text-sm font-medium rounded-l px-4 py-2 transition-all duration-300 ${
                careerPath === "software"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Software Engineer
            </button>
            <button
              onClick={() => updateCareerPath("data")}
              className={`text-sm font-medium px-4 py-2 transition-all duration-300 ${
                careerPath === "data" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Data Engineer
            </button>
            {SHOW_ML && (
              <button
                onClick={() => updateCareerPath("ml")}
                className={`text-sm font-medium rounded-r px-4 py-2 transition-all duration-300 ${
                  careerPath === "ml" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                ML Engineer
              </button>
            )}
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
          <div className="flex items-center gap-2 p-1 bg-background/80 backdrop-blur-sm border border-border rounded shadow-lg scale-90">
            <button
              onClick={() => updateCareerPath("software")}
              className={`text-xs font-medium rounded px-3 py-1.5 transition-all duration-300 ${
                careerPath === "software"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              SWE
            </button>
            <button
              onClick={() => updateCareerPath("data")}
              className={`text-xs font-medium rounded px-3 py-1.5 transition-all duration-300 ${
                careerPath === "data" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              DE
            </button>
            {SHOW_ML && (
              <button
                onClick={() => updateCareerPath("ml")}
                className={`text-xs font-medium rounded px-3 py-1.5 transition-all duration-300 ${
                  careerPath === "ml" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                ML
              </button>
            )}
          </div>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none opacity-30"
        style={{ zIndex: 0 }}
      />
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 relative z-10">
        <header
          id="intro"
          ref={(el) => { sectionsRef.current[0] = el }}
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
                  {currentCareer.showDownloadCV && (
                    <Link
                      href="/Joachim%20Hodana%20CV.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 border border-border rounded text-foreground hover:text-muted-foreground hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      <Download className="size-4" />
                      <span>Download CV</span>
                    </Link>
                  )}
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
                      className="flex items-center gap-2 px-3 py-1 text-xs border border-border rounded hover:border-muted-foreground/50 transition-colors duration-300"
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
          ref={(el) => { sectionsRef.current[1] = el }}
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
                        <div className="flex items-start gap-3">
                          <img
                            src={cert.icon}
                            alt={`${cert.organization} icon`}
                            className="w-6 h-6 object-contain mt-4"
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
          id="projects"
          ref={(el) => { sectionsRef.current[2] = el }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">My Work</h2>
            </div>

            {"projects" in currentCareer && currentCareer.projects && currentCareer.projects.length > 0 ? (
              <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
                {currentCareer.projects.map((project, index) => {
                  const linkUrl = project.articleUrl || project.url
                  return (
                    <Link
                      key={index}
                      href={linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer overflow-hidden"
                    >
                      {project.thumbnail && (
                        <div className="aspect-video w-full bg-muted/30 overflow-hidden">
                          <img
                            src={project.thumbnail}
                            alt={`${project.title} thumbnail`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-6 sm:p-8 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {project.icon && (
                              <img
                                src={project.icon}
                                alt={`${project.title} icon`}
                                className="w-6 h-6 object-contain"
                              />
                            )}
                            <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                              {project.title}
                            </h3>
                          </div>
                          {project.year && (
                            <span className="text-xs text-muted-foreground font-mono">{project.year}</span>
                          )}
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                          <span>{project.articleUrl ? "Read article" : "View project"}</span>
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
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No projects available yet.</p>
              </div>
            )}
          </div>
        </section>

        <section
          id="thoughts"
          ref={(el) => { sectionsRef.current[3] = el }}
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

        <section id="connect" ref={(el) => { sectionsRef.current[4] = el }} className="py-20 sm:py-32 opacity-0">
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
