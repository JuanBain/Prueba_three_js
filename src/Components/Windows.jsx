import * as THREE from 'three'

export default function Windows({ center, size, material }) {
    const glassColor = material?.glassColor ?? '#93C5FD'
    const opacity = material?.opacity ?? 0.45
    return (
        <mesh position={new THREE.Vector3(...center)}>
            <boxGeometry args={size} />
            <meshPhysicalMaterial
                color={glassColor}
                transmission={1}
                roughness={0.1}
                transparent
                opacity={opacity}
            />
        </mesh>
    )
}