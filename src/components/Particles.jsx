import { useEffect, useRef } from 'react'

const Particles = () => {
    const canvasRef = useRef(null)
    const rafRef = useRef(null)
    const particlesRef = useRef([])
    const mouseRef = useRef({ x: 0, y: 0, active: false })

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            // regenerate particles on resize to fill area
            const count = Math.min(140, Math.floor((canvas.width * canvas.height) / 12000))
            particlesRef.current = Array.from({ length: count }, () => createParticle(canvas))
        }

        const createParticle = (c) => ({
            x: Math.random() * c.width,
            y: Math.random() * c.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 5 + 0.6,
        })

        const update = () => {
            const { width, height } = canvas
            ctx.clearRect(0, 0, width, height)

            particlesRef.current.forEach((p) => {
                // light attraction/repulsion to mouse
                if (mouseRef.current.active) {
                    const dx = p.x - mouseRef.current.x
                    const dy = p.y - mouseRef.current.y
                    const dist = Math.max(Math.hypot(dx, dy), 0.001)
                    const force = Math.min(120 / (dist * dist), 0.12)
                    p.vx += (dx / dist) * force
                    p.vy += (dy / dist) * force
                }

                // friction and drift
                p.vx *= 0.985
                p.vy *= 0.985
                p.x += p.vx + 0.1
                p.y += p.vy

                // horizontal wrap with a small jitter and velocity reset
                const jitter = 1.5
                if (p.x < 0) {
                    p.x = width - jitter
                    p.vx = Math.abs(p.vx) * 0.6
                }
                if (p.x > width) {
                    p.x = jitter
                    p.vx = -Math.abs(p.vx) * 0.6
                }

                // vertical bounce to avoid top/bottom flicker
                if (p.y < 0) {
                    p.y = 0
                    p.vy = Math.abs(p.vy) * 0.6
                }
                if (p.y > height) {
                    p.y = height
                    p.vy = -Math.abs(p.vy) * 0.6
                }

                // clamp velocities to prevent runaway speeds or stalls
                const maxSpeed = 1.2
                const minSpeed = 0.02
                p.vx = Math.max(-maxSpeed, Math.min(maxSpeed, p.vx))
                p.vy = Math.max(-maxSpeed, Math.min(maxSpeed, p.vy))
                if (Math.abs(p.vx) < minSpeed) p.vx = Math.sign(p.vx || 1) * minSpeed
                if (Math.abs(p.vy) < minSpeed) p.vy = Math.sign(p.vy || 1) * minSpeed

                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fillStyle = 'rgba(255, 255, 255, 0.65)'
                ctx.fill()
            })

            rafRef.current = requestAnimationFrame(update)
        }

        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY, active: true }
        }

        const handleMouseLeave = () => {
            mouseRef.current.active = false
        }

        resize()
        update()
        window.addEventListener('resize', resize)
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseleave', handleMouseLeave)
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [])

    return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />
}

export default Particles

