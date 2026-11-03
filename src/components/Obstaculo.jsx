import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// Obstáculo reutilizable: se mueve solo de lado a lado
export default function Obstaculo({ z, velocidad, amplitud, fase, color, registrar }) {
  const ref = useRef()

  // Se registra en App para que el Jugador pueda medir la distancia
  useEffect(() => {
    registrar(ref.current)
  }, [registrar])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    ref.current.position.x = Math.sin(t * velocidad + fase) * amplitud
    ref.current.rotation.y += 0.02
  })

  return (
    <mesh ref={ref} position={[0, 0.75, z]} castShadow>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}
