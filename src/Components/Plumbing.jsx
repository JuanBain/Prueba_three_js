import React from "react";
import * as THREE from "three";

export default function Plumbing({ points, radius, material }) {
    const color = material?.color ?? '#60A5FA'
    const opacity = material?.opacity ?? 0.9
    const transparent = opacity < 1.0

    const pts = points?.map(p => new THREE.Vector3(p[0], p[1], p[2])) ?? []
    if (pts.length >= 2) {
        const curve = new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.0)
        return (
            <mesh>
                <tubeGeometry args={[curve, 128, radius ?? 0.05, 16, false]} />
                <meshStandardMaterial color={color} opacity={opacity} transparent={transparent} />
            </mesh>
        )
    }
    return null
} 