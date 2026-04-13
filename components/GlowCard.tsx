"use client"

import { useState, type ReactNode } from "react"

interface GlowCardProps {
  title?: string
  description?: string
  icon?: ReactNode
}

const ASSETS = {
  texture1:       "/images/card-assets/texture1.png",
  titleGradient:  "/images/card-assets/title-gradient.png",
  sunshine26:     "/images/card-assets/sunshine26.jpg",
  vectorMask:     "/images/card-assets/vector-mask.png",
  cardMask:       "/images/card-assets/card-mask.svg",
  shineMaskL:     "/images/card-assets/shine-mask-left.svg",
  shineMaskR:     "/images/card-assets/shine-mask-right.svg",
  texMask1:       "/images/card-assets/texture-mask-1.svg",
  texMask2:       "/images/card-assets/texture-mask-2.svg",
  outline:        "/images/card-assets/outline.svg",
  el1:            "/images/card-assets/edge-glow-1.svg",
  el2:            "/images/card-assets/edge-glow-2.svg",
  el3:            "/images/card-assets/edge-glow-3.svg",
  el4:            "/images/card-assets/edge-glow-4.svg",
  el5:            "/images/card-assets/edge-glow-5.svg",
  el6:            "/images/card-assets/edge-glow-6.svg",
  shieldBase:     "/images/card-assets/shield-base.svg",
  shieldLight:    "/images/card-assets/shield-light.svg",
  shieldOverlay:  "/images/card-assets/shield-overlay.svg",
  shieldInner:    "/images/card-assets/shield-inner.svg",
  shieldOutline1: "/images/card-assets/shield-outline-1.svg",
  shieldOutline2: "/images/card-assets/shield-outline-2.svg",
  shieldOutline3: "/images/card-assets/shield-outline-3.svg",
  shieldEdge1:    "/images/card-assets/shield-edge-1.svg",
  shieldEdge2:    "/images/card-assets/shield-edge-2.svg",
  shieldEdge3:    "/images/card-assets/shield-edge-3.svg",
}

const S = 330.023
const R = 16.164

function mask(url: string, pos: string, size?: string) {
  const s = size || `${S}px ${S}px`
  return {
    WebkitMaskImage: `url('${url}')`,
    maskImage: `url('${url}')`,
    WebkitMaskSize: s,
    maskSize: s,
    WebkitMaskPosition: pos,
    maskPosition: pos,
    WebkitMaskRepeat: "no-repeat" as const,
    maskRepeat: "no-repeat" as const,
  }
}

function dualMask(url1: string, url2: string, pos1: string, pos2: string) {
  return {
    WebkitMaskImage: `url('${url1}'), url('${url2}')`,
    maskImage: `url('${url1}'), url('${url2}')`,
    WebkitMaskPosition: `${pos1}, ${pos2}`,
    maskPosition: `${pos1}, ${pos2}`,
    WebkitMaskRepeat: "no-repeat" as const,
    maskRepeat: "no-repeat" as const,
  }
}

interface EdgeGlowProps {
  left: number
  top: number
  w: number
  h: number
  src: string
  insetStr: string
  blend?: string
  maskPos: string
}

function EdgeGlow({ left, top, w, h, src, insetStr, blend, maskPos }: EdgeGlowProps) {
  return (
    <div
      style={{
        position: "absolute", left, top, width: w, height: h,
        mixBlendMode: (blend || "normal") as React.CSSProperties["mixBlendMode"],
        ...dualMask(ASSETS.cardMask, ASSETS.outline, maskPos, maskPos),
        overflow: "visible",
      }}
    >
      <img
        src={src}
        alt=""
        style={{
          position: "absolute", inset: insetStr, display: "block",
          maxWidth: "none", width: "100%", height: "100%",
        }}
      />
    </div>
  )
}

