import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, useGLTF, Sphere, Cone, Cylinder, Box } from '@react-three/drei'
import { useStore } from './store'
import * as THREE from 'three'
import { v4 as uuidv4 } from 'uuid'

// Creature Designs (Procedural)
const PlayerCreature = ({ design, position, color, size }) => {
  const ref = useRef()
  
  useFrame((state, delta) => {
    // Basic swim animation
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 5) * 0.2
    }
  })

  // Different designs
  return (
    <group ref={ref} position={position} scale={size}>
      {design === 1 && <Sphere args={[0.5, 32, 32]}><meshStandardMaterial color={color} /></Sphere>}
      {design === 2 && (
        <group>
          <Sphere args={[0.4, 32, 32]}><meshStandardMaterial color={color} /></Sphere>
          <Cone args={[0.2, 0.6, 16]} position={[0.5, 0, 0]} rotation={[0, 0, -Math.PI / 2]}><meshStandardMaterial color={color} /></Cone>
        </group>
      )}
      {design === 3 && (
        <group>
          <Cylinder args={[0.3, 0.3, 1, 32]} rotation={[0, 0, Math.PI/2]}><meshStandardMaterial color={color} /></Cylinder>
          <Sphere args={[0.3, 32, 32]} position={[0.5, 0, 0]}><meshStandardMaterial color="white" /></Sphere>
        </group>
      )}
      {design === 4 && <Box args={[0.7, 0.7, 0.7]}><meshStandardMaterial color={color} /></Box>}
      {design === 5 && (
        <group>
          <Sphere args={[0.3, 16, 16]}><meshStandardMaterial color={color} /></Sphere>
          <Sphere args={[0.2, 16, 16]} position={[0.4, 0, 0]}><meshStandardMaterial color={color} /></Sphere>
          <Sphere args={[0.15, 16, 16]} position={[0.7, 0, 0]}><meshStandardMaterial color={color} /></Sphere>
        </group>
      )}
    </group>
  )
}

const Npc = ({ type, position, id, onEat }) => {
  const ref = useRef()
  const [pos, setPos] = useState(new THREE.Vector3(...position))
  const targetPos = useRef(new THREE.Vector3(...position).add(new THREE.Vector3(Math.random()*4-2, Math.random()*4-2, 0)))

  useFrame((state, delta) => {
    if (!ref.current) return
    
    // Move towards target
    const dir = new THREE.Vector3().subVectors(targetPos.current, pos).normalize()
    const speed = type === 'algae' ? 0.2 : 1.5
    pos.add(dir.multiplyScalar(speed * delta))
    
    // Change target occasionally
    if (pos.distanceTo(targetPos.current) < 0.5) {
      targetPos.current = new THREE.Vector3(pos.x + Math.random()*10-5, pos.y + Math.random()*10-5, 0)
    }
    
    // Boundary constraint
    pos.x = THREE.MathUtils.clamp(pos.x, -20, 20)
    pos.y = THREE.MathUtils.clamp(pos.y, -20, 20)
    
    ref.current.position.copy(pos)
    
    // Check distance to player (assumed at 0,0,0 for camera tracking, actually we move camera)
    // We handle collisions in the main loop
  })

  let color = 'green'
  if (type === 'carnivore') color = 'red'
  if (type === 'herbivore') color = 'blue'

  return (
    <group ref={ref} userData={{ id, type, nutrition: type === 'algae' ? 1 : 5 }}>
      {type === 'algae' ? (
        <Sphere args={[0.2, 8, 8]}><meshStandardMaterial color={color} wireframe /></Sphere>
      ) : (
        <Cone args={[0.3, 0.8, 8]} rotation={[0, 0, Math.random()*Math.PI]}><meshStandardMaterial color={color} /></Cone>
      )}
    </group>
  )
}

