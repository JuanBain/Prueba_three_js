import * as THREE from 'three'

export default function Windows({ center, size, material, opacity, color }) {
    if (opacity === 0) return null
    return (
        <mesh position={new THREE.Vector3(...center)}>
            <boxGeometry args={size} />
            <meshPhysicalMaterial
                color={color}
                roughness={0.1}
                transparent={true}
                opacity={parseFloat(opacity)}
            />
        </mesh>
    )
}