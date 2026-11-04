"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FINALISTS, finalistHref } from "@/lib/explore/finalists"
import { useHeroChoice } from "../Treatment"

export function FinalReviewBar() {
  const pathname = usePathname()
  const current = FINALISTS.find(item => pathname.startsWith(`/explore/${item.id}`))
  const onCase = pathname.endsWith("/agents-in-windows")
  const hero = useHeroChoice()
  return <nav className="xp-bar fn-review-bar" aria-label="Finalist comparison">
    <Link href="/explore" className="xp-bar-link">Compare</Link>
    <ul className="xp-bar-group" aria-label="Concepts">{FINALISTS.map(item =>
      <li key={item.id}><Link href={finalistHref(item.id, onCase, hero)} className="xp-bar-link" aria-current={current?.id === item.id ? "page" : undefined}>{item.name}</Link></li>
    )}</ul>
    {current && <ul className="xp-bar-group" aria-label="Page">
      <li><Link className="xp-bar-link" href={finalistHref(current.id, false, hero)} aria-current={!onCase ? "page" : undefined}>Home</Link></li>
      <li><Link className="xp-bar-link" href={finalistHref(current.id, true, hero)} aria-current={onCase ? "page" : undefined}>Case</Link></li>
    </ul>}
    {current?.id === "synthesis" && <ul className="xp-bar-group" aria-label="Hero artwork">{(["ascii", "orb"] as const).map(kind =>
      <li key={kind}><Link href={finalistHref("synthesis", onCase, kind)} scroll={false} className="xp-bar-link" aria-current={hero === kind ? "page" : undefined}>{kind.toUpperCase()}</Link></li>
    )}</ul>}
    <Link className="xp-bar-link" href="/explore/archive">Archive</Link>
  </nav>
}
