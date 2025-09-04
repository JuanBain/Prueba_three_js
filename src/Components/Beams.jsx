import React from 'react'
import * as THREE from 'three'

export default function Beams({ start, end, profile, material, color, opacity }) {
  if (opacity === 0) return null
  const s = new THREE.Vector3(...start)
  const e = new THREE.Vector3(...end)
  const dir = e.clone().sub(s)
  const length = dir.length()
  const center = s.clone().add(e).multiplyScalar(0.5)


  if (profile?.type === 'cyl') {
    const radius = profile.radius ?? 0.06
    const quat = new THREE.Quaternion()
    const from = new THREE.Vector3(0, 1, 0)
    const to = dir.clone().normalize()
    if (to.lengthSq() > 0) quat.setFromUnitVectors(from, to)

    return (
      <mesh position={center} quaternion={quat}>
        <cylinderGeometry args={[radius, radius, length, 16]} />
        <meshStandardMaterial color={color} opacity={parseFloat(opacity)} transparent={true} />
      </mesh>
    )
  }

  const [sx, sy, sz] = profile?.size ?? [0.1, 0.1, 0.1]
  const quat = new THREE.Quaternion()
  const from = new THREE.Vector3(1, 0, 0)
  const to = dir.clone().normalize()
  if (to.lengthSq() > 0) quat.setFromUnitVectors(from, to)

  return (
    <mesh position={center} quaternion={quat}>
      <boxGeometry args={[length, sy, sz]} />
      <meshStandardMaterial color={color} opacity={parseFloat(opacity)} transparent={true} />
    </mesh>
  )
}