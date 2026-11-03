import { Text } from '@react-three/drei'
import { PUNTO_A, PUNTO_B, PISTA } from '../config'

function Zona({ posicion, color, letra, etiqueta }) {
  return (
    <group position={posicion}>
      <mesh rotation-x={-Math.PI / 2} position-y={0.02} receiveShadow>
        <planeGeometry args={[PISTA.ancho, 3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text
        position={[0, 2.8, 0]}
        fontSize={1.6}
        color={color}
        outlineWidth={0.05}
        outlineColor="#000"
      >
        {letra}
      </Text>
      <Text
        position={[0, 1.6, 0]}
        fontSize={0.5}
        color="#fff"
        outlineWidth={0.03}
        outlineColor="#000"
      >
        {etiqueta}
      </Text>
    </group>
  )
}

export default function Zonas() {
  return (
    <>
      <Zona posicion={PUNTO_A} color="#2a9d8f" letra="A" etiqueta="INICIO" />
      <Zona posicion={PUNTO_B} color="#ffb703" letra="B" etiqueta="META" />
    </>
  )
}
