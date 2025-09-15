// src/Scene/ConcreteSlabsGroup.jsx
import React from 'react'
import * as THREE from 'three'

/**
 * Dibuja losas de concreto a partir de polígonos en planta.
 * Props:
 *  - showConcreteSlabs (bool)
 *  - slabs (array): [{ points: [[x,y,z],...], thickness, material? {color,opacity} }]
 *  - defaults? (por si luego lo necesitas)
 *  - opacity (0..1)  -> valor global por capa (se usa si slab.material.opacity no está)
 *  - color (hex)     -> color global por capa (se usa si slab.material.color no está)
 *
 * Notas:
 *  - Toma los puntos en planta XZ, extruye el grosor hacia Y.
 *  - Sin useMemo: simple y directo, recrea geometría si se re-renderiza (tu frameloop='demand' ayuda).
 */
export default function ConcreteSlabsGroup({
    showConcreteSlabs = true,
    slabs = [],
    defaults,
    opacity = 1,
    color = '#B0B0B0',
}) {
    if (!showConcreteSlabs || !Array.isArray(slabs) || slabs.length === 0) return null

    return (
        <group>
            {slabs.map((slab, i) => {
                const pts = (slab.points || []).map(p => new THREE.Vector2(p[0], p[2]))
                if (pts.length < 3) return null

                // Shape del polígono (en XZ → lo mapeamos como XY del shape)
                const shape = new THREE.Shape(pts)

                // Extruir grosor (profundidad) – luego rotamos para que "depth" sea Y
                const thickness = slab.thickness ?? 0.15
                const geo = new THREE.ExtrudeGeometry(shape, { depth: thickness, bevelEnabled: false })

                // Poner la extrusión en Y (local Z → world Y)
                geo.rotateX(-Math.PI / 2)

                // Altura base: usamos y del primer punto (si difiere, ajusta a tu gusto)
                const baseY = (slab.points?.[0]?.[1] ?? 0)
                const matColor = (slab.material?.color) || color
                const matOpacity = (slab.material?.opacity) ?? opacity

                return (
                    <mesh
                        key={i}
                        geometry={geo}
                        position={[0, baseY + thickness / 2, 0]}
                        castShadow
                        receiveShadow
                    >
                        <meshStandardMaterial
                            color={matColor}
                            opacity={matOpacity}
                            transparent={matOpacity < 1}
                        />
                    </mesh>
                )
            })}
        </group>
    )
}
