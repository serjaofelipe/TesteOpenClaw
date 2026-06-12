import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sky, Environment, ContactShadows, OrbitControls, useKeyboardControls, KeyboardControls } from '@react-three/drei';
import * as THREE from 'three';

const ISLAND_RADIUS = 15;

function Player({ setGameOver }) {
  const ref = useRef();
  const [sub] = useKeyboardControls();
  
  // Physics and movement state
  const speed = 10;
  const velocity = useRef(new THREE.Vector3());
  
  useFrame((state, delta) => {
    if (!ref.current) return;
    
    const { forward, backward, left, right } = sub();
    
    // Reset velocity
    velocity.current.set(0, 0, 0);
    
    if (forward) velocity.current.z -= speed * delta;
    if (backward) velocity.current.z += speed * delta;
    if (left) velocity.current.x -= speed * delta;
    if (right) velocity.current.x += speed * delta;
    
    // Apply movement
    ref.current.position.add(velocity.current);
    
    // Check boundaries (Death condition)
    const distanceFromCenter = Math.sqrt(
      Math.pow(ref.current.position.x, 2) + Math.pow(ref.current.position.z, 2)
    );
    
    if (distanceFromCenter > ISLAND_RADIUS) {
      // Player touched water!
      setGameOver(true);
    }
    
    // Optional: make camera follow player
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, ref.current.position.x, 0.1);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, ref.current.position.z + 10, 0.1);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 8, 0.1);
    state.camera.lookAt(ref.current.position.x, 0, ref.current.position.z);
  });

  return (
    <mesh ref={ref} position={[0, 1, 0]} castShadow>
      <capsuleGeometry args={[0.5, 1, 4, 8]} />
      <meshStandardMaterial color="#ff4040" roughness={0.2} metalness={0.8} />
    </mesh>
  );
}

function Island() {
  return (
    <group>
      {/* Grass Island */}
      <mesh receiveShadow position={[0, -0.5, 0]}>
        <cylinderGeometry args={[ISLAND_RADIUS, ISLAND_RADIUS + 2, 1, 64]} />
        <meshStandardMaterial color="#2d5a27" roughness={1} />
      </mesh>
      
      {/* Sand border */}
      <mesh receiveShadow position={[0, -0.6, 0]}>
        <cylinderGeometry args={[ISLAND_RADIUS + 1, ISLAND_RADIUS + 4, 1, 64]} />
        <meshStandardMaterial color="#d2b48c" roughness={1} />
      </mesh>

      {/* Some decorative trees */}
      {[...Array(15)].map((_, i) => {
        const angle = (i / 15) * Math.PI * 2;
        const radius = Math.random() * (ISLAND_RADIUS - 3) + 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <group key={i} position={[x, 0, z]}>
            {/* Trunk */}
            <mesh position={[0, 1, 0]} castShadow>
              <cylinderGeometry args={[0.2, 0.3, 2]} />
              <meshStandardMaterial color="#4a3b2c" />
            </mesh>
            {/* Leaves */}
            <mesh position={[0, 2.5, 0]} castShadow>
              <sphereGeometry args={[1.2, 8, 8]} />
              <meshStandardMaterial color="#1f4019" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function Water() {
  const ref = useRef();
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1 - 0.8;
    }
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]} receiveShadow>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial color="#006994" transparent opacity={0.8} roughness={0.1} />
    </mesh>
  );
}

export default function App() {
  const [gameOver, setGameOver] = useState(false);

  const keyboardMap = [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'right', keys: ['ArrowRight', 'KeyD'] },
  ];

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#87CEEB', margin: 0, overflow: 'hidden' }}>
      <KeyboardControls map={keyboardMap}>
        <Canvas shadows camera={{ position: [0, 8, 10], fov: 50 }}>
          <Sky sunPosition={[100, 20, 100]} />
          <ambientLight intensity={0.5} />
          <directionalLight
            castShadow
            position={[10, 20, 10]}
            intensity={1.5}
            shadow-mapSize={[1024, 1024]}
          >
            <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20]} />
          </directionalLight>
          
          <Environment preset="sunset" />
          
          {!gameOver && <Player setGameOver={setGameOver} />}
          <Island />
          <Water />
          
          <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={50} blur={2} far={10} />
        </Canvas>
      </KeyboardControls>

      {/* UI Overlay */}
      <div style={{ position: 'absolute', top: 20, left: 20, color: 'white', fontFamily: 'sans-serif', textShadow: '1px 1px 2px black' }}>
        <h1>Island Survivor 3D</h1>
        <p>Use W, A, S, D ou Setas para mover.</p>
        <p>⚠️ NÃO toque na água! ⚠️</p>
      </div>

      {/* Game Over Screen */}
      {gameOver && (
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.8)', display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center', color: 'red', fontFamily: 'sans-serif'
        }}>
          <h1 style={{ fontSize: '5rem', margin: 0, textShadow: '0 0 20px red' }}>VOCÊ MORREU</h1>
          <p style={{ color: 'white', fontSize: '1.5rem' }}>Você encostou na água e se afogou.</p>
          <button 
            onClick={() => setGameOver(false)}
            style={{
              marginTop: '20px', padding: '15px 30px', fontSize: '1.2rem',
              background: '#ff4040', color: 'white', border: 'none', borderRadius: '5px',
              cursor: 'pointer', fontWeight: 'bold'
            }}
          >
            TENTAR NOVAMENTE
          </button>
        </div>
      )}
    </div>
  );
}
