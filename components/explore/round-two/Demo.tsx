"use client"

import { useId, useState } from "react"
import { SimCard, SimDisclaimer, SimIntent, SimStates } from "@/components/explore/SimParts"
import { useAgentSim } from "@/lib/explore/simulation"

export function WorkingDemo() {
  const sim = useAgentSim()
  const [expanded, setExpanded] = useState(true)
  const id = useId()
  return (
    <div className="xr-demo">
      <div className="xr-demo-stage">
        <div className="xr-demo-caption"><span className="xr-label">Windows / research agent</span><span>Interactive study</span></div>
        <div className="xr-demo-viewport">
          <div className="xr-demo-card" id={id} aria-hidden={!expanded} inert={!expanded}><SimCard sim={sim} /></div>
          {!expanded && <p className="xr-demo-collapsed">Work remains visible in the taskbar.<br />Open the agent to inspect its progress.</p>}
        </div>
        <div className="xr-taskbar">
          <span className="xr-taskbar-caption">One familiar return point</span>
          <button type="button" aria-expanded={expanded} aria-controls={id} onClick={() => setExpanded(value => !value)}>
            <img src={sim.current.asset} width={32} height={32} alt="" />
            <span>{expanded ? "Collapse agent" : "Inspect agent"}</span>
          </button>
        </div>
      </div>
      <aside className="xr-demo-explanation">
        <p className="xr-label">See the state. Take control.</p>
        <SimStates sim={sim} />
        <SimIntent sim={sim} />
        <SimDisclaimer />
      </aside>
    </div>
  )
}
