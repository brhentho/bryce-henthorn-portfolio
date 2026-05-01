/** Inline SVG agent-state icons matching the AnimCanvas visual language.
 *  Each icon uses `currentColor` so it inherits the parent's `color` prop. */

type AgentState = 'intake' | 'process' | 'synthesize' | 'output' | 'attention' | 'failed' | 'complete'

interface AgentIconProps {
  state: AgentState
  size?: number
  className?: string
  style?: React.CSSProperties
}

export function AgentIcon({ state, size = 24, className, style }: AgentIconProps) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    className,
    style,
    'aria-hidden': true as const,
  }

  switch (state) {
    case 'intake':
      return (
        <svg {...props}>
          <circle cx="12" cy="7" r="2.5" fill="currentColor" />
          <circle cx="7.7" cy="16" r="2.5" fill="currentColor" />
          <circle cx="16.3" cy="16" r="2.5" fill="currentColor" />
        </svg>
      )
    case 'process':
      return (
        <svg {...props}>
          <circle cx="4.5" cy="12" r="2.5" fill="currentColor" />
          <circle cx="12" cy="12" r="2.5" fill="currentColor" />
          <circle cx="19.5" cy="12" r="2.5" fill="currentColor" />
        </svg>
      )
    case 'synthesize':
      return (
        <svg {...props}>
          <circle cx="5" cy="15" r="2.5" fill="currentColor" />
          <circle cx="12" cy="8" r="2.5" fill="currentColor" />
          <circle cx="19" cy="12" r="2.5" fill="currentColor" />
        </svg>
      )
    case 'output':
      return (
        <svg {...props}>
          <circle cx="4.5" cy="12" r="1.8" fill="currentColor" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
          <circle cx="19.5" cy="12" r="1.8" fill="currentColor" />
        </svg>
      )
    case 'attention':
      return (
        <svg {...props}>
          <path d="M12 4L21.2 18.5H2.8L12 4Z" fill="currentColor" />
        </svg>
      )
    case 'failed':
      return (
        <svg {...props}>
          <path d="M12 2.5L20.5 12L12 21.5L3.5 12L12 2.5Z" fill="currentColor" />
        </svg>
      )
    case 'complete':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="7" fill="currentColor" />
        </svg>
      )
  }
}
