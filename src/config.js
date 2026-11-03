// Configuración general del juego: aquí se cambian tamaños, velocidades y obstáculos
export const PISTA = { ancho: 12, largo: 44 }

export const PUNTO_A = [0, 0, 19]   // zona de inicio (verde)
export const PUNTO_B = [0, 0, -19]  // meta (dorada)

export const VELOCIDAD_JUGADOR = 7  // unidades por segundo
export const RADIO_CHOQUE = 1.3     // si la distancia es menor a esto, hay choque

// Cada obstáculo se mueve de lado a lado con su propia velocidad
export const OBSTACULOS = [
  { z: 11, velocidad: 1.6, amplitud: 4.5, fase: 0, color: '#e63946' },
  { z: 4, velocidad: 2.4, amplitud: 4.5, fase: 1.5, color: '#f77f00' },
  { z: -3, velocidad: 3.0, amplitud: 4.5, fase: 3, color: '#9d4edd' },
  { z: -10, velocidad: 2.0, amplitud: 4.5, fase: 4.5, color: '#3a86ff' },
]
