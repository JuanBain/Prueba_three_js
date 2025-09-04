import React from 'react'
import Beams from '../Components/Beams'

export default function BeamsGroup({ showBeams, beams, defaults, opacity, color }) {
    if (!showBeams || !beams) return null
    return (
        <>
            {beams.map((b, i) => (
                <Beams
                    key={i}
                    {...b}
                    height={b.height ?? defaults?.beamHeight ?? 0.2}
                    thickness={b.thickness ?? defaults?.beamThickness ?? 0.2}
                    opacity={opacity} color={color} />
            ))}
        </>
    )
}