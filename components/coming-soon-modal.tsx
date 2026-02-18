"use client"

import { cn } from "@/lib/utils"

interface ComingSoonModalProps {
  open: boolean
  onClose: () => void
}

export function ComingSoonModal({ open, onClose }: ComingSoonModalProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Case study coming soon"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
      />
      {/* Modal */}
      <div className="relative rounded-[var(--radius-card)] border border-border bg-surface p-8 max-w-sm w-full text-center">
        <p className="text-foreground font-heading font-semibold text-base mb-1.5">Case study coming soon</p>
        <p className="text-foreground-tertiary text-sm font-sans mb-6">
          This project is still being documented.
        </p>
        <button
          type="button"
          onClick={onClose}
          className={cn(
            "text-sm font-sans font-medium px-5 py-2.5 rounded-[var(--radius-button)] border border-border",
            "text-foreground-secondary hover:bg-foreground hover:text-background transition-all duration-300",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          )}
        >
          Close
        </button>
      </div>
    </div>
  )
}
