import { useState, useMemo } from 'react'
import { useBox, usePlane } from '@react-three/cannon'
import { createNoise2D } from 'simplex-noise'
import { dirtTexture, grassTexture } from './textures'

export default function World() {
  const noise2D = createNoise2D()
  
  // Generate initial world
  const initialBlocks = useMemo(() => {
    const blocks = []
    for (let x = -15; x < 15; x++) {
      for (let z = -15; z < 15; z++) {
        const y = Math.floor(noise2D(x / 12, z / 12) * 4)
        // Top grass block
        blocks.push({ id: `${x}-${y}-${z}`, pos: [x, y, z], type: 'grass' })
        // Dirt blocks below
        for (let dy = y - 1; dy >= -3; dy--) {
          blocks.push({ id: `${x}-${dy}-${z}`, pos: [x, dy, z], type: 'dirt' })
        }
      }
    }
    return blocks
  }, [noise2D])

  const [blocks, setBlocks] = useState(initialBlocks)

  // Break a block
  const breakBlock = (id) => {
    setBlocks(prev => prev.filter(b => b.id !== id))
  }

  return (
    <>
      <Ground />
      {blocks.map((block) => (
        <Block 
          key={block.id} 
          position={block.pos} 
          type={block.type} 
          onBreak={() => breakBlock(block.id)} 
        />
      ))}
    </>
  )
}

function Ground() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -4, 0],
    type: 'Static'
  }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial map={dirtTexture} color="#555" />
    </mesh>
  )
}

function Block({ position, type, onBreak }) {
  const [ref] = useBox(() => ({
    type: 'Static',
    position,
    args: [1, 1, 1]
  }))

  const texture = type === 'grass' ? grassTexture : dirtTexture
  const color = type === 'grass' ? "#88ff88" : "#886644"

  return (
    <mesh 
      ref={ref} 
      castShadow 
      receiveShadow
      onClick={(e) => {
        e.stopPropagation() // prevent clicking blocks behind it
        onBreak()
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      {/* 6 materials for the 6 faces. If grass, we could use grass on top, dirt on sides. But to keep it simple, just tint it */}
      <meshStandardMaterial map={texture} color={color} />
    </mesh>
  )
}
