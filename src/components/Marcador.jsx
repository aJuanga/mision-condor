import { useEffect, useState } from 'react'

// Muestra muertes, cronómetro y mensaje de victoria (HTML encima del Canvas)
export default function Marcador({ muertes, gano, partida, onReiniciar }) {
  const [segundos, setSegundos] = useState(0)

  useEffect(() => setSegundos(0), [partida])

  useEffect(() => {
    if (gano) return
    const id = setInterval(() => setSegundos((s) => s + 0.1), 100)
    return () => clearInterval(id)
  }, [gano, partida])

  return (
    <>
      <div style={estilos.panel}>
        <div style={estilos.titulo}>MISIÓN CÓNDOR</div>
        <div>💀 Muertes: <b>{muertes}</b></div>
        <div>⏱ Tiempo: <b>{segundos.toFixed(1)} s</b></div>
        <div style={estilos.ayuda}>Mover: flechas o WASD</div>
      </div>

      {gano && (
        <div style={estilos.fondo}>
          <div style={estilos.victoria}>
            <h1 style={{ margin: 0 }}>🏆 ¡LLEGASTE A B!</h1>
            <p>Muertes: {muertes} · Tiempo: {segundos.toFixed(1)} s</p>
            <button style={estilos.boton} onClick={onReiniciar}>Jugar de nuevo</button>
          </div>
        </div>
      )}
    </>
  )
}

const estilos = {
  panel: {
    position: 'absolute', top: 16, left: 16, padding: '12px 18px',
    background: 'rgba(0,0,0,0.6)', color: '#fff', borderRadius: 10,
    fontSize: 18, lineHeight: 1.6, userSelect: 'none',
  },
  titulo: { fontWeight: 800, color: '#ffb703', letterSpacing: 1 },
  ayuda: { fontSize: 13, opacity: 0.7 },
  fondo: {
    position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
    justifyContent: 'center', background: 'rgba(0,0,0,0.5)',
  },
  victoria: {
    background: '#fff', padding: '30px 40px', borderRadius: 16,
    textAlign: 'center', fontSize: 20, boxShadow: '0 10px 40px rgba(0,0,0,.4)',
  },
  boton: {
    marginTop: 10, padding: '10px 24px', fontSize: 18, border: 'none',
    borderRadius: 8, background: '#2a9d8f', color: '#fff', cursor: 'pointer',
  },
}
