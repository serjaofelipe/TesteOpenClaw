import { useSphere } from '@react-three/cannon'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { Vector3 } from 'three'

export default function Player() {
  const { camera } = useThree()
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 5, 0],
    args: [0.5]
  }))

  const velocity = useRef([0, 0, 0])
  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v))
  }, [api.velocity])

  const pos = useRef([0, 0, 0])
  useEffect(() => {
    api.position.subscribe((p) => (pos.current = p))
  }, [api.position])

  const { moveForward, moveBackward, moveLeft, moveRight, jump } = usePlayerControls()

  useFrame(() => {
    camera.position.copy(new Vector3(pos.current[0], pos.current[1] + 0.5, pos.current[2]))

    const direction = new Vector3()
    const frontVector = new Vector3(0, 0, (moveBackward ? 1 : 0) - (moveForward ? 1 : 0))
    const sideVector = new Vector3((moveLeft ? 1 : 0) - (moveRight ? 1 : 0), 0, 0)

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(5)
      .applyEuler(camera.rotation)

    api.velocity.set(direction.x, velocity.current[1], direction.z)

    if (jump && Math.abs(velocity.current[1]) < 0.05) {
      api.velocity.set(velocity.current[0], 10, velocity.current[2])
    }
  })

  return <mesh ref={ref} />
}

function usePlayerControls() {
  const [movement, setMovement] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false
  })

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.code) {
        case 'KeyW': setMovement((m) => ({ ...m, moveForward: true })); break
        case 'KeyS': setMovement((m) => ({ ...m, moveBackward: true })); break
        case 'KeyA': setMovement((m) => ({ ...m, moveLeft: true })); break
        case 'KeyD': setMovement((m) => ({ ...m, moveRight: true })); break
        case 'Space': setMovement((m) => ({ ...m, jump: true })); break
      }
    }
    const handleKeyUp = (e) => {
      switch (e.code) {
        case 'KeyW': setMovement((m) => ({ ...m, moveForward: false })); break
        case 'KeyS': setMovement((m) => ({ ...m, moveBackward: false })); break
        case 'KeyA': setMovement((m) => ({ ...m, moveLeft: false })); break
        case 'KeyD': setMovement((m) => ({ ...m, moveRight: false })); break
        case 'Space': setMovement((m) => ({ ...m, jump: false })); break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return movement
}
