import { useMemo } from 'react'
import { usePlane, useBox } from '@react-three/cannon'
import * as THREE from 'three'
import { createNoise2D } from 'simplex-noise'

export default function World() {
  const noise2D = createNoise2D()
  const blocks = []

  // Create a 20x20 grid with simple noise hills
  for (let x = -10; x < 10; x++) {
    for (let z = -10; z < 10; z++) {
      const y = Math.floor(noise2D(x / 10, z / 10) * 3)
      blocks.push([x, y, z])
      // Fill below ground
      for (let dy = y - 1; dy >= -3; dy--) {
        blocks.push([x, dy, z])
      }
    }
  }

  return (
    <>
      <Ground />
      {blocks.map((pos, idx) => (
        <Block key={idx} position={pos} />
      ))}
    </>
  )
}

function Ground() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -3.5, 0],
    type: 'Static'
  }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="green" />
    </mesh>
  )
}

function Block({ position }) {
  const [ref] = useBox(() => ({
    type: 'Static',
    position
  }))

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      {/* Simple color material, green on top, brown on sides */}
      <meshStandardMaterial color={position[1] > 0 ? "lightgreen" : "saddlebrown"} />
    </mesh>
  )
}
