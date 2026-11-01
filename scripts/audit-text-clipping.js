/**
 * Text clipping audit. Paste into a browser console, or run through a
 * DevTools/Playwright `evaluate` on each route at 1440, 1024 and 390px wide.
 *
 * Reports display text (>= 24px) whose glyph ink is cut by a clip-path or
 * overflow ancestor, and adjacent display lines whose boxes overlap.
 * Returns [] when the page is clean.
 */
async function auditTextClipping({ settleMs = 3500 } = {}) {
  await new Promise((r) => setTimeout(r, settleMs))
  const problems = []
  const ctx = document.createElement("canvas").getContext("2d")

  const glyphBox = (el) => {
    const cs = getComputedStyle(el)
    ctx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
    ctx.letterSpacing = cs.letterSpacing === "normal" ? "0px" : cs.letterSpacing
    const m = ctx.measureText(el.textContent.trim())
    const r = el.getBoundingClientRect()
    const fs = parseFloat(cs.fontSize)
    const lh = cs.lineHeight === "normal" ? fs * 1.2 : parseFloat(cs.lineHeight)
    const baseline = r.top + (lh + m.fontBoundingBoxAscent - m.fontBoundingBoxDescent) / 2
    return {
      top: baseline - m.actualBoundingBoxAscent,
      bottom: baseline + m.actualBoundingBoxDescent,
      left: r.left - m.actualBoundingBoxLeft,
      right: r.left + m.actualBoundingBoxRight,
    }
  }

  const leaves = [...document.querySelectorAll("main *")].filter((el) => {
    if (el.children.length) return false
    const t = el.textContent.trim()
    if (!t || el.closest("svg")) return false
    return parseFloat(getComputedStyle(el).fontSize) >= 24 && el.getClientRects().length === 1
  })

  for (const el of leaves) {
    const g = glyphBox(el)
    for (let a = el; a && a !== document.body; a = a.parentElement) {
      const cs = getComputedStyle(a)
      const clips = cs.clipPath !== "none" || cs.overflowX !== "visible" || cs.overflowY !== "visible"
      if (!clips) continue
      const r = a.getBoundingClientRect()
      let box = r
      const m = cs.clipPath.match(/^inset\((.+)\)$/)
      if (m) {
        const fs = parseFloat(cs.fontSize)
        // Tokens may be `12px`, `-0.5em`, `100%` or `calc(0% - 21px)`.
        const tokens = m[1].match(/calc\([^)]*\)|\S+/g)
        const px = (tok, dim) => {
          let sum = 0
          for (const [, sign, num, unit] of tok.matchAll(/([+-]?)\s*(\d*\.?\d+)(px|em|%)?/g)) {
            const v = parseFloat(num) * (sign === "-" ? -1 : 1)
            sum += unit === "em" ? v * fs : unit === "%" ? (v / 100) * dim : v
          }
          return sum
        }
        const [t, rt = t, b = t, l = rt] = tokens
        box = {
          top: r.top + px(t, r.height),
          right: r.right - px(rt, r.width),
          bottom: r.bottom - px(b, r.height),
          left: r.left + px(l, r.width),
        }
      }
      const tol = 0.5
      if (g.top < box.top - tol || g.bottom > box.bottom + tol || (cs.clipPath !== "none" && (g.left < box.left - tol || g.right > box.right + tol))) {
        problems.push({ kind: "clipped", text: el.textContent.trim().slice(0, 40), by: a.className?.toString().slice(0, 60) || a.tagName })
        break
      }
    }
  }

  const blocks = [...document.querySelectorAll("main h1, main h2, main p")].filter(
    (el) => parseFloat(getComputedStyle(el).fontSize) >= 24,
  )
  for (let i = 1; i < blocks.length; i++) {
    const a = blocks[i - 1].getBoundingClientRect()
    const b = blocks[i].getBoundingClientRect()
    const sameColumn = Math.abs(a.left - b.left) < 4
    if (sameColumn && b.top < a.bottom - 1 && b.top > a.top) {
      problems.push({ kind: "overlap", a: blocks[i - 1].textContent.trim().slice(0, 30), b: blocks[i].textContent.trim().slice(0, 30) })
    }
  }
  return problems
}

if (typeof module !== "undefined") module.exports = { auditTextClipping }
