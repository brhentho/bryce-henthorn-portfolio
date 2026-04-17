'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Work', href: '/#projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: 'mailto:bhenthorn2757@gmail.com' },
]

export function NavEditorial() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <nav className="editorial-nav" role="navigation" aria-label="Main navigation">
        <Link href="/" className="editorial-nav-name">
          Bryce Henthorn
        </Link>

        <div className="editorial-nav-links">
          {links.map((link) => {
            const isActive =
              link.href === '/about'
                ? pathname === '/about'
                : link.href === '/#projects'
                  ? pathname === '/'
                  : false

            return (
              <Link
                key={link.label}
                href={link.href}
                style={isActive ? { color: 'var(--w60)' } : undefined}
                {...(link.href.startsWith('mailto:') && {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                })}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col justify-center items-center w-11 h-11 -mr-2 lg:hidden"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          style={{ display: undefined }}
        >
          <span
            className="block w-5 h-px transition-all duration-200"
            style={{
              background: 'var(--w60)',
              transform: mobileOpen ? 'translateY(3px) rotate(45deg)' : undefined,
            }}
          />
          <span
            className="block w-5 h-px mt-1.5 transition-all duration-200"
            style={{
              background: 'var(--w60)',
              transform: mobileOpen ? 'translateY(-3px) rotate(-45deg)' : undefined,
            }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[99] flex flex-col items-center justify-center gap-8 lg:hidden"
          style={{ background: 'rgba(6, 6, 10, 0.95)', backdropFilter: 'blur(24px)' }}
        >
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-lg tracking-widest uppercase"
              style={{ color: 'var(--w45)', letterSpacing: '0.12em', fontSize: '13px' }}
              {...(link.href.startsWith('mailto:') && {
                target: '_blank',
                rel: 'noopener noreferrer',
              })}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
