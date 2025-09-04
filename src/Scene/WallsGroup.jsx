import React from 'react'
import Walls from '../Components/Walls'

export default function WallsGroup({ showWalls, walls, defaults }) {
    if (!showWalls || !walls) return null
    return (
        <>
            {walls.map((w, i) => (
                <Walls
                    key={i}
                    {...w}
                    height={w.height ?? defaults?.wallHeight ?? 3}
                    thickness={w.thickness ?? defaults?.wallThickness ?? 0.2}
                />
            ))}
        </>
    )
}