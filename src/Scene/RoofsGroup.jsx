import Roof from '../Components/Roofs'

export default function RoofsGroup({ showRoof, roofs, defaults }) {
    if (!showRoof || !roofs) return null
    return (
        <>
            <Roof {...roofs} />
        </>
    )
}