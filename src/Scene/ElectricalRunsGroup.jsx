import ElectricalRun from "../Components/ElectricalRun";

export default function ElectricalRunsGroup({ showElectrical, electricalRuns, defaults, opacity, color }) {
    if (!showElectrical || !electricalRuns) return null

    return (
        <>
            {electricalRuns.map((run, index) => (
                <ElectricalRun
                    key={index}
                    points={run.points}
                    radius={defaults?.cableRadius}
                    material={run.material}
                    opacity={opacity}
                    color={color}
                />
            ))}
        </>
    )
}