export default function GlowCard({
  title = "Secure & Scalable",
  description = "Military-grade encryption and flexible scalability\nkeep your business secure and growing.",
  icon,
}: GlowCardProps) {
  const [mp, setMp] = useState({ x: 0.5, y: 0.5 })
  const [hov, setHov] = useState(false)

  return (
    <div
      style={{ position: "relative", width: S, height: 329.349, cursor: "default" }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        setMp({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height })
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Base */}
      <div style={{
        position: "absolute", left: 0, top: 0.34, width: S, height: S,
        borderRadius: R, background: "#101116",
        boxShadow: "21.553px 32.329px 59.269px 0px black",
      }} />

      {/* Clipped overlay container */}
      <div style={{ position: "absolute", left: 0, top: 0, width: S, height: S, overflow: "hidden", borderRadius: R }}>

        {/* bg-shine left */}
        <div style={{
          position: "absolute",
          left: "calc(50% - 155.58px)", top: 71.39,
          width: 137.397, height: 170.4,
          display: "flex", alignItems: "center", justifyContent: "center",
          transform: "translateX(-50%)",
        }}>
          <div style={{ transform: "rotate(90deg)", width: 170.4, height: 137.397 }}>
            <div style={{
              width: 170.4, height: 137.397, position: "relative",
              ...mask(ASSETS.cardMask, "59.268px -71.393px"),
              overflow: "visible",
            }}>
              <img src={ASSETS.shineMaskL} alt="" style={{ position: "absolute", inset: "-95.21% -76.77%", display: "block", maxWidth: "none", width: "calc(100% + 153.54%)", height: "calc(100% + 190.42%)" }} />
            </div>
          </div>
        </div>

        {/* bg-shine right */}
        <div style={{
          position: "absolute",
          left: "calc(50% + 148.85px)", top: 79.47,
          width: 137.397, height: 170.4,
          display: "flex", alignItems: "center", justifyContent: "center",
          transform: "translateX(-50%)",
        }}>
          <div style={{ transform: "rotate(90deg)", width: 170.4, height: 137.397 }}>
            <div style={{
              width: 170.4, height: 137.397, position: "relative",
              ...mask(ASSETS.cardMask, "-245.161px -79.475px"),
              overflow: "visible",
            }}>
              <img src={ASSETS.shineMaskR} alt="" style={{ position: "absolute", inset: "-95.21% -76.77%", display: "block", maxWidth: "none", width: "calc(100% + 153.54%)", height: "calc(100% + 190.42%)" }} />
            </div>
          </div>
        </div>

        {/* bg-texture 1 */}
        <div style={{
          position: "absolute", inset: "0 -1.02% -1.23% 0",
          mixBlendMode: "overlay",
          ...dualMask(ASSETS.cardMask, ASSETS.texMask1, "-0.002px 0px", "-233.033px -49.167px"),
        }}>
          <img src={ASSETS.texture1} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }} />
        </div>

        {/* Text */}
        <div style={{
          position: "absolute", left: 21.55, top: 254.59, width: 284.224,
          display: "flex", flexDirection: "column", gap: 5.388,
          fontStyle: "normal",
          ...mask(ASSETS.cardMask, "-21.553px -254.589px"),
        }}>
          <p style={{
            fontFamily: "var(--font-inter-tight), 'Inter Tight', sans-serif", fontWeight: 500,
            fontSize: 16.164, lineHeight: "normal", margin: 0, width: "100%",
            backgroundImage: `url('${ASSETS.titleGradient}')`,
            backgroundSize: "cover", backgroundPosition: "center",
            backgroundClip: "text", WebkitBackgroundClip: "text",
            color: "transparent", WebkitTextFillColor: "transparent",
          }}>{title}</p>
          <p style={{
            fontFamily: "var(--font-inter-tight), 'Inter Tight', sans-serif", fontWeight: 400,
            fontSize: 10.776, lineHeight: 1.4, color: "white", opacity: 0.6,
            margin: 0, width: "100%", whiteSpace: "pre-wrap",
          }}>{description}</p>
        </div>

        {/* bg-texture 2 */}
        <div style={{
          position: "absolute", inset: "0 -1.02% -1.23% 0",
          mixBlendMode: "overlay",
          ...dualMask(ASSETS.cardMask, ASSETS.texMask2, "0px 0px", "-138.74px 187.237px"),
        }}>
          <img src={ASSETS.texture1} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }} />
        </div>

        {/* Border outline */}
        <div style={{
          position: "absolute", left: 0, top: 0.34, width: S, height: S,
          borderRadius: R, border: "2.021px solid white",
          mixBlendMode: "overlay", opacity: 0.3, boxSizing: "border-box",
          ...dualMask(ASSETS.cardMask, ASSETS.outline, "0px 0px", "0px 0px"),
          pointerEvents: "none",
        }} />

        {/* Edge glow elements 1-6 */}
        <EdgeGlow left={6.06} top={-40.41} w={235.731} h={138.744} src={ASSETS.el1} insetStr="-81.55% -48%" maskPos="-6.063px 40.411px" />
        <EdgeGlow left={26.94} top={-24.25} w={165.011} h={97.66} src={ASSETS.el2} insetStr="-115.86% -68.57%" blend="plus-lighter" maskPos="-26.941px 24.246px" />
        <EdgeGlow left={35.7} top={-40.41} w={127.295} h={90.251} src={ASSETS.el3} insetStr="-125.37% -88.89%" blend="lighten" maskPos="-35.697px 40.411px" />
        <EdgeGlow left={99.01} top={284.9} w={227.648} h={134.03} src={ASSETS.el4} insetStr="-84.42% -49.7%" maskPos="-99.006px -284.897px" />
        <EdgeGlow left={119.89} top={276.82} w={159.623} h={94.292} src={ASSETS.el5} insetStr="-120% -70.89%" blend="plus-lighter" maskPos="-119.885px -276.815px" />
        <EdgeGlow left={127.3} top={303.08} w={123.253} h={86.884} src={ASSETS.el6} insetStr="-130.23% -91.8%" blend="lighten" maskPos="-127.295px -303.082px" />

        {/* Sunshine radial */}
        <div style={{
          position: "absolute",
          left: "calc(50% - 0.32px)", top: -298.36,
          width: 799.485, height: 756.407,
          transform: "translateX(-50%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          mixBlendMode: "plus-lighter", pointerEvents: "none",
        }}>
          <div style={{ transform: "rotate(-31.76deg)" }}>
            <div style={{
              width: 631.608, height: 498.619, position: "relative", opacity: 0.2,
              ...mask(ASSETS.cardMask, "235.057px 298.36px"),
              overflow: "hidden",
            }}>
              <img src={ASSETS.sunshine26} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "#1679de", mixBlendMode: "overlay" }} />
            </div>
          </div>
        </div>

        {/* Hover glow */}
        <div style={{
          position: "absolute", inset: -60,
          background: `radial-gradient(280px circle at ${mp.x * 100}% ${mp.y * 100}%, rgba(22,121,222,0.06) 0%, transparent 55%)`,
          opacity: hov ? 1 : 0, transition: "opacity 0.4s cubic-bezier(.4,0,.2,1)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Shield icon (or custom icon) */}
      {icon ? (
        <div style={{
          position: "absolute", left: 84.86, top: 37.04,
          width: 160.297, height: 185.217,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {icon}
        </div>
      ) : (
        <div style={{
          position: "absolute", left: 84.86, top: 37.04,
          width: 160.297, height: 185.217,
          filter: "drop-shadow(10.776px 21.553px 21.553px rgba(0,0,0,0.5))",
        }}>
          <div style={{ position: "absolute", inset: "8.73% 10.08% 9.09% 10.08%" }}>
            <img src={ASSETS.shieldBase} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
          </div>
          <div style={{ position: "absolute", inset: "8.73% 10.08% 9.09% 10.08%", mixBlendMode: "plus-lighter" }}>
            <img src={ASSETS.shieldLight} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
          </div>
          <div style={{ position: "absolute", inset: "8.73% 10.08% 9.09% 10.08%", mixBlendMode: "overlay", overflow: "hidden" }}>
            <img src={ASSETS.shieldOverlay} alt="" style={{ position: "absolute", inset: "-28.32% -25.26% 0 -8.42%", maxWidth: "none", display: "block" }} />
          </div>
          <div style={{
            position: "absolute", inset: "8.73% 10.08% 9.09% 10.08%",
            ...mask(ASSETS.vectorMask, "-2.023px -18.185px", "154.234px 167.705px"),
          }}>
            <img src={ASSETS.shieldInner} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
          </div>
          <div style={{ position: "absolute", inset: "8% 8.82%", overflow: "visible" }}>
            <img src={ASSETS.shieldOutline1} alt="" style={{ position: "absolute", inset: "-6.93% -8.16%", maxWidth: "none", display: "block" }} />
          </div>
          <div style={{ position: "absolute", inset: "8% 8.82%", overflow: "visible" }}>
            <img src={ASSETS.shieldOutline2} alt="" style={{ position: "absolute", inset: "-6.93% -8.16%", maxWidth: "none", display: "block" }} />
          </div>
          <div style={{ position: "absolute", inset: "9.82% 8.93% 71.09% 8.93%", overflow: "visible" }}>
            <img src={ASSETS.shieldOutline3} alt="" style={{ position: "absolute", inset: "-19.04% -5.11% -15.43% -5.11%", maxWidth: "none", display: "block" }} />
          </div>
          <div style={{ position: "absolute", inset: "8.73% 10.5% 9.09% 10.5%", overflow: "visible" }}>
            <img src={ASSETS.shieldEdge1} alt="" style={{ position: "absolute", inset: "-10.62% -12.77% -10.83% -12.77%", maxWidth: "none", display: "block" }} />
          </div>
          <div style={{ position: "absolute", inset: "8.73% 10.5% 9.09% 10.5%", mixBlendMode: "plus-lighter", overflow: "visible" }}>
            <img src={ASSETS.shieldEdge2} alt="" style={{ position: "absolute", inset: "-10.62% -12.77% -10.83% -12.77%", maxWidth: "none", display: "block" }} />
          </div>
          <div style={{ position: "absolute", inset: "8.73% 10.5% 9.09% 10.5%", mixBlendMode: "overlay", overflow: "visible" }}>
            <img src={ASSETS.shieldEdge3} alt="" style={{ position: "absolute", inset: "-10.62% -12.77% -10.83% -12.77%", maxWidth: "none", display: "block" }} />
          </div>
        </div>
      )}
    </div>
  )
}
