// src/Scene/WallsGroup.jsx
import React, { useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { invalidate } from '@react-three/fiber'


export default function WallsGroup({
    showWalls = true,
    walls = [],
    defaults = {},
    opacity = 1,
    color = '#9CA3AF',
    windows = [],
    doors = [],
}) {
    const defH = defaults?.wallHeight ?? 3
    const defT = defaults?.wallThickness ?? 0.2

    const material = useMemo(() => {
        const m = new THREE.MeshStandardMaterial({
            color,
            transparent: opacity < 1,
            depthWrite: opacity >= 1,
            opacity,
        })
        return m
    }, [color])

    useEffect(() => {
        material.opacity = opacity
        material.transparent = opacity < 1
        material.depthWrite = opacity >= 1
        material.needsUpdate = true
        invalidate()
    }, [opacity, material])

    const allOpenings = useMemo(() => {
        const ds = (doors ?? []).map(o => ({ ...o, _kind: 'door' }))
        const ws = (windows ?? []).map(o => ({ ...o, _kind: 'window' }))
        return [...ds, ...ws]
    }, [doors, windows])

    const wallEntries = useMemo(() => {
        if (!walls?.length) return []

        const EPS = 1e-3
        const entries = []

        const s2 = new THREE.Vector2()
        const e2 = new THREE.Vector2()
        const dir2 = new THREE.Vector2()
        const uDir = new THREE.Vector2()
        const nDir = new THREE.Vector2()

        for (let i = 0; i < walls.length; i++) {
            const w = walls[i]
            const height = w.height ?? defH
            const thickness = w.thickness ?? defT

            s2.set(w.start[0], w.start[2])
            e2.set(w.end[0], w.end[2])
            dir2.copy(e2).sub(s2)
            const length = dir2.length()
            if (length <= EPS) continue

            uDir.copy(dir2).normalize()
            nDir.set(-uDir.y, uDir.x)

            const shape = new THREE.Shape()
            shape.moveTo(0, 0)
            shape.lineTo(length, 0)
            shape.lineTo(length, height)
            shape.lineTo(0, height)
            shape.lineTo(0, 0)

            for (const o of allOpenings) {
                const c = o.center
                const size = o.size ?? [0.9, 2.0, thickness]
                const ow = size[0]
                const oh = size[1]
                const od = size[2] ?? thickness

                const p2 = new THREE.Vector2(c[0], c[2]).sub(s2)
                const u = p2.dot(uDir)
                const v = p2.dot(nDir)

                const withinU = u >= -ow / 2 - EPS && u <= length + ow / 2 + EPS
                const nearWall = Math.abs(v) <= (thickness / 2 + od / 2 + 1e-2)
                const withinHeight = (c[1] - oh / 2) <= (height + EPS) && (c[1] + oh / 2) >= -EPS
                if (!(withinU && nearWall && withinHeight)) continue

                let left = u - ow / 2
                let right = u + ow / 2
                let bottom = c[1] - oh / 2
                let top = c[1] + oh / 2

                left = Math.max(left, EPS)
                right = Math.min(right, length - EPS)
                bottom = Math.max(bottom, EPS)
                top = Math.min(top, height - EPS)
                if (right - left <= EPS || top - bottom <= EPS) continue

                const hole = new THREE.Path()
                hole.moveTo(left, bottom)
                hole.lineTo(right, bottom)
                hole.lineTo(right, top)
                hole.lineTo(left, top)
                hole.lineTo(left, bottom)
                shape.holes.push(hole)
            }

            const geo = new THREE.ExtrudeGeometry(shape, {
                depth: thickness,
                bevelEnabled: false,
                steps: 1,
                curveSegments: 8,
            })

            geo.translate(-length / 2, -height / 2, -thickness / 2)

            const s3 = new THREE.Vector3(w.start[0], 0, w.start[2])
            const e3 = new THREE.Vector3(w.end[0], 0, w.end[2])
            const center = s3.clone().add(e3).multiplyScalar(0.5)
            center.y = height / 2
            const dir3 = e3.clone().sub(s3)
            const yaw = Math.atan2(dir3.z, dir3.x)

            entries.push({ geometry: geo, center, yaw })
        }

        return entries
    }, [walls, defH, defT, allOpenings])

    return (
        <group visible={showWalls}>
            {wallEntries.map((w, i) => (
                <mesh
                    key={i}
                    geometry={w.geometry}
                    material={material}
                    position={w.center}
                    rotation={[0, w.yaw, 0]}
                    castShadow
                    receiveShadow
                />
            ))}
        </group>
    )
}
