"use client"

import { useEffect, useState } from "react"

interface AnimatedCounterProps {
  end: number
  duration: number
  start?: number
}

export default function AnimatedCounter({ end, duration, start = 0 }: AnimatedCounterProps) {
  const [count, setCount] = useState(start)

  useEffect(() => {
    let startTimestamp: number | null = null
    const animate = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = (timestamp - startTimestamp) / (duration * 1000)

      if (progress < 1) {
        setCount(Math.floor(start + progress * (end - start)))
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, start])

  return <>{count.toLocaleString()}</>
}
