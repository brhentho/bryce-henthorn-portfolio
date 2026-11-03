import Link from "next/link"
import { PERSON } from "@/lib/explore/content"

export function ExploreFooter({ className = "" }: { className?: string }) {
  return (
    <footer className={`xp-footer ${className}`}>
      <div>
        <p className="xp-body" style={{ color: "var(--text-primary)" }}>{PERSON.name}</p>
        <p className="xp-caption">{PERSON.role} · Microsoft</p>
      </div>
      <div className="xp-footer-links">
        <a className="xp-link xp-body-sm" href={`mailto:${PERSON.email}`}>{PERSON.email}</a>
        <p className="xp-caption">{PERSON.location}</p>
        <Link className="xp-link xp-body-sm" href="/about">About (published)</Link>
      </div>
    </footer>
  )
}
