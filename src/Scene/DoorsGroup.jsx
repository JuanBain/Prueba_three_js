import React from 'react'
import Doors from '../Components/Doors'

export default function DoorsGroup({ showDoors, doors, defaults }) {
    if (!showDoors || !doors) return null
    return (
        <>
            {doors.map((d, i) => (
                <Doors
                    key={i}
                    {...d}
                    height={d.height ?? defaults?.doorHeight ?? 2.1}
                    thickness={d.thickness ?? defaults?.doorThickness ?? 0.1}
                />
            ))}
        </>
    )
}