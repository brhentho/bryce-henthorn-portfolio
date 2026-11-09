import { useId } from "react"
import { EvidenceReveal } from "./Blocks"

const asset = "/images/recall/identity"
const glows = [
  { file: "glow-violet.svg", cx: 389, cy: 345, width: 666, height: 666, rotation: 0 },
  { file: "glow-diagonal.svg", cx: 387.005, cy: 331, width: 816, height: 746, rotation: 45 },
  { file: "glow-blue.svg", cx: 518.283, cy: 473.289, width: 646.381, height: 540.186, rotation: -28.46 },
  { file: "glow-focus.svg", cx: 392.759, cy: 345.653, width: 86.3823, height: 96.3333, rotation: 47.41 },
] as const

export function RecallIdentity() {
  const id = useId()
  return <EvidenceReveal>
    <figure className="pf-recall-identity">
      <svg className="pf-recall-identity__scene" viewBox="0 0 874 740" role="img" aria-labelledby={`${id}-title`}>
        <title id={`${id}-title`}>Recall logo floating over a softly illuminated blue-violet grid</title>
        <defs>
          <mask id={`${id}-grid`} maskUnits="userSpaceOnUse" x="0" y="90" width="874.174" height="553.773" style={{ maskType: "alpha" }}>
            <image href={`${asset}/grid-mask.svg`} x="0" y="90" width="874.174" height="553.773" />
          </mask>
          <mask id={`${id}-logo`} maskUnits="userSpaceOnUse" x="377" y="310" width="120" height="120" style={{ maskType: "alpha" }}>
            <image href={`${asset}/logo-mask.svg`} x="377" y="310" width="120" height="120" />
          </mask>
        </defs>
        <g transform="translate(436.63 366.885) rotate(-90)">
          <image href={`${asset}/glow-base.svg`} x={-593.286 / 2} y={-580.051 / 2} width="593.286" height="580.051" />
        </g>
        <g mask={`url(#${id}-grid)`}>
          <g transform="translate(112.002 98.697)">
            {Array.from({ length: 63 }, (_, index) => {
              const row = Math.floor(index / 9), column = index % 9
              const highlighted = index === 6 || index === 22 || index === 24 || index === 39
              return <rect key={index} x={column * 71.937225} y={row * 71.937225}
                width="72.847824" height="72.847824" className="pf-recall-identity__cell"
                data-highlighted={highlighted || undefined} strokeDasharray={index === 39 ? "3 3" : undefined} />
            })}
          </g>
        </g>
        {glows.map(glow => <g key={glow.file} transform={`translate(${glow.cx} ${glow.cy}) rotate(${glow.rotation})`}>
          <image href={`${asset}/${glow.file}`} x={-glow.width / 2} y={-glow.height / 2} width={glow.width} height={glow.height} />
        </g>)}
        <image href={`${asset}/logo.svg`} x="382" y="310.002" width="110.001" height="119.996" mask={`url(#${id}-logo)`} />
      </svg>
    </figure>
  </EvidenceReveal>
}
