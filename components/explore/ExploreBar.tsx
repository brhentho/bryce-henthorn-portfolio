"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { DIRECTIONS, caseHref, homeHref } from "@/lib/explore/content"
import { useEnhanced, treatmentHref } from "./Treatment"

/**
 * Review chrome for the explorations. It scrolls away with the page so it never
 * competes with each direction's own navigation.
 */
export function ExploreBar() {
  const pathname = usePathname() ?? "/explore"
  const current = DIRECTIONS.find((d) => pathname === homeHref(d.id) || pathname === caseHref(d.id))?.id
  const onCase = Boolean(current && pathname === caseHref(current))
  const enhanced = useEnhanced()

  return (
    <nav className="xp-bar" aria-label="Exploration review">
      <Link href="/explore" className="xp-bar-link" aria-current={pathname === "/explore" ? "page" : undefined}>
        Explorations
      </Link>
      {current && (
        <>
          <ul className="xp-bar-group" aria-label="Directions">
            {DIRECTIONS.map((d) => (
              <li key={d.id}>
                <Link
                  href={treatmentHref(onCase ? caseHref(d.id) : homeHref(d.id), enhanced)}
                  className="xp-bar-link"
                  aria-current={d.id === current ? "page" : undefined}
                  title={d.name}
                >
                  <span aria-hidden="true">{d.letter}</span>
                  <span className="sr-only">Direction {d.letter}: {d.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="xp-bar-group" aria-label="Page">
            <li>
              <Link href={treatmentHref(homeHref(current), enhanced)} className="xp-bar-link" aria-current={!onCase ? "page" : undefined}>
                Home
              </Link>
            </li>
            <li>
              <Link href={treatmentHref(caseHref(current), enhanced)} className="xp-bar-link" aria-current={onCase ? "page" : undefined}>
                Case
              </Link>
            </li>
          </ul>
          {/direction-[abc]$/.test(current) && (
            <ul className="xp-bar-group xp-treatment-choice" aria-label="Treatment">
              <li><Link href={pathname} className="xp-bar-link" aria-current={!enhanced ? "true" : undefined} scroll={false}>Original</Link></li>
              <li><Link href={`${pathname}?treatment=enhanced`} className="xp-bar-link" aria-current={enhanced ? "true" : undefined} scroll={false}>Enhanced</Link></li>
            </ul>
          )}
        </>
      )}
      <span className="xp-bar-note">Exploration · not published</span>
    </nav>
  )
}
