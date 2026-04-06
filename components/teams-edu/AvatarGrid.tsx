"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import Image from "next/image"
import { EmojiReaction } from "@/components/teams-edu/EmojiReaction"
import { useReducedMotion } from "@/components/motion/useReducedMotion"

const AVATARS_ROW_1 = [
  "/assets/avatars/student-female-01.png",
  "/assets/avatars/avatar-1.png",
  "/assets/avatars/avatar-437.png",
  "/assets/avatars/avatar-105.png",
  "/assets/avatars/student-male-04.png",
  "/assets/avatars/avatar-2.png",
  "/assets/avatars/avatar-image.png",
]

const AVATARS_ROW_2 = [
  "/assets/avatars/avatar-3.png",
  "/assets/avatars/avatar-110.png",
  "/assets/avatars/avatar-4.png",
  "/assets/avatars/avatar-5.png",
  "/assets/avatars/ellipse-3764.svg",
  "/assets/avatars/ellipse-3762.svg",
  "/assets/avatars/ellipse-3560.png",
]

const EMOJI_POOL = [
  "/assets/emoji/heart.png",
  "/assets/emoji/grinning.png",
  "/assets/emoji/raised-hand.png",
  "/assets/emoji/clapping.png",
]

const AVATAR_SIZE = 91

interface Reaction {
  id: number
  emoji: string
  row: number
  col: number
  x: number
  y: number
}

export function AvatarGrid() {
  const reduced = useReducedMotion()
  const [reactions, setReactions] = useState<Reaction[]>([])
  const lastAvatarRef = useRef<string>("")
  const counterRef = useRef(0)
  const gridRef = useRef<HTMLDivElement>(null)

  const removeReaction = useCallback((id: number) => {
    setReactions((prev) => prev.filter((r) => r.id !== id))
  }, [])

  // Spawn emoji reactions every 2-4s
  useEffect(() => {
    if (reduced) return

    const spawn = () => {
      const allAvatars = [
        ...AVATARS_ROW_1.map((_, i) => ({ row: 0, col: i })),
        ...AVATARS_ROW_2.map((_, i) => ({ row: 1, col: i })),
      ]

      let pick: (typeof allAvatars)[0]
      const key = () => `${pick.row}-${pick.col}`
      do {
        pick = allAvatars[Math.floor(Math.random() * allAvatars.length)]
      } while (key() === lastAvatarRef.current)
      lastAvatarRef.current = key()

      const emoji = EMOJI_POOL[Math.floor(Math.random() * EMOJI_POOL.length)]
      const id = counterRef.current++

      // Calculate position based on grid layout
      const cols = pick.row === 0 ? AVATARS_ROW_1.length : AVATARS_ROW_2.length
      const gridWidth = gridRef.current?.offsetWidth ?? 800
      const spacing = gridWidth / cols
      const x = spacing * pick.col + spacing / 2
      const y = pick.row * (AVATAR_SIZE + 32) + AVATAR_SIZE / 2

      setReactions((prev) => {
        // Max 2 simultaneous
        const trimmed = prev.length >= 2 ? prev.slice(1) : prev
        return [...trimmed, { id, emoji, row: pick.row, col: pick.col, x, y }]
      })
    }

    const interval = setInterval(spawn, 2000 + Math.random() * 2000)
    // Initial spawn after a short delay
    const initial = setTimeout(spawn, 1500)

    return () => {
      clearInterval(interval)
      clearTimeout(initial)
    }
  }, [reduced])

  const renderRow = (avatars: string[], rowIdx: number) => (
    <div className="flex justify-center gap-4 md:gap-6" key={rowIdx}>
      {avatars.map((src, i) => {
        const staggerDelay = (rowIdx * avatars.length + i) * 0.5

        return (
          <div
            key={src}
            className="relative rounded-full overflow-hidden shrink-0"
            style={{
              width: AVATAR_SIZE,
              height: AVATAR_SIZE,
              boxShadow: "0px 5px 6px rgba(94,94,94,0.15)",
              animation: reduced
                ? "none"
                : `avatar-bob 6s var(--ease-smooth) infinite`,
              animationDelay: `${staggerDelay}s`,
            }}
          >
            <Image
              src={src}
              alt=""
              width={AVATAR_SIZE}
              height={AVATAR_SIZE}
              className="rounded-full object-cover"
            />
          </div>
        )
      })}
    </div>
  )

  return (
    <div ref={gridRef} className="relative flex flex-col gap-6 md:gap-8 py-8">
      {renderRow(AVATARS_ROW_1, 0)}
      {renderRow(AVATARS_ROW_2, 1)}

      {/* Emoji reactions layer */}
      {reactions.map((r) => (
        <EmojiReaction
          key={r.id}
          emoji={r.emoji}
          x={r.x}
          y={r.y}
          onComplete={() => removeReaction(r.id)}
        />
      ))}

      {/* Reduced motion: show a few static emoji */}
      {reduced && (
        <>
          <div className="absolute top-2 left-[20%] z-20">
            <Image src="/assets/emoji/heart.png" alt="" width={24} height={24} />
          </div>
          <div className="absolute top-2 right-[30%] z-20">
            <Image src="/assets/emoji/grinning.png" alt="" width={24} height={24} />
          </div>
          <div className="absolute bottom-4 left-[45%] z-20">
            <Image src="/assets/emoji/clapping.png" alt="" width={24} height={24} />
          </div>
        </>
      )}

    </div>
  )
}
