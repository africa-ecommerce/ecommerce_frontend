"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  targetDate: Date
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<{
    days: number
    hours: number
    minutes: number
  }>({ days: 0, hours: 0, minutes: 0 })

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0 })
        return
      }

      // Calculate days, hours, minutes
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))

      setTimeRemaining({ days, hours, minutes })
    }

    // Calculate immediately
    calculateTimeRemaining()

    // Update every minute
    const interval = setInterval(calculateTimeRemaining, 60000)

    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <span className="font-medium text-blue-900">
      {timeRemaining.days} days, {timeRemaining.hours} hours, {timeRemaining.minutes} minutes
    </span>
  )
}
