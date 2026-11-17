import { useId, type ReactNode } from "react"

export function SurfaceBookFrame({ children, laptop = false }: { children: ReactNode; laptop?: boolean }) {
  const bezelId = useId()
  return <div className={laptop ? "pf-surface-book pf-surface-laptop" : "pf-surface-book"}>
    <div className="pf-surface-book-shell">
      <div className="pf-surface-book-body" aria-hidden="true">
        <svg viewBox="0 0 3560 2186.5" focusable="false">
          <defs>
            <clipPath id={bezelId}>
              <rect x="19" y="14" width="3515" height="2158.5" rx="100" />
            </clipPath>
          </defs>
          <image href="/images/recall/device/inner-frame.png" x="19" y="14" width="3515" height="2158.5" preserveAspectRatio="none" clipPath={`url(#${bezelId})`} />
          <image href="/images/recall/device/speakers.svg" x="19" y="256" width="3515" height="250" />
          <image href="/images/recall/device/camera.svg" x="1756" y="75" width="48" height="48" />
        </svg>
      </div>
      <div className="pf-surface-book-screen">{children}</div>
    </div>
    {laptop && <div className="pf-surface-laptop-base" aria-hidden="true" />}
  </div>
}
