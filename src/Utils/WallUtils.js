
import * as THREE from 'three'


export default function SimpleWallUtils(start, end, height) {
    const startWall = new THREE.Vector3(...start)
    const endWall = new THREE.Vector3(...end)
    const directionWall = endWall.clone().sub(startWall)
    const length = directionWall.length()
    const yaw = Math.atan2(directionWall.z, directionWall.x)
    const center = startWall.clone().add(endWall).multiplyScalar(0.5)
    center.y = height / 2
    return { length, yaw, center }
}