"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { DIRECTIONS, caseHref, homeHref, type DirectionId } from "@/lib/explore/content"

/**
 * Review chrome for the explorations. It scrolls away with the page so it never
 * competes with each direction's own navigation.
 */
export function ExploreBar() {
  const pathname = usePathname() ?? "/explore"
  const match = pathname.match(/^\/explore\/(direction-[abc])(\/agents-in-windows)?/)
  const current = (match?.[1] ?? null) as DirectionId | null
  const onCase = Boolean(match?.[2])

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
                  href={onCase ? caseHref(d.id) : homeHref(d.id)}
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
              <Link href={homeHref(current)} className="xp-bar-link" aria-current={!onCase ? "page" : undefined}>
                Home
              </Link>
            </li>
            <li>
              <Link href={caseHref(current)} className="xp-bar-link" aria-current={onCase ? "page" : undefined}>
                Case
              </Link>
            </li>
          </ul>
        </>
      )}
      <span className="xp-bar-note">Exploration · not published</span>
    </nav>
  )
}
