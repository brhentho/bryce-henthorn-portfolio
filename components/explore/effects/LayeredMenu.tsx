"use client"

import Link from "next/link"
import { useEffect, useId, useRef, useState } from "react"
import { useReducedMotion } from "../useReducedMotion"
import { motionMs, motionToken } from "../round-two/Motion"

export function LayeredMenu() {
  const ref = useRef<HTMLDialogElement>(null)
  const button = useRef<HTMLButtonElement>(null)
  const animation = useRef<Animation | null>(null)
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const id = useId()
  useEffect(() => () => { animation.current?.cancel() }, [])
  const close = (instant = false) => {
    const dialog = ref.current
    if (!dialog) return
    const currentTransform = getComputedStyle(dialog).transform
    animation.current?.cancel()
    const finish = () => { dialog.close(); setOpen(false); button.current?.focus() }
    if (instant || reduce) { finish(); return }
    animation.current = dialog.animate([{ transform: currentTransform, opacity: 1 }, { transform: "translateX(100%)", opacity: 0 }],
      { duration: motionMs("--duration-fast-ui"), easing: motionToken("--ease-out-expo") })
    animation.current.onfinish = finish
  }
  const show = (instant: boolean) => {
    const dialog = ref.current
    if (!dialog) return
    animation.current?.cancel()
    if (!dialog.open) dialog.showModal()
    dialog.dataset.animate = String(!instant && !reduce)
    setOpen(true)
    if (!instant && !reduce) {
      animation.current = dialog.animate([{ transform: "translateX(100%)" }, { transform: "translateX(0)" }],
        { duration: motionMs("--duration-normal-ui"), easing: motionToken("--ease-out-expo") })
    }
  }
  return <>
    <button ref={button} className="xf-menu-trigger" type="button" aria-expanded={open} aria-controls={id} onClick={event => show(event.detail === 0)}>Menu <span aria-hidden="true">+</span></button>
    <dialog ref={ref} id={id} className="xf-menu" aria-label="Portfolio navigation" onCancel={event => { event.preventDefault(); close(true) }}
      onClick={event => { if (event.target === event.currentTarget && event.clientX < event.currentTarget.getBoundingClientRect().left) close() }}>
      <button className="xf-menu-close" type="button" onClick={event => close(event.detail === 0)}>Close <span aria-hidden="true">×</span></button>
      <p className="xr-label">Bryce Henthorn / Portfolio</p>
      <nav aria-label="Portfolio">
        <Link href="/explore/direction-f#work" onClick={() => close(true)}><span>01</span>Selected work</Link>
        <Link href="/about" onClick={() => close(true)}><span>02</span>About <small>Published</small></Link>
        <a href="mailto:bhenthorn2757@gmail.com" onClick={() => close(true)}><span>03</span>Get in touch</a>
      </nav>
    </dialog>
  </>
}
