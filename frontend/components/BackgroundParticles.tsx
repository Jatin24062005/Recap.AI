// components/BackgroundParticles.tsx
'use client'

import { useCallback } from 'react'
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'

export default function BackgroundParticles() {
  const particlesInit = useCallback(async (engine : any) => {
    await loadSlim(engine)
  }, [])

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        background: {
          color: {
            value: 'transparent',
          },
        },
        particles: {
          number: {
            value: 60,
          },
          color: {
            value: '#f8f9fa',
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: 0.2,
          },
          size: {
            value: 2,
            random: true,
          },
          move: {
            enable: true,
            speed: 0.3,
            direction: 'none',
            random: true,
            straight: false,
            outModes: 'out',
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: 'repulse',
            },
          },
          modes: {
            repulse: {
              distance: 50,
            },
          },
        },
      }}
    />
  )
}
