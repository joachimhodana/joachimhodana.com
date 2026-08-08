"use client"

import { MapPin, Download, Moon, Sun } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const skills = [
  { name: "dbt", icon: "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/3/dbt-icon-sefw4nnptjlk5lk13atgvm.png/dbt-icon-2yxlz1fvy25mvn5scgnlw.png?_a=DATAg1AAZAA0" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "AWS", icon: "https://hawatel.com/_next/image/?url=https%3A%2F%2Fhawatel.com%2Fapi%2Fuploads%2FAmazon_Web_Services_Logo_721eb0a90f.png&w=640&q=75" },
  { name: "Snowflake", icon: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/snowflake-color.png" },
  { name: "BigQuery", icon: "https://www.vectorlogo.zone/logos/google_bigquery/google_bigquery-icon.svg" },
  { name: "Airflow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apacheairflow/apacheairflow-original.svg" },
  { name: "ClickHouse", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/clickhouse/clickhouse-original.svg" },
  { name: "Dagster", icon: "https://docs.dagster.io/images/dagster-primary-mark.svg" },
  { name: "Power BI", icon: "https://www.vectorlogo.zone/logos/microsoft_powerbi/microsoft_powerbi-icon.svg" },
  { name: "GCP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
]

const work = [
  {
    year: "2026-now",
    role: "Senior Data Engineer",
    company: "ECCO",
    companyUrl: "https://www.ecco.com",
    line: "Building a data platform for HR analytics and reporting with IT and HR stakeholders.",
  },
  {
    year: "2024-2026",
    role: "Data Engineer",
    company: "Lortech Solutions",
    companyUrl: "https://www.lortechsolutions.com",
    icon: "/logos/lortech-solutions-symbol.svg",
    line: "Enterprise data platforms across PE, retail, fintech and SaaS - dbt, Airflow, Snowflake.",
  },
  {
    year: "2022-2023",
    role: "Python Developer",
    company: "Decision Sciences",
    companyUrl: "https://decisionsciences.ai",
    icon: "https://decisionsciences.ai/favicon.ico",
    line: "Data workflows and schemas for an insurance AI pricing product.",
  },
]

const certificates = [
  {
    title: "SnowPro Core",
    url: "https://achieve.snowflake.com/31ea4326-9e88-4148-a8b5-20326f786e50#acc.TX18eKmx",
    icon: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/snowflake-color.png",
  },
  {
    title: "dbt Developer",
    url: "https://credentials.getdbt.com/75e67339-1260-4bb4-bb4e-efbb9c0bc774#acc.JAWU8EDu",
    icon: "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/3/dbt-icon-sefw4nnptjlk5lk13atgvm.png/dbt-icon-2yxlz1fvy25mvn5scgnlw.png?_a=DATAg1AAZAA0",
  },
]

const projects = [
  {
    title: "dbt-doctor",
    line: "CLI that scores dbt project health and catches production footguns.",
    url: "https://dbt-doctor.joachimhodana.com",
    icon: "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/3/dbt-icon-sefw4nnptjlk5lk13atgvm.png/dbt-icon-2yxlz1fvy25mvn5scgnlw.png?_a=DATAg1AAZAA0",
  },
  {
    title: "moneysense-data",
    line: "Streaming Polymarket pipeline for trading bot backtesting.",
    url: "https://github.com/joachimhodana/moneysense-data",
    icon: "/icons/github.svg",
    invertInDark: true,
  },
  {
    title: "dbt-resend",
    line: "dbt package that turns Resend webhook events into warehouse-ready email analytics marts.",
    url: "https://github.com/northgraindata/dbt-resend",
    icon: "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/3/dbt-icon-sefw4nnptjlk5lk13atgvm.png/dbt-icon-2yxlz1fvy25mvn5scgnlw.png?_a=DATAg1AAZAA0",
  },
]

const articles = [
  {
    title: "5 dbt Mistakes I See in Every Startup",
    date: "Jun 2026",
    url: "https://medium.com/data-engineer-things/5-dbt-mistakes-i-see-in-every-startup-c638ed24b95d",
  },
  {
    title: "DuckDB for Data Engineers",
    date: "May 2026",
    url: "https://medium.com/data-engineer-things/duckdb-for-data-engineers-8e885367fcd1",
  },
  {
    title: "Telemetry in dbt pipelines",
    date: "Apr 2026",
    url: "https://medium.com/data-engineer-things/telemetry-in-dbt-pipelines-d853b65816e2",
  },
  {
    title: "Why Data Engineers Should Care About Pydantic",
    date: "Mar 2026",
    url: "https://medium.com/data-engineer-things/why-data-engineers-should-care-about-pydantic-821eb0f6c892",
  },
  {
    title: "The Hidden Cost of Wide Tables in Snowflake",
    date: "Jan 2025",
    url: "https://medium.com/@joachimhodana/the-hidden-cost-of-wide-tables-in-snowflake-ab4757902c57",
  },
]

const socials = [
  { name: "GitHub", url: "https://github.com/joachimhodana", icon: "/icons/github.svg", invertInDark: true },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/joachim-hodana/", icon: "/icons/linkedin.svg" },
  { name: "X", url: "https://x.com/joachimhodana", icon: "/icons/x.svg" },
  { name: "Medium", url: "https://medium.com/@joachimhodana", icon: "https://cdn-icons-png.flaticon.com/512/5968/5968906.png", invertInDark: true },
  { name: "Northgrain", url: "https://northgraindata.com", icon: "https://northgraindata.com/favicon.ico" },
]

function useIsDark() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted && resolvedTheme === "dark"
}

function ThemeToggle() {
  const { setTheme } = useTheme()
  const isDark = useIsDark()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <span className="size-7" aria-hidden />
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex size-7 items-center justify-center rounded text-muted-foreground hover:text-foreground transition-colors"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
    </button>
  )
}

function Home() {
  const isDark = useIsDark()

  return (
    <div className="bg-background text-foreground lg:h-svh lg:overflow-hidden">
      <main className="max-w-3xl mx-auto px-5 sm:px-8 py-8 sm:py-10 lg:h-full lg:flex lg:flex-col lg:justify-between lg:py-8 xl:py-10">
        <header className="space-y-3">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight">Joachim Hodana</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3" />
                Warsaw
              </span>
              <Link
                href="/Joachim_Hodana_Data_Engineer_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 underline underline-offset-4 decoration-foreground/25 hover:decoration-foreground hover:text-foreground"
              >
                <Download className="size-3" />
                CV
              </Link>
              <Link
                href="mailto:me@joachimhodana.com"
                className="underline underline-offset-4 decoration-foreground/25 hover:decoration-foreground hover:text-foreground"
              >
                me@joachimhodana.com
              </Link>
              <ThemeToggle />
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-snug max-w-2xl">
            Senior Data Engineer building production data platforms - dbt, Airflow, Snowflake and
            BigQuery - for enterprise clients across private equity, retail, fintech and SaaS.
          </p>

          <div className="flex flex-wrap gap-x-3 gap-y-1.5 pt-1">
            {skills.map((skill) => (
              <span
                key={skill.name}
                className="inline-flex items-center gap-1 text-[11px] text-foreground/70"
              >
                <img src={skill.icon} alt="" className="w-3 h-3 object-contain" />
                {skill.name}
              </span>
            ))}
          </div>
        </header>

        <section className="mt-7 lg:mt-0">
          <h2 className="text-[10px] text-muted-foreground font-mono tracking-wider uppercase mb-2.5">
            Experience
          </h2>
          <div className="space-y-2.5">
            {work.map((job) => (
              <div key={job.company} className="grid grid-cols-[5.5rem_1fr] gap-3 sm:gap-4 text-sm">
                <div className="text-[11px] text-muted-foreground font-mono pt-0.5">{job.year}</div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    {"icon" in job && job.icon && (
                      <img
                        src={job.icon}
                        alt=""
                        className="w-3.5 h-3.5 object-contain shrink-0"
                        onError={(e) => {
                          e.currentTarget.style.display = "none"
                        }}
                      />
                    )}
                    <span className="font-medium text-foreground">{job.role}</span>
                    <span className="text-muted-foreground/60">·</span>
                    <Link
                      href={job.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground underline underline-offset-4 decoration-foreground/15 hover:decoration-foreground/50 hover:text-foreground"
                    >
                      {job.company}
                    </Link>
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug mt-0.5">{job.line}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-7 lg:mt-0 grid sm:grid-cols-2 gap-7 sm:gap-10">
          <section>
            <div className="flex items-baseline justify-between gap-3 mb-2.5">
              <h2 className="text-[10px] text-muted-foreground font-mono tracking-wider uppercase">
                Projects
              </h2>
              <Link
                href="https://github.com/joachimhodana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-foreground/15"
              >
                all
              </Link>
            </div>
            <div className="space-y-2">
              {projects.map((project) => (
                <Link
                  key={project.title}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-2"
                >
                  <img
                    src={project.icon}
                    alt=""
                    className={`w-3.5 h-3.5 object-contain mt-0.5 shrink-0${
                      isDark && "invertInDark" in project && project.invertInDark ? " invert" : ""
                    }`}
                  />
                  <span className="min-w-0">
                    <span className="text-sm font-medium text-foreground underline underline-offset-4 decoration-foreground/15 group-hover:decoration-foreground">
                      {project.title}
                    </span>
                    <span className="block text-xs text-muted-foreground leading-snug">
                      {project.line}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-baseline justify-between gap-3 mb-2.5">
              <h2 className="text-[10px] text-muted-foreground font-mono tracking-wider uppercase">
                Writing
              </h2>
              <Link
                href="https://medium.com/@joachimhodana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-foreground/15"
              >
                all
              </Link>
            </div>
            <div className="space-y-1.5">
              {articles.map((post) => (
                <Link
                  key={post.url}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline gap-3"
                >
                  <span className="text-[10px] text-muted-foreground/80 font-mono w-14 shrink-0">
                    {post.date}
                  </span>
                  <span className="text-sm text-foreground underline underline-offset-4 decoration-transparent group-hover:decoration-foreground/40 leading-snug">
                    {post.title}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <footer className="mt-7 lg:mt-0 pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {certificates.map((cert) => (
              <Link
                key={cert.title}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              >
                <img src={cert.icon} alt="" className="w-3 h-3 object-contain" />
                <span className="underline underline-offset-4 decoration-foreground/15 hover:decoration-foreground/50">
                  {cert.title}
                </span>
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {socials.map((social) => (
              <Link
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                title={social.name}
              >
                <img
                  src={social.icon}
                  alt=""
                  className={`size-3.5 object-contain${
                    isDark && social.invertInDark ? " invert" : ""
                  }`}
                />
                <span className="hidden sm:inline">{social.name}</span>
              </Link>
            ))}
          </div>
        </footer>
      </main>
    </div>
  )
}

export default Home
