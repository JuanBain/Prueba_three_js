import * as THREE from 'three'

export default function Roof({ type, position, size, vertices, material, color, opacity }) {
    if (opacity === 0) return null

    if (type === 'flat') {
        return (
            <mesh position={new THREE.Vector3(...(position ?? [0, 3, 0]))}>
                <boxGeometry args={size ?? [6, 0.2, 5]} />
                <meshStandardMaterial color={color} opacity={parseFloat(opacity)} transparent={true} />
            </mesh>
        )
    }
    return null
}