import React from 'react'
import * as THREE from 'three'
import Doors from './Doors'

export default function Walls({ start, end, height, thickness, doors }) {
  const startWall = new THREE.Vector3(...start)
  const endWall = new THREE.Vector3(...end)
  const directionWall = endWall.clone().sub(startWall)
  const length = directionWall.length()
  const yaw = Math.atan2(directionWall.z, directionWall.x)
  if (doors && doors.length > 0) {
    return doors.map((door, idx) => {
      const doorCenter = new THREE.Vector3(...door.center)
      const doorWidth = door.size[0]

      const seg1Length = doorCenter.x - doorWidth / 2 - startWall.x
      const seg2Length = endWall.x - (doorCenter.x + doorWidth / 2)

      return (
        <>
          {seg1Length > 0 && (
            <mesh
              position={[
                startWall.x + seg1Length / 2,
                height / 2,
                startWall.z
              ]}
              rotation={[0, yaw, 0]}
            >
              <boxGeometry args={[seg1Length, height, thickness]} />
              <meshStandardMaterial color="#9CA3AF" />
            </mesh>
          )}
          {seg2Length > 0 && (
            <mesh
              position={[
                doorCenter.x + doorWidth / 2 + seg2Length / 2,
                height / 2,
                startWall.z
              ]}
              rotation={[0, yaw, 0]}
            >
              <boxGeometry args={[seg2Length, height, thickness]} />
              <meshStandardMaterial color="#9CA3AF" />
            </mesh>
          )}
        </>
      )
    })
  }

  const center = startWall.clone().add(endWall).multiplyScalar(0.5)
  center.y = height / 2
  return (
    <mesh position={center} rotation={[0, yaw, 0]}>
      <boxGeometry args={[length, height, thickness]} />
      <meshStandardMaterial color="#9CA3AF" />
    </mesh>
  )
}