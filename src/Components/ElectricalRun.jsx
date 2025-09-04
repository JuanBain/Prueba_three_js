import * as THREE from 'three';

export default function ElectricalRun({ points, radius, material, color, opacity }) {
    if (opacity === 0) return null

    const pts = points?.map(p => new THREE.Vector3(p[0], p[1], p[2])) ?? []
    if (pts.length >= 2) {
        const curve = new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.0)
        return (
            <mesh>
                <tubeGeometry args={[curve, 128, radius ?? 0.02, 16, false]} />
                <meshStandardMaterial color={color} opacity={parseFloat(opacity)} transparent={true} />
            </mesh>
        )
    }
    return null
}