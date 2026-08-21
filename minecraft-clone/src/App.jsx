import { Canvas } from '@react-three/fiber'
import { Sky, PointerLockControls } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { useState } from 'react'

import World from './World'
import Player from './Player'

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <>
      <div id="crosshair" style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        fontSize: '24px',
        pointerEvents: 'none',
        zIndex: 100,
        textShadow: '1px 1px 2px black'
      }}>+</div>
      
      {!ready && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.8)',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 200,
          cursor: 'pointer',
          fontSize: '32px'
        }} onClick={() => setReady(true)}>
          CLIQUE AQUI PARA INICIAR (Use W,A,S,D para andar e Mouse para Quebrar blocos)
        </div>
      )}

      {ready && (
        <Canvas camera={{ fov: 75 }} style={{ width: '100vw', height: '100vh', display: 'block' }}>
          <Sky sunPosition={[100, 20, 100]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          
          <Physics gravity={[0, -30, 0]}>
            <World />
            <Player />
          </Physics>
          
          <PointerLockControls />
        </Canvas>
      )}
    </>
  )
}
