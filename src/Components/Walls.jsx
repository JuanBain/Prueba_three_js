import React from 'react'
import * as THREE from 'three'
import Doors from './Doors'

export default function Walls({ start, end, height, thickness, color, opacity }) {
  if (opacity === 0) return null

  const { length, yaw, center } = SimpleWallUtils(start, end, height)

  return (
    < mesh position={center} rotation={[0, yaw, 0]} >
      <boxGeometry args={[length, height, thickness]} />
      <meshStandardMaterial color={color} opacity={parseFloat(opacity)} transparent={true} />
    </mesh >
  )
}