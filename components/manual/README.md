# Operator Manual

A scoped design system for the `/recall` case study experiment. Operator-manual aesthetic: hairline rules, mono labels, figure numbering, marginalia, instrument-style readouts.

**Scope.** Everything in this folder is namespaced under the `.manual` CSS class. Tokens, type scale, and layout primitives only apply inside that wrapper. The rest of the site is unaffected.

If this aesthetic lands on `/recall`, it gets ported to the other case studies and the home page. Until then: contained experiment.

## Token system

Tokens live in `app/recall/recall.css` under `.manual { … }`. Components read them via CSS custom properties — never hard-code colour or font. The system is dark-only.

### Material
| Token | Value |
|---|---|
| `--ink` | `#0F0F10` |

### Surface
| Token | Value |
|---|---|
| `--rule` | `#2A2A2C` |
| `--rule-strong` | `#3F3F42` |
| `--text-primary` | `#F5F1E8` |
| `--text-secondary` | `#A8A6A0` |
| `--text-tertiary` | `#6E6C68` |
| `--bg` | `var(--ink)` |
| `--fg` | `var(--text-primary)` |

### Accents
| Token | Value | Use |
|---|---|---|
| `--accent-schematic` | `#6B8FB8` | active geometry in diagrams, focal points |
| `--accent-signal` | `#8FB079` | positive telemetry |
| `--accent-alert` | `#D49B3D` | caution states |
| `--accent-warning` | `#A86060` | error / warning states |

## Type scale

| Class | Family | Weight | Size | Line | Tracking |
|---|---|---|---|---|---|
| `t-display-xl` | Inter Tight | 600 | 4.5rem | 1.05 | -0.02em |
| `t-display-l` | Inter Tight | 600 | 3rem | 1.10 | -0.015em |
| `t-h1` | Inter Tight | 600 | 2.25rem | 1.15 | -0.01em |
| `t-h2` | Inter Tight | 500 | 1.625rem | 1.25 | -0.005em |
| `t-h3` | Inter Tight | 500 | 1.25rem | 1.35 | — |
| `t-body` | Open Sans | 400 | 1.0625rem | 1.65 | -0.005em |
| `t-body-sm` | Open Sans | 400 | 0.9375rem | 1.60 | — |
| `t-mono-label` | JetBrains Mono | 500 | 0.75rem | 1.4 | 0.08em / uppercase |
| `t-mono-caption` | JetBrains Mono | 400 | 0.8125rem | 1.55 | — |
| `t-mono-marginalia` | JetBrains Mono | 400 | 0.75rem | 1.5 | — |

## Components

All components are in `components/manual/`. Import from the barrel: `import { Figure, Telemetry } from "@/components/manual"`.

| Component | Props | Purpose |
|---|---|---|
| `RegistrationMark` | `size?, className?` | Decorative 12×12 SVG crosshair. Used in figure corners and chrome. `aria-hidden`. |
| `Crossref` | `section, href, label?` | Inline mono `§ N.N` link. |
| `RevisionHeader` | `rev, date, name, doc` | Top-of-page mono row with hairline rule. |
| `SectionLabel` | `number, label, title, id?` | Mono small-caps eyebrow above a real `<h2>`. |
| `SpecSheet` | `rows: {label,value}[]` | Label/value grid with hairline rules between rows. |
| `Figure` | `number, caption?, cf?, src?, alt?, width?, height?, priority?, children?` | Wraps img/video/svg/children with figure number, mono caption, optional cross-reference. |
| `Telemetry` | `items: {value,unit,label}[]` | Instrument-style readout. Tabular numerals. |
| `Margin` | `children, anchor?` | Right-margin aside on ≥1024px (CSS grid right-column area), inline `<aside>` below. |
| `StateDiagram` | `states: {label}[], duration?` | Animated SVG sequence. Pauses on `prefers-reduced-motion`. |
| `ProgressIndicator` | `className?` | Fixed top-right `§ NN / TT`, scroll-tracked. Desktop only. `aria-hidden`. |
| `CoverPlate` | `number, total, title, ambient?` | Internal chapter divider — full-framed plate, ~60vh, with corner registration marks. |

## Usage

The `/recall` page wraps all content in `ManualShell`, which mounts the `.manual` scope plus the orientation chrome (`ProgressIndicator`, `NowReading`) and the scroll-reveal controller:

```tsx
import { ManualShell } from "./ManualShell"
import { RevisionHeader, SectionLabel, SpecSheet, Figure, Telemetry, Margin } from "@/components/manual"

export default function Page() {
  return (
    <ManualShell>
      <RevisionHeader rev="2.3" date="April 2026" name="Bryce Henthorn" doc="Recall" />
      <main className="container">
        <section data-section id="hero">
          <h1 className="t-display-xl">Making AI memory legible</h1>
        </section>

        <section data-section id="problem">
          <SectionLabel number="01" label="Problem" title="…" />
          <div className="section-grid">
            <p className="t-body">Body copy.</p>
            <Margin>Designer's note.</Margin>
          </div>
          <Figure number="1.1" caption="Search vs. recall" src="/images/recall/fig-1-1.png" />
        </section>
      </main>
    </ManualShell>
  )
}
```

Every scrollable section needs `data-section` so `ProgressIndicator` can track position via `IntersectionObserver`.

## Storybook

```
pnpm storybook
```

Stories live next to each component as `*.stories.tsx`. Every story renders inside the `.manual` scope automatically via the global decorator.

## Accessibility

- Headings (`SectionLabel`) emit real `<h2>`. No styled divs.
- `ProgressIndicator` is `aria-hidden` — purely decorative orientation.
- `Figure` falls back to `caption` for `alt` when no `alt` is provided.
- `StateDiagram` honours `prefers-reduced-motion`.
- `Margin` reflows inline below 1024px — never visually hidden.

## Adding a new component

1. Create `ComponentName.tsx` in this folder.
2. Read tokens via CSS variables. Never hard-code colour or font family.
3. Render only inside `.manual` (the page wrapper). If it must be `position: fixed`, mount it as a child of `.manual` so the cascade still applies.
4. Export from `index.ts`.
5. Add `ComponentName.stories.tsx` with at least a `Default` story.
6. Update this README.
