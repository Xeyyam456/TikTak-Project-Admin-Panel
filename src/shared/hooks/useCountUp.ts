import { useEffect, useRef, useState } from 'react'

// Animates from whatever the previous rendered number was up to `target`,
// over `duration` ms, via requestAnimationFrame (not CSS) since the displayed
// number itself has to change every frame, not just its style. Starts at 0 on
// mount so the very first load counts up rather than snapping straight to the
// final value.
export function useCountUp(target: number, duration = 3000): number {
  const [value, setValue] = useState(0)
  const valueRef = useRef(0)

  useEffect(() => {
    const from = valueRef.current
    if (from === target) return

    let frameId: number
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - (1 - progress) ** 2
      const next = Math.round(from + (target - from) * eased)
      valueRef.current = next
      setValue(next)
      if (progress < 1) {
        frameId = requestAnimationFrame(tick)
      }
    }
    frameId = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frameId)
  }, [target, duration])

  return value
}
