import { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'          // fiber: el lienzo 3D
import { KeyboardControls, Sky } from '@react-three/drei' // drei: controles de teclado y cielo
import Jugador from './components/Jugador'
import Obstaculo from './components/Obstaculo'
import Marcador from './components/Marcador'
import Zonas from './components/Zonas'
import { PISTA, OBSTACULOS } from './config'

// Mapa de teclas: flechas o WASD
const teclas = [
  { name: 'adelante', keys: ['ArrowUp', 'KeyW'] },
  { name: 'atras', keys: ['ArrowDown', 'KeyS'] },
  { name: 'izquierda', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'derecha', keys: ['ArrowRight', 'KeyD'] },
]

export default function App() {
  const [muertes, setMuertes] = useState(0)
  const [gano, setGano] = useState(false)
  const [partida, setPartida] = useState(0) // cambia para reiniciar el juego
  const obstaculosRef = useRef([])           // aquí se guardan los obstáculos para medir distancias

  const reiniciar = () => {
    setMuertes(0)
    setGano(false)
    setPartida((p) => p + 1)
  }

  return (
    <KeyboardControls map={teclas}>
      <Canvas shadows camera={{ position: [0, 8, 28], fov: 55 }}>
        <Sky sunPosition={[50, 30, 20]} />
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={1.4}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-25}
          shadow-camera-right={25}
          shadow-camera-top={25}
          shadow-camera-bottom={-25}
        />

        {/* Suelo / pista */}
        <mesh rotation-x={-Math.PI / 2} receiveShadow>
          <planeGeometry args={[PISTA.ancho, PISTA.largo]} />
          <meshStandardMaterial color="#8d99ae" />
        </mesh>

        <Zonas />

        {OBSTACULOS.map((o, i) => (
          <Obstaculo key={i} {...o} registrar={(m) => (obstaculosRef.current[i] = m)} />
        ))}

        <Jugador
          key={partida}
          obstaculosRef={obstaculosRef}
          gano={gano}
          onMuerte={() => setMuertes((m) => m + 1)}
          onVictoria={() => setGano(true)}
        />
      </Canvas>

      <Marcador muertes={muertes} gano={gano} partida={partida} onReiniciar={reiniciar} />
    </KeyboardControls>
  )
}
