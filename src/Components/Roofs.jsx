import * as THREE from 'three'

export default function Roof({ type, position, size, vertices, material }) {
    // type: "flat" | "gable" | "custom"
    const color = material?.color ?? '#6B7280'
    const opacity = material?.opacity ?? 1.0
    const transparent = opacity < 1.0

    if (type === 'flat') {
        return (
            <mesh position={new THREE.Vector3(...(position ?? [0, 3, 0]))}>
                <boxGeometry args={size ?? [6, 0.2, 5]} />
                <meshStandardMaterial color={color} opacity={opacity} transparent={transparent} />
            </mesh>
        )
    }
    return null
}