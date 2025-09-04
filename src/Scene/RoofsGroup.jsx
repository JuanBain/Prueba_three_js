import Roof from '../Components/Roofs'

export default function RoofsGroup({ showRoof, roofs, defaults, opacity, color }) {
    if (!showRoof || !roofs) return null
    return (
        <>
            <Roof {...roofs} opacity={opacity} color={color} />
        </>
    )
}