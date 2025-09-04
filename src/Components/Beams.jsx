
import SimpleBeamsUtils from '../Utils/BeamsUtils.js'

export default function Beams({ start, end, profile, material, color, opacity }) {
  if (opacity === 0) return null

  const { length, center, quat, sy, sz } = SimpleBeamsUtils(start, end, profile)

  return (
    <mesh position={center} quaternion={quat}>
      <boxGeometry args={[length, sy, sz]} />
      <meshStandardMaterial color={color} opacity={parseFloat(opacity)} transparent={true} />
    </mesh>
  )
}