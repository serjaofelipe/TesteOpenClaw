import { Canvas } from '@react-three/fiber'
import { Sky, PointerLockControls } from '@react-three/drei'
import { Physics } from '@react-three/cannon'

import World from './World'
import Player from './Player'

export default function App() {
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
        zIndex: 100
      }}>+</div>
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
    </>
  )
}
