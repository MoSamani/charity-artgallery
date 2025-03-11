import React, { useState, useEffect } from 'react'
import './Countdown.css'

const Countdown = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date('2025-12-12T11:00:00Z').getTime()
    const now = new Date().getTime()
    const difference = targetDate - now

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="countdown-container">
      <h2 className="date-title">12.Dezember</h2>
      <div className="countdown-timer">
        {/* <span>{timeLeft.days}</span> :  */}
        <span>{timeLeft.hours}</span> :<span>{timeLeft.minutes}</span> :
        <span>{timeLeft.seconds}</span>
      </div>
      <div className="countdown-labels">
        <span>Uhr</span> <span>Minuten</span> <span>Sekunden</span>
      </div>
    </div>
  )
}

export default Countdown
