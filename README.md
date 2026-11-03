# Misión Cóndor: de A a B

Juego 3D en el navegador hecho con React. Una llama andina debe viajar desde el punto A (verde) hasta el punto B (dorado) esquivando 4 obstáculos que se mueven de lado a lado. Cada choque suma una muerte y regresa la llama a A.

**Integrantes:** Gabriel Ibañez · José

## Cómo correrlo
```
npm install
npm run dev
```
Abrir http://localhost:5173 · Mover con flechas o WASD.

## Librerías
| Librería | Uso en el proyecto |
|---|---|
| three | Motor 3D (lo usa fiber por debajo) |
| @react-three/fiber | `Canvas` en App.jsx (lienzo 3D) y `useFrame` en Jugador.jsx y Obstaculo.jsx (movimiento en cada cuadro) |
| @react-three/drei | `KeyboardControls` / `useKeyboardControls` (teclado), `Text` (letras A y B en 3D), `Sky` (cielo) |

## Componentes
| Archivo | Qué hace |
|---|---|
| App.jsx | Lienzo 3D, luces, pista, guarda el contador de muertes y si se ganó |
| components/Jugador.jsx | La llama, movimiento con teclado, cámara que sigue, choques y llegada a B |
| components/Obstaculo.jsx | Cubo que se mueve solo; se reutiliza 4 veces con distinta velocidad |
| components/Marcador.jsx | Contador de muertes, cronómetro y mensaje de victoria |
| components/Zonas.jsx | Zonas A y B con texto 3D |
| config.js | Valores del juego (velocidades, radio de choque, obstáculos) |

## Detección de choques
En cada cuadro se mide la distancia entre la llama y cada obstáculo (`Math.hypot(dx, dz)`). Si es menor que `RADIO_CHOQUE`, hubo choque: +1 muerte y la llama vuelve a A. No se usa librería de física.

## Ramas
| Rama | Responsable | Archivos |
|---|---|---|
| feature/jugador | Gabriel | Jugador.jsx, App.jsx |
| feature/obstaculos | José | Obstaculo.jsx, config.js |
| feature/marcador | Gabriel / José | Marcador.jsx, Zonas.jsx |