const PlayerController = ({ npcs, setNpcs }) => {
  const { diet, creatureDesign, stats, takeDamage, eatFood, reproduce } = useStore()
  const playerRef = useRef()
  const [playerPos, setPlayerPos] = useState(new THREE.Vector3(0,0,0))
  const keys = useRef({})

  useEffect(() => {
    const handleKeyDown = (e) => keys.current[e.key] = true
    const handleKeyUp = (e) => keys.current[e.key] = false
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useFrame((state, delta) => {
    if (!playerRef.current) return
    
    const move = new THREE.Vector3(0,0,0)
    if (keys.current['ArrowUp'] || keys.current['w']) move.y += 1
    if (keys.current['ArrowDown'] || keys.current['s']) move.y -= 1
    if (keys.current['ArrowLeft'] || keys.current['a']) move.x -= 1
    if (keys.current['ArrowRight'] || keys.current['d']) move.x += 1

    if (move.lengthSq() > 0) {
      move.normalize().multiplyScalar(stats.speed * delta)
      playerPos.add(move)
      
      // Boundaries
      playerPos.x = THREE.MathUtils.clamp(playerPos.x, -20, 20)
      playerPos.y = THREE.MathUtils.clamp(playerPos.y, -20, 20)
    }

    playerRef.current.position.copy(playerPos)
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, playerPos.x, 0.1)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, playerPos.y, 0.1)

    // Collisions
    const remainingNpcs = []
    let ateSomething = false
    
    for (let npc of npcs) {
      const dist = playerPos.distanceTo(npc.pos)
      if (dist < stats.size * 0.5 + 0.3) {
        // Collision!
        if (npc.type === 'algae' && (diet === 'herbivore' || diet === 'omnivore')) {
          eatFood('plant', npc.nutrition)
          ateSomething = true
        } else if ((npc.type === 'herbivore' || npc.type === 'carnivore') && (diet === 'carnivore' || diet === 'omnivore')) {
           eatFood('meat', npc.nutrition)
           ateSomething = true
        } else if (npc.type === 'carnivore' && diet === 'herbivore') {
           takeDamage(5)
           remainingNpcs.push(npc) // don't delete if we just took damage
        } else {
           remainingNpcs.push(npc)
        }
      } else {
        remainingNpcs.push(npc)
      }
    }
    
    if (ateSomething) {
      setNpcs(remainingNpcs)
      // Check for reproduction (e.g. dna > 50)
      if (useStore.getState().dna >= 50) {
         reproduce()
      }
    }
  })

  let color = diet === 'carnivore' ? '#ff4444' : diet === 'herbivore' ? '#44ff44' : '#aa44ff'

  return (
    <group ref={playerRef}>
      <PlayerCreature design={creatureDesign} position={[0,0,0]} color={color} size={stats.size} />
      <pointLight position={[0, 0, 2]} intensity={2} color={color} />
    </group>
  )
}

export default function Game() {
  const [npcs, setNpcs] = useState([])
  const { stats, dna } = useStore()

  useEffect(() => {
    // Spawn initial NPCs
    const initialNpcs = Array.from({ length: 40 }).map(() => {
      const r = Math.random()
      let type = 'algae'
      if (r > 0.7) type = 'herbivore'
      if (r > 0.9) type = 'carnivore'
      
      return {
        id: uuidv4(),
        type,
        pos: new THREE.Vector3(Math.random() * 40 - 20, Math.random() * 40 - 20, 0),
        nutrition: type === 'algae' ? 1 : 5
      }
    })
    setNpcs(initialNpcs)
    
    // Spawner interval
    const interval = setInterval(() => {
      setNpcs(prev => {
        if (prev.length > 60) return prev
        const type = Math.random() > 0.6 ? 'algae' : (Math.random() > 0.5 ? 'herbivore' : 'carnivore')
        return [...prev, {
           id: uuidv4(), type, 
           pos: new THREE.Vector3(Math.random() * 40 - 20, Math.random() * 40 - 20, 0),
           nutrition: type === 'algae' ? 1 : 5
        }]
      })
    }, 2000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 20, left: 20, color: 'white', zIndex: 10, fontFamily: 'sans-serif', background: 'rgba(0,0,0,0.5)', padding: 15, borderRadius: 8 }}>
         <h2>Spore Cell Stage</h2>
         <p>HP: {stats.health} / {stats.maxHealth}</p>
         <p>DNA: {dna} / 50 (To Reproduce)</p>
         <p>Use W A S D or Arrows to move.</p>
      </div>
      
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }} style={{ background: '#0a192f' }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <PlayerController npcs={npcs} setNpcs={setNpcs} />
        
        {npcs.map(npc => (
          <Npc key={npc.id} id={npc.id} type={npc.type} position={[npc.pos.x, npc.pos.y, npc.pos.z]} />
        ))}
        
        {/* Background Plane */}
        <mesh position={[0,0,-2]}>
          <planeGeometry args={[100, 100]} />
          <meshBasicMaterial color="#020813" />
        </mesh>
      </Canvas>
    </div>
  )
}
