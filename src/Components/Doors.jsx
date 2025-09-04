import React from 'react'
import * as THREE from 'three'

export default function Doors({ center, size, material }) {
    const color = material?.color ?? '#8B5E3C'
    const opacity = material?.opacity ?? 1.0
    const transparent = opacity < 1.0

    return (
        <mesh position={new THREE.Vector3(...center)}>
            <boxGeometry args={size} />
            <meshStandardMaterial color={color} opacity={opacity} transparent={transparent} />
        </mesh>
    )
}