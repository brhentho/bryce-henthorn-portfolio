export function Vignette({ className }: { className?: string }) {
  return <div className={`vignette ${className ?? ''}`} aria-hidden="true" />
}
