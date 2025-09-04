import * as THREE from 'three'

export default function SimpleBeamsUtils(start, end, profile) {
    const s = new THREE.Vector3(...start)
    const e = new THREE.Vector3(...end)
    const dir = e.clone().sub(s)
    const length = dir.length()
    const center = s.clone().add(e).multiplyScalar(0.5)
    const [sx, sy, sz] = profile?.size ?? [0.1, 0.1, 0.1]
    const quat = new THREE.Quaternion()
    const from = new THREE.Vector3(1, 0, 0)
    const to = dir.clone().normalize()
    if (to.lengthSq() > 0) quat.setFromUnitVectors(from, to)


    return { length, center, quat, sx, sy, sz }
}