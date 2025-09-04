import React from 'react'
import * as THREE from 'three'

export default function Doors({ center, size, material, color, opacity }) {
    if (opacity === 0) return null

    return (
        <mesh position={new THREE.Vector3(...center)}>
            <boxGeometry args={size} />
            <meshStandardMaterial color={color} opacity={parseFloat(opacity)} transparent={true} />
        </mesh>
    )
}