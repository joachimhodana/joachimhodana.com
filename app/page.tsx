"use client"

import { MapPin, Download } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState, Suspense } from "react"
import { PortfolioLoader } from "@/components/portfolio-loader"

type CareerPath = "software" | "data" | "ml"

// Toggle to quickly show/hide the ML tab in the UI
const SHOW_ML = false

const careerData = {
  software: {
    title: "Software Engineer",
    description:
      "Fullstack developer specializing in building complete web applications, APIs, and SaaS solutions. Working as a freelancer since 2018, delivering projects for clients across Poland, Eastern Europe, US and UK.",
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
        year: "2018 - now",
        role: "Fullstack Developer",
        company: "Freelance",
        companyUrl: "https://joachimhodana.com",
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
      {
        title: "Empowering your AI app with Claude Skills using the Vercel AI SDK",
        excerpt: "How to replace giant prompts with modular, production-ready knowledge loading using Claude Skills and the Vercel AI SDK.",
        date: "Feb 2026",
        readTime: "7 min",
        url: "https://medium.com/@joachimhodana/empowering-your-ai-app-with-claude-skills-using-the-vercel-ai-sdk-38585e4f378f",
      },
    ],
    projects: [
      {
        title: "Latio",
        description: "AutoML platform for revenue decision intelligence.",
        url: "/projects/latio-wip.png",
        articleUrl: null,
        thumbnail: "/projects/latio-wip.png",
        icon: null,
        hideProjectLink: true,
        year: "2026",
      },
      {
        title: "waitset",
        description: "Smart no-code waitlist builder - build complete waitlist solutions from A to Z.",
        url: "https://waitset.com",
        articleUrl: null,
        thumbnail: "/projects/waitset-screenshot.png",
        icon: "https://waitset.com/waitset-logo-bg.png",
        year: "2024",
      },
      {
        title: "dbt-doctor",
        description: "CLI that diagnoses dbt project health — scans SQL models, schema YAML, and project config for naming, documentation, testing, and architecture issues, then outputs a 0–100 score with actionable diagnostics.",
        url: "https://dbt-doctor.joachimhodana.com",
        articleUrl: null,
        thumbnail: null,
        icon: "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/3/dbt-icon-sefw4nnptjlk5lk13atgvm.png/dbt-icon-2yxlz1fvy25mvn5scgnlw.png?_a=DATAg1AAZAA0",
        year: "2026",
      },
      {
        title: "vvvv",
        description: "A modern, web-based network protocol analyzer - think Wireshark in your browser.",
        url: "https://vvvv.joachimhodana.com",
        articleUrl: "https://github.com/joachimhodana/vvvv",
        thumbnail: "/projects/vvvv-screenshot.png",
        icon: "https://vvvv.joachimhodana.com/favicon.ico",
        badge: "OSS",
        year: "2026",
      },
      {
        title: "587.agency",
        description: "Cold outbound agency for B2B SaaS: infrastructure, lead sourcing, campaign ops, and reply handling for predictable pipeline growth.",
        url: "https://587.agency",
        articleUrl: null,
        thumbnail: "/projects/587-agency-screenshot.png",
        icon: "https://www.google.com/s2/favicons?sz=128&domain=587.agency",
        year: "2025",
      },
      {
        title: "data.587.agency",
        description: "B2B SaaS leads database with advanced filtering, CSV/JSON exports, and API access, built for outbound and growth teams.",
        url: "https://data.587.agency",
        articleUrl: null,
        thumbnail: "/projects/data-587-screenshot.png",
        icon: "https://www.google.com/s2/favicons?sz=128&domain=data.587.agency",
        year: "2025",
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
          year: "2024-now",
          role: "Data Engineer",
          company: "Lortech Solutions",
          companyUrl: "https://www.lortechsolutions.com",
          icon: "/logos/lortech-solutions-symbol.svg",
          description:
            "Worked on multiple enterprise data projects across fintech, retail, and SaaS. Built and maintained analytics pipelines using dbt with Airflow or Dagster as orchestrators. Implemented new transformation layers, refactored legacy models, and fixed data quality issues in existing warehouses. Regularly collaborated with business and analytics teams to translate reporting requirements into dbt models and production-ready workflows.",
          tech: ["Python", "SQL", "dbt", "Apache Airflow", "Dagster", "Snowflake", "ETL"],
        },
        {
          year: "2022-2023",
          role: "Python Developer",
          company: "Decision Sciences Company",
          companyUrl: "https://decisionsciences.ai",
          icon: "https://decisionsciences.ai/favicon.ico",
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
        title: "5 dbt Mistakes I See in Every Startup",
        excerpt:
          "The slow way dbt projects fail: full CI rebuilds, missing data contracts, incremental models without on_schema_change, ref() vs source() confusion, and shared dev/prod schemas — plus how to fix each.",
        date: "Jun 2026",
        readTime: "7 min",
        url: "https://medium.com/data-engineer-things/5-dbt-mistakes-i-see-in-every-startup-c638ed24b95d",
      },
      {
        title: "DuckDB for Data Engineers",
        excerpt:
          "Too small for Spark, too slow for Pandas, too annoying for a warehouse: using DuckDB for local file processing, querying DataFrames with SQL, testing dbt locally, and lightweight data quality checks.",
        date: "May 2026",
        readTime: "6 min",
        url: "https://medium.com/data-engineer-things/duckdb-for-data-engineers-8e885367fcd1",
      },
      {
        title: "No Idea Where Your Data Warehouse Spend Goes?",
        excerpt: "Understanding and tracking your data warehouse costs can be challenging. Learn practical strategies to identify and optimize your spending.",
        date: "Jan 2026",
        readTime: "6 min",
        url: "https://medium.com/lortech-solutions-technical-blog/no-idea-where-your-data-warehouse-spend-goes-7d600666993e",
      },
      {
        title: "Why Data Engineers Should Care About Pydantic",
        excerpt:
          "Pydantic is a clean way to define, validate, and move structured data through pipeline code. Models turn implicit contracts into explicit ones at boundaries: settings, API payloads, XComs, and validation errors.",
        date: "Mar 2026",
        readTime: "7 min",
        url: "https://medium.com/data-engineer-things/why-data-engineers-should-care-about-pydantic-821eb0f6c892",
      },
      {
        title: "Telemetry in dbt pipelines",
        excerpt:
          "How to build observability on top of dbt: source freshness, audit logs, exposures, parsing run_results.json, and lightweight anomaly detection for row counts and runtimes.",
        date: "Apr 2026",
        readTime: "6 min",
        url: "https://medium.com/data-engineer-things/telemetry-in-dbt-pipelines-d853b65816e2",
      },
      {
        title: "How we made AI analytics work smoothly?",
        excerpt:
          "A real-world fix for inconsistent AI analytics: simplify and standardize dbt models, naming and semantics, reduce overlap, and regain reliable answers while lowering warehouse costs.",
        date: "Mar 2026",
        readTime: "3 min",
        url: "https://medium.com/lortech-solutions-technical-blog/how-we-made-ai-analytics-work-smoothly-64c7adce93aa",
      },
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
        title: "dbt-doctor",
        description: "CLI that diagnoses dbt project health — scans SQL models, schema YAML, and project config for naming, documentation, testing, and architecture issues, then outputs a 0–100 score with actionable diagnostics.",
        url: "https://dbt-doctor.joachimhodana.com",
        articleUrl: "https://github.com/joachimhodana/dbt-doctor",
        thumbnail: null,
        icon: "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/3/dbt-icon-sefw4nnptjlk5lk13atgvm.png/dbt-icon-2yxlz1fvy25mvn5scgnlw.png?_a=DATAg1AAZAA0",
        year: "2026",
      },
      {
        title: "moneysense-data",
        description: "Streaming Polymarket market data platform for trading bots backtesting.",
        url: "https://github.com/joachimhodana/moneysense-data",
        articleUrl: null,
        thumbnail: null,
        icon: "/icons/github.svg",
        year: "2024",
      },
      {
        title: "unstar",
        description: "Expand SELECT * to explicit columns in dbt projects.",
        url: "https://github.com/joachimhodana/unstar",
        articleUrl: null,
        thumbnail: null,
        icon: "/icons/github.svg",
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
        year: "2024-now",
        role: "Data Engineer",
        company: "Lortech Solutions",
        companyUrl: "https://www.lortechsolutions.com",
        icon: "https://www.lortechsolutions.com/_next/static/media/symbol.117f3a47.svg",
        description:
          "Worked on multiple enterprise data projects across fintech, retail, and SaaS. Built and maintained analytics pipelines using dbt with Airflow or Dagster as orchestrators. Implemented new transformation layers, refactored legacy models, and fixed data quality issues in existing warehouses. Regularly collaborated with business and analytics teams to translate reporting requirements into dbt models and production-ready workflows.",
        tech: ["Python", "SQL", "dbt", "Apache Airflow", "Dagster", "Snowflake", "ETL"],
      },
      {
        year: "2022-2023",
        role: "Python Developer",
        company: "Decision Sciences Company",
        companyUrl: "https://decisionsciences.ai",
        icon: "https://decisionsciences.ai/favicon.ico",
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
  const [isLgViewport, setIsLgViewport] = useState(false)
  const [transitionPhase, setTransitionPhase] = useState<"idle" | "covering" | "revealing">("idle")
  const [cvRevealed, setCvRevealed] = useState(false)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const pendingCareerPathRef = useRef<CareerPath | null>(null)
  const isCareerTransitionRef = useRef(false)
  const transitionTimersRef = useRef<number[]>([])
  const [skipCurtainTransition, setSkipCurtainTransition] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const clearTransitionTimers = () => {
    transitionTimersRef.current.forEach((id) => window.clearTimeout(id))
    transitionTimersRef.current = []
  }

  const scheduleTransitionStep = (fn: () => void, delayMs: number) => {
    const id = window.setTimeout(fn, delayMs)
    transitionTimersRef.current.push(id)
  }

  const currentCareer = careerData[careerPath]

  useEffect(() => () => clearTransitionTimers(), [])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  // Download CV starts dimmed, then eases into its normal look after 3s.
  useEffect(() => {
    const timer = setTimeout(() => setCvRevealed(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  const careerPathFromVariant = (variant: string | null): CareerPath => {
    if (variant === "de") return "data"
    if (variant === "swe") return "software"
    if (variant === "ml") return SHOW_ML ? "ml" : "data"
    return "data"
  }

  // Sync career view from query param ?v=de|swe|ml (skip while curtain animation runs).
  useEffect(() => {
    if (isCareerTransitionRef.current) return
    setCareerPath(careerPathFromVariant(searchParams.get("v")))
  }, [searchParams])

  const updateCareerPath = (next: CareerPath) => {
    if (next === careerPath || transitionPhase !== "idle") return

    clearTransitionTimers()
    pendingCareerPathRef.current = next
    isCareerTransitionRef.current = true

    const COVER_MS = 1000
    const REVEAL_MS = 1000

    // Ensure the curtain paints above the viewport before sliding down.
    requestAnimationFrame(() => {
      setTransitionPhase("covering")

      scheduleTransitionStep(() => {
        const target = pendingCareerPathRef.current
        if (!target) return

        // Swap content while fully covered.
        setCareerPath(target)
        window.scrollTo({ top: 0, behavior: "auto" })

        // Force a frame at full cover before sliding off.
        requestAnimationFrame(() => {
          setTransitionPhase("revealing")

          scheduleTransitionStep(() => {
            setSkipCurtainTransition(true)
            setTransitionPhase("idle")
            isCareerTransitionRef.current = false
            pendingCareerPathRef.current = null

            const params = new URLSearchParams(searchParams.toString())
            params.set("v", target === "data" ? "de" : target === "software" ? "swe" : "ml")
            router.replace(`${pathname}?${params.toString()}`, { scroll: false })

            requestAnimationFrame(() => {
              requestAnimationFrame(() => setSkipCurtainTransition(false))
            })
          }, REVEAL_MS)
        })
      }, COVER_MS)
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    const sync = () => setIsLgViewport(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
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


  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Career-switch curtain: cover screen first, swap content under it, then slide off. */}
      <div
        aria-hidden
        className={`fixed inset-0 z-[60] bg-background pointer-events-none will-change-transform ${
          skipCurtainTransition ? "transition-none" : "transition-transform duration-1000 ease-in-out"
        } ${
          transitionPhase === "covering"
            ? "translate-y-0"
            : transitionPhase === "revealing"
              ? "translate-y-full"
              : "-translate-y-full"
        }`}
      />

      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "work", "projects", "thoughts", "connect"].map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section ? "bg-brand" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      {/* Centered version (desktop, initial hero) */}
      <div
        className={`hidden lg:flex fixed top-8 left-1/2 -translate-x-1/2 z-20 transition-all duration-500 ease-out ${
          isScrolled ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
        }`}
        aria-hidden={isScrolled}
      >
        <div className="flex items-center gap-3 flex-col">
          <div className="text-sm text-muted-foreground font-mono tracking-wider">VIEW MY EXPERIENCE AS</div>
          <div className="flex items-center p-1 bg-background/80 backdrop-blur-sm border border-border rounded shadow-lg">
            <button
              type="button"
              onClick={() => updateCareerPath("software")}
              className={`text-sm font-medium rounded-l px-4 py-2 transition-all duration-300 ${
                careerPath === "software"
                  ? "bg-brand text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Software Engineer
            </button>
            <button
              type="button"
              onClick={() => updateCareerPath("data")}
              className={`text-sm font-medium px-4 py-2 transition-all duration-300 ${
                careerPath === "data" ? "bg-brand text-white" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Data Engineer
            </button>
            {SHOW_ML && (
              <button
                type="button"
                onClick={() => updateCareerPath("ml")}
                className={`text-sm font-medium rounded-r px-4 py-2 transition-all duration-300 ${
                  careerPath === "ml" ? "bg-brand text-white" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                ML Engineer
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Top-right compact (<lg: always; lg+: fades in after scroll — same UI as before) */}
      <div
        className={`flex fixed top-[max(1.5rem,env(safe-area-inset-top,0px))] right-4 z-20 sm:top-6 sm:right-6 transition-all duration-500 ease-out ${
          isScrolled
            ? "opacity-100 scale-100"
            : "opacity-100 scale-100 lg:opacity-0 lg:scale-95 lg:pointer-events-none"
        }`}
        aria-hidden={isLgViewport && !isScrolled}
      >
        <div className="flex items-center gap-3 flex-row">
          <div className="text-xs text-muted-foreground font-mono tracking-wider">VIEW AS</div>
          <div className="flex items-center gap-2 p-1 bg-background/80 backdrop-blur-sm border border-border rounded shadow-lg scale-90">
            <button
              onClick={() => updateCareerPath("software")}
              className={`text-xs font-medium rounded px-3 py-1.5 transition-all duration-300 ${
                careerPath === "software"
                  ? "bg-brand text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              SWE
            </button>
            <button
              onClick={() => updateCareerPath("data")}
              className={`text-xs font-medium rounded px-3 py-1.5 transition-all duration-300 ${
                careerPath === "data" ? "bg-brand text-white" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              DE
            </button>
            {SHOW_ML && (
              <button
                onClick={() => updateCareerPath("ml")}
                className={`text-xs font-medium rounded px-3 py-1.5 transition-all duration-300 ${
                  careerPath === "ml" ? "bg-brand text-white" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                ML
              </button>
            )}
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 relative z-10">
        <header
          id="intro"
          ref={(el) => { sectionsRef.current[0] = el }}
          className="min-h-screen flex items-center opacity-0"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider">PORTFOLIO / {new Date().getFullYear()}</div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  Joachim
                  <br />
                  <span className="text-muted-foreground">Hodana</span>
                  <span className="text-brand">.</span>
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
                  {currentCareer.showDownloadCV && (
                    <Link
                      href="/Joachim_Hodana_Data_Engineer_CV.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-3 py-1.5 border rounded transition-all duration-1000 ease-out ${
                        cvRevealed
                          ? "border-border text-foreground opacity-100 blur-0 hover:text-muted-foreground hover:border-muted-foreground/50"
                          : "border-border/40 text-muted-foreground opacity-40 blur-[1px]"
                      }`}
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
                <div className="space-y-2">
                  <div className="text-foreground">{currentCareer.currentRole}</div>
                  <div className="text-muted-foreground">@ {currentCareer.currentCompany}</div>
                  <div className="text-xs text-muted-foreground">{currentCareer.currentDates}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
                <div className="flex flex-wrap gap-2">
                  {currentCareer.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="flex items-center gap-2 px-3 py-1 text-xs border border-border rounded"
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
                  className="grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50"
                >
                  <div className="lg:col-span-2">
                    <div className="text-xl sm:text-2xl font-light text-muted-foreground">{job.year}</div>
                  </div>

                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium">{job.role}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        {"icon" in job && job.icon && (
                          <img
                            src={job.icon}
                            alt={`${job.company} icon`}
                            className="w-5 h-5 object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                        )}
                        {"companyUrl" in job && job.companyUrl ? (
                          <Link
                            href={job.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-foreground transition-colors duration-300"
                          >
                            {job.company}
                          </Link>
                        ) : (
                          <span>{job.company}</span>
                        )}
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
                  </div>

                  <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                    {job.tech.map((tech) => (
                      <span key={tech} className="px-2 py-1 text-xs text-muted-foreground rounded">
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
                      className="grid lg:grid-cols-12 gap-4 sm:gap-8 py-4 sm:py-6 border-b border-border/30"
                    >
                      <div className="lg:col-span-2">
                        <div className="text-xl sm:text-2xl font-light text-muted-foreground">{award.year}</div>
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
          className="py-14 sm:py-24 lg:min-h-screen lg:py-32 opacity-0"
        >
          <div className="space-y-10 sm:space-y-14 lg:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">My Work</h2>
            </div>

            {"projects" in currentCareer && currentCareer.projects && currentCareer.projects.length > 0 ? (
              <>
              <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
                {currentCareer.projects.map((project, index) => {
                  const linkUrl = project.url
                  const hideProjectLink = "hideProjectLink" in project && project.hideProjectLink
                  /** Whole-card hover only when there is exactly one outbound target (nested links stay valid HTML). */
                  const cardIsSingleLink =
                    Boolean(linkUrl) && !hideProjectLink && project.articleUrl == null

                  const cardBody = (
                    <>
                      {project.thumbnail && (
                        <div className="aspect-[4/3] w-full bg-muted/30 overflow-hidden">
                          <img
                            src={project.thumbnail}
                            alt={`${project.title} thumbnail`}
                            className={
                              cardIsSingleLink
                                ? "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                : "w-full h-full object-cover"
                            }
                          />
                        </div>
                      )}
                      <div className="p-6 sm:p-8 flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-4">
                          {project.icon && (
                            <img
                              src={project.icon}
                              alt={`${project.title} icon`}
                              className="w-6 h-6 object-contain"
                            />
                          )}
                          <div className="flex items-center gap-2">
                            <h3
                              className={
                                cardIsSingleLink
                                  ? "text-lg sm:text-xl font-medium transition-colors duration-300 group-hover:text-muted-foreground"
                                  : "text-lg sm:text-xl font-medium"
                              }
                            >
                              {project.title}
                            </h3>
                            {"badge" in project && project.badge && (
                              <span className="px-2 py-0.5 text-[10px] font-mono tracking-wide border border-border rounded text-muted-foreground">
                                {project.badge}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">{project.description}</p>
                        <div
                          className={`flex items-center gap-4 mt-auto ${hideProjectLink ? "justify-end" : "justify-between"}`}
                        >
                          {!hideProjectLink && (
                            cardIsSingleLink ? (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground pointer-events-none">
                                <span>View project</span>
                                <svg
                                  className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  aria-hidden
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                  />
                                </svg>
                              </div>
                            ) : (
                              <Link
                                href={linkUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/projectlink flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                              >
                                <span>View project</span>
                                <svg
                                  className="w-4 h-4 transform transition-transform duration-300 group-hover/projectlink:translate-x-1"
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
                              </Link>
                            )
                          )}
                          {project.articleUrl && (
                            <Link
                              href={project.articleUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors duration-300"
                            >
                              View repo
                            </Link>
                          )}
                        </div>
                      </div>
                    </>
                  )

                  const cardShellClass =
                    "overflow-hidden flex flex-col border border-border rounded-lg"

                  if (cardIsSingleLink) {
                    return (
                      <Link
                        key={index}
                        href={linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group ${cardShellClass} transition-all duration-500 hover:border-muted-foreground/50 hover:shadow-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
                      >
                        {cardBody}
                      </Link>
                    )
                  }

                  return (
                    <article key={index} className={cardShellClass}>
                      {cardBody}
                    </article>
                  )
                })}
              </div>
              <div className="flex justify-center pt-2">
                <Link
                  href="https://github.com/joachimhodana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded text-sm text-muted-foreground hover:text-foreground hover:border-muted-foreground/50 transition-all duration-300"
                >
                  <span>See more</span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              </>
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
          className="py-14 sm:py-24 lg:min-h-screen lg:py-32 opacity-0"
        >
          <div className="space-y-10 sm:space-y-14 lg:space-y-16">
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
              <>
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
              <div className="flex justify-center pt-2">
                <Link
                  href="https://medium.com/@joachimhodana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded text-sm text-muted-foreground hover:text-foreground hover:border-muted-foreground/50 transition-all duration-300"
                >
                  <span>See more</span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              </>
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
                    icon: "/icons/github.svg",
                  },
                  {
                    name: "LinkedIn",
                    handle: "Joachim Hodana",
                    url: "https://www.linkedin.com/in/joachim-hodana/",
                    icon: "/icons/linkedin.svg",
                  },
                  {
                    name: "X",
                    handle: "@joachimhodana",
                    url: "https://x.com/joachimhodana",
                    icon: "/icons/x.svg",
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
    <Suspense fallback={<PortfolioLoader />}>
      <HomeContent />
    </Suspense>
  )
}
