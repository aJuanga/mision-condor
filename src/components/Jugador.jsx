import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import * as THREE from 'three'
import { PUNTO_A, PUNTO_B, PISTA, VELOCIDAD_JUGADOR, RADIO_CHOQUE } from '../config'

const camaraObjetivo = new THREE.Vector3()

// Llama andina hecha con figuras simples
function Llama() {
  const lana = <meshStandardMaterial color="#f1e3c8" />
  return (
    <group>
      <mesh position={[0, 0.9, 0]} castShadow>{/* cuerpo */}
        <boxGeometry args={[0.7, 0.6, 1.2]} />{lana}
      </mesh>
      <mesh position={[0, 1.45, -0.45]} castShadow>{/* cuello */}
        <boxGeometry args={[0.28, 0.8, 0.28]} />{lana}
      </mesh>
      <mesh position={[0, 1.9, -0.6]} castShadow>{/* cabeza */}
        <boxGeometry args={[0.35, 0.3, 0.5]} />{lana}
      </mesh>
      {[-0.1, 0.1].map((x) => (
        <mesh key={x} position={[x, 2.15, -0.5]} castShadow>{/* orejas */}
          <boxGeometry args={[0.07, 0.22, 0.07]} />{lana}
        </mesh>
      ))}
      <mesh position={[0, 1.15, 0.1]}>{/* manta andina */}
        <boxGeometry args={[0.72, 0.05, 0.6]} />
        <meshStandardMaterial color="#d62828" />
      </mesh>
      {[[-0.25, -0.45], [0.25, -0.45], [-0.25, 0.45], [0.25, 0.45]].map(([x, z]) => (
        <mesh key={`${x}${z}`} position={[x, 0.3, z]} castShadow>{/* patas */}
          <cylinderGeometry args={[0.08, 0.08, 0.6]} />{lana}
        </mesh>
      ))}
    </group>
  )
}

export default function Jugador({ obstaculosRef, gano, onMuerte, onVictoria }) {
  const ref = useRef()
  const [, leerTeclas] = useKeyboardControls()

  // useFrame (fiber) se ejecuta en cada cuadro (~60 veces por segundo)
  useFrame((state, delta) => {
    const jugador = ref.current
    if (!jugador) return

    if (!gano) {
      // 1. Movimiento con teclado
      const { adelante, atras, izquierda, derecha } = leerTeclas()
      const paso = VELOCIDAD_JUGADOR * delta
      if (adelante) jugador.position.z -= paso
      if (atras) jugador.position.z += paso
      if (izquierda) jugador.position.x -= paso
      if (derecha) jugador.position.x += paso

      // No salir de la pista
      const limX = PISTA.ancho / 2 - 0.5
      const limZ = PISTA.largo / 2 - 0.5
      jugador.position.x = THREE.MathUtils.clamp(jugador.position.x, -limX, limX)
      jugador.position.z = THREE.MathUtils.clamp(jugador.position.z, -limZ, limZ)

      // 2. Detección de choques: distancia entre jugador y cada obstáculo
      for (const obstaculo of obstaculosRef.current) {
        if (!obstaculo) continue
        const dx = jugador.position.x - obstaculo.position.x
        const dz = jugador.position.z - obstaculo.position.z
        if (Math.hypot(dx, dz) < RADIO_CHOQUE) {
          jugador.position.set(...PUNTO_A) // vuelve a A
          onMuerte()                        // +1 muerte
          break
        }
      }

      // 3. ¿Llegó a la meta B?
      if (Math.abs(jugador.position.z - PUNTO_B[2]) < 1.5) onVictoria()
    }

    // 4. La cámara sigue al jugador suavemente
    camaraObjetivo.set(jugador.position.x, jugador.position.y + 7, jugador.position.z + 11)
    state.camera.position.lerp(camaraObjetivo, 0.08)
    state.camera.lookAt(jugador.position.x, 1, jugador.position.z - 4)
  })

  return (
    <group ref={ref} position={PUNTO_A}>
      <Llama />
    </group>
  )
}
