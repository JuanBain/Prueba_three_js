import * as THREE from 'three';

export default function ElectricalRun({ points, radius, material }) {
    const color = material?.color ?? '#F59E0B'   // naranja por defecto
    const opacity = material?.opacity ?? 0.9
    const transparent = opacity < 1.0

    const pts = points?.map(p => new THREE.Vector3(p[0], p[1], p[2])) ?? []
    if (pts.length >= 2) {
        const curve = new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.0)
        return (
            <mesh>
                <tubeGeometry args={[curve, 128, radius ?? 0.02, 16, false]} />
                <meshStandardMaterial color={color} opacity={opacity} transparent={transparent} />
            </mesh>
        )
    }
    return null
}