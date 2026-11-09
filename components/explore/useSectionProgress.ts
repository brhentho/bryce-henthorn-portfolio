"use client"

import { useScroll, useTransform, type MotionValue } from "framer-motion"
import type { RefObject } from "react"

type Offset = NonNullable<Parameters<typeof useScroll>[0]>["offset"]

/**
 * Section-relative scroll progress that always runs on the main thread.
 * framer-motion 12 builds its accelerated ScrollTimeline during render, when
 * `ref.current` is still null, so accelerated properties (opacity, clipPath,
 * filter) end up tracking document scroll instead of the section. Passing the
 * progress through a function transform opts out of that path.
 */
export function useSectionProgress(ref: RefObject<HTMLElement | null>, offset: Offset): MotionValue<number> {
  const { scrollYProgress } = useScroll({ target: ref, offset })
  return useTransform(scrollYProgress, (v) => v)
}
